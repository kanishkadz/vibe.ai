"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const prompts_1 = require("./prompts");
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Helper function to extract error messages safely
const getErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.body.prompt;
    try {
        const response = yield fetch('https://openrouter.ai/api/v1/chat/completions', {
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
        const data = yield response.json();
        const rawAnswer = data.choices[0].message.content.trim().toLowerCase();
        // More robust answer parsing - check if the response contains the keywords
        let framework = "node"; // Default to Node.js
        if (rawAnswer.includes("react")) {
            framework = "react";
        }
        else if (rawAnswer.includes("node")) {
            framework = "node";
        }
        else {
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
                prompts: [prompts_1.BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [react_1.basePrompt]
            });
            return;
        }
        // Default to Node.js if it's not React
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${node_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [node_1.basePrompt]
        });
    }
    catch (error) {
        console.error("Template endpoint error:", error);
        res.status(500).json({ message: "Internal server error", error: getErrorMessage(error) });
    }
}));
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const messages = req.body.messages;
    try {
        // Setting headers for streaming response
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        const response = yield fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: messages,
                stream: true,
                system: (0, prompts_1.getSystemPrompt)()
            }),
        });
        if (!response.ok) {
            const errorText = yield response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }
        const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
        if (!reader) {
            throw new Error('Response body is not readable');
        }
        const decoder = new TextDecoder();
        let buffer = '';
        let fullResponse = '';
        while (true) {
            const { done, value } = yield reader.read();
            if (done)
                break;
            buffer += decoder.decode(value, { stream: true });
            while (true) {
                const lineEnd = buffer.indexOf('\n');
                if (lineEnd === -1)
                    break;
                const line = buffer.slice(0, lineEnd).trim();
                buffer = buffer.slice(lineEnd + 1);
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]')
                        break;
                    try {
                        const parsed = JSON.parse(data);
                        const content = (_c = (_b = parsed.choices[0]) === null || _b === void 0 ? void 0 : _b.delta) === null || _c === void 0 ? void 0 : _c.content;
                        if (content) {
                            // Write to the stream response
                            res.write(`data: ${JSON.stringify({ content })}\n\n`);
                            fullResponse += content;
                            // Add this to log content to terminal
                            console.log(content);
                        }
                    }
                    catch (e) {
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
    }
    catch (error) {
        console.error("Chat endpoint error:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error", error: getErrorMessage(error) });
        }
        else {
            res.write(`data: ${JSON.stringify({ error: "Stream processing error: " + getErrorMessage(error) })}\n\n`);
            res.end();
        }
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
