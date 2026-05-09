import { connectDB } from "./src/database/database.connection.js";
import express from "express";
import skillsRouter from "./src/modules/skills/skills.controller.js";
import cors from "cors";
import equipmentsRouter from "./src/modules/equipments/equipments.controller.js";
import professionalsRouter from "./src/modules/professionals/professionals.controller.js";
import sessionsRouter from "./src/modules/sessions/sessions.controller.js";
import studiosRouter from "./src/modules/studios/studios.controller.js";
import projectsRouter from "./src/modules/projects/projects.controller.js";

export default async function app() {
  try {
    await connectDB();
    const server = express();
    server.use(cors(), express.json());

    server.use("/skills", skillsRouter);
    server.use("/equipments", equipmentsRouter);
    server.use("/professionals", professionalsRouter);
    server.use("/sessions", sessionsRouter);
    server.use("/studios", studiosRouter);
    server.use("/projects", projectsRouter);

    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Failed to start the application:", err);
  }
}
