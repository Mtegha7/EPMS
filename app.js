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
app.post('/add-tasks', async (req, res) => {
    const emp = req.body;
  
       try {
      const sql = `SET @taskID = ?, @description = ?, @createdDate = ?, @dueDate = ?, @updatedDate = ?, @completionDate = ?, @userID = ?; CALL addOrUpdateTask(?, ?, ?, ?, ?, ?, ?) `;
  
      await mysqlConnection.query(sql, [emp.taskID, emp.description, emp.createdDate, emp.dueDate, emp.updatedDate, emp.completionDate, emp.userID, emp.taskID, emp.description, emp.createdDate, emp.dueDate, emp.updatedDate, emp.completionDate, emp.userID,
      ]);
      res.send('Inserted task id: ' + emp.taskID); 
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send('Error adding Task'); // Send a generic error response to the client
    }
  });

// Update a task
app.put('/update-tasks', async (req, res) => {
    const emp = req.body;
  
    try {
      const sql = `SET @taskID = ?, @description = ?, @createdDate = ?, @dueDate = ?, @updatedDate = ?, @completionDate = ?, @userID = ?; CALL addOrUpdateTask(?, ?, ?, ?, ?, ?, ?) `;
  
      await mysqlConnection.query(sql, [emp.taskID, emp.description, emp.createdDate, emp.dueDate, emp.updatedDate, emp.completionDate, emp.userID, emp.taskID, emp.description, emp.createdDate, emp.dueDate, emp.updatedDate, emp.completionDate, emp.userID
      ]);
  
      res.send('Updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating Task');
    }
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


//Get all catalog items
app.get('/get-catalog', (req, res) => {
    mysqlConnection.query('SELECT * FROM catalog', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//Delete an item from catalog
app.delete('/delete-catalog/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE catalogID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({ message: 'Deleted successfully.' });
        else
            console.log(err);
    })
});
