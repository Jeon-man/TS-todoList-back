import { Router } from 'express';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import validationMiddleware from '@middlewares/validation.middleware';
import BoardController from '@/controllers/board.controller';

class BoardRoute implements I.Routes {
  public path = 'board';
  public router = Router();
  public boardController = new BoardController();

  constructor() {
    this.initializeRoutes;
  }
  private initializeRoutes() {
    this.router
      .get(`${this.path}/all-board`, this.boardController.getBoards)
      .get(`${this.path}/:boardKind`, this.boardController.getSameKindBoards)
      .post(`${this.path}/:boardKind/user/:userId`, validationMiddleware(dto.createBoardDto, 'body'), this.boardController.createBoard)
      .put(`${this.path}/update-board/:boardId`, validationMiddleware(dto.createBoardDto, 'body'), this.boardController.updateBoard)
      .delete(`${this.path}/delete-board/:boardId`, this.boardController.deleteBoard);
  }
}

export default BoardRoute;
