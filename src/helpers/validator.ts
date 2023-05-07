import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";

export const todoSchema = {
  getTodos: {},
  addTodo: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date(),
    priority: Joi.string(),
    assignee: Joi.string(),
  }),
  updateTodo: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().optional(),
    assignee: Joi.string().optional(),
    completed: Joi.boolean().optional(),
  }),
  deleteTodo: Joi.object({
    id: Joi.string().required(),
  }),
  shareTodo: Joi.object({
    email: Joi.string().email().required(),
  }),
  getSharedToMe: {},
  commentTodo: Joi.object({
    comment: Joi.string().required(),
  }),
};

export const validate =
  (
    schema: ObjectSchema<any>,
    source: ValidationSource = anValidationSource.BODY
  ) =>
  (req: any, res: Response, next: NextFunction) => {
    const { error }: ValidationResult = schema.validate(req[source]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
