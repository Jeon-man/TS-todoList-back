import { NextFunction, Request, Response } from 'express';
import * as dto from '../dtos/index.dto';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import UserService from '@/services/users.service';
class AuthController {
  public authService = new AuthService();
  public usersService = new UserService();

  public checkEmailAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // locahost:3000/{userId}/{authKey}
      const { userId, authKey } = req.params;
      const userData: dto.CreateUserDto = await this.usersService.findUserById(Number(userId));
      await this.authService.checkToEmailAuthUpdate(userData, authKey);

      res.status(200).json({ message: 'Email Auth Success' });
    } catch (e) {
      next(e);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: dto.CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      await this.authService.authMailSend(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: dto.CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
