import { Router, Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { apiError, apiValidation, apiOk, mongoID } from "../service/apiHelper";
import { catchAsync } from "../service/apiHelper";
import { ITask, Task } from "../models/task";
const router = Router();

export const postTask =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await check("title", "title is required").exists().notEmpty().run(req);
      await check("message", "message is required").exists().notEmpty().run(req);
      await check("categoryId", "categoryId is required").exists().customSanitizer(mongoID).run(req);
      apiValidation(req, res);
      const postData:ITask = {
        title: req.body.title,
        message: req.body.message,
        category: req.body.categoryId,
      };
      console.log(postData)
      const taskResponse = await Task.create(postData);
      apiOk(res, taskResponse);
    } catch (err) {
      apiError(res, err);
    }
  })

export const putTask =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await check("title", "title is required").exists().notEmpty().run(req);
      await check("message", "message is required").exists().notEmpty().run(req);
      await check("categoryId", "categoryId is required").exists().customSanitizer(mongoID).run(req);
      await check("id", "id is required").exists().customSanitizer(mongoID).run(req);
      apiValidation(req, res);
      const id = req.params.id
      const postData:ITask = {
        title: req.body.title,
        message: req.body.message,
        category: req.body.categoryId,
      };
      console.log(postData)
      const taskResponse = await Task.findByIdAndUpdate(id, postData, {new:true});
      apiOk(res, taskResponse);
    } catch (err) {
      apiError(res, err);
    }
  })

export const getTasks = 
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryResponse = await Task.find({});
      apiOk(res, categoryResponse);
    } catch (err) {
      apiError(res, err);
    }
  })
export const deleteTask = 
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const categoryResponse = await Task.findByIdAndDelete(id);
      apiOk(res, categoryResponse);
    } catch (err) {
      apiError(res, err);
    }
  })

