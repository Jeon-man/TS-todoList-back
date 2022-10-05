import { NextFunction, Request, Response } from 'express';
import { CreateTodoDto } from '@/dtos/toDos.dto';
import { ToDos } from '@/interfaces/toDos.interface';
import toDosService from '@/services/toDos.service';

class ToDosController {
  public toDosService = new toDosService();

  public getToDos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllToDos: ToDos[] = await this.toDosService.findAllToDos();
      res.status(200).json({ data: findAllToDos, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getToDoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toDoId = Number(req.params.id);
      const findOneToDoData: ToDos = await this.toDosService.findToDosById(toDoId);

      res.status(200).json({ data: findOneToDoData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toDoData: CreateTodoDto = req.body;
      const createToDoData: ToDos = await this.toDosService.createTodo(toDoData);

      res.status(201).json({ data: createToDoData, message: '성공' });
    } catch (e) {
      next(e);
    }
  };

  public updatetoDo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toDoId = Number(req.params.id);
      const toDoData: CreateTodoDto = req.body;
      const updateUserData: ToDos = await this.toDosService.updateToDo(toDoId, toDoData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletetoDo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toDoId = Number(req.params.id);
      const deleteToDoData: ToDos = await this.toDosService.deleteToDo(toDoId);

      res.status(200).json({ data: deleteToDoData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ToDosController;
