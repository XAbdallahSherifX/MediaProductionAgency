import msnodesqlv8 from "msnodesqlv8";

const connectionString =
  "Driver={ODBC Driver 17 for SQL Server};" +
  "Server=localhost\\SQLEXPRESS;" +
  "Database=Media Production;" +
  "Trusted_Connection=Yes;" +
  "TrustServerCertificate=Yes;";

let dbConnection = null;

export function connectDB() {
  return new Promise((resolve, reject) => {
    if (dbConnection) {
      return resolve(dbConnection);
    }
    msnodesqlv8.open(connectionString, (err, conn) => {
      if (err) return reject(err);
      console.log("Database connected successfully!");
      dbConnection = conn;
      resolve(conn);
    });
  });
}


export function queryAsync(sql, params = []) {
  return new Promise(async (resolve, reject) => {
    try {

      dbConnection.query(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    } catch (error) {
      reject(error);
    }
  });
}
