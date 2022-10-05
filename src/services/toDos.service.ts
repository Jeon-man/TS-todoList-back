import DB from '@databases';
import { CreateTodoDto } from '@/dtos/toDos.dto';
import { ToDos } from '@/interfaces/toDos.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from 'class-validator';

class ToDosService {
  public toDos = DB.ToDos;

  public async findAllToDos(): Promise<ToDos[]> {
    return await this.toDos.findAll();
  }

  public async findToDosById(toDoId: number): Promise<ToDos> {
    if (isEmpty(toDoId)) throw new HttpException(400, '입력이 없습니다.');

    const findToDo: ToDos = await this.toDos.findByPk(toDoId);
    if (!findToDo) throw new HttpException(409, '유효하지 않은 todoid 입니다.');
    return findToDo;
  }

  public async createTodo(toDoData: CreateTodoDto): Promise<ToDos> {
    if (isEmpty(toDoData)) throw new HttpException(400, '입력이 없습니다');
    const createTodoData: ToDos = await this.toDos.create({ ...toDoData });
    return createTodoData;
  }

  public async updateToDo(toDoId: number, toDoData: CreateTodoDto): Promise<ToDos> {
    if (isEmpty(toDoData)) throw new HttpException(400, '입력이 없습니다');

    const findToDo: ToDos = await this.findToDosById(toDoId);
    if (!findToDo) throw new HttpException(409, '유효하지 않은 todoid 입니다.');

    await this.toDos.update({ ...toDoData }, { where: { toDoId: toDoId } });
    const updateToDo: ToDos = await this.findToDosById(toDoId);
    return updateToDo;
  }

  public async deleteToDo(toDoId: number): Promise<ToDos> {
    if (isEmpty(toDoId)) throw new HttpException(400, '입력이 없습니다');

    const findToDo: ToDos = await this.findToDosById(toDoId);
    if (!findToDo) throw new HttpException(409, '유효하지 않은 todoid 입니다.');

    await this.toDos.destroy({ where: { toDoId: toDoId } });
    return findToDo;
  }
}

export default ToDosService;
