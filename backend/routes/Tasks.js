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

router.get('/get_task/:id', async (req, res) => {
    const emp = req.body
    const response = {}
    try {
        const task = await query('SELECT taskID,title,description,createdDate,dueDate,updatedDate,completionDate  FROM tasks WHERE taskID =?',
            [req.params.id])
        if (task) {
            response.message = 'Task Fetched'
            response.data = task[0]
            res.status(200).send(response)
        } else {
            response.message = 'No Task available'
            res.status(200).send(response)
        }
    } catch (error) {
        response.message = error
        res.status(500).send(response)
    }
});


router.get('/get_tasks', async (req, res) => {
    const response = {}
    try {
        const tasks = await query(`SELECT taskID,title,description,createdDate,dueDate,updatedDate,completionDate,emailAddress, status
            FROM tasks t
            JOIN users u 
            where t.userID = u.userID`
            , [])
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

router.post('/add_tasks', async (req, res) => {
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


router.put('/update_task_status', async (req, res) => {
    const emp = req.body;
    const response = {}

    try {
        const taskInfo = await query(`SELECT * FROM tasks where taskID = ?`, [emp.taskID])

        await query(`UPDATE tasks SET status = ? WHERE taskID = ?`
            , [emp.status, emp.taskID]);

        //TODO: UPDATE user info with points
        await query(`UPDATE users u JOIN tasks t ON u.userID = t.userID 
            SET u.points = u.points + 
            CASE WHEN t.status = 3 AND CURDATE() <= t.dueDate THEN 20
            WHEN t.status = 3 AND CURDATE() > t.dueDate THEN 10 ELSE 0 END,
            u.scores = u.scores +
            CASE WHEN t.status = 3 AND CURDATE() <= t.dueDate THEN 20 
            WHEN t.status = 3 AND CURDATE() > t.dueDate THEN 10 ELSE 0 END
            WHERE t.status = 3 AND t.taskID = ?;`
            , [emp.taskID]);

        response.message = 'Task Updated Successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.put('/update_tasks/:id', async (req, res) => {
    const emp = req.body;
    const response = {}

    try {
        await query(`UPDATE tasks SET title = ?, description = ?, dueDate = ?, createdDate=?,  completionDate=? WHERE taskID = ?`
            , [emp.title, emp.description, emp.dueDate, emp.createdDate, emp.completionDate, emp.taskID]);

        response.message = 'Task Updated Successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.delete('/delete_task/:id', async (req, res) => {
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


router.post('/add_comment', async (req, res) => {
    const response = {}
    const emp = req.body;
    try {
        await query(`INSERT INTO comments(userId, comment, taskID) VALUES (?, ?, ?)`
            , [emp.userID, emp.comment, emp.taskID]);
        response.message = 'comment Added Successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});


router.get('/get_comment/:id', async (req, res) => {
    const response = {}
    const emp = req.body

    try {
        const comments = await query(`SELECT c.commentID, c.comment, u.emailAddress, c.taskID, c.createdDate 
            FROM comments c
            JOIN users u ON c.userID = u.userID
            where taskID = ?`
            , [req.params.id])
        if (comments) {
            response.message = 'Comments Fetched'
            response.data = comments
            res.status(200).send(response)
        } else {
            response.message = 'No Comments available'
            res.status(200).send(response)
        }
    } catch (error) {
        response.message = error
        res.status(500).send(response)
    }

})



module.exports = router;