import { queryAsync } from "../../database/database.connection.js";

export async function getEquipments() {
  return await queryAsync("SELECT * FROM Equipment;");
}

export async function addEquipment(data) {
  const { Eq_name, Serial_no, Eq_Type, Condition_status } = data;
  return await queryAsync(
    `INSERT INTO Equipment (Eq_name, Serial_no, Eq_Type, Condition_status) VALUES (?, ?, ?, ?);`,
    [Eq_name, Serial_no, Eq_Type, Condition_status],
  );
}

export async function deleteEquipment(id) {
  return await queryAsync(`DELETE FROM Equipment WHERE Eq_ID = ?;`, [id]);
}

export async function updateEquipment(id, data) {
  const { Eq_name, Serial_no, Eq_Type, Condition_status } = data;
  return await queryAsync(
    `UPDATE Equipment SET Eq_name = ?, Serial_no = ?, Eq_Type = ?, Condition_status = ? WHERE Eq_ID = ?;`,
    [Eq_name, Serial_no, Eq_Type, Condition_status, id],
  );
}
