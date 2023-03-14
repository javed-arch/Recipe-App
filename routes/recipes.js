import express from "express";
import {
  getRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  getRecipeId,
  getSavedRecipe,
} from "../controllers/recipes.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecipes);

// Create a new recipe
router.post("/", verifyToken, createRecipe);

// Get a recipe by ID
router.get("/:recipeId", getRecipeById);

// Save a Recipe
router.put("/", verifyToken, updateRecipe);

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", getRecipeId);

// Get saved recipes
router.get("/savedRecipes/:userId", getSavedRecipe);

export { router as recipesRouter };
