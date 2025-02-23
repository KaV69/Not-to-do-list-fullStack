import express from 'express'
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../model/taskModel.js'

const taskRouter = express.Router()

// Index | Get all Tasks
taskRouter.get("/", (req, res) => {
  getTasks()
    .then(tasks => {
      res.json({
        status: "success",
        data: tasks
      })
    })
    .catch(error => {
      res.json({
        status: "error",
        error: error.message || 'Could not fetch tasks'
      })
    })
})

// Show | Get single Task
taskRouter.get("/:id", (req, res) => {
  getTask(req.params.id)
    .then(task => {
      res.json({
        status: "success",
        data: task
      })
    })
    .catch(error => {
      res.json({
        status: "error",
        error: error.message || 'Could not fetch tasks'
      })
    })
})

// CREATE | POST single Task
taskRouter.post("/", (req, res) => {
  const taskObject = req.body

  createTask(taskObject)
    .then(task => {
      res.json({
        status: "success",
        message: "Task created",
        data: task
      })
    })
    .catch(error => {
      res.json({
        status: "error",
        error: error.message || 'Could not create task'
      })
    })
})

// UPDATE | PATCH single Task
taskRouter.patch("/:id", (req, res) => {
  const udpatedTaskObject = req.body
  const id = req.params.id

  updateTask(id, udpatedTaskObject)
    .then(task => {
      res.json({
        status: "success",
        message: "Task Updated",
        data: task
      })
    })
    .catch(error => {
      res.json({
        status: "error",
        error: error.message || 'Could not create task'
      })
    })
})

// DELETE | Delete single Task
taskRouter.delete("/:id", (req, res) => {
  deleteTask(req.params.id)
    .then(task => {
      res.json({
        status: "success",
        message: "Task Delted",
        data: task
      })
    })
    .catch(error => {
      res.json({
        status: "error",
        error: error.message || 'Could not fetch tasks'
      })
    })
})

export default taskRouter