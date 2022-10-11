import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from 'class-validator';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';

export class ToDosService {
  async findAllToDos(): Promise<I.ToDos[]> {
    return await DB.ToDosModel.findAll();
  }

  async findToDosById(toDoId: number): Promise<I.ToDos> {
    if (isEmpty(toDoId)) throw new HttpException(400, '입력이 없습니다.');

    const findToDo: I.ToDos = await DB.ToDosModel.findByPk(toDoId);
    if (!findToDo) throw new HttpException(409, '유효하지 않은 todoid 입니다.');
    return findToDo;
  }

  async createTodo(toDoData: dto.CreateTodoDto): Promise<I.ToDos> {
    if (isEmpty(toDoData)) throw new HttpException(400, '입력이 없습니다');
    const createTodoData: I.ToDos = await DB.ToDosModel.create({ ...toDoData });
    return createTodoData;
  }

  async updateToDo(toDoId: number, toDoData: dto.CreateTodoDto): Promise<I.ToDos> {
    if (isEmpty(toDoData)) throw new HttpException(400, '입력이 없습니다');

    const findToDo: I.ToDos = await this.findToDosById(toDoId);
    if (!findToDo) throw new HttpException(409, '유효하지 않은 todoid 입니다.');

    await DB.ToDosModel.update({ ...toDoData }, { where: { toDoId: toDoId } });
    const updateToDo: I.ToDos = await this.findToDosById(toDoId);
    return updateToDo;
  }

  async deleteToDo(toDoId: number): Promise<I.ToDos> {
    if (isEmpty(toDoId)) throw new HttpException(400, '입력이 없습니다');

    const findToDo: I.ToDos = await this.findToDosById(toDoId);
    if (!findToDo) throw new HttpException(409, '유효하지 않은 todoid 입니다.');

    await DB.ToDosModel.destroy({ where: { toDoId: toDoId } });
    return findToDo;
  }

  async updateSuccessState(toDoId: number): Promise<I.ToDos> {
    await DB.ToDosModel.update({ successState: true }, { where: { toDoId: toDoId } });
    const updateToDo: I.ToDos = await this.findToDosById(toDoId);
    return updateToDo;
  }
}

export default ToDosService;
