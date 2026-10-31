import express from "express";
import OpenAI from "openai"
import dotenv from "dotenv"
import { checkEnvironment } from "./utils.js"
import messages from "./initialMessagges.js"
import cors from "cors";

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

// -- Routes --
app.get("/", (req, res) => {
    console.log("get/translate")

  res.send(messages);
});

app.get("/ping", (req, res) => {
    console.log("get/ping")

  res.send("pong");
});

app.post("/translate", async (req, res) => {
    console.log("POST/translate")
    const { input, language } = req.body;

    if(!input || !language){
      return res.status(400).json({error: "Request empty"});
    }

    messages.push({
        role: "user",
        content: `-Text input to translate: ${input}.
                 -Transalte to language: ${language}.`
    });

    console.log(messages);

    const response = await openai.responses.create({
        model: process.env.AI_MODEL,
        input: messages,
    })

    console.log(response)
    return res.status(200).json(response.output_text);
});






    

    
