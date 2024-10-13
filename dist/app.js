"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const teacherRoute_1 = __importDefault(require("./routes/teacherRoute"));
const studentRoute_1 = __importDefault(require("./routes/studentRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Grading Management System',
            version: '1.0.0',
            description: 'API documentation for classroom grading management system',
        },
        servers: [
            {
                url: 'http://localhost:5000'
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const openapiSpecification = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecification));
(0, db_1.default)();
app.use('/api/teachers', teacherRoute_1.default);
app.use('/api/students', studentRoute_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
