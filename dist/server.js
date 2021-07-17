"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = __importDefault(require("./handlers/orders"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const app = express_1.default();
const port = "3000";
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Server is working ✅");
});
products_1.default(app);
users_1.default(app);
orders_1.default(app);
app.listen(port, function () {
    console.log(`Server is starting on: http://localhost:${port}`);
});
exports.default = app;
