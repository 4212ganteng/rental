import Product from "../models/Product.js";
import { Response } from "./helpers/response.js";

class ProductController {
  // create a new product
  Create = async (req, res) => {
    try {
      const { name, sN, unit, price, stock } = req.body;
      const product = await Product.create({
        name,
        sN,
        unit,
        price,
        stock,
      });
      res
        .status(201)
        .json(Response.successResponse({ product }, "Success Create Product"));
    } catch (err) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };

  //   find all products
  Find = async (req, res) => {
    try {
      const product = await Product.find();
      res
        .status(201)
        .json(
          Response.successResponse({ product }, "Success Find all Product")
        );
    } catch (err) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };

  //   detail Product

  Detail = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findOne({ _id: id });
      res
        .status(201)
        .json(
          Response.successResponse({ product }, "Success Find all Product")
        );
    } catch (err) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };

  // update a product
  Update = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, sN, unit, price, stock } = req.body;
      const product = await Product.findByIdAndUpdate(
        { _id: id },
        {
          name,
          sN,
          unit,
          price,
          stock,
        },
        { new: true }
      );

      res
        .status(201)
        .json(Response.successResponse({ product }, "Success update Product"));
    } catch (err) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };

  // delete a product
  Remove = async (req, res) => {
    try {
      const id = req.params.id;
      // ada gak id nya
      const find = await Product.findById({ _id: id });
      if (!find) {
        return res
          .status(404)
          .json(Response.errorResponse("product tidak di temukan"));
      } else {
        const product = await Product.findByIdAndDelete(id);
        res
          .status(201)
          .json(
            Response.successResponse({ product }, "Success Delete Product")
          );
      }
    } catch (err) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };
}
export default new ProductController();
