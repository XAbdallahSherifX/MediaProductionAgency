import { queryAsync } from "../../database/database.connection.js";

export async function getSessions() {
  return await queryAsync("SELECT * FROM Session;");
}

export async function getSessionsWithStudios() {
  const sql = `
    SELECT 
      Session.Session_ID, 
      Session.Session_date, 
      Session.Session_start_time, 
      Session.Session_end_time, 
      Session.Project_ID, 
      Studio.Studio_ID,
      Studio.Studio_name, 
      Studio.wing, 
      Studio.availability_status
    FROM Session
    INNER JOIN Studio ON Session.Studio_ID = Studio.Studio_ID;
  `;
  return await queryAsync(sql);
}
export async function getSessionsWithProjects() {
  const sql = `
    SELECT 
      Session.Session_ID, 
      Session.Session_date, 
      Session.Session_start_time, 
      Session.Session_end_time, 
      Session.Studio_ID,
      Project.Project_ID,
      Project.Creative_title, 
      Project.deadline, 
      Project.budget
    FROM Session
    INNER JOIN Project ON Session.Project_ID = Project.Project_ID;
  `;
  return await queryAsync(sql);
}

export async function assignProfessionalToSession(data) {
  const { Session_ID, prof_ID, contribution_val } = data;
  
  return await queryAsync(
    `INSERT INTO Session_Professionals (Session_ID, prof_ID, contribution_val) VALUES (?, ?, ?);`,
    [Session_ID, prof_ID, contribution_val]
  );
}


export async function assignEquipmentToSession(data) {
  const { Session_ID, Eq_ID, prof_ID, return_cond } = data;
  
  return await queryAsync(
    `INSERT INTO Session_Equipment (Session_ID, Eq_ID, prof_ID, return_cond) VALUES (?, ?, ?, ?);`,
    [Session_ID, Eq_ID, prof_ID, return_cond]
  );
}
export async function addSession(data) {
  const {
    Session_date,
    Session_start_time,
    Session_end_time,
    Project_ID,
    Studio_ID,
  } = data;
  return await queryAsync(
    `INSERT INTO Session (Session_date, Session_start_time, Session_end_time, Project_ID, Studio_ID) VALUES (?, ?, ?, ?, ?);`,
    [Session_date, Session_start_time, Session_end_time, Project_ID, Studio_ID],
  );
}

export async function deleteSession(id) {
  return await queryAsync(`DELETE FROM Session WHERE Session_ID = ?;`, [id]);
}

export async function updateSession(id, data) {
  const {
    Session_date,
    Session_start_time,
    Session_end_time,
    Project_ID,
    Studio_ID,
  } = data;
  return await queryAsync(
    `UPDATE Session SET Session_date = ?, Session_start_time = ?, Session_end_time = ?, Project_ID = ?, Studio_ID = ? WHERE Session_ID = ?;`,
    [
      Session_date,
      Session_start_time,
      Session_end_time,
      Project_ID,
      Studio_ID,
      id,
    ],
  );
}
