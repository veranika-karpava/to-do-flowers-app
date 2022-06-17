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


// port 
app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`)
})