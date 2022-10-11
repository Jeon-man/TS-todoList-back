import { Router } from 'express';
import GroupController from '@/controllers/group.controller';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import validationMiddleware from '@middlewares/validation.middleware';

class GroupRoute implements I.Routes {
  public path = '/group';
  public router = Router();
  public groupController = new GroupController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.groupController.getGroups);
    this.router.get(`${this.path}/:id(\\d+)`, this.groupController.getGroupById);
    this.router.post(`${this.path}`, validationMiddleware(dto.createGroupDto, 'body'), this.groupController.createGroup);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(dto.CreateTodoDto, 'body', true), this.groupController.updateGroup);
    this.router.delete(`${this.path}/:id(\\d+)`, this.groupController.deleteGroup);
  }
}

export default GroupRoute;
