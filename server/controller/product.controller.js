import Food from "../model/product.model.js";
import mongoose from "mongoose";

const productMethods = {
  getAllProducts: async function (req, res) {
    //fetch data from your database and return it
    try {
      const products = await Food.find();
      return res
        .status(200)
        .json({ products, message: "Get all products", success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  },

  addProduct: async function (req, res) {
    //add new product to your database

    try {
      const {
        name,
        price,
        description,
        image,
        category,
        spicyLevel,
        isVegetarian,
        allergens,
      } = req.body;
      const product = new Food({
        name,
        price,
        description,
        image,
        category,
        spicyLevel,
        isVegetarian,
        allergens,
      });
      await product.save();
      return res
        .status(201)
        .json({
          product,
          message: "Product added successfully",
          success: true,
        });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message, success: false });
    }
  },

  editProduct: async function (req, res) {
    //update product data in your database
    try {
      const productId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(productId)) {

        return res.status(404).json({ message: "Product not found", success: false });

      }

      const {name,price,description,image,category,spicyLevel,isVegetarian,allergens,} = req.body;

      const product = await Food.findByIdAndUpdate(
        productId,
        {
          name,
          price,
          description,
          image,
          category,
          spicyLevel,
          isVegetarian,
          allergens,
        },
        { new: true }
      );

      return res.status(200).json({product,message: "Product updated successfully",success: true});
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message, success: false });
    }
  },

  deleteProduct: async function (req, res) {
    //delete product from your database
    try {
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(404).json({ message: "Product not found", success: false });
        }
        await Food.findByIdAndDelete(productId);
        return res.status(200).json({ message: "Product deleted successfully", success: true });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message, success: false });
  
    }

  },

  getProductById: function (req, res) {
    //fetch product data by id from your database and return it
    return res.send("get product by id");
  },
};

export default productMethods;
