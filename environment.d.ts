declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REFRESH_TOKEN: string;
      USER_EMAIL: string;
    }
  }
}

export { };
