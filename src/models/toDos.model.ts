import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ToDos } from '@interfaces/toDos.interface';

export type ToDosCreationAttributes = Optional<ToDos, 'toDoId' | 'toDo' | 'userId'>;

export class ToDosModel extends Model<ToDos, ToDosCreationAttributes> implements ToDos {
  public toDoId: number;
  public toDo: string;
  public userId: number;

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
    },
    {
      tableName: 'ToDos',
      sequelize,
    },
  );

  return ToDosModel;
}
