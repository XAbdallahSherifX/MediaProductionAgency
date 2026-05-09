import { queryAsync } from "../../database/database.connection.js";

export async function getSkills() {
  return await queryAsync("SELECT * FROM TechSkill;");
}

export async function addSkill(data) {
  const { Skillname } = data;
  return await queryAsync(`INSERT INTO TechSkill (Skillname) VALUES (?);`, [
    Skillname,
  ]);
}

export async function deleteSkill(id) {
  return await queryAsync(`DELETE FROM TechSkill WHERE SkillID = ?;`, [id]);
}

export async function updateSkill(id, data) {
  const { Skillname } = data;
  return await queryAsync(
    `UPDATE TechSkill SET Skillname = ? WHERE SkillID = ?;`,
    [Skillname, id],
  );
}
