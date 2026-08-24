import { TaskModel } from "../models/task.model.js";
import mongoose from "mongoose";
// -------------Add Task---------------

export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      const error = new Error("Please Enter Title of Task");
      error.statusCode = 400;
      throw error;
    }
    const user = req.user?._id;
    if (!user) {
      const error = new Error("User authentication required");
      error.statusCode = 401;
      throw error;
    }
    const task = await TaskModel.create({ title, description, user });
    res.status(201).json({
      success: true,
      message: "New task added Successfully",
      task,
    });
  } catch (error) {
    res.status(error?.statusCode || 500).json({
      message: error?.message || `Error While Adding New Task`,
    });
  }
};

//--------------Get All Tasks -------------

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user?._id;
    const tasks = await TaskModel.find({ user: userId });
    res.status(200).json({
      message: "Task retrived",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || ` Error While Get All tasks`,
    });
  }
};

// ----------Get Task By Id------------

export const getTask = async (req, res) => {
  try {
    const taskId = req.params?.id;
    console.log(req.params.id);
    if (!taskId) {
      const error = new Error(`Enter Task ID Title to get task`);
      error.statusCode = 401;
      throw error;
    }
    if (!mongoose.isValidObjectId(taskId)) {
      const error = new Error("Invalid Task ID");
      error.statusCode = 400;
      throw error;
    }
    const task = await TaskModel.findOne({
      $and: [{ _id: taskId }, { user: req.user._id }],
    });
    if (!task) {
      const error = new Error(`No such Task found`);
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: `Task found`,
      task,
    });
  } catch (error) {
    res.status(error?.statusCode || 500).json({
      success: false,
      message:
        `${error?.message} Error in getTask By id` ||
        `Error While retriveing Task`,
    });
  }
};
