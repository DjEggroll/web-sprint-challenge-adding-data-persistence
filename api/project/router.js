// build your `/api/projects` router here
const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let projects = await helpers.getProjects();
        projects.map(project => {
            if(project.project_completed === 0){
                project.project_completed = false
            } else {
                project.project_completed = true
            }
        })
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
});

router.post('/', async (req, res, next) => {
    try {
        let newProject = await helpers.postProject(req.body);
            if(newProject.project_completed === 0){
                newProject.project_completed = false;
            } else {
                newProject.project_completed = true;
            }
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

module.exports = router;