const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
var connection = require("../services/db");
var jwt = require("jsonwebtoken");


const query = (q, data) => {
    return new Promise((resolve, reject) => {
        connection.query(q, data, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
};

router.post("/login", async (request, response) => {
    const responseData = {};
    let code;
    try {
        const email = request.body.email;
        const password = request.body.password;
        if (email && password) {

            const rows = await query(
                `
                SELECT *
                FROM users
                where emailAddress = ?
                `,
                email
            );

            const queryResponse = rows[0]
            if (queryResponse) {
                const result = await bcrypt.hash(password, queryResponse.salt);
                if (queryResponse.password === result) {
                    const token = jwt.sign(
                        {
                            ID: queryResponse.ID,
                            userID: queryResponse.userID,
                            email: queryResponse.email,
                            // rank: queryResponse.rank
                        },
                        process.env.APP_SECRET,
                        { expiresIn: 2592000, }
                    ); // expires in 30 days
                    delete queryResponse.password
                    delete queryResponse.salt

                    responseData.user = queryResponse;
                    responseData.token = token;
                    code = 200;
                    // console.log(res)
                } else {
                    code = 401;
                    responseData.error = "Invalid email or password.";
                }
            } else {
                code = 401;
                responseData.error = "Invalid email or password. Please make sure you have an account";
            }
        } else {
            code = 401;
            responseData.error = "Invalid email or password. Please make sure you have an account";
        }
    } catch (error) {
        code = 500;
        responseData.error = "Server error: " + error.message;
    }
    response.status(code).send(responseData);
});


router.put('/reset_password', async (req, res) => {
    const emp = req.body;

    try {
        if(emp.password, emp.userID){

            const salt = await bcrypt.genSalt(10);
            const password =  await bcrypt.hash(emp.password, salt);
            await query(`UPDATE users SET password = ?, salt = ? WHERE userID =?`
            , [password, salt, emp.userID]);

            response.message = 'User password updated successfully!'
            res.status(200).send(response);
        }else{
            response.message = 'Please make sure the password and user is entered'
            res.status(400).send(response);
        }
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

module.exports = router;