import {  Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { apiError, apiValidation, apiOk } from "../service/apiHelper";
import { catchAsync } from "../service/apiHelper";
import { Category, ICategory } from "../models/category";
import { Task } from "../models/task";

export const postCategory =
 catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await check("name", "name is required").exists().notEmpty().run(req);
      apiValidation(req, res);
      const postData:ICategory = {
        name: req.body.name,
      };
      const categoryResponse = await Category.create(postData);
      apiOk(res, categoryResponse);
    } catch (err) {
      apiError(res, err);
    }
  })
export const putCategory =
 catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await check("name", "name is required").exists().notEmpty().run(req);
      apiValidation(req, res);
      const id = req.params.id
      const postData:ICategory = {
        name: req.body.name,
      };
      const categoryResponse = await Category.findByIdAndUpdate(id, postData, {new:true});

      apiOk(res, categoryResponse);
    } catch (err) {
      apiError(res, err);
    }
  })

export const getAllCategories =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryResponse = await Category.find({})
      apiOk(res, categoryResponse);
    } catch (err) {
      apiError(res, err);
    }
  })
export const getCategoryAndTaskCount =
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryResponse = await Task.aggregate([ 
         {
           $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
          { $unwind: "$category" },
          {
            $group:{
              _id:"$category.name",
              taskCount: { $count: { } }
            }
          }
  
      ]);
      apiOk(res, categoryResponse);
    } catch (err) {
      apiError(res, err);
    }
  })
