import Chat from "../models/ChatSchema.js";

const addMessage = async(req,res) => {
    try {
        const { chatId, sender, text } =  req.body;

        const chat = new Chat({
            chatId,
            sender,
            text
        });

        const result = await chat.save();
        return res.status(201).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getChatHistory = async(req,res) => {
    try {
        const { chatId } = req.params;
        console.log(chatId);
        if(!chatId) return res.status(400).json({ success: false, message: "ChatId Required" });

        const chatHistory = await Chat.find({ chatId });
        console.log(chatHistory);

        return res.status(200).json({ success: true, message: "Chat Fetched", chatHistory });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export { addMessage, getChatHistory };