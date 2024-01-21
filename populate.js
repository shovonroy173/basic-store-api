require("dotenv").config();

const mongoose = require("mongoose");
const ProductsModel = require("./models/product");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    await ProductsModel.deleteMany();
    await ProductsModel.create(jsonProducts);
    console.log("success!");
    process.exit(0);
  } catch (error) {
    console.log("populate err");
    process.exit(1);
  }
};

start();
