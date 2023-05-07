import { Response, Request } from "express";
import { AuthenticatedRequest, ITask } from "../../types/todo";
import Todo from "../../models/todo";
import { Types } from "mongoose";

// Get all todos
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITask[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

// Add a new todo
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body as ITask;

    // Make sure title and description are present
    if (!title || !description) {
      res.status(400).json({ message: "Title and description are required" });
      return;
    }

    const todo: ITask = await Todo.create(req.body as ITask);
    res.status(201).json({ message: "Todo added", todo });
  } catch (error) {
    throw error;
  }
};

// Update an existing todo
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    // Only allow updates to title, description, and status
    const allowedUpdates = ["title", "description", "status"];
    const isValidUpdate = Object.keys(body).every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      res.status(400).json({
        message:
          "Invalid update. Only title, description, and status are allowed",
      });
      return;
    }

    const updateTodo: ITask | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );

    // If the todo doesn't exist, return a 404 error
    if (!updateTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    const allTodos: ITask[] = await Todo.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

// Delete an existing todo
const deleteTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const deletedTodo: ITask | null = await Todo.findByIdAndRemove(
      new Types.ObjectId(req.params.id)
    );

    // If the todo doesn't exist, return a 404 error
    if (!deletedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    const allTodos: ITask[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};
const shareTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { taskId, userId }: { taskId: string; userId: string } = req.body;
    if (!taskId || !userId) {
      res
        .status(400)
        .json({ message: "Task ID and user ID are required to share" });
      return;
    }
    const todo: ITask | null = await Todo.findOne({
      _id: taskId,
      creator: req.user._id,
    });
    if (!todo) {
      res
        .status(404)
        .json({ message: "Todo not found or unauthorized to share" });
      return;
    }
    const sharedUser = await User.findOne({ _id: userId });
    if (!sharedUser) {
      res.status(404).json({ message: "Usernot found" });
      return;
    }
    todo.sharedWith.push(sharedUser._id);
    await todo.save();
    res.status(200).json({ message: "Task shared successfully", todo });
  } catch (error) {
    throw error;
  }
};

const getSharedToMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const sharedTodos: ITask[] = await Todo.find({ sharedWith: req.user._id });
    res.status(200).json({ sharedTodos });
  } catch (error) {
    throw error;
  }
};

const commentTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    if (!comment) {
      res.status(400).json({ message: "Comment is required" });
      return;
    }
    const todo: ITask | null = await Todo.findOne({
      _id: id,
      creator: req.user._id,
    });
    if (!todo) {
      res
        .status(404)
        .json({ message: "Todo not found or unauthorized to comment" });
      return;
    }
    todo.comments.push({
      author: req.user._id,
      content: comment,
    });
    await todo.save();
    res.status(200).json({ message: "Comment added successfully", todo });
  } catch (error) {
    throw error;
  }
};

export {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  shareTodo,
  getSharedToMe,
  commentTodo,
};
