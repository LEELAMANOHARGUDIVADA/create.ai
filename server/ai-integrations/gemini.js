import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyBwbZjdfIm5oylCJq6uIHCmfHrEHizlnaU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;