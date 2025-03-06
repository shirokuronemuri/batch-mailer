# batch-mailer

Send batch emails from a connected google account, attachment support included.

## Requirements

- Node.js v18 or newer
- yarn
- a Google account with access to the [cloud console](https://console.cloud.google.com/)

## Project setup

1. Create a new app in [Google Cloud Console](<(https://console.cloud.google.com/)>) with the account that you will use; set the tester email, select `.../auth/gmail.modify` in the scope list to allow sending emails through the API; create OAuth2 credentials, set application type to a web app, set redirect URI to `https://developers.google.com/oauthplayground` and download the file with credentials

2. Install the dependencies and build the project:

```bash
yarn
yarn build
```

3. Create `.env` file based on `.env.example` in the project root and insert `CLIENT_ID` and `CLIENT_SECRET` from the credentials file that you have downloaded

4. Run the following command:

```bash
yarn generate
```

5. Follow the link in the console, login with the account that you have specified before as a tester, copy the code in the `Authorization code` field WITHOUT pressing "Exchange authorization code for tokens" (this is important!) and paste it into your console prompt, which will generate a refresh token for you, make sure to copy and paste it into `REFRESH_TOKEN` field in the `.env` file

## Usage
