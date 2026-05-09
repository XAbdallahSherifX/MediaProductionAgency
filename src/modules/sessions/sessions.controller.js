import { Router } from "express";
import {
  getSessions,
  addSession,
  deleteSession,
  updateSession,
  getSessionsWithStudios,
  getSessionsWithProjects,
  assignEquipmentToSession,
  assignProfessionalToSession,
} from "./sessions.service.js";

const sessionsRouter = Router();

sessionsRouter.get("/", async (req, res) => {
  try {
    const result = await getSessions();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching sessions", error });
  }
});
sessionsRouter.get("/with-studios", async (req, res) => {
  try {
    const result = await getSessionsWithStudios();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching sessions with studios", error });
  }
});

sessionsRouter.post("/assign-professional", async (req, res) => {
  try {
    const result = await assignProfessionalToSession(req.body);
    return res.status(201).json({ message: "Professional successfully assigned to the session!", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to assign professional to session", error });
  }
});


sessionsRouter.post("/assign-equipment", async (req, res) => {
  try {
    const result = await assignEquipmentToSession(req.body);
    return res.status(201).json({ message: "Equipment successfully assigned to the session!", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to assign equipment to session", error });
  }
});
sessionsRouter.get("/with-projects", async (req, res) => {
  try {
    const result = await getSessionsWithProjects();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching sessions with projects", error });
  }
});
sessionsRouter.post("/", async (req, res) => {
  try {
    const result = await addSession(req.body);
    return res
      .status(201)
      .json({ message: "Session added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding session", error });
  }
});

sessionsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteSession(req.params.id);
    return res
      .status(200)
      .json({ message: "Session deleted successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting session", error });
  }
});

sessionsRouter.patch("/:id", async (req, res) => {
  try {
    const result = await updateSession(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Session updated successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating session", error });
  }
});

export default sessionsRouter;
