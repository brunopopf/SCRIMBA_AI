import express from "express";
import OpenAI from "openai"
import dotenv from "dotenv"
import { checkEnvironment } from "./utils.js"
import cors from "cors";
// import pool from './config/database.js';

// -- init env --
dotenv.config();
checkEnvironment();

// -- init express --
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// -- init openai --
const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL,
});

process.on('SIGINT', ()=> {
  console.log('Starting graceful shutdown');
  process.exit(1);
})


// -- Routes --
app.get("/", (req, res) => {
    console.log("get/translate")

  // res.send(messages);
});

//--- CHECKS ---
app.get("/ping", (req, res) => {
  console.log("get/ping")
  res.send("pong fuch");
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      db: 'connected',
      uptime: process.uptime()
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      db: 'disconnected',
      message: err.message,
      uptime: process.uptime()
    })
  }
})
//--- *** ---








    

    
