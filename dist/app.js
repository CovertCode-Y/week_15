"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const teacharRoute_1 = __importDefault(require("./routes/teacharRoute"));
// import studentRoutes from './routes/studentRoutes';
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// חיבור למסד הנתונים
(0, db_1.default)();
// Middleware
app.use(express_1.default.json());
// // נתיבים
app.use('/api/teachers', teacharRoute_1.default);
// הגדרת Swagger
(0, swagger_1.setSwagger)(app);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
