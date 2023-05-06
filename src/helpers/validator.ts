import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { Types } from "mongoose";
export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}
export const validator =
  (schema: Joi.ObjectSchema, source = ValidationSource.BODY) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);
      if (!error) {
        return next();
      }
      const { details } = error;
      const message = details
        .map((i: any) => i.message.replace(/['"]+/g, ""))
        .join(",");
      next(new Error(message));
    } catch (error) {
      next(error);
    }
  };
exports.JoiObjectId = () =>
  Joi.string().custom((value: string, todoSchema: any) => {
    if (!Types.ObjectId.isValid(value)) return todoSchema.error("any.invalid");
    return value;
  }, "Object Id Validation");
