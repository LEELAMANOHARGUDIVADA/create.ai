import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import connectDB from "./db.js";
import userRoutes from "./routes/UserRoutes.js"
import aiRoutes from "./routes/AiRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//ROUTES
app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send("App is Working");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    connectDB(process.env.MONGODB_URL);
    console.log("SERVER RUNNING ON PORT", PORT);
});