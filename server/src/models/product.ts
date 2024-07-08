

import { model, Schema } from 'mongoose'
import { IProduct } from '../types/product'
const ProductSchema: Schema = new Schema({
   title: {
      type: String,
      required: true,
      unique: true,
   },
   star: {
      type: String,
      required: true,
   },
   prevPrice: {
      type: Number,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   img: {
      type: String,
      default: "https://via.placeholder.com/500x500.png?text=Product+Image",
   },
   company: {
      type: String,
      required: true,
   },
   color: {
      type: String,
      required: true,
   },
   newPrice: {
      type: Number,
      required: true,
   },
   reviews: {
      type: String,
      required: true,
   }
}, {
   timestamps: true,
});
ProductSchema.index({ title: 1 }, { unique: true });


export default model<IProduct>('Product', ProductSchema,);