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

router.get('/get_users', async (req, res) => {
    const response = {}
    try {
        const users = await query('SELECT userID, dateOfBirth ,dateOfHire, department, emailAddress, firstName, gender, jobTitle, lastName, phoneNumber, role FROM users', [])
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

router.post('/add_users', async (req, res) => {
    const response = {}
    const emp = req.body;

    try {
        if (emp.firstName
            && emp.lastName
            && emp.password
            && emp.dateOfBirth
            && emp.gender
            && emp.emailAddress
            && emp.phoneNumber
            && emp.dateOfHire
            && emp.department
            && emp.jobTitle
            && emp.role
        ) {

            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(emp.password, salt);
            console.log(password, emp.password)

            await query(`INSERT INTO users(firstName, lastName,password, dateOfBirth, gender, emailAddress, phoneNumber, dateOfHire, department, jobTitle, role, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)`
                , [emp.firstName, emp.lastName, password, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role, salt]);
            response.message = 'User Added Successfully!'
            res.status(200).send(response);
        } else {
            response.message = 'Please make sure all data is filled in!'
            res.status(400).send(response);
        }
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.put('/update_users', async (req, res) => {
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



router.delete('/delete_users/:id', async (req, res) => {
    const emp = req.body;

    try {
        await query('DELETE FROM users WHERE userID = ?', [req.params.id], (err, rows, fields) => {
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