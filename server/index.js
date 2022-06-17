const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs'); //for working with file system
const PORT = 8080 || 5050;

//middleware
//CORS
app.use(cors({
    origin: "http://localhost:3000"
}));

// for parsing data.json file
app.use(express.json());

// function for reading data in data.json
const readFile = () => {
    const toDoData = fs.readFileSync('./data/data.json');
    return JSON.parse(toDoData);
}

// function for writing data in data.json
const writeFile = (toDoData) => {
    fs.writeFileSync('./data/data.json', JSON.stringify(toDoData, null, 2));
}

// get toDo name from data.json file
app.get('/', (_req, res) => {
    let toDoData = readFile();
    toDoData = toDoData.map(task => {
        return {
            id: task.id,
            name: task.name,
            completed: task.completed
        }
    })
    res.status(200).send(toDoData)
})

// add new toDo to data.json file
app.post('/', (req, res) => {
    let toDoData = readFile();
    const { id, name, completed } = req.body;
    // new task 
    const newToDo = {
        id: id,
        name: name,
        completed: completed
    }
    // add to data new task
    toDoData.push(newToDo)
    writeFile(toDoData)
    res.status(200).send(toDoData)
})

// update status of task in json file
app.put('/', (req, res) => {
    let toDoData = readFile();
    const { id, name, completed } = req.body;
    const selectedToDo = toDoData.find((task) => task.id === id)
    // check matches request id with id from data.json
    if (!selectedToDo) {
        return res.status(404).send("Task not found");
    }
    // which information will be udpated
    const updatedToDo = {
        id: selectedToDo.id,
        name: name,
        completed: completed
    }

    // update information in data.json
    toDoData = toDoData.map((task) => {
        if (task.id === selectedToDo.id) {
            return updatedToDo
        } else {
            return task;
        }
    });

    writeFile(toDoData);
    return res.status(200).send(toDoData);
})


// delete one task
app.delete('/', (req, res) => {
    let toDoData = readFile();
    const { id } = req.body;
    const selectedToDo = toDoData.find((task) => task.id === id);
    const selectedToDoIndex = toDoData.indexOf(selectedToDo)

    // delete todo with id
    if (selectedToDoIndex < 0) {
        return res.status(404).send("Task not found");
    } else {
        toDoData.splice(selectedToDoIndex, 1)
        writeFile(toDoData);
        return res.status(200).send(toDoData)
    }
})

// delete all completed task from data.json
app.delete('/', (req, res) => {
    let toDoData = readFile();
    const { id } = req.body;
    const selectedToDo = toDoData.find((task) => task.id === id);
    const selectedToDoIndex = toDoData.indexOf(selectedToDo)

    // delete todo with id
    if (selectedToDoIndex < 0) {
        return res.status(404).send("Task not found");
    } else {
        toDoData.splice(selectedToDoIndex, 1)
        writeFile(toDoData);
        return res.status(200).send(toDoData)
    }
})




// port 
app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`)
})