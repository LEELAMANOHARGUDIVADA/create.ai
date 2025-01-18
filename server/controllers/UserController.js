import User from "../models/UserSchema.js";
import twilioClient from "../twilio/sms.js";
import generateToken from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    const { phoneNumber, fullName } = req.body;
    console.log(fullName, phoneNumber);
    if (!phoneNumber || phoneNumber.length < 10 || !fullName) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Phone Number" });
    }

    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      console.log("user exist")
      return res
        .status(400)
        .json({
          success: false,
          message: "Account with this Phone Number exists",
        });
}

    const user = new User({
      phoneNumber: `+91${phoneNumber}`,
      fullName: fullName
    });

    await user.save();
    console.log(user);

    await twilioClient.verify.v2
      .services("VAbc97dc001353748aee2c8cf0b557e9ec")
      .verifications.create({
        to: `+91${phoneNumber}`,
        channel: "sms",
      })
      .then((message) => console.log("Message sent:", message.sid))
      .catch((error) => console.error("Error:", error.message));

    res.status(201).json({ success: true, message: "Registration Success"   });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verifyOtp = async (req, res) => {
    try {
      const { phoneNumber, otp } = req.body;
  
      if (!phoneNumber || !otp) {
        return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
      }
  
      const verificationCheck = await twilioClient.verify.v2
        .services('VAbc97dc001353748aee2c8cf0b557e9ec')
        .verificationChecks.create({
          to: `+91${phoneNumber}`,
          code: otp,
        });

        const user = await User.findOne({ phoneNumber: `+91${phoneNumber}` });
  
      if (verificationCheck.status === "approved") {
        user.isVerified = true;
        user.save();
        res.status(200).json({
          success: true,
          message: "OTP verified successfully",
          user,
          token: generateToken(user._id),
          name: user.fullName
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid OTP",
          
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      res.status(500).json({ success: false, message: "OTP verification failed" });
    }
};  

export { register, verifyOtp };
