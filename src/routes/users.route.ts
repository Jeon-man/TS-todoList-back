import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements I.Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .get(`${this.path}`, this.usersController.getUsers)
      .get(`${this.path}/:id(\\d+)`, this.usersController.getUserById)
      .post(`${this.path}`, validationMiddleware(dto.CreateUserDto, 'body'), this.usersController.createUser)
      .put(`${this.path}/:id(\\d+)`, validationMiddleware(dto.CreateUserDto, 'body', true), this.usersController.updateUser)
      .put(`${this.path}/group-up/:id`, validationMiddleware(dto.updateGroupIdDto, 'body'), this.usersController.updateUserGroup)
      .delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
