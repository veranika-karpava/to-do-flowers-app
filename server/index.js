const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const fs = require('fs'); //for working with file system
const PORT = process.env.PORT;


// connection with database
mongoose.connect('mongodb://localhost:27017/toDoDataBase')
    .then(() => {
        console.log("Mongo Connection open!");
    })
    .catch((err) => {
        console.log("Oh no Mongo Connection error");
        console.log(err)
    })

//middleware
//CORS
app.use(cors({
    origin: process.env.CLIENT_URL
}));

// for parsing data.json file
app.use(express.json());

// // get toDo name from data.json file
// app.get('/', async (_req, res) => {
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData)
// })

// // add new toDo to data.json file
// app.post('/', async (req, res) => {
//     const newToDo = new ToDo(req.body);
//     await newToDo.save();
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData);
// })

// // update status of task in dataBase
// app.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { completed } = req.body
//     const updatedToDo = await ToDo.findByIdAndUpdate(id, { completed: completed }, { new: true });
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData);
// })


// // delete one task
// app.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     const removedToDo = await ToDo.findByIdAndDelete(id);
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData);
// })

// // delete all completed task from data.json
// app.delete('/', async (req, res) => {
//     const { id } = req.params;
//     const completedDeleteToDo = await ToDo.deleteMany({ completed: true });
//     const toDoData = await ToDo.find();
//     res.status(200).json(toDoData);
// }
// )

// port 
app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`)
})