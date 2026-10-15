import mongoose from "mongoose";
import { uploadFile } from "../services/storage.services.js";
import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
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
  const products = await productModel.find({
    published: true,
  });
  res.status(200).json({
    message: "All products fetched Successfully",
    products,
  });
};

// seller will see all the products

export const listAllProductsToSeller = async (req, res) => {
  const products = await productModel.find({});

  return res.status(200).json({
    message: "All products fetched Successfully for seller",
    data: {
      products,
    },
  });
};

// unlist product

export const unlistProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({ message: "product not  found by id" });
  }
  await productModel.findByIdAndUpdate(id, {
    published: false,
  });

  return res.status(200).json({
    message: "Unlisted Successfully",
  });
};
//list product
export const listProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({ message: "product not  found by id" });
  }
  await productModel.findByIdAndUpdate(id, {
    published: true,
  });

  return res.status(200).json({
    message: " Product listed Successfully",
  });
};
