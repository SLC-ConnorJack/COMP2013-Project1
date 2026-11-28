import "dotenv/config";
import mongoose from "mongoose";
import ClothesItem from "./models/clothesItem.js";
import { products } from "../frontend/src/data/data.js";

async function seed() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("MONGO_URI is missing");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        await ClothesItem.deleteMany({});
        await ClothesItem.insertMany(products);
        console.log(`Added ${products.length} products`);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        await mongoose.disconnect();
    }
}

seed();