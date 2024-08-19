const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();

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
app.get('/get-users', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get a user
app.get('/get-users/:id', (req, res) => {
    const userID = req.params.id
    try {

        if (userID) {
            mysqlConnection.query('SELECT * FROM users WHERE userID = ?', [req.params.id], (err, rows, fields) => {
                if (!err)
                    if (rows) {
                        const response = { data: rows, message: "data fetched" }
                        res.status(200).send(response);
                    } else {

                        res.status(200).send({ message: "No results with the requested parameters" });
                    }
                else {
                    console.log(err);
                    res.status(400).send(rows);
                }
            })
        } else {
            res.send({ message: "Please make sure the userID is not empty" });
        }
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

//Delete a user
app.delete('/delete-users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE userID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({ message: 'Deleted successfully.' });
        else
            console.log(err);
    })
});

//Insert a user
/*app.post('/users', (req, res) => {
    let emp = req.body;
    var sql = "SET @userID = ?;SET @firstName = ?;SET @lastName = ?;SET @dateOfBirth = ?;SET @gender = ?; SET @emailAddress =?; SET @phoneNumber =?; SET @dateOfHire =?; SET @department =?; SET @jobTitle =?; SET @role=?; \
    CALL addUser(@userID,@firstName,@lastName,@dateOfBirth,@gender,@emailAddress,@phoneNumber,@dateOfHire,@department,@jobTitle,@role);";
    mysqlConnection.query(sql, [emp.userID, emp.firstName, emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send('Inserted user id : ' + element[0].EmpID);
            });

            // if(rows[0].userID)
        else
            console.log(err);
    })
}); */
app.post('/add-users', async (req, res) => {
    const emp = req.body;
  
    try {
      const sql = `
        SET @userID = ?, @firstName = ?, @lastName = ?,@dateOfBirth = ?, @gender = ?,@emailAddress = ?, @phoneNumber = ?, @dateOfHire = ?, @department = ?, @jobTitle = ?,@role = ?; CALL addOrUpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
  
      await mysqlConnection.query(sql, [ emp.userID, emp.firstName,  emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle,   emp.role, emp.userID,  emp.firstName, emp.lastName,  emp.dateOfBirth,  emp.gender,  emp.emailAddress, emp.phoneNumber, emp.dateOfHire,  emp.department, emp.jobTitle, emp.role,
      ]);
      res.send('Inserted user id: ' + emp.userID); 
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send('Error adding user'); // Send a generic error response to the client
    }
  });

//update a user
/* app.put('/update-users', (req, res) => {
    let emp = req.body;
    var sql = "SET @userID = ?;SET @firstName = ?;SET @lastName = ?;SET @dateOfBirth = ?;SET @gender = ?; SET @emailAddress =?; SET @phoneNumber =?; SET @dateOfHire =?; SET @department =?; SET @jobTitle =?; SET @role=?; \
    CALL updateUser(@userID,@FirstName,@LastName,@DateOfBirth,@Gender,@EmailAddress,@PhoneNumber,@DateOfHire,@Department,@JobTitle,@Role);";
    mysqlConnection.query(sql, [emp.userID, emp.firstName, emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
}); */
app.put('/update-users', async (req, res) => {
    const emp = req.body;
  
    try {
      const sql = `SET @userID = ?, @firstName = ?, @lastName = ?, @dateOfBirth = ?, @gender = ?, @emailAddress = ?, @phoneNumber = ?, @dateOfHire = ?, @department = ?, @jobTitle = ?, @role = ?; CALL addOrUpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
  
      await mysqlConnection.query(sql, [emp.userID, emp.firstName, emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role, emp.userID, emp.firstName, emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role,
      ]);
  
      res.send('Updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating user');
    }
  });

app.listen(8080, () => console.log('Server Running at Port #8080'));


// Create a task
app.post('/add-tasks', (req, res) => {
  const { title, description, dueDate, userID } = req.body;

  const sql = 'INSERT INTO tasks (title, description, dueDate, userID) VALUES (?, ?, ?, ?)';
  pool.query(sql, [title, description, dueDate, userID], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating task');
    } else {
      res.status(201).json({ message: 'Task created successfully', taskID: result.insertId });
    }
  });
});

// Update a task
app.put('/update-tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, completionDate } = req.body;

  const sql = 'UPDATE tasks SET title = ?, description = ?, dueDate = ?, completionDate = ? WHERE taskID = ?';
  pool.query(sql, [title, description, dueDate, completionDate, taskId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating task');
    } else {
      res.status(200).json({ message: 'Task updated successfully' });
    }
  });
});

// Delete a task
app.delete('/delete-tasks/:taskId', (req, res) => {
  const { taskId } = req.params;

  const sql = 'DELETE FROM tasks WHERE taskID = ?';
  pool.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting task');
    } else {
      res.status(204).send();
    }
  });
});