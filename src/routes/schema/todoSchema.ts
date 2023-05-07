import { body, param } from "express-validator";

export const todoSchema = {
  getTodos: [],
  addTodo: [
    body("title").notEmpty(),
    body("description").optional(),
    body("completed").optional().isBoolean(),
  ],
  updateTodo: [
    param("id").notEmpty(),
    body("title").notEmpty(),
    body("description").optional(),
    body("completed").optional().isBoolean(),
  ],
  deleteTodo: [param("id").notEmpty()],
  shareTodo: [param("id").notEmpty(), body("sharedWith").isArray().notEmpty()],
  getSharedToMe: [],
  commentTodo: [param("id").notEmpty(), body("comment").notEmpty()],
};

export default todoSchema;
