import { useState } from 'react';
/*import enter from './enter.svg'*/
import './App.css';

function App() {
  
  {/*Class Data*/}
  const [task, setTasks] = useState([
  //const task = [
    {
    title: 'Calculus Class',
    description: 'class at room ----',
    date: 'date',
    time: 'time',
    status: 'active',
    completed: false,
    id: crypto.randomUUID(),
    },
    
    {
    title: 'DSD Class',
    description: 'class at room ----',
    date: 'date',
    time: 'time',
    status: 'active',
    completed: false,
    id: crypto.randomUUID(),
    },
    
    {
    title: 'OAK Class',
    description: 'class at room ----',
    date: 'date',
    time: 'time',
    status: 'active',
    completed: false,
    id: crypto.randomUUID(),
    },
  ])
  
  const [newTask, setNewTask] = useState("")
  const [newDescription, setNewDescription] = useState("");

  const handleInputChange = (e) => setNewTask(e.target.value);
  const handleInput2Change = (e) => setNewDescription(e.target.value);


  {/*Add Task*/}
  function handleADDTask(){
    const now = new Date();
    const taskToAdd = {
      id: crypto.randomUUID(),
      title: newTask,
      description: newDescription,
      date: now.toLocaleDateString(), 
      time: now.toLocaleTimeString(),
      status: 'active',
      completed: false,
    }
    setTasks(prev => [taskToAdd, ...prev]);
    //setTasks([...task, taskToAdd])  --- old method ---
    setNewTask("");
    setNewDescription("");
  }



  {/*Add Task using AI Parsing*/}  
/*async function handleADDTask() {
  if (!newTask.trim()) return;

  const now = new Date();
  const todayISO = now.toISOString().slice(0,10);
  const todayLabel = now.toLocaleDateString("en-US", { weekday: "long" });

  let parsed = null;

  // Call your server (note: FULL URL, not relative)
  const resp = await fetch("http://localhost:3001/api/parseTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: newTask.trim(),
      todayISO,
      todayLabel,
    }),
  });

  // Read body as text then parse if present (prevents "Unexpected end of JSON input")
  const raw = await resp.text();
  if (resp.ok && raw) {
    try { parsed = JSON.parse(raw); } catch { parsed = null; }
  }

  const taskToAdd = {
    id: crypto.randomUUID(),
    title: parsed?.task ?? newTask.trim(),
    description: newDescription.trim(), 
    date: parsed?.date ?? todayISO,                 // keep ISO for easy sort
    time: parsed?.time ?? now.toLocaleTimeString(),                       // empty if not provided
    status: "active",
    completed: false,
  };

  setTasks(prev => [taskToAdd, ...prev]);
  setNewTask("");
  setNewDescription("");
}*/

  //Complete Task
  function handleToggleCompleted(id){
    const updatedTask = task.map((task, i) => task.id === id ? {...task, completed: !task.completed } : task );
    setTasks(updatedTask);
  }

  //Remove Task
  function handleRemoveTask(id){
    const updatedTask = task.filter((task, i) => task.id !== id);
    setTasks(updatedTask);
  }

  return (
    <div className='flex justify-center w-full min-h-screen bg-gray-800 text-white'>
      <header className='absolute top-0 text-xl p-5 bg-gray-700/60 w-full text-center rounded-lg'>
        To-Do List App
      </header>  
      <main className='pt-36 w-3/4'>
        
        {/* User Prompt*/}
        <div className='flex justify-center'>
          
          <div className="flex-col w-3/4">
            {/*Every Input imaginable*/}
            <input 
              className='bg-slate-700 p-4 rounded-2xl w-full shadow-md' 
              placeholder='Type Your Input' 
              value={newTask}
              onChange={handleInputChange}
              >
            </input>

            {/*Description Input*/}
            <input 
              className='bg-slate-600 p-2 rounded-2xl w-[100%] shadow-md mt-2' 
              placeholder='  Task Description (links, details, etc.)'
              value={newDescription}
              onChange={handleInput2Change}
            />
          </div>

          {/*Enter Button*/}
          <button className='pl-2 h-12 pt-2'>
            <img src='/logoarrow.png' alt="enter" 
            className='w-full h-full brightness-100 hover:brightness-75 active:brightness-50'
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
              To-Do-List
            </p>
            <hr/>
            
            {/*Assignment List*/}
            {task
              .slice()  // making a new array to avoid mutating the original array
              .sort((a, b) => a.completed - b.completed)  // sort by completed status
              .map((currentTask, id) => (
              <div className={`relative p-4 rounded-2xl shadow-lg transition ${currentTask.completed ? `bg-gray-900 text-gray-500` : `bg-gray-700 text-white`}`}
                key={currentTask.id}>
                <span className={`font-semibold text-2xl transition ${currentTask.completed ? `line-through` : ``}`}>
                {currentTask.title}
                </span>
                <br/>
                <br/>
                <span className={`text-base transition ${currentTask.completed ? `line-through text-gray-500` : `text-white`}`}>
                  Description: {currentTask.description} 
                  <br/>
                  Date: {currentTask.date} 
                  <br/>
                  Time: {currentTask.time} 
                  <br/>
                  Status: {currentTask.completed ? `finished` : currentTask.status} 
                  <br/>
                </span>

                {/*Button for Check and Delete*/}
                <div className="flex gap-2 absolute top-2 right-2">  
                  <button type="button" 
                    aria-pressed={currentTask.completed} 
                    //checked={currentTask.completed} 
                    className='bg-gray-600 px-3 py-1 rounded-xl hover:bg-gray-800/80 active:bg-gray-900 aria-pressed:bg-green-900 text-sm text-white'
                    onClick={() => handleToggleCompleted(currentTask.id)}
                    > 
                      {currentTask.completed ? `Completed` : `Mark as Done`}
                  </button>

                  <button
                    //aria-label={`Remove ${currentTask.title}`}
                    className='bg-red-600 px-3 py-1 rounded-xl hover:bg-red-700 active:bg-red-800 text-sm text-white'
                    onClick={() => handleRemoveTask(currentTask.id)}
                  >
                    X 
                  </button> 
                </div>
                
              </div>
            ) )} 
            
          </div>
        </div>
      </main>
    </div>
  )
}


export default App
