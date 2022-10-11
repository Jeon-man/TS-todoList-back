import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import * as I from '../interfaces';
import * as M from '../models/index.model';
export type UserCreationAttributes = Optional<I.User, 'userId' | 'email' | 'password'>;

export class UserModel extends Model<I.User, UserCreationAttributes> implements I.User {
  public userId: number;
  public email: string;
  public password: string;
  public authKey: string;
  public authState: boolean;
  public groupId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    this.init(
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
        authKey: {
          allowNull: false,
          type: DataTypes.STRING(10),
        },
        authState: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        groupId: DataTypes.INTEGER,
      },
      {
        tableName: 'users',
        sequelize,
      },
    );
  }
  static asscociate(DB: typeof M) {
    this.hasMany(DB.ToDosModel, {
      as: 'toDos',
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
    this.belongsTo(DB.GroupModel, {
      as: 'users',
      foreignKey: 'groupId',
      onDelete: 'set null',
      hooks: true,
    });
  }
}
