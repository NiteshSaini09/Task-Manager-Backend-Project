import { TaskModel } from "../models/task.model.js";
import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";
// -------------Add Task---------------

export const addTask = async (req, res,next) => {
  try {
    const { title, description,status,priority,dueDate } = req.body;
    const taskData={
      user:req.user?._id,
      title:title
    }
     if (description !== undefined) taskData.description = description;
     if (status !== undefined) taskData.status = status;
     if (priority !== undefined) taskData.priority = priority;
     if (dueDate !== undefined) taskData.dueDate = dueDate;
    
    const task = await TaskModel.create(taskData);
    res.status(201).json({
      success: true,
      message: "New task added Successfully",
      task,
    });
  } catch (error) {
   next(error)
  }
};

//--------------Get All Tasks -------------

export const getAllTasks = async (req, res,next) => {
  try {
    const userId = req.user?._id;

    const { status, priority, search,sortBy,order} = req.query;
    const skip = (page - 1) * limit;

    // Base query: only logged-in user's tasks
    const query = {
      user: userId,
    };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Search title OR description
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    const sortOrder = order === 'asc'?1:-1;
    const sort={
      [sortBy]:sortOrder
    }
    const tasks = await TaskModel.find(query).sort(sort).skip(skip).limit(limit);
    const totalTasks = await TaskModel.countDocuments(query);
    const totalPages = Math.ceil(totalTasks / limit);

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved",
      count: tasks.length,
      totalPages,
      currentPage: page,
      totalTasks,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// ----------Get Task By Id------------

export const getTask = async (req, res,next) => {
  try {
    const taskId = req.params?.id;
    console.log(req.params.id);
    if (!taskId) {
      throw new ApiError("Task ID is required", 400);
    }
    if (!mongoose.isValidObjectId(taskId)) {
      throw new ApiError("Invalid Task ID", 400);
    }
    const task = await TaskModel.findOne({
      $and: [{ _id: taskId }, { user: req.user._id }],
    });
    if (!task) {
      throw new ApiError(`No such Task found`, 404);
    }
    res.status(200).json({
      message: `Task found`,
      task,
    });
  } catch (error) {
    next(error);
  }
};
// -------------Update Task By Id-------------

export const updateTask = async (req, res,next) => {
  try {
    const taskId = req.params?.id;
    if (!taskId) {
      throw new ApiError("Task ID is required", 400);
    }
    const { title, description, status, priority, dueDate } = req.body;
    if (!mongoose.isValidObjectId(taskId)) {
      throw new ApiError("Invalid Task ID", 400);
    }
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    const updatedTask = await TaskModel.findOneAndUpdate(
      {
        _id: taskId,
        user: req.user._id,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedTask) {
     throw new ApiError(`Can't Find Task to update`, 404)
    }
    res.status(200).json({
      message: `Task updated successfully`,
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// ------------Delate Task By Id-------------

export const deleteTask = async (req, res,next) => {
  try {
    const taskId = req.params?.id;
    if (!mongoose.isValidObjectId(taskId)) {
      throw new ApiError("Task ID is Not Valid", 400);
    }
    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      user: req.user._id,
    });
    if (!deletedTask) {
      throw new ApiError(`Can't Find Task to delete`, 404);
    }
    res.status(200).json({
      message: `Task Deleted Successfully`,
      deletedTask,
    });
  } catch (error) {
    next(error);
  }
};

// -----------Search and Filter--------------
