import express from "express";
import CustomerController from "../controllers/CustomerController.js";

// import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();
// create
router.post("/create", CustomerController.Create);
// find
router.get("/", CustomerController.Find);
// update
router.patch("/update/:id", CustomerController.Update);
// delete
router.delete("/delete/:id", CustomerController.Remove);
// detial
router.get("/detail/:id", CustomerController.Detail);

export default router;
