import { Router } from "express";
import {
  getProfessionals,
  addProfessional,
  deleteProfessional,
  updateProfessional,
} from "./professionals.service.js";

const professionalsRouter = Router();

professionalsRouter.get("/", async (req, res) => {
  try {
    const result = await getProfessionals();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching professionals", error });
  }
});

professionalsRouter.post("/", async (req, res) => {
  try {
    const result = await addProfessional(req.body);
    return res
      .status(201)
      .json({ message: "Professional added successfully", result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error adding professional", error });
  }
});

professionalsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteProfessional(req.params.id);
    return res
      .status(200)
      .json({ message: "Professional deleted successfully", result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error deleting professional", error });
  }
});

professionalsRouter.patch("/:id", async (req, res) => {
  try {
    const result = await updateProfessional(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Professional updated successfully", result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating professional", error });
  }
});

export default professionalsRouter;
