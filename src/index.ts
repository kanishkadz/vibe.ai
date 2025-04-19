require("dotenv").config();
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import {basePrompt as nodeBasePrompt} from "./defaults/node";
import {basePrompt as reactBasePrompt} from "./defaults/react";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to extract error messages safely
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 200,
                system: "You must respond with only a single word: either 'node' or 'react' depending on which framework would be better for this project. Do not include any explanation or additional text."
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const rawAnswer = data.choices[0].message.content.trim().toLowerCase();
        
        // More robust answer parsing - check if the response contains the keywords
        let framework = "node"; // Default to Node.js
        
        if (rawAnswer.includes("react")) {
            framework = "react";
        } else if (rawAnswer.includes("node")) {
            framework = "node";
        } else {
            // If we can't determine the framework, make a guess based on the prompt
            if (prompt.toLowerCase().includes("frontend") || 
                prompt.toLowerCase().includes("ui") || 
                prompt.toLowerCase().includes("interface") || 
                prompt.toLowerCase().includes("web app")) {
                framework = "react";
            }
        }
        
        console.log(`Determined framework: ${framework} from response: "${rawAnswer}"`);

        if (framework === "react") {
            res.json({
                prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [reactBasePrompt]
            });
            return;
        }
        
        // Default to Node.js if it's not React
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        });
        
    } catch (error) {
        console.error("Template endpoint error:", error);
        res.status(500).json({ message: "Internal server error", error: getErrorMessage(error) });
    }
});

app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    
    try {
        // Setting headers for streaming response
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: messages,
                stream: true,
                system: getSystemPrompt()
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Response body is not readable');
        }

        const decoder = new TextDecoder();
        let buffer = '';
        let fullResponse = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });

            while (true) {
                const lineEnd = buffer.indexOf('\n');
                if (lineEnd === -1) break;
                
                const line = buffer.slice(0, lineEnd).trim();
                buffer = buffer.slice(lineEnd + 1);
                
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') break;
                    
                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices[0]?.delta?.content;
                        if (content) {
                            // Write to the stream response
                            res.write(`data: ${JSON.stringify({ content })}\n\n`);
                            fullResponse += content;
                            
                            // Add this to log content to terminal
                            console.log(content);
                        }
                    } catch (e) {
                        console.error("Error parsing streaming data:", e);
                        // Continue even with invalid JSON
                    }
                }
            }
        }
        
        // Send end-of-stream marker
        res.write('data: [DONE]\n\n');
        res.end();
        
        // Log the complete response at the end
        console.log("Full LLM response:", fullResponse);
        
    } catch (error) {
        console.error("Chat endpoint error:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error", error: getErrorMessage(error) });
        } else {
            res.write(`data: ${JSON.stringify({ error: "Stream processing error: " + getErrorMessage(error) })}\n\n`);
            res.end();
        }
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});