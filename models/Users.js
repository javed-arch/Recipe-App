import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    savedRecipes: [{ type: mongoose.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", UserSchema);
