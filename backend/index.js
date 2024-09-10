// const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // leave this here to avoid race condition

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyparser.json());


const tasks = require("./routes/tasks");
const users = require("./routes/users");
const catalog = require("./routes/catalog");
const auth = require("./routes/Auth");

app.use('/dekha/api/tasks', tasks);
app.use('/dekha/api/users', users);
app.use('/dekha/api/catalog', catalog);
app.use('/dekha/api/auth', auth);

// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'dekha',
//     multipleStatements: true
// });

// mysqlConnection.connect((err) => {
//     if (!err) //checking for errors
//         console.log('DB connection succeded.');
//     else //show error message if there is one
//         console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
// });


app.listen(8080, () => console.log('Server Running at Port #8080'));