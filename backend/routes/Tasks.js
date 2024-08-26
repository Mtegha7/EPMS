const express = require('express')
const router = express.Router()
var connection = require("../services/db");

const query = (q, data) => {
    return new Promise((resolve, reject) => {
        connection.query(q, data, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
};


router.get('/get-tasks', async (req, res) => {
    const response = {}
    try {
        const tasks = await query('SELECT * FROM tasks', [])
        if (tasks) {
            response.message = 'Tasks Fetched'
            response.data = tasks
            res.status(200).send(response)
        } else {
            response.message = 'No Tasks available'
            res.status(200).send(response)
        }
    } catch (error) {
        response.message = error
        res.status(500).send(response)
    }
});

router.post('/add-tasks', async (req, res) => {
    const response = {}
    const emp = req.body;

    try {
        await query(`INSERT INTO tasks(title, description, dueDate, userID) VALUES (?, ?, ?, ?)`
            , [emp.title, emp.description, emp.dueDate, emp.userID,]);
        response.message = 'Task Added Successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});


router.put('/update-tasks', async (req, res) => {
    const emp = req.body;

    try {
        await query(`UPDATE tasks SET title = ?, description = ?, dueDate = ?, userID =? WHERE taskID = ?`
            , [emp.title, emp.description, emp.dueDate, emp.userID, emp.taskID]);

        response.message = 'Task Updated Successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.delete('/delete-task/:id', async (req, res) => {
    const emp = req.body;

    try {
        await query('DELETE FROM tasks WHERE taskID = ?', [req.params.id], (err, rows, fields) => {
            res.status(200).send(response);
            res.send('Task Deleted Successfully!');
        })
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

module.exports = router;