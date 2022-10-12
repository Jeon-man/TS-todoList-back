import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import * as I from '../interfaces';
import * as M from './index.model';
export type BoardKindCreationAtrributes = Optional<I.BoardKind, 'boardKindId' | 'boardKind'>;

export class boardKindModel extends Model<I.BoardKind, BoardKindCreationAtrributes> implements I.BoardKind {
  boardKindId: number;
  boardKind: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        boardKindId: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        boardKind: {
          allowNull: false,
          type: DataTypes.STRING(30),
          unique: true,
        },
      },
      {
        tableName: 'board_kind',
        sequelize,
      },
    );
  }

  static associate(DB: typeof M) {
    this.hasMany(DB.boardModel, {
      as: 'boardKinds',
      foreignKey: 'boardKindId',
      onDelete: 'cascade',
      hooks: true,
    });
  }
}
