import Rental from "../models/Rental.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import { Response } from "./helpers/response.js";

class RentalController {
  // create rental
  Rent = async (req, res) => {
    try {
      // get product id from request body
      const { productId, qty } = req.body;
      console.log({ productId });

      // find product in database
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      // cek apakah product memiliki stock yang cukup
      if (product.stock < qty) {
        return res.status(400).json({ message: "Product out of stock" });
      }

      // customer checking
      const { customerId } = req.body;

      // find product in database
      const customer = await Customer.findById(customerId);

      if (!customer) {
        return res.status(404).json({ message: "Product not found" });
      }

      // create rental with product and customer data
      const rental = await Rental.create({
        product: product._id,
        customer: customer._id, // assuming user is authenticated and their id is stored in req.user
        duration: req.body.duration,
        durationUnit: req.body.durationUnit,
        values: product.price * req.body.duration,
        qty: qty,
      });

      // kurangi stock product
      await Product.findOneAndUpdate(
        { _id: product._id },
        { $inc: { stock: -qty } }
      );

      res.status(201).json({ rental });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  // get all rentals
  getAllRentals = async (req, res) => {
    try {
      const rentals = await Rental.find()
        .populate("product")
        .populate("customer");

      res.json({ rentals });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  // get rental by id
  getRentalById = async (req, res) => {
    try {
      const rental = await Rental.findById(req.params.id)
        .populate("product")
        .populate("customer", "name email");

      if (!rental) {
        return res.status(404).json({ message: "Rental not found" });
      }

      res.json({ rental });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  //   update rental
  UpdateRental = async (req, res) => {
    {
      try {
        const id = req.params.id;
        // get product id from request body
        const { productId } = req.body;
        console.log({ productId });

        // find product in database
        const product = await Product.findById(productId);

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        // customer checking
        const { customerId } = req.body;

        // find product in database
        const customer = await Customer.findById(customerId);

        if (!customer) {
          return res.status(404).json({ message: "Product not found" });
        }

        const rental = await Rental.findByIdAndUpdate(
          { _id: id },
          {
            product: product._id,
            customer: customer._id, // assuming user is authenticated and their id is stored in req.user
            duration: req.body.duration,
            durationUnit: req.body.durationUnit,
            values: product.price * req.body.duration,
            status: req.body.status,
          },
          { new: true }
        );
        res
          .status(201)
          .json(Response.successResponse({ rental }, "Success update Rental"));
      } catch (err) {
        res.status(500).json(Response.errorResponse(err.message));
      }
    }
  };

  //   delete rental
  deleteRental = async (req, res) => {
    try {
      const rental = await Rental.findById(req.params.id);

      if (!rental) {
        return res.status(404).json({ message: "Rental not found" });
      }

      await rental.remove();

      res.json({ message: "Rental deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default new RentalController();
