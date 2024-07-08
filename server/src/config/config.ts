import "dotenv/config"

const configs = {

   cloudinary_info: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY
   },
   mongoLocal: {
      mongo_user: process.env.MONGO_USER_LOCAL,
      mongo_db_atlas_password: process.env.MONGO_PASSWORD_LOCAL,
      mongo_db_bd_name: process.env.MONGO_DB_LOCAL,
   },
   mongoDbAtlas: {
      mongo_user: process.env.MONGO_USER_ATLAS,
      mongo_db_atlas_password: process.env.MONGO_PASSWORD_ATLAS,
      mongo_atlas_db_name: process.env.MONGO_DB_ATLAS,
   },
   portInfo: {
      portNumber: process.env.PORT
   },

}

export default configs;