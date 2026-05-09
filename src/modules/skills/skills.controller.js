import { Router } from "express";
import {
  getSkills,
  addSkill,
  deleteSkill,
  updateSkill,
} from "./skills.service.js";

const skillsRouter = Router();

skillsRouter.get("/", async (req, res) => {
  try {
    const result = await getSkills();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching skills", error });
  }
});

skillsRouter.post("/", async (req, res) => {
  try {
    const result = await addSkill(req.body);
    return res
      .status(201)
      .json({ message: "Skill added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding skill", error });
  }
});

skillsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteSkill(req.params.id);
    return res
      .status(200)
      .json({ message: "Skill deleted successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting skill", error });
  }
});

skillsRouter.patch("/:id", async (req, res) => {
  try {
    const result = await updateSkill(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Skill updated successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating skill", error });
  }
});

export default skillsRouter;
