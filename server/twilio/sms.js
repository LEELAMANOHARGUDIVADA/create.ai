import twilio from "twilio"
import dotenv from "dotenv"
dotenv.config();

const twilioClient = twilio('AC409bc1f027fc37a8945c087c55508dff', 'c6fee3cd4adbf9fed04f55ef6f4fe163');

  export default twilioClient;