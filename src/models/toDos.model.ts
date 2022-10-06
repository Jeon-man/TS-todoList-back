import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import * as I from '../interfaces';

export type ToDosCreationAttributes = Optional<I.ToDos, 'toDoId' | 'toDo' | 'userId' | 'successState'>;

export class ToDosModel extends Model<I.ToDos, ToDosCreationAttributes> implements I.ToDos {
  public toDoId: number;
  public toDo: string;
  public userId: number;
  public successState: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ToDosModel {
  ToDosModel.init(
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

  return ToDosModel;
}
