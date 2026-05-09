import { Router } from "express";
import {
  getEquipments,
  addEquipment,
  deleteEquipment,
  updateEquipment,
} from "./equipments.service.js";

const equipmentsRouter = Router();

equipmentsRouter.get("/", async (req, res) => {
  try {
    const result = await getEquipments();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching equipments", error });
  }
});

equipmentsRouter.post("/", async (req, res) => {
  try {
    const result = await addEquipment(req.body);
    return res
      .status(201)
      .json({ message: "Equipment added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding equipment", error });
  }
});

equipmentsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteEquipment(req.params.id);
    return res
      .status(200)
      .json({ message: "Equipment deleted successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting equipment", error });
  }
});

equipmentsRouter.patch("/:id", async (req, res) => {
  try {
    const result = await updateEquipment(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Equipment updated successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating equipment", error });
  }
});

export default equipmentsRouter;
