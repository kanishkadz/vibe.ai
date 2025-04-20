import React, { useState } from 'react';

const CodePreview = () => {
  const [activeTab, setActiveTab] = useState('code');

  const pythonCode = `
import os

TASKS_FILE = "tasks.txt"

def load_tasks():
    if not os.path.exists(TASKS_FILE):
        return []
    with open(TASKS_FILE, "r") as f:
        return [line.strip() for line in f.readlines()]

def save_tasks(tasks):
    with open(TASKS_FILE, "w") as f:
        f.writelines(task + "\\n" for task in tasks)

def show_tasks(tasks):
    if not tasks:
        print("✅ No tasks! You're all caught up.")
    else:
        print("\\n📋 To-Do List:")
        for i, task in enumerate(tasks, 1):
            print(f"{i}. {task}")
    print()

def main():
    tasks = load_tasks()

    while True:
        print("====== TO-DO APP ======")
        print("1. View Tasks")
        print("2. Add Task")
        print("3. Complete Task")
        print("4. Exit")
        choice = input("Choose an option (1-4): ")

        if choice == "1":
            show_tasks(tasks)
        elif choice == "2":
            task = input("Enter a new task: ").strip()
            if task:
                tasks.append(task)
                save_tasks(tasks)
                print("✅ Task added!\\n")
        elif choice == "3":
            show_tasks(tasks)
            try:
                task_num = int(input("Enter task number to complete: "))
                if 1 <= task_num <= len(tasks):
                    removed = tasks.pop(task_num - 1)
                    save_tasks(tasks)
                    print(f"✅ Task '{removed}' completed!\\n")
                else:
                    print("❌ Invalid task number.\\n")
            except ValueError:
                print("❌ Please enter a valid number.\\n")
        elif choice == "4":
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice. Try again.\\n")

if __name__ == "__main__":
    main()
  `.trim();

  return (
    <div className='flex-1 rounded-xl overflow-hidden border border-gray-700'>
      <div className='flex items-center gap-4 px-4 py-2 bg-[#1e1e1e] border-b border-gray-700'>
        <button
          onClick={() => setActiveTab('code')}
          className={`text-sm font-medium ${activeTab === 'code' ? 'text-[#ff3e9a]' : 'text-gray-400'}`}
        >
          Code
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`text-sm font-medium ${activeTab === 'preview' ? 'text-[#ff3e9a]' : 'text-gray-400'}`}
        >
          Preview
        </button>
      </div>

      <div className='h-[800px] bg-[#1e1e1e] p-4 text-white overflow-auto'>
        {activeTab === 'code' ? (
          <pre className='h-full border border-dashed border-gray-600 rounded p-4 text-sm whitespace-pre-wrap'>
            {pythonCode}
          </pre>
        ) : (
          <div className='h-full border border-dashed border-gray-600 rounded p-4'>
            <img src="preview.PNG" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
