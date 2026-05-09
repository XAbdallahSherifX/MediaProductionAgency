import { queryAsync } from "../../database/database.connection.js";

export async function getProjects() {
  return await queryAsync("SELECT * FROM Project;");
}

export async function addProject(data) {
  const { Creative_title, deadline, budget } = data;
  return await queryAsync(
    `INSERT INTO Project (Creative_title, deadline, budget) VALUES (?, ?, ?);`,
    [Creative_title, deadline, budget],
  );
}

export async function deleteProject(id) {
  return await queryAsync(`DELETE FROM Project WHERE Project_ID = ?;`, [id]);
}

export async function updateProject(id, data) {
  const { Creative_title, deadline, budget } = data;
  return await queryAsync(
    `UPDATE Project SET Creative_title = ?, deadline = ?, budget = ? WHERE Project_ID = ?;`,
    [Creative_title, deadline, budget, id],
  );
}
