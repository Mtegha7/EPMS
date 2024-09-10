const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
var connection = require("../services/db");

const query = (q, data) => {
    return new Promise((resolve, reject) => {
        connection.query(q, data, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
};

router.get('/get-users', async (req, res) => {
    const response = {}
    try {
        const users = await query('SELECT * FROM users', [])
        if (users) {
            response.message = 'Users Fetched'
            response.data = users
            res.status(200).send(response)
        } else {
            response.message = 'No Users available'
            res.status(200).send(response)
        }
    } catch (error) {
        response.message = error
        res.status(500).send(response)
    }
});

router.post('/add-users', async (req, res) => {
    const response = {}
    const emp = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const password =  await bcrypt.hash(emp.password, salt);

        await query(`INSERT INTO users(firstName, lastName, dateOfBirth, gender, emailAddress, phoneNumber, dateOfHire, department, jobTitle, role, password, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)`
            , [emp.firstName, emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role, password, salt]);
        response.message = 'User Added Successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.put('/update-users', async (req, res) => {
    const emp = req.body;

    try {
        await query(`UPDATE users SET firstName = ?, lastName = ?, dateOfBirth = ?, gender = ?, emailAddress = ?, phoneNumber = ?, dateOfHire = ?, department = ?, jobTitle = ?, role = ? WHERE userID =?`
            , [emp.firstName, emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role, emp.userID]);

        response.message = 'User Updated Successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.put('/reset-password', async (req, res) => {
    const emp = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const password =  await bcrypt.hash(emp.password, salt);
        await query(`UPDATE users SET password = ?, salt = ? WHERE userID =?`
            , [password, salt, emp.userID]);

        response.message = 'User password updated successfully!'
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.delete('/delete-users/:id', async (req, res) => {
    const emp = req.body;

    try {
        await query('DELETE FROM users WHERE taskID = ?', [req.params.id], (err, rows, fields) => {
            res.status(200).send(response);
            res.send('User Deleted Successfully!');
        })
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

module.exports = router;