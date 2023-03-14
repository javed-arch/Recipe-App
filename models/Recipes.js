import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    ingredients: [
      {
        type: String,
        required: [true, "ingredients is required"],
      },
    ],
    instructions: {
      type: String,
      required: [true, "instructions is required"],
    },

    imageUrl: {
      type: String,
      required: [true, "imageUrl is required"],
    },
    cookingTime: {
      type: Number,
      required: [true, "cookingTime is required"],
    },
    userOwner: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "userOwner is required"],
    },
  },
  { timestamps: true }
);

export const RecipesModel = mongoose.model("Recipes", recipeSchema);
