import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces/index';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements I.Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .get(`${this.path}:userId/:authKey`, this.authController.checkEmailAuth)
      .post(`${this.path}signup`, validationMiddleware(dto.CreateUserDto, 'body'), this.authController.signUp)
      .post(`${this.path}login`, validationMiddleware(dto.CreateUserDto, 'body'), this.authController.logIn)
      .post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
