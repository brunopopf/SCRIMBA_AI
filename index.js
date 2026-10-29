import dotenv from "dotenv";
import { checkEnvironment } from "./utils.js"
import OpenAI from "openai"

(async () => {
    dotenv.config();
    checkEnvironment();

    const openai = new OpenAI({
        apiKey: process.env.AI_KEY,
        baseURL: process.env.AI_URL,
    });

    const baby= "when im going to get my period"

    const response = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        messages: [{ role: "user", content: baby }],
    });

    console.log(response);
    // console.log("---")
    console.log(response.choices[0].message.content);
})();