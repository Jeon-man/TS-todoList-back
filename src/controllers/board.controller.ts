import { NextFunction, Request, Response } from 'express';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import * as S from '../services/index.service';

class BoardController {
  public boardService = new S.BoardService();
  public boardKindService = new S.BoardKindService();
  async getBoards(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllBoards: I.Board[] = await this.boardService.findAllBoard();

      res.status(200).json({ data: findAllBoards, message: 'find all' });
    } catch (error) {
      next(error);
    }
  }

  async getSameKindBoards(req: Request, res: Response, next: NextFunction) {
    try {
      const boardKindName = req.params.boardKind;
      const boardKindId = (await this.boardKindService.findBoardKindByBoardKindName(boardKindName)).boardKindId;
      const findSameKindAllBoards: I.Board[] = await this.boardService.findAllByBoardKindId(boardKindId);

      res.status(200).json({ data: findSameKindAllBoards, message: 'find all board of Same Kind' });
    } catch (error) {
      next(error);
    }
  }

  async createBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const boardKindName = req.params.boardKind;
      const boardKindId = (await this.boardKindService.findBoardKindByBoardKindName(boardKindName)).boardKindId;

      const creatBoardData: dto.createBoardDto = req.body;
      const createBoard: I.Board = await this.boardService.createBoard(creatBoardData, boardKindId, userId);

      res.status(201).json({ data: createBoard, meesage: 'create' });
    } catch (error) {
      next(error);
    }
  }

  async updateBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const boardId = Number(req.params.boardId);
      const boardData: dto.updateBoardDto = req.body;
      const updateBoardData: I.Board = await this.boardService.updateBoard(boardId, boardData);

      res.status(200).json({ data: updateBoardData, message: 'update' });
    } catch (error) {
      next(error);
    }
  }

  async deleteBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const boardId = Number(req.params.boardId);
      const deleteBoardData: I.Board = await this.boardService.deleteBoard(boardId);

      res.status(200).json({ data: deleteBoardData, message: 'delete' });
    } catch (error) {
      next(error);
    }
  }
}

export default BoardController;
