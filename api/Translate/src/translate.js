import { messagges } from "../../initialMessagges";

export const translate = async (req, res) => {
    console.log("POST/translate")
    const { input, language } = req.body;
    
    console.log(messagges);
    
    if(!input || !language){
        return res.status(400).json({error: "Request empty"});
      }
  
      messages.push({
          role: "user",
          content: `-Text input to translate: ${input}.
                   -Transalte to language: ${language}.`
      });
      const response = await openai.responses.create({
          model: process.env.AI_MODEL,
          input: messages,
        });

    console.log(response)
    return res.status(200).json(response.output_text);
}