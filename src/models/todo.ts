import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "complete" | "incomplete";
  creator: mongoose.Types.ObjectId;
  sharedWith: mongoose.Types.ObjectId[];
  comments: {
    author: mongoose.Types.ObjectId;
    content: string;
  }[];
}

const TodoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["complete", "incomplete"],
    default: "incomplete",
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sharedWith: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model<ITask>("Todo", TodoSchema);
