import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import teacherRoutes from "./routes/teacherRoute";
import studentRoutes from "./routes/studentRoute";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Grading Management System",
      version: "1.0.0",
      description: "API documentation for classroom grading management system",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

connectDB();

app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
