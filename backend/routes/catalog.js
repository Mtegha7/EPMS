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

router.get('/get-catalog', async (req, res) => {
    const response = {}
    try {
        const catalog = await query('SELECT * FROM catalog', [])
        if (tasks) {
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

router.post('/add-catalog-items', async (req, res) => {
    const response = {}
    const emp = req.body;

    try {
        await query(`INSERT INTO catalog(title, description, requiredPoints) VALUES (?, ?, ?)`
            , [emp.title, emp.description, emp.requiredPoints]);
        res.send('Item Added Successfully!');
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.put('/update-catalog-items', async (req, res) => {
    const emp = req.body;

    try {
        await query(`UPDATE catalog SET title =?, description = ?, requiredPoints = ? WHERE catalogID =?`
            , [emp.title, emp.description, emp.requiredPoints, emp.catalogID]);
        res.send('Item Update Successfully!');
        res.status(200).send(response);
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

router.delete('/delete-catalog-items/:id', async (req, res) => {
    const emp = req.body;

    try {
        await query('DELETE FROM tasks WHERE taskID = ?', [req.params.id], (err, rows, fields) => {
            res.status(200).send(response);
            res.send('Item Deleted Successfully!');
        })
    } catch (error) {
        console.error(error);
        response.message = err
        res.status(500).send(response);
    }
});

module.exports = router;