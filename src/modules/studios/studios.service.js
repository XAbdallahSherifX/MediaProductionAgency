import { queryAsync } from "../../database/database.connection.js";

export async function getStudios() {
  return await queryAsync("SELECT * FROM Studio;");
}

export async function addStudio(data) {
  const { Studio_name, availability_status, wing } = data;
  return await queryAsync(
    `INSERT INTO Studio (Studio_name, availability_status, wing) VALUES (?, ?, ?);`,
    [Studio_name, availability_status, wing],
  );
}

export async function deleteStudio(id) {
  return await queryAsync(`DELETE FROM Studio WHERE Studio_ID = ?;`, [id]);
}

export async function updateStudio(id, data) {
  const { Studio_name, availability_status, wing } = data;
  return await queryAsync(
    `UPDATE Studio SET Studio_name = ?, availability_status = ?, wing = ? WHERE Studio_ID = ?;`,
    [Studio_name, availability_status, wing, id],
  );
}
