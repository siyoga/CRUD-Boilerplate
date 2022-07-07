declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_DB: string;
      POSTGRES_DB_TEST: string;
      POSTGRES_PORT: number;
      POSTGRES_USER: string;
      POSTGRES_HOST: string;
      POSTGRES_PASSWORD: string;
      NODE_ENV: 'production' | 'development';
      SERVER_PORT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
