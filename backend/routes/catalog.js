const express = require('express')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
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

// get specific catalog item
router.get('/get_item/:id', async (req, res) => {
    const emp = req.body
    const response = {}
    try {
        const item = await query('SELECT title, description, requiredPoints  FROM catalog WHERE catalogID =?',
            [req.params.id])
        if (item) {
            response.message = 'Item Fetched'
            response.data = item[0]
            res.status(200).send(response)
        } else {
            response.message = 'No Item available'
            res.status(200).send(response)
        }
    } catch (error) {
        response.message = error
        res.status(500).send(response)
    }
});

// get catalog items 
router.get('/get_catalog', async (req, res) => {
    const response = {}
    try {
        const catalog = await query('SELECT * FROM catalog', [])
        if (catalog) {
            response.message = 'Catalog Items Fetched'
            response.data = catalog
            res.status(200).send(response)
        } else {
            response.message = 'No Items available'
            res.status(200).send(response)
        }
    } catch (error) {
        response.message = error
        res.status(500).send(response)
    }
});

// add catalog item
router.post('/add_catalog_items', async (req, res) => {
    const emp = req.body;
    const response = {}

    try {
        await query(`INSERT INTO catalog(title, description, requiredPoints) VALUES (?, ?, ?)`
            , [emp.title, emp.description, emp.requiredPoints]);
        res.send('Item Added Successfully!');
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = error
        res.status(500).send(response);
    }
});

// update catalog item
router.put('/update_item/:id', async (req, res) => {
    const emp = req.body;
    const response = {}

    try {
        await query(`UPDATE catalog SET title =?, description = ?, requiredPoints = ? WHERE catalogID =?`
            , [emp.title, emp.description, emp.requiredPoints, emp.catalogID]);
        res.send('Item Update Successfully!');
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = error
        res.status(500).send(response);
    }
});

// delete catalog item 
router.delete('/delete_catalog_item/:id', async (req, res) => {
    const emp = req.body;

    try {
        await query('DELETE FROM catalog WHERE catalogID = ?', [req.params.id], (err, rows, fields) => {
            res.status(200).send(response);
            res.send('Item Deleted Successfully!');
        })
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

// get award redemption requests
router.get('/get_requests', async (req, res) => {
    const response = {}
    try {
        const requests = await query(`SELECT requestID, c.title, c.description, c.requiredPoints, u.emailAddress, redemed 
            FROM requests r
            INNER JOIN users u ON u.userID = r.userID
            INNER JOIN catalog c ON c.catalogID = r.catalogID`
            , [])
        if (requests) {
            response.message = 'Requests Fetched'
            response.data = requests
            res.status(200).send(response)
        } else {
            response.message = 'No Requests available'
            res.status(200).send(response)
        }
    } catch (error) {
        response.message = error
        res.status(500).send(response)

    }
})

// add a request
router.post('/add_request', verifyToken, async (req, res) => {
    const emp = req.body;
    const userID = req.userToken.queryResponse.userID;
    const userPoints = req.userToken.queryResponse.points;

    const response = {};

    try {
        const catalogResult = await query('SELECT requiredPoints FROM catalog WHERE catalogID = ?', [emp.catalogID]);

        if (catalogResult.length === 0) {
            response.message = 'Invalid catalog ID.';
            return res.status(400).send(response);
        }

        const requiredPoints = catalogResult[0].requiredPoints;

        if (userPoints < requiredPoints) {
            response.message = `Not enough points. You have ${userPoints}, but ${requiredPoints} points are required.`;
            return res.status(400).send(response);
        }

        await query('INSERT INTO requests(userID, catalogID) VALUES (?,?)', [userID, emp.catalogID]);

        response.message = 'Requested Award Redemption!';
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = 'An error occurred while processing the request.';
        res.status(500).send(response);
    }
});


// deduct points 
router.put('/approve_request', async (req, res) => {
    const emp = req.body;
    console.log(emp)
    const response = {}

    try {
        await query(`UPDATE users u
            JOIN requests r ON u.userID = r.userID
            JOIN catalog c ON r.catalogID = c.catalogID
            SET u.points = u.points - c.requiredPoints
            WHERE u.userID = r.userID`
            , [emp.requestID])

        await query(`UPDATE requests set redemed = 1 where requestID = ?`
            , [emp.requestID])

        response.message = 'Request Approved Successfully!'
        res.status(200).send(response);
    }
    catch (error) {
        console.error(error);
        response.message = error
        res.status(500).send(response);
    }
})

// send email with token for item
router.post('/send_approval_email', (req, res) => {
    const emp = req.body;
    console.log(emp)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'kadash3r@gmail.com',
            pass: 'rdqb knbu unta chsi'
        }
    });

    let mailOptions = {
        from: 'kadash3r@gmail.com',
        to: emp.userEmail,
        subject: 'Request Approved',
        text: `Your request with ID ${emp.requestID} has been approved.
        Proceed to HR's office and receive your award item.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error sending email' });
        }
        console.log('Email sent: ' + info.response);
        res.send({ message: 'Email sent successfully!' });
    });
});


module.exports = router;