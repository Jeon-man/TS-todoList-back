import { Request } from 'express';
import * as I from '../interfaces';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: I.User;
}
