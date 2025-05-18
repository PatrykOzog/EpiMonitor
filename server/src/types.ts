import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

// export interface User {
//   id: number;
//   email: string;
//   password: string;
// }
