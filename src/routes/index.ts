import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  shareTodo,
  getSharedToMe,
  commentTodo,
} from "../controllers/todos";
import { ValidationSource, validate } from "../helpers/validator";
import { todoSchema } from "./schema/todoSchema";

const router: Router = Router();

router.get("/todos", getTodos);

router.post(
  "/add-todo",
  validate(todoSchema.addTodo, ValidationSource.BODY),
  addTodo
);

router.put(
  "/edit-todo/:id",
  validate(todoSchema.updateTodo, ValidationSource.PARAM),
  updateTodo
);

router.delete(
  "/delete-todo/:id",
  validate(todoSchema.deleteTodo, ValidationSource.PARAM),
  deleteTodo
);

router.post(
  "/share-todo/:id",
  validate(todoSchema.shareTodo, ValidationSource.PARAM),
  shareTodo
);

router.get(
  "/shared-to-me",
  validate(todoSchema.getSharedToMe, ValidationSource.PARAM),
  getSharedToMe
);

router.post(
  "/comment-todo/:id",
  validate(todoSchema.commentTodo, ValidationSource.PARAM),
  commentTodo
);

export default router;
