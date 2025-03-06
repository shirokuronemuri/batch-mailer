import { google } from "googleapis";
import * as readline from "node:readline/promises";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

async function getOauthToken() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/gmail.modify"
  });

  console.log(`Authorize this app by visiting ${authUrl}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const code: string = await rl.question("Enter the code from verification page: ");
  rl.close();

  const { tokens } = await oauth2Client.getToken(code);
  if (tokens.refresh_token === undefined) {
    console.log("Refresh token already sent out before");
  }
  else {
    console.log(`Your refresh token: ${tokens.refresh_token}`);
  }

  // todo: add error handling
}

getOauthToken();
