const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dekha',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) //checking for errors
        console.log('DB connection succeded.');
    else //show error message if there is one
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2)); 
});


//Get all users
app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
        console.log(err);
})
});

//Get a user
app.get('/users/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM users WHERE userID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete a user
app.delete('/users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE userID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert a user
app.post('/users', (req, res) => {
    let emp = req.body;
    var sql = "SET @userID = ?;SET @FirstName = ?;SET @LastName = ?;SET @DateOfBirth = ?;SET @Gender = ?; SET @EmailAddress =?; SET @PhoneNumber =?; SET @DateOfHire =?; SET @Department =?; SET @JobTitle =?; SET @Role=?; \
    CALL EmployeeAddOrEdit(@userID,@FirstName,@LastName,@DateOfBirth,@Gender,@EmailAddress,@PhoneNumber,@DateOfHire,@Department,@JobTitle,@Role);";
    mysqlConnection.query(sql, [emp.userID, emp.FirstName,emp.LastName, emp.DateOfBirth, emp.Gender, emp.EmailAddress, emp.PhoneNumber, emp.DateOfHire, emp.Department, emp.JobTitle, emp.Role], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted user id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

//update a user
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @userID = ?;SET @FirstName = ?;SET @LastName = ?;SET @DateOfBirth = ?;SET @Gender = ?; SET @EmailAddress =?; SET @PhoneNumber =?; SET @DateOfHire =?; SET @Department =?; SET @JobTitle =?; SET @Role=?; \
    CALL EmployeeAddOrEdit(@userID,@FirstName,@LastName,@DateOfBirth,@Gender,@EmailAddress,@PhoneNumber,@DateOfHire,@Department,@JobTitle,@Role);";
    mysqlConnection.query(sql, [emp.userID, emp.FirstName,emp.LastName, emp.DateOfBirth, emp.Gender, emp.EmailAddress, emp.PhoneNumber, emp.DateOfHire, emp.Department, emp.JobTitle, emp.Role], (err, rows, fields) =>
     {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});

app.listen(8080,()=> console.log('Server Running at Port #8080'));