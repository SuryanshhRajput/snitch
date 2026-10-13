import mongoose from "mongoose";
import { uploadFile } from "../services/storage.services.js";
import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const fileUrls = [];

  for (let i = 0; i < req.files.length; i++) {
    const response = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
    });
    console.log("response from imagekit", response);
    fileUrls.push(response.url);
  }

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    sizes: req.body.sizes,
    images: fileUrls,
    seller: req.user.userId,
  });

  res.status(201).json({
    message: "product created Successfully",
    data: {
      product,
    },
  });
};

// get all products

export const getAllProduct = async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({
    message: "All products fetched Successfully",
    products,
  });
};
