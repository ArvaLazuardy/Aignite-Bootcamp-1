import { useState } from 'react';
/*import enter from './enter.svg'*/
import './App.css';

function App() {
  
  {/*Class Data*/}
  const [task, setTasks] = useState([
    {
    title: 'Calculus Class',
    description: 'class at room ----',
    date: 'date',
    time: 'time',
    status: 'active',
    },
    
    {
    title: 'DSD Class',
    description: 'class at room ----',
    date: 'date',
    time: 'time',
    status: 'active',
    },
    
    {
    title: 'OAK Class',
    description: 'class at room ----',
    date: 'date',
    time: 'time',
    status: 'active',
    },
  ])
  
  const [newTask, setNewTask] = useState("")

  const handleInputChange = (e) => setNewTask(e.target.value);

  {/*Add Task*/}
  function handleADDTask(){
    const now = new Date();
    const taskToAdd = {
      title: newTask,
      date: now.toLocalDateString(), 
      time: now.toLocalTimeString(),
      status: 'Active',
      completed: false,
    }
    setTasks([...task, taskToAdd])
    setNewTask(" ");
  }

  {/*Complete Task*/}
  function handleToggleCompleted(Index){
    const updatedTask = task.map((task, i) => i === Index ? {...task, completed: !task.completed } : task );
    setTasks(updatedTask);
  }

  {/*Remove Task*/}
  function handleRemoveTask(index){
    const updatedTask = task.filter((_, i) => i !== index);
    setTasks(updatedTask);
  }

  return (
    <div className='flex justify-center w-full min-h-screen bg-gray-800 text-white'>
      <header className='absolute top-0 text-xl p-5 bg-gray-600 w-full text-center rounded-lg'>
        To-Do List App
      </header>  
      <main className='pt-36 w-3/4'>
        
        {/* User Prompt*/}
        <div className='flex justify-center'>
          <input 
            className='bg-slate-700 p-4 rounded-2xl w-3/4 shadow-md' 
            placeholder='Type Your Input'
            value={newTask}
            onChange={handleInputChange}
            >
          </input>

          <button className='pl-2 h-12 pt-2'>
            <img src='/logo192.png' alt="enter" 
            className='w-full h-full'
            onClick={handleADDTask}
            />
          </button>
        </div>
        
        {/*spacing*/}
        <div className="p-6"/>

        {/* To Do List*/}
        <div className='flex justify-center'>
          <div className='w-[85%] flex flex-col gap-y-4'>
            <p className='font-semibold text-2xl'> 
              Your-To-Do-List
            </p>
            <hr/>
            
            {/*Assignment List*/}
            {task.map((currentTask, index) => (
              <div className='bg-gray-700 p-4 rounded-2xl shadow-lg' key={index}>
                <span className='font-semibold text-2xl '>
                {currentTask.title}
                </span>
                <br/>
                <br/>
                <span className='text-base'>
                  Description: {currentTask.description} 
                  <br/>
                  Date: {currentTask.date} 
                  <br/>
                  Time: {currentTask.time} 
                  <br/>
                  Status: {currentTask.status} 
                  <br/>
                </span>
                
                <input type="checkbox"
                checked = {task.completed}
                onChange={() => handleToggleCompleted(index)}
                />
                
                <button
                  className='ml-4 bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700'
                  onClick={() => handleRemoveTask(index)}
                >
                </button>
              </div>
            ) )} 
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
