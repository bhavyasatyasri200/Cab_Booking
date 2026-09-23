const nodemailer = require('nodemailer');

const sendOTPEmail = async (email, otp) => {
  // If email credentials are provided in .env, send actual email asynchronously
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL port 465 for reliable cloud delivery
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });

      const mailOptions = {
        from: `"Ucab Security" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🚖 Ucab - Verify your Email Address (OTP)',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #f59e0b; text-align: center;">🚖 Welcome to Ucab</h2>
            <p>Thank you for signing up! Please use the following 6-digit OTP code to verify your email address:</p>
            <div style="background: #1e1e2e; color: #f59e0b; font-size: 28px; font-weight: bold; letter-spacing: 6px; text-align: center; padding: 16px; border-radius: 8px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="font-size: 13px; color: #666;">This code is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`OTP email sent successfully to ${email}`);
    } catch (err) {
      console.error(`Failed to send OTP email to ${email}:`, err.message);
    }
  } else {
    console.log(`[DEV MODE] EMAIL_USER not configured. Mock OTP for ${email}: ${otp}`);
  }
};

module.exports = { sendOTPEmail };
