import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import * as I from '../interfaces';

export type UserCreationAttributes = Optional<I.User, 'userId' | 'email' | 'password'>;

export class UserModel extends Model<I.User, UserCreationAttributes> implements I.User {
  public userId: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      userId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
