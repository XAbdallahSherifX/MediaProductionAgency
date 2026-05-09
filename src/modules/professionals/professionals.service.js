import { queryAsync } from "../../database/database.connection.js";

export async function getProfessionals() {
  return await queryAsync("SELECT * FROM Professionals;");
}

export async function addProfessional(data) {
  const { role_title, fname, lname, phone, email, SkillID } = data;
  return await queryAsync(
    `INSERT INTO Professionals (role_title, fname, lname, phone, email, SkillID) VALUES (?, ?, ?, ?, ?, ?);`,
    [role_title, fname, lname, phone, email, SkillID],
  );
}

export async function deleteProfessional(id) {
  return await queryAsync(`DELETE FROM Professionals WHERE prof_ID = ?;`, [id]);
}

export async function updateProfessional(id, data) {
  const { role_title, fname, lname, phone, email, SkillID } = data;
  return await queryAsync(
    `UPDATE Professionals SET role_title = ?, fname = ?, lname = ?, phone = ?, email = ?, SkillID = ? WHERE prof_ID = ?;`,
    [role_title, fname, lname, phone, email, SkillID, id],
  );
}
