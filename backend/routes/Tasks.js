const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
var connection = require("../services/db");

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization || req.params.token;

    if (!token) {
        return res.status(401).send({ message: "You need to be authorized to access this endpoint" });
    }
    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        req.userToken = decoded;
        // console.log(decoded)
    } catch (err) {
        return res.status(401).send({ message: "Invalid Token" });
    }
    return next();
};

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


router.put('/update_task_status', verifyToken, async (req, res) => {
    const emp = req.body;
    const response = {}



    try {

        let point = 0;
        const stat = emp.status
        const taskInfo = await query(`SELECT * FROM tasks where taskID = ?`, [emp.taskID])
        console.log(taskInfo, stat)
        await query(`UPDATE tasks SET status = ? WHERE taskID = ?`
            , [stat, emp.taskID]);


        if (stat == 3) {
            if (taskInfo[0]) {
                const t = taskInfo[0]
                if (Number(t.status) != 3) {

                    if (new Date(t.dueDate) > new Date()) {
                        point = 20
                    } else {
                        point = 10
                    }
                    await query(`UPDATE users SET points = points + ?, scores = scores + ? WHERE userID = ?`
                        , [point, point, t.userID]);
                }
            }
        }


        if (taskInfo[0]) {
            const t = taskInfo[0]
            if (t.status == 3 && stat != 3) {
                if (new Date(t.dueDate) > new Date()) {
                    point = 20
                } else {
                    point = 10
                }
                await query(`UPDATE users SET points = points - ?, scores = scores - ? WHERE userID = ?`
                    , [point, point, t.userID]);
            }
        }

        response.message = 'Task Updated Successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = error
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

// pending
router.get('/get_tasks_status_count', verifyToken, async (req, res) => {
    try {
        const response = {}
        const userID = req.userToken.userID

        const result = await query(`
            SELECT 
                SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS pending_count,
                SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS in_progress_count,
                SUM(CASE WHEN status = 3 THEN 1 ELSE 0 END) AS done_count
            FROM tasks 
            WHERE userID = ?
        `, [userID]);
       
        const userPoints = await query(`
            SELECT points, scores 
            FROM users 
            WHERE userID = ?
        `, [userID]);

        if (result.length > 0) {
            response.stats = {
                pending: result[0].pending_count || 0,
                inProgress: result[0].in_progress_count || 0,
                done: result[0].done_count || 0
            }
            
        } else {
            response.stats = { pending: 0, inProgress: 0, done: 0 }
        }
        response.userPoints =  userPoints[0]
        return res.status(200).json(response)

    } catch (error) {
        console.error('Error fetching task counts:', error);
        return res.status(500).json({ message: 'Error fetching task counts', error });
    }
})


// progress
// router.get('/get_progress_tasks', verifyToken, async (req, res) => {
//     const emp = req.body;
//     const response = {}

//     try {
//         let progress_count;
//         const query = `SELECT COUNT(*) AS task_count FROM tasks WHERE status = 1 AND userID =?`;
//         if (error) {
//             console.error('Error:', error);
//         } else {
//             progress_count = results[0].task_count;
//             console.log(' In Progress Task Count:', progress_count);
//         }

//         const progress = await query(`SELECT taskID, title, description, createdDate, dueDate, completionDate, emailAddress, status
//             FROM tasks t
//             JOIN users u
//             WHERE  u.userID =? AND t.status = 1 `, [req.userToken.userID])
//         if (progress) {
//             response.message = 'In Progress Tasks Fetched'
//             response.data = pending
//             res.status(200).send(response)
//         } else {
//             response.message = 'No Tasks available'
//             res.status(200).send(response)
//         }
//     } catch (error) {
//         response.message = error
//         res.status(500).send(response)
//     }
// })

// done
// router.get('/get_done_tasks', verifyToken, async (req, res) => {
//     const emp = req.body;
//     const response = {}

//     try {
//         const pending = await query(`SELECT taskID, title, description, createdDate, dueDate, completionDate, emailAddress, status
//             FROM tasks t
//             JOIN users u
//             WHERE u.userID =? AND t.status = 3 `, [req.userToken.userID])
//         if (pending) {
//             response.message = 'Finished Tasks Fetched'
//             response.data = pending
//             res.status(200).send(response)
//         } else {
//             response.message = 'No Tasks available'
//             res.status(200).send(response)
//         }
//     } catch (error) {
//         response.message = error
//         res.status(500).send(response)
//     }
// })




module.exports = router;