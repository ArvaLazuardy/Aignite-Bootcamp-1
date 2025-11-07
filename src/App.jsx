import { useState } from 'react';
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
  

  const extractTime = (text) => {
  const patterns = [
    /(\d{1,2}):(\d{2})\s*(AM|PM)/i,
    /(\d{1,2}):(\d{2})/,
    /(\d{1,2})\s*(AM|PM)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (!m) continue;
    let h = parseInt(m[1], 10);
    const mins = m[2] ? parseInt(m[2], 10) : 0;
    const period = m[3];

    if (period && period.toUpperCase() === 'PM' && h !== 12) h += 12;
    if (period && period.toUpperCase() === 'AM' && h === 12) h = 0;

    const HH = String(h).padStart(2, '0');
    const MM = String(mins).padStart(2, '0');
    return `${HH}:${MM}`;
  }
  return '';
};

  
  const [newTask, setNewTask] = useState("")
  const [newDescription, setNewDescription] = useState("");

  const handleInput1Change = (e) => setNewTask(e.target.value);
  const handleInput2Change = (e) => setNewDescription(e.target.value);

  {/*format date to DD-MM-YYYY*/}
  function formatDateDDMMYYYY(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

  
async function handleADDTask() {
  if (!newTask.trim()) return;

//call local AI proxy
  let parsed = null;
  try {
    const resp = await fetch('http://localhost:3001/api/parseTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: newTask.trim() }),
    });

    const raw = await resp.text();    
    if (resp.ok && raw) parsed = JSON.parse(raw);
  } catch (e) {
    console.warn('AI call failed, falling back:', e);
  }

  const now = new Date();
  const todayISO = now.toISOString().slice(0, 10);
  const isoDate = parsed?.date ?? todayISO;

  const taskToAdd = {
    id: crypto.randomUUID(),
    title: parsed?.task ?? newTask.trim(),
    description: newDescription.trim(),
    date: formatDateDDMMYYYY(isoDate) ?? todayISO,                      
    time:
      (parsed?.time ?? '').trim() ||
      extractTime(newTask) ||
      'all day',                                              
    status: 'active',
    completed: false,
  };

  setTasks((prev) => [taskToAdd, ...prev]);
  setNewTask('');
  setNewDescription('');
}

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
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-800/90 text-white flex justify-center p-10'>

      {/*Container Box*/}
      <div className="w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-2xl p-4 shadow-2xl">
      
      {/*Header*/}
      <header className='text-center text-2xl font-bold bg-gray-700/60 rounded-2xl p-2'>
        To-Do List App
      </header>  
      <main className='pt-12 w-(85%)'>
        
        {/* User Prompt*/}
        <div className='flex justify-center'>
          
          <div className="flex-col w-3/4">
            {/*Every Input imaginable*/}
            <input 
              className='bg-slate-700 p-4 rounded-2xl w-full shadow-md' 
              placeholder='Type Your Input' 
              value={newTask}
              onChange={handleInput1Change}
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
                    className='bg-gray-600 px-3 py-1 rounded-xl hover:bg-gray-800/80 active:bg-gray-900 aria-pressed:bg-green-900 text-sm text-white'
                    onClick={() => handleToggleCompleted(currentTask.id)}
                    > 
                      {currentTask.completed ? `Completed` : `Mark as Done`}
                  </button>

                  <button
                    className='bg-red-600 px-3 py-1 rounded-xl hover:bg-red-700 active:bg-red-800 text-sm text-white'
                    onClick={() => handleRemoveTask(currentTask.id)}
                  >
                    X 
                  </button> 
                </div> 
              </div>
            ) )} 
        
        <br/>
        <br/>           
            {/*small footer*/}
            <div className='text-center text-sm text-gray-500'>
            To-Do-List
            </div>
          </div>
        </div>
      </main></div>
    </div> 
  )
}


export default App
