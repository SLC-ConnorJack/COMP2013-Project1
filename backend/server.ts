//import express and cors
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
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
    }
    catch (err) {
        res.status(500).json({ message: "Error retrieving products" });
    }
});

//start listening on the port and log a message
mongoose.connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });