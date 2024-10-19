import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products";

const port = 3000;

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
