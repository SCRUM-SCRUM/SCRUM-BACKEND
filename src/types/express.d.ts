/* eslint-disable prettier/prettier */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        // add other properties based on your JWT payload
      };
    }
  }
}

export {}; // This ensures the file is treated as a module