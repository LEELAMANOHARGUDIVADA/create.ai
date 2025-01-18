import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema({
    chatId: {
        type: String
    },
    sender: {
        type: String,
    },
    text: {
        type: String
    },
},  { timestamps: true });

const Chat = new mongoose.model('Chat', ChatSchema);

export default Chat;