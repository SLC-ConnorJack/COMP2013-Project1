import mongoose from "mongoose";

const clothesItemSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  fit: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  itemQuantity: { type: Number, default: 0 },
});

const ClothesItem = mongoose.model("ClothesItem", clothesItemSchema);
export default ClothesItem;