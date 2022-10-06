import { Router } from 'express';
import ToDosController from '@/controllers/toDos.controller';
import { CreateTodoDto } from '@/dtos/toDos.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ToDosRoute implements Routes {
  public path = '/toDos';
  public router = Router();
  public toDosController = new ToDosController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.toDosController.getToDos);
    this.router.get(`${this.path}/:id(\\d+)`, this.toDosController.getToDoById);
    this.router.post(`${this.path}`, validationMiddleware(CreateTodoDto, 'body'), this.toDosController.createTodo);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateTodoDto, 'body', true), this.toDosController.updatetoDo);
    this.router.get(`${this.path}/success/:id(\\d+)`, this.toDosController.updateSuccessState);
    this.router.delete(`${this.path}/:id(\\d+)`, this.toDosController.deletetoDo);
  }
}

export default ToDosRoute;
