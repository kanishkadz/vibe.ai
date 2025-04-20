import React from 'react'

const TextEditor = () => {
  return (
    <div>
      <div className='w-full max-w-md bg-[#1a1a1a] rounded-xl p-6 text-white'>
        <p className='leading-relaxed'>
          <b>📝 Steps to Create a To-Do App:</b> <br /><br />
          <b>1. Set Up the Project : </b> <br />
          Use a modern setup like React with TypeScript via Vite for fast development. <br/> <br/>

          <b>2. Plan the App Structure : </b> <br />
          - Main App component <br />
          - TodoInput for adding tasks <br />
          - TodoList for showing all tasks <br />
          - Optional: TodoItem for individual task logic <br/><br/> 

          <b>3. Define the Data Structure : </b> <br />
          Create a type or interface for a to-do item. <br/><br/> 

          <b>4. Add Task Functionality : </b> <br />
          Build an input field where users can type tasks and add them to the list. <br/><br/>

          <b>5. Display Tasks : </b> <br/>
          Show all tasks in a list format with the ability to mark them as completed or delete them. <br/><br/>

          <b>6. Handle State : </b> <br />
          Use React state to manage the list of tasks and update it on actions (add, complete, delete). <br/><br/>

          <b> 7. Add Interactivity : </b><br />
          - Toggle completed state on click <br />
          - Delete tasks with a button click <br/><br/>

          <b>8. Style the App : </b> <br />
          Use Tailwind CSS or plain CSS to make it clean and responsive. <br/><br/>

          <b>9. Optional Enhancements : </b> <br />
          - Save tasks to local storage <br />
          - Add filters (All / Active / Completed) <br />
          - Add drag & drop sorting <br />
          - Support dark mode <br/><br/>

          <b>10. Test and Polish : </b> <br />
          Make sure everything works smoothly and looks good on all devices.
        </p>
      </div>
    </div>
  )
}

export default TextEditor