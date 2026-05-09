import { Router } from "express";
import {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
} from "./projects.service.js";

const projectsRouter = Router();

projectsRouter.get("/", async (req, res) => {
  try {
    const result = await getProjects();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching projects", error });
  }
});

projectsRouter.post("/", async (req, res) => {
  try {
    const result = await addProject(req.body);
    return res
      .status(201)
      .json({ message: "Project added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding project", error });
  }
});

projectsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteProject(req.params.id);
    return res
      .status(200)
      .json({ message: "Project deleted successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting project", error });
  }
});

projectsRouter.patch("/:id", async (req, res) => {
  try {
    const result = await updateProject(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Project updated successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating project", error });
  }
});

export default projectsRouter;
