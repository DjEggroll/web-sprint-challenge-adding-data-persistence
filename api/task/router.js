// build your `/api/tasks` router here
const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let tasks = await helpers.getTasks();
        tasks.map(task => {
            if(task.task_completed === 0){
                task.task_completed = false
            } else {
                task.task_completed = true
            }
        })
        res.status(200).json(tasks)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        let newTask = await helpers.postTask(req.body);
            if(newTask.task_completed === 0){
                newTask.task_completed = false
            } else {
                newTask.task_completed = true
            }
        res.status(201).json(newTask);
    } catch (err) {
        next(err)
    }
})

module.exports = router;