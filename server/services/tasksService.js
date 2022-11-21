

// get a list of todos specified user ID (uid)
const getListTasks = async (req, res, next) => {

};

// add new task to the list of todos
const addNewTask = async (req, res, next) => {

};

// update status of task specified task ID (tid)
const updateStatusTask = async (req, res, next) => {

};

// delete a task specified task ID (tid)
const deleteTask = async (req, res, next) => {

};

// delete a list of completed tasks
const deleteAllCompletedTasks = async (req, res, next) => {

};

exports.getListTasks = getListTasks;
exports.addNewTask = addNewTask;
exports.updateStatusTask = updateStatusTask;
exports.deleteTask = deleteTask;
exports.deleteAllCompletedTasks = deleteAllCompletedTasks;


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