import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
import { ValidationSource, validator } from "../helpers/validator";
import { todoSchema } from "./schema/todoSchema";
const router: Router = Router();

router.get("/todos", getTodos);

router.post(
  "/add-todo",
  validator(todoSchema.checkBody, ValidationSource.BODY),
  addTodo
);

router.put(
  "/edit-todo/:id",
  validator(schema, ValidationSource.PARAM),
  updateTodo
);

router.delete("/delete-todo/:id", deleteTodo);

export default router;

// export default router;
// import { Router } from "express";
// import {
//   getTodos,
//   addTodo,
//   updateTodo,
//   deleteTodo,
// } from "../controllers/todos";
// import { ValidationSource, validator } from "../helpers/validator";
// import { createTodoItem, deleteTodoItem, updateTodoItem } from "./schema/todoSchema";

// const router: Router = Router();

// router.get("/todos", getTodos);

// router.post("/add-todo",validator(createTodoItem,ValidationSource.BODY), addTodo);

// router.put("/edit-todo/:id",validator(updateTodoItem,ValidationSource.BODY),validator(schema,ValidationSource), updateTodo);

// router.delete("/delete-todo/:id", deleteTodoItem,deleteTodo);

// export default router;
