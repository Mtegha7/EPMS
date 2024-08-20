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
      mysqlConnection.query(`INSERT INTO users(firstName, lastName, dateOfBirth, gender, emailAddress, phoneNumber, dateOfHire, department, jobTitle, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        , [emp.firstName, emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role]);
      res.send('User Added Successfully!'); 
    } catch (err) {
      console.error(err); 
      res.status(500).send('Error adding user'); 
    }
  });

//update a user
app.put('/update-users', async (req, res) => {
    const emp = req.body;
  
    try {
      mysqlConnection.query(`UPDATE users SET firstName = ?, lastName = ?, dateOfBirth = ?, gender = ?, emailAddress = ?, phoneNumber = ?, dateOfHire = ?, department = ?, jobTitle = ?, role = ? WHERE userID =?`
        , [emp.firstName, emp.lastName, emp.dateOfBirth, emp.gender, emp.emailAddress, emp.phoneNumber, emp.dateOfHire, emp.department, emp.jobTitle, emp.role, emp.userID]);
      res.send('User has been updated!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating user');
    }
  });

  
  //Get all tasks
app.get('/get-tasks', (req, res) => {
    mysqlConnection.query('SELECT * FROM tasks', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

  // Create a task
  app.post('/add-tasks', async (req, res) => {
    const emp = req.body;
    
    try {
      mysqlConnection.query(`INSERT INTO tasks(title, description, dueDate, userID) VALUES (?, ?, ?, ?)`
        , [emp.title, emp.description, emp.dueDate, emp.userID,]);
      res.send('Task Added Successfully!'); 
    } catch (err) {
      console.error(err); 
      res.status(500).send('Error adding Task'); 
    }
  });
  
  // Update a task
app.put('/update-tasks', async (req, res) => {
  const emp = req.body;
  
  try {
    mysqlConnection.query(`UPDATE tasks SET title = ?, description = ?, dueDate = ?, userID =? WHERE taskID = ?`
      , [ emp.title,emp.description, emp.dueDate, emp.userID,emp.taskID]);
    
    res.send('Updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating Task');
  }
});

// Delete a task
app.delete('/delete-tasks/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM tasks WHERE taskID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send({ message: 'Deleted successfully.' });
        else
            console.log(err);
    })
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

//add item to catalog
app.post('/add-catalog-item', async (req, res) => {
    const emp = req.body;
    
    try {
      mysqlConnection.query(`INSERT INTO catalog(title, description, requiredPoints) VALUES (?, ?, ?)`
        , [emp.title, emp.description, emp.requiredPoints]);
      res.send('Item Added Successfully!'); 
    } catch (err) {
      console.error(err); 
      res.status(500).send('Error adding Item'); 
    }
  });

//update item in catalog
app.post('/update-catalog-item', async (req, res) => {
    const emp = req.body;
    
    try {
      mysqlConnection.query(`UPDATE catalog SET title =?, description = ?, requiredPoints = ? WHERE catalogID =?`
        , [emp.title, emp.description, emp.requiredPoints, emp.catalogID]);
      res.send('Item Update Successfully!'); 
    } catch (err) {
      console.error(err); 
      res.status(500).send('Error Updating Item'); 
    }
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
      
      

app.listen(8080, () => console.log('Server Running at Port #8080'));