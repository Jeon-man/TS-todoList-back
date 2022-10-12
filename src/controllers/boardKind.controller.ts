import { NextFunction, Request, Response } from 'express';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import * as S from '../services/index.service';

class BoardKindController {
  public boardKindService = new S.boardKindService();

  async getBoardKind(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllBoardKind = await this.boardKindService.findAllBoardKind();
      res.status(200).json({ data: findAllBoardKind, message: 'find All' });
    } catch (error) {
      next(error);
    }
  }

  async getBoardKindById(req: Request, res: Response, next: NextFunction) {
    try {
      const boardKindId = Number(req.params.id);
      const findBoardKind = await this.boardKindService.findBoardKindById(boardKindId);

      res.status(200).json({ data: findBoardKind, message: 'find one' });
    } catch (error) {
      next(error);
    }
  }

  async createBoardKind(req: Request, res: Response, next: NextFunction) {
    try {
      const boardKindData: dto.createBoardKindDto = req.body;
      const createBoardKind: I.BoardKind = await this.boardKindService.createBoardKind(boardKindData);

      res.status(201).json({ data: createBoardKind, message: 'create' });
    } catch (error) {
      next(error);
    }
  }

  async updateBoardKind(req: Request, res: Response, next: NextFunction) {
    try {
      const updateBoardKindId = Number(req.params.id);
      const updateBoardKind: dto.createBoardKindDto = req.body;

      const updateBoardKindData: I.BoardKind = await this.boardKindService.updateBoardKind(updateBoardKindId, updateBoardKind);

      res.status(200).json({ data: updateBoardKindData, message: 'update' });
    } catch (erre) {
      next(next);
    }
  }

  async deleteBoardKind(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteBoardKindId = Number(req.params.id);
      const deleteBoardKindData = await this.boardKindService.deleteBoardKind(deleteBoardKindId);

      res.status(200).json({ Data: deleteBoardKindData, message: 'delete' });
    } catch (error) {
      next(error);
    }
  }
}

export default BoardKindController;
