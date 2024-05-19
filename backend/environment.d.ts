declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      JWT_SECRET?: string;
      NODE_ENV?: 'development' | 'production';
      DB_URL?: string;
    }
  }
}

export {};
