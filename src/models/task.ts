import { model, Schema, Document, Types } from "mongoose";

export interface ITask {
  message: string;
  title: string;
  category: Types.ObjectId;
}



export interface ITaskDoc extends ITask, Document {}
const schemaFields: Record<keyof ITask, any> = {
  message:{type:String, required:true},
  title:{type:String, required:true},
  category:{type:Types.ObjectId, required:true, ref:"Category"},
};

const schema = new Schema(schemaFields, { timestamps: true });

export const Task = model<ITaskDoc>("Task", schema);
