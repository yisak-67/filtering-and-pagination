import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import path from 'path'
import config from '../config/config';
dotenv.config({
   path: path.join(__dirname, "../../.env"),
});
const cloudinaryConfig = config.cloudinary_info

cloudinary.config({
   cloud_name: cloudinaryConfig.cloud_name,
   api_key: cloudinaryConfig.api_key,
   api_secret: cloudinaryConfig.api_secret
})
export default cloudinary