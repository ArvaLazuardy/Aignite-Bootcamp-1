
function App() {
  const task = [
    {
    title: 'Calculus Class',
    description: 'class at room ----',
    date: 'date',
    time: 'staet',
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
  ]

  return (
    <div className='flex justify-center w-full min-h-screen bg-gray-800 text-white'>
      <header className='absolute top-0 text-xl p-5 bg-gray-600 w-full text-center rounded-lg'>
        To-Do List App
      </header>  
      <main className='pt-36 w-3/4'>
        
        {/* User Prompt*/}
        <div className='flex justify-center'>
          <input className='bg-slate-700 p-4 rounded-2xl w-3/4 shadow-md' placeholder='Type Your Input'>
          </input>
          <button className='pl-2 h-12 pt-2'>
            <img src='/logo192.png' alt="enter" className='w-full h-full'/>
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
                  {currentTask.description} 
                  <br/>
                  {currentTask.date} 
                  <br/>
                  {currentTask.time} 
                  <br/>
                  {currentTask.status} 
                  <br/>
                </span>
              </div>
            ) )} 
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
