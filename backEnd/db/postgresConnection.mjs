import pg from "pg"; // skirtas bendrauti su PostgreSQL duomenu baze Node.js 
import dotenv from "dotenv"; // dotenv - kad paleistumem duomenis is .env failo

dotenv.config();

const { Pool } = pg; // pg yra Node.js library bendraujant su PostgreSQL duomenu baze

export const pool = new Pool({ // nustatymai kad susijungti su duomenu baze, pagal parametrus, lokaliai dirbant pvz host yra localhost 
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 20,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  ssl,
}); 

export const connectDB = () => { // cia gausime teigiama atsaka susijunge su db pool.connect yra nuo export const pool = new Pool susijusi dalis
  return new Promise((resolve, reject) => {
    pool.connect((err) => {
      if (err) {
        console.error("connection error", err.stack);
        reject(err);
      } else {
        resolve("Database connected successfully");
      }
    });
  });
};

