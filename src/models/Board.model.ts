import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import * as I from '../interfaces';
import * as M from './index.model';
export type BoardCreationAtrributes = Optional<I.Board, 'boardKindId' | 'contents' | 'likeCount' | 'title' | 'userId' | 'boardId'>;

export class boardModel extends Model<I.Board, BoardCreationAtrributes> implements I.Board {
  boardId: number;
  userId: number;
  boardKindId: string;
  title: string;
  contents: string;
  likeCount: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        boardKindId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        boardId: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        contents: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        likeCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        tableName: 'board',
        sequelize,
      },
    );
  }
  static associate(DB: typeof M) {
    this.belongsTo(DB.boardKindModel, {
      as: 'boardKinds',
      foreignKey: 'boardKindId',
      onDelete: 'cascade',
      hooks: true,
    });
    this.belongsTo(DB.UserModel, {
      as: 'users',
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
  }
}
