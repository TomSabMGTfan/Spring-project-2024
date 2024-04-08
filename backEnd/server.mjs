import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./connectionToDataBase/postgresConnection.mjs";

// import passport from './strategies/auth.mjs' -- For future

// import usersRouter from ...

const app = express();

const startServer = async () => {
  // async is used because we dont want the script to run first, we need to await for connection with database
  try {
    const message = await connectDB();
    console.log(message);

    app.use(express.json());

    app.use(passport.initialize());

    app.use("/api/v1/library", usersRouter);

    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Server is running and listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database", error);

    process.exit(1);
  }
};


startServer();