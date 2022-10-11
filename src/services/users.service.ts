import { hash } from 'bcrypt';
import DB from '../databases';
import * as I from '../interfaces';
import * as dto from '../dtos/index.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

export class UserService {
  public users = DB.UserModel;

  async findAllUser(): Promise<I.User[]> {
    const allUser: I.User[] = await this.users.findAll();
    return allUser;
  }

  async findUserById(userId: number): Promise<I.User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: I.User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  async createUser(userData: dto.CreateUserDto): Promise<I.User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: I.User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: I.User = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  async updateUser(userId: number, userData: dto.CreateUserDto): Promise<I.User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: I.User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { userId: userId } });

    const updateUser: I.User = await this.users.findByPk(userId);
    return updateUser;
  }

  async deleteUser(userId: number): Promise<I.User> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    const findUser: I.User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.users.destroy({ where: { userId: userId } });

    return findUser;
  }

  async updateUserGroup(userId: number, groupId: number): Promise<I.User> {
    const findUser = await this.findUserById(userId);
    if (findUser) throw new HttpException(409, '');
    await this.users.update({ groupId: groupId }, { where: { userId: userId } });
    const updateUser: I.User = await this.findUserById(userId);

    return updateUser;
  }
}

export default UserService;
