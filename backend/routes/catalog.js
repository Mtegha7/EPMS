const express = require('express')
const router = express.Router()
var connection = require("../services/db");

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
        const requests = await query(`SELECT c.title, c.description, c.requiredPoints, u.emailAddress 
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
router.post('/add_request', async (req, res) => {
    const emp = req.body;
    const response = {}

    try {
        await query('INSERT INTO requests(userID, catalogID) VALUES (?,?)',
            [emp.userID, emp.catalogID]);
        response.message = 'Requested Award Redemption!'
        res.status(200).send(response);
    }
    catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
})


module.exports = router;