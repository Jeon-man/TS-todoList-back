import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import * as I from '../interfaces';
import * as M from '../models/index.model';
export type ToDosCreationAttributes = Optional<I.ToDos, 'toDoId' | 'toDo' | 'userId' | 'successState'>;

export class ToDosModel extends Model<I.ToDos, ToDosCreationAttributes> implements I.ToDos {
  public toDoId: number;
  public toDo: string;
  public userId: number;
  public successState: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        toDoId: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        toDo: {
          allowNull: false,
          type: DataTypes.STRING(50),
        },
        userId: DataTypes.INTEGER,
        successState: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        tableName: 'ToDos',
        sequelize,
      },
    );
  }

  static associate(DB: typeof M) {
    this.belongsTo(DB.UserModel, {
      as: 'toDos',
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
  }
}
