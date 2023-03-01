import express from "express";
import RentalController from "../controllers/RentalController.js";

const router = express.Router();

// create rent
router.post("/create", RentalController.Rent);
// findall
router.get("/", RentalController.getAllRentals);
// findone
router.get("/detail/:id", RentalController.getRentalById);
// update
router.patch("/update/:id", RentalController.UpdateRental);
// delete
router.delete("/delete/:id", RentalController.deleteRental);

export default router;
