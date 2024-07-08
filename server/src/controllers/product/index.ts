import { Request, Response } from "express";
import { IProduct } from "../../types/product";
import Product from "../../models/product";
import cloudinary from "../../utils/cloudinary";


const getProducts = async (req: Request, res: Response) => {
  try {
    const { page, limit, title } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10; // Adjust default limit to a more practical value

    const startIndex = (pageNumber - 1) * limitNumber;
    // Build the query object
    let queryObject = {};
    if (title) {
      queryObject = {
        title: { $regex: title, $options: "i" } // This will search for titles containing the search string, case-insensitive
      };
    }

    const products = await Product.find(queryObject).skip(startIndex).limit(limitNumber);
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / limitNumber);

    return res.status(200).json({
      products,
      currentPage: pageNumber,
      totalPages,
      totalCount,
      pageSize: products.length,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};


const getProduct = async (req: Request, res: Response) => {
  try {
    const { params: { id } } = req
    const product: IProduct | null = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" })

    }
    return res.status(200).json({ product })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}



const addProduct = async (req: Request, res: Response) => {
  try {
    let imageUrl = `https://via.placeholder.com/500x500.png?text=Product+Image`
    console.log("response.body", req.body)
    if (req.file) {
      console.log("The request contains file,path", req.file.path)
      await cloudinary.uploader.upload(
        req.file.path,
        (error, result) => {
          if (error) {
            console.log("Error while uploading the file,error: ", error)
            return res.status(500).json({ message: "Failed to upload image", error: error.message });
          } else {
            if (result) {
              console.log("Image uploading success uri: ", result)
              imageUrl = result.url;

            }
          }
        })
    }


    const body = req.body as Pick<IProduct, 'title' | 'prevPrice' | 'description' | 'category' | 'img' | 'reviews'|'company'|'color'|'newPrice'|'star'>;
    console.log("image url is ", imageUrl)
    const product: IProduct = new Product({
      title: body.title,
      prevPrice: body.prevPrice,
      description: body.description,
      category: body.category,
      img: imageUrl,
      reviews: body.reviews,
      company:body.company,
      color:body.color,
      newPrice:body.newPrice,
      star:body.star,


      
    });
    const newProduct: IProduct = await product.save();
    return res.status(201).json({ message: "Product added", product: newProduct });
  } catch (error) {
    console.log("Error in catch", error)
    const mongoError = error as { code?: number, message: string };
    if (mongoError.code === 11000) {
      return res.status(400).json({ message: "Product title already exists. Please use a different title." });
    } else {
      return res.status(500).send(error);
    }
  }
};


const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const productTodUpdate = await Product.findById(id);
    if (!productTodUpdate) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (req.file && productTodUpdate.img) {
      const imagePublicId = productTodUpdate.img?.split('/').pop()?.split('.')[0] ?? '';

      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId);
      }
      await cloudinary.uploader.upload(
        req.file.path,
        (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Failed to upload image", error: error.message });
          } else {
            if (result)
              body.img = result.url;
          }
        })
      }



    const updateProduct: IProduct | null = await Product.findByIdAndUpdate(id, body, { new: true });
    return res.status(200).json({
      message: "Product updated",
      product: updateProduct,
    });
  } catch (error) {
    const mongoError = error as { code?: number, message: string };
    if (mongoError.code === 11000) {
      res.status(400).json({ message: "Product title already exists. Please use a different title." });
    } else {
      res.status(500).send(error);
    }
  }
};


const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { params: { id } } = req;
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).send(error);
  }
};


export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }