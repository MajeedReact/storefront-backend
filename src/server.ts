import express, { Request, Response } from "express";
import orders_route from "./handlers/orders";
import products_route from "./handlers/products";
import users_route from "./handlers/users";

const app: express.Application = express();
const port: string = "3000";

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is working ✅");
});

products_route(app);
users_route(app);
orders_route(app);

app.listen(port, function () {
  console.log(`Server is starting on: http://localhost:${port}`);
});

export default app;
