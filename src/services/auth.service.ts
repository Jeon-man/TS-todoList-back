import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import * as dto from '../dtos/index.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import * as I from 'interfaces/index';
import { isEmpty } from '@utils/util';
import mailSender from '@utils/mail';
import { randomNumber } from '@utils/util';

export class AuthService {
  public users = DB.UserModel;

  public async signup(userData: dto.CreateUserDto): Promise<I.User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: I.User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const authKey: string = randomNumber();
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: I.User = await this.users.create({ ...userData, password: hashedPassword, authKey: authKey });

    return createUserData;
  }

  public async authMailSend(userData: dto.CreateUserDto): Promise<void> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: I.User = await this.users.findOne({ where: { email: userData.email } });

    const emailSendUserdata = {
      toEmail: userData.email,
      subject: '이메일 인증입니다.',
      text: `http://localhost:3000/${findUser.userId}/${findUser.authKey}`,
    };

    mailSender.sendMail(emailSendUserdata);
  }

  public async checkToEmailAuthUpdate(userData: dto.CreateUserDto, paramKey: string): Promise<void> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: I.User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser.authKey === paramKey) {
      this.users.update({ authState: true }, { where: { userId: findUser.userId } });
    } else {
      throw new HttpException(400, 'match error');
    }
  }

  public async login(userData: dto.CreateUserDto): Promise<{ cookie: string; findUser: I.User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: I.User = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: I.User): Promise<I.User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: I.User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: I.User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.userId };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
