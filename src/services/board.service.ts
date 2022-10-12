import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';

export class BoardService {
  async findAllBoard(): Promise<I.Board[]> {
    return DB.boardModel.findAll();
  }

  async findAllByBoardKindId(boardKindId: number): Promise<I.Board[]> {
    const findAllSameKindBoard: I.Board[] = await DB.boardModel.findAll({ where: { boardKindId: boardKindId } });
    if (!findAllSameKindBoard) throw new HttpException(409, '');

    return findAllSameKindBoard;
  }

  async findOneBoard(boardId: number): Promise<I.Board> {
    const findBoard: I.Board = await DB.boardModel.findByPk(boardId);
    if (!findBoard) throw new HttpException(409, '');

    return findBoard;
  }

  async createBoard(boardData: dto.createBoardDto, boardKindId: number, userId: number): Promise<I.Board> {
    const createBoardData: I.Board = await DB.boardModel.create({ ...boardData, boardKindId: boardKindId, userId: userId });
    if (!createBoardData) throw new HttpException(409, '');

    return createBoardData;
  }

  async updateBoard(boardId: number, updateData: dto.updateBoardDto) {
    const findBoard: I.Board = await this.findOneBoard(boardId);
    if (!findBoard) throw new HttpException(409, '');

    await DB.boardModel.update({ ...updateData }, { where: { boardId: boardId } });
    const updateBoard: I.Board = await this.findOneBoard(boardId);

    return updateBoard;
  }

  async deleteBoard(boardId: number): Promise<I.Board> {
    const findBoard: I.Board = await this.findOneBoard(boardId);
    if (!findBoard) throw new HttpException(409, '');

    await DB.boardModel.destroy({ where: { boardId: boardId } });

    return findBoard;
  }
}
