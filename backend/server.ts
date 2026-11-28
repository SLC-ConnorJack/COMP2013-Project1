//import express and cors
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import ClothesItem from "./models/clothesItem.js";

//create the app
const app = express();

const port = process.env.PORT ?? 3000;
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is missing");
  process.exit(1);
}

//add the JSON middleware
app.use(express.json());

//add the CORS middleware
app.use(cors());

app.get("/data", async (req, res) => {
  try {
    const products = await ClothesItem.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products" });
  }
});

app.patch("/data/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const updates = {
      ...req.body,
      id: id,
    };

    const updatedProduct = await ClothesItem.findOneAndUpdate(
      { id: id },
      updates,
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);

    if (
      err instanceof mongoose.Error.ValidationError ||
      err instanceof mongoose.Error.CastError
    ) {
      res.status(400).json({ message: "Invalid product data" });
    } else {
      res.status(500).json({ message: "Error updating product" });
    }
  }
});

app.post("/data", async (req, res) => {
  try {
    const highestProduct = await ClothesItem.findOne().sort({ id: -1 });

    const newId = (highestProduct?.id ?? -1) + 1;

    const newProduct = await ClothesItem.create({
      ...req.body,
      id: newId,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: "Invalid product data" });
    } else {
      res.status(500).json({ message: "Error creating product" });
    }
  }
});

app.delete("/data/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const deletedProduct = await ClothesItem.findOneAndDelete({ id: id });

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res
      .status(200)
      .json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product" });
  }
});

//start listening on the port and log a message
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
