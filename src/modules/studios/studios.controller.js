import { Router } from "express";
import {
  getStudios,
  addStudio,
  deleteStudio,
  updateStudio,
} from "./studios.service.js";

const studiosRouter = Router();

studiosRouter.get("/", async (req, res) => {
  try {
    const result = await getStudios();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching studios", error });
  }
});

studiosRouter.post("/", async (req, res) => {
  try {
    const result = await addStudio(req.body);

    return res

      .status(201)
      .json({ message: "Studio added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding studio", error });
  }
});

studiosRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteStudio(req.params.id);
    return res
      .status(200)
      .json({ message: "Studio deleted successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting studio", error });
  }
});

studiosRouter.patch("/:id", async (req, res) => {
  try {
    const result = await updateStudio(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Studio updated successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating studio", error });
  }
});

export default studiosRouter;
