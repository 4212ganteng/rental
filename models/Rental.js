import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const RentalSchema = new mongoose.Schema(
  {
    customer: {
      type: ObjectId,
      ref: "Customer",
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
    duration: {
      type: Number,
      default: 1,
    },
    durationUnit: {
      type: String,
      default: "tahun",
    },
    values: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "unpaid",
    },
    qty: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
const Rental = mongoose.model("Rental", RentalSchema);
export default Rental;
