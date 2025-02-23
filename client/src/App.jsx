import { useEffect, useState } from 'react'
import './App.css'
import AddTaskForm from './components/AddTaskForm'
import Header from './components/Header'
import TaskListItem from './components/TaskLIstItem'
import { deleteTaskRequest, getTasks } from './axios/taskAxios'

function App() {
  // State to store task list
  const [taskList, setTaskList] = useState([])
  console.log("taskList", taskList);

  const entryTypeTask = taskList.filter(item => item.type === "Entry")
  const unwantedTypeTask = taskList.filter(item => item.type === "Unwanted")

  // Function to switch task type
  const switchTaskType = (taskId) => {
    const updatedTaskList = taskList.map((task) => {
      if(task.id === taskId){
        task.type = task.type === "entry"? "unwanted" : "entry"
      }
  
      return task
    })

    setTaskList(updatedTaskList)
  }

  const fetchTasks = async() => {
    const response = await getTasks()

    if(response.status === "success"){
      setTaskList(response.data)
    }
  }

  // Function to delete task
  const deleteTask = async(taskId) => {
    const response = await deleteTaskRequest(taskId)

    if(response.status === 'success'){
      fetchTasks()
    }
  }

  //useEffect hook
  useEffect(()=>{
    // Initailize taskList state with data from database
    // To fetch data using API, we have to send request
    fetchTasks()
  }, [])

  return (
    <>
      {/* <!----Title section--> */}
      <Header />

      <section>
        {/* <!----Body Of Our Application-----> */}
        <div className="shadow-lg border p-4 rounded">
          {/* <!---First Row--> */}
          <div className="row gap-2">
            {/* <!--First Column--> */}
            <div className="col border p-4 rounded align-self-center">
              {/* <!--Form to collect user's input i.e task details--> */}
              <AddTaskForm fetchTasks={fetchTasks} />
            </div>
            {/* <!--Second Column--> */}
            <div className="col border p-4 rounded">
              {/* <!---Entry Task List--> */}
              <h3 className="text-center">Entry Task List</h3>

              <div className="px-4" style={{ height: '50vh', overflowY: 'auto' }}>
                {/* <!---Table to display task list--> */}
                <table className="table table-hover border">
                  {/* <!---The table body content will be added by JS || adding rows from JS--> */}
                  <tbody>
                    {/* Map the entry type task and display task list item */}
                    {entryTypeTask.map(item => 
                      <TaskListItem 
                        key={item.id} 
                        task={item} 
                        switchTaskType={switchTaskType}
                        deleteTask={deleteTask}
                      />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!--Third Column--> */}
            <div className="col border p-4 rounded">
              {/* <!---All Task List--> */}
              <h3 className="text-center">Unwanted Task List</h3>

              <div className="px-4" style={{ height: '50vh', overflowY: 'auto' }}>
                {/* <!---Table to display unwanted task list--> */}
                <table className="table table-hover border">
                  {/* <!---The table body content will be added by JS || adding rows from JS--> */}
                  <tbody>
                    {/* Map the unwanted type task and display task list item */}
                    {unwantedTypeTask.map(item => 
                      <TaskListItem 
                        key={item.id} 
                        task={item} 
                        switchTaskType={switchTaskType}
                        deleteTask={deleteTask}
                      />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <!---Second Row--> */}
          <div className="row gap-2 mt-4">
            {/* <!--First Column--> */}
            <div className="col border fw-bold alert alert-primary">Total Time in a Day: <span id="totalTimeInDayElement"></span></div>
            {/* <!--Second Column--> */}
            <div className="col border fw-bold alert alert-success">Total Time Spent: <span id="totalTimeElement"></span></div>
            {/* <!--Third Column--> */}
            <div className="col border fw-bold alert alert-danger">Total time wasted: <span id="totalWastedTimeElement"></span></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
