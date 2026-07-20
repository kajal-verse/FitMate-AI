const express = require("express");
const router = express.Router();

const sendEmail = require("../utils/sendEmail");

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "shrmakajal963@gmail.com",
      subject: "FitMate Email Test",
      html: `
        <h2>🎉 Congratulations!</h2>
        <p>Your Resend integration is working successfully.</p>
      `,
    });

    res.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;