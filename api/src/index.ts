import express, { json, urlencoded } from "express";
import serverless from "serverless-http";

import productsRouter from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";

const port = 3000;

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRouter);
app.use("/auth", authRoutes);

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export const handler = serverless(app);
