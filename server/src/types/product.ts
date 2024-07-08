import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
   title: string;
   star:string;
   prevPrice: number;
   description: string;
   category: string;
   img?: string;
   company:string;
   color:string;
   newPrice:string;
   reviews:string;
   
  
}