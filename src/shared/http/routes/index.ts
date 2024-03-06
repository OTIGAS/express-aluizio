import { Router } from "express";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/session.routes";
import productsRouter from "@modules/products/routes/products.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/products", productsRouter);

routes.get("/", (req, res) => {
  return res.json({ message: "Hello Dev!" });
});

export default routes;
