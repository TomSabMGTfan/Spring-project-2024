import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import userModel from "../models/userModel.mjs";

const userController = {
  // POST: User registration
  createUser: async (req, res) => {
    try {
      // Checking for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password, email } = req.body;

      // Hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Creating new user object for user model
      const newUser = {
        username,
        password: hashedPassword,
        email,
        role: "user",
        registered_on: new Date(),
      };

      // Creating user
      const createUser = await userModel.createUser(newUser);

      // Deleting password field from user object
      delete createUser.password;

      res.status(201).json(createUser);
    } catch (err) {
      // Logging
      console.error(err);

      res
        .status(500)
        .json({ message: "An error occurred while creating the user." });
    }
  },

  // POST: User login
  login: async (req, res) => {
    try {
      // Checking for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { login, password } = req.body;

      // Getting user from given email or username
      const user = await userModel.login(login);
      if (!user) {
        return res
          .status(400)
          .json({
            errors: [
              { 
                path: "login",
                msg: "User with the given email/username does not exist" 
              },
            ],
          });
      }

      // Checking if passwords match
      const passwords_match = await bcrypt.compare(password, user.password);
      if (!passwords_match) {
        return res
          .status(400)
          .json({ errors: [
            { 
              path: "password",
              msg: "Incorrect password" 
            }
          ] });
      }

      // Deleting password field from user object
      delete user.password;

      // Generating token
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Logged in successfully", token });
    } catch (err) {
      // Logging
      console.log(err);

      res.status(500).json({ message: "An error occurred while logging in." });
    }
  },

  // GET: User
  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await userModel.getUserById(id);

      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      delete user.password;

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error has occurred while retrieving the user" });
    }
  },
};

export default userController;
