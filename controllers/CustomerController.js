import Customer from "../models/Customer.js";
import Rental from "../models/Rental.js";
import { Response } from "./helpers/response.js";

class CustomerController {
  // create customer
  Create = async (req, res) => {
    try {
      const { company, email, name, address, picturePath } = req.body;
      console.log("data body", req.body);
      const customer = await Customer.create({
        company,
        email,
        name,
        address,
        picturePath,
      });

      res
        .status(201)
        .json(
          Response.successResponse({ customer }, "Success create customer")
        );
    } catch (err) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };

  // find all customer

  Find = async (req, res) => {
    try {
      const customer = await Customer.find();
      res
        .status(201)
        .json(
          Response.successResponse({ customer }, "Success get all customer")
        );
    } catch (error) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };

  // detail customer
  Detail = async (req, res) => {
    try {
      const id = req.params.id;
      const customer = await Customer.findOne({ _id: id });
      // get rental data with customer ID
      const rental = await Rental.find({ customer: id }).populate("product");
      res
        .status(201)
        .json(
          Response.successResponse(
            { customer, rental },
            "Success create customer"
          )
        );
    } catch (err) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };

  // update customer

  Update = async (req, res) => {
    try {
      const id = req.params.id;
      // console.log({ id });
      const { company, email, name, address, picturePath } = req.body;
      // console.log("body", req.body);
      const customer = await Customer.findByIdAndUpdate(
        { _id: id },
        {
          company,
          email,
          name,
          address,
          picturePath,
        },
        { new: true } //agar mengembalikan dokumen yang baru
      );
      res
        .status(201)
        .json(
          Response.successResponse({ customer }, "Success Update customer")
        );
    } catch (err) {
      res.status(500).json(Response.errorResponse(err.message));
    }
  };

  // delete customer

  Remove = async (req, res) => {
    try {
      const id = req.params.id;
      const findcust = await Customer.findOne({ _id: id });
      if (!findcust) {
        return res
          .status(404)
          .json(Response.errorResponse("Customer tidak di temukan"));
      } else {
        const customer = await Customer.findByIdAndDelete({ _id: id });
        return res
          .status(201)
          .json(
            Response.successResponse({ customer }, "Success Delete customer")
          );
      }
    } catch (error) {
      return res.status(404).json(Response.errorResponse(error.message));
    }
  };
}

export default new CustomerController();
