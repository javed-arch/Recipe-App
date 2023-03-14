import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";


export const getRecipes = async (req, res, next) => {
    try {
        const result = await RecipesModel.find({});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json(err);
      }
}

export const createRecipe = async (req, res, next) => {
    const recipe = new RecipesModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner,
      });
      console.log(recipe);
    
      try {
        const result = await recipe.save();
        res.status(201).json({
          createdRecipe: {
            name: result.name,
            image: result.image,
            ingredients: result.ingredients,
            instructions: result.instructions,
            _id: result._id,
          },
        });
      } catch (err) {
        // console.log(err);
        res.status(500).json(err);
      }
}

export const getRecipeById = async (req, res, next) => {
    try {
        const result = await RecipesModel.findById(req.params.recipeId);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json(err);
      }
}

export const updateRecipe = async (req, res, next) => {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    try {
      user.savedRecipes.push(recipe);
      await user.save();
      res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
      res.status(500).json(err);
    }
}

export const getRecipeId = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({ savedRecipes: user?.savedRecipes });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}

export const getSavedRecipe = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedRecipes = await RecipesModel.find({
          _id: { $in: user.savedRecipes },
        });
    
        console.log(savedRecipes);
        res.status(201).json({ savedRecipes });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}