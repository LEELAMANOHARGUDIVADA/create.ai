import model from "../ai-integrations/gemini.js";
import textToImage from "../ai-integrations/image.generation.js";


const generateText = async(req,res) => {
    try{
        const { prompt } = req.body;

        if(!prompt) return res.status(400).json({ success: false, message: "Prompt Field is required" });

        const updatedPrompt = prompt + "in not more than 200 characters. If the above message is hii, hello, hey something like greetings answer Hi, How can I help you today?";

        const result = await model.generateContent(updatedPrompt);

        return res.status(200).json({ success: true, response: result.response.text() });
    } catch(error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const generateImage = async(req,res) => {
    try {
        const { prompt } = req.body;

        if(!prompt) throw new Error('Prompt Field Required!');

        const response = await textToImage(prompt);
        if(response.length<0) return res.json({ message: "No Response" })
        return res.status(200).json({ success: true, response });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export { generateText, generateImage };