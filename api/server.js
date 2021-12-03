const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

app.get('/todos', async(req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        placa: req.body.placa
    })
    todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id', async(req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({ result });
});

app.get('/todo/complete/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

app.put('/todo/update/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.text = req.body.text;
    todo.save();
    res.json(todo);
});

app.listen(port, () => console.log("Server listening to", port));