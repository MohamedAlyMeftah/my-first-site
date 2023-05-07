import { Document } from "mongoose";

export interface ITask extends Document {
  sharedWith: any;
  comments: any;
  name: string;
  description: string;
  status: boolean;
  creator: string;
  title: string;
}

export interface UpdateTask {
  name?: string;
  description?: string;
  status?: boolean;
}

export interface SharedTask {
  taskId: string;
  shareWith: string;
}

export interface Comment {
  taskId: string;
  commenter: string;
  comment: string;
}

export interface SharedTaskResponse {
  taskId: string;
  sharedWith: string;
  sharedBy: string;
  createdAt: Date;
}

export interface CommentResponse {
  taskId: string;
  commenter: string;
  comment: string;
  createdAt: Date;
}
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    _id: any;
    id: string;
    email: string;
  };
}
