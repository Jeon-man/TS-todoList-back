import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import * as I from '../interfaces';
import * as M from '../models/index.model';
export type GroupCreateionAtrributes = Optional<I.Group, 'groupId' | 'groupName'>;

export class GroupModel extends Model<I.Group, GroupCreateionAtrributes> implements I.Group {
  groupId: number;
  groupName: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        groupId: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        groupName: {
          allowNull: false,
          type: DataTypes.STRING(50),
        },
      },
      {
        tableName: 'group',
        sequelize,
      },
    );
  }
  static associate(DB: typeof M) {
    this.hasMany(DB.UserModel, {
      as: 'users',
      foreignKey: 'groupId',
      onDelete: 'set null',
      hooks: true,
    });
  }
}
