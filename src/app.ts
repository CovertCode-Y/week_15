// src/ app.ts
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
console.log("Mongo URI: ", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


connectDB();

// // Routes


// // Error handling middleware
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


