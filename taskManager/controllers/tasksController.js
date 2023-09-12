const Task = require("../model/Task");

const asyncWrapper = require("./middleware/asyncWrapper");

const errorHandler = require("./middleware/errorHandler");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  if (!tasks) return res.status(401).json({ message: "No tasks available" });
  return res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res
      .status(404)
      .json({ message: `No task available for the id:${taskID}` });
  }
  return res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(401).json({
      message: "name is required",
    });
  }
  const newTask = new Task({ name });
  await newTask.save();
  return res.status(201).json({
    message: `new task with name ${name} created`,
  });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res
      .status(404)
      .json({ message: `No task available for the id:${taskID}` });
  }
  return res.sendStatus(204);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  let { name, completed } = req.body;
  if (!taskID) {
    return res.status(401).json({ message: "id required to update the task" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskID }, //id of the task
    { name, completed: completed || false }, //values we want to update

    {
      new: true,
      runValidators: true,
    } //options for the update method
  );
  if (!task) {
    return res
      .status(404)
      .json({ message: `No task found for this id: ${taskID}` });
  }
  return res.status(202).json({ task });
});

app.use(errorHandler);

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
