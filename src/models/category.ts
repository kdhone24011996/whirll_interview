import { model, Schema, Document, Types } from "mongoose";

export interface ICategory {
  name: string;
}


export interface ICategoryDoc extends ICategory, Document {}
const schemaFields: Record<keyof ICategory, any> = {
  name:{type:String, required:true},
};

const schema = new Schema(schemaFields, { timestamps: true });

export const Category = model<ICategoryDoc>("Category", schema);