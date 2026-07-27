import type { Request, Response } from "express";
import { categoryService } from "./category.service.js";


const createCategory = async (
  req: Request,
  res: Response
) => {

  const category = await categoryService.createCategory(
    req.body
  );


  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });

};


const getCategories = async (
    req: Request,
    res: Response
  ) => {
  
    const categories = await categoryService.getCategories();
  
    return res.status(200).json({
      success: true,
      data: categories,
    });
  
  };

  const getCategoryById = async (
    req: Request,
    res: Response
  ) => {
  
    const category = await categoryService.getCategoryById(
      typeof req.params.id === "string" ? req.params.id : ""
    );
  
  
    return res.status(200).json({
      success: true,
      data: category,
    });
  
  };


  const updateCategory = async (
    req: Request,
    res: Response
  ) => {
  
    const category = await categoryService.updateCategory(
      typeof req.params.id === "string" ? req.params.id : "",
      req.body.name
    );
  
  
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  };


  const deleteCategory = async (
    req: Request,
    res: Response
  ) => {
  
    const category = await categoryService.deleteCategory(
      typeof req.params.id === "string" ? req.params.id : ""
    );
  
  
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category,
    });
  };

export const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};