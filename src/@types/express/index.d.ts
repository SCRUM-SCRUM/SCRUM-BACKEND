import { User } from '../../users/entities/user.entity'; 

declare global {
  namespace Express {
    interface User {
      id: string;
      // add any other properties you attach to req.user
    }

    interface Request {
      user: User;
    }
  }
}
