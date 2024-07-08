

import { Router } from "express";
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from "../controllers/product";
import upload from "../middleware/multer";
const router: Router = Router()


//Product routes
router.route("/").get(getProducts).post(upload.single('img'), addProduct)
router.route("/:id").get(getProduct).patch(upload.single('img'), updateProduct,).delete(deleteProduct)

export default router
