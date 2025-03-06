import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
import type Mail from "nodemailer/lib/mailer/index.js";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const USER_EMAIL = process.env.USER_EMAIL;

type sendMode = "single" | "multiple";

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail() {
  const accessTokenResponse = await oauth2Client.getAccessToken();
  const accessToken = accessTokenResponse?.token;
  if (!accessToken) throw new Error("Failed to retrieve access token");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: USER_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken
    },
  });

  const mailOptions: Mail.Options = {
    from: USER_EMAIL,
    to: "testaccount@example.com",
    subject: "test",
    text: "Test test test"
  };

  const result = await transporter.sendMail(mailOptions);
  console.log(`Email sent: ${result.messageId}`);
}

sendEmail();
