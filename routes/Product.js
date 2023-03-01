import express from "express";
import Productcontroller from "../controllers/Productcontroller.js";

const router = express.Router();

// create
router.post("/create", Productcontroller.Create);

// Find products
router.get("/", Productcontroller.Find);

// detail
router.get("/detail/:id", Productcontroller.Detail);

// update
router.patch("/update/:id", Productcontroller.Update);

// delete
router.delete("/remove/:id", Productcontroller.Remove);

export default router;
