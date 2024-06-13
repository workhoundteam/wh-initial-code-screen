const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || '3000';

const items = [];

app.get('/items/:item', (req, res) => {
    const item = req.params.items;
    if (items.includes(item)) {
        res.status(200).json({item});
    } else {
        res.status(400).send('Bad Request');
    }
});

app.get('/items', (req, res) => {
    res.status(201).json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body.items;
    if (newItem !== undefined) {
        items.push(newItem);
        res.status(201).json({message: 'Item added'});
    } else {
        res.status(400).send('Bad Request');
    }
});

app.delete('/items', (req, res) => {
    const itemToDelete = req.body.items;
    if (itemToDelete !== undefined) {
        items = items.filter(item => item != itemToDelete);
        res.status(200).json({message: 'Item deleted'});
    } else {
        res.status(400).send('Bad Request');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
