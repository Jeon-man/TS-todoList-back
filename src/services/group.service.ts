import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';

export class groupService {
  async findAllGroup(): Promise<I.Group[]> {
    return await DB.GroupModel.findAll();
  }

  async findGroupById(groupId: number): Promise<I.Group> {
    const findGroup: I.Group = await DB.GroupModel.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, '');
    return findGroup;
  }

  async createGroup(groupData: dto.createGroupDto): Promise<I.Group> {
    const createGroupData: I.Group = await DB.GroupModel.create({ ...groupData });
    return createGroupData;
  }

  async updateGroup(groupId: number, groupData: dto.createGroupDto): Promise<I.Group> {
    const findGroup: I.Group = await DB.GroupModel.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, '');
    await DB.GroupModel.update({ ...groupData }, { where: { groupId: groupId } });
    const updateGroup = await this.findGroupById(groupId);
    return updateGroup;
  }

  async deleteGroup(groupId: number): Promise<I.Group> {
    const findGroup = await DB.GroupModel.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, '');
    await DB.GroupModel.destroy({ where: { groupId: groupId } });
    return findGroup;
  }
}
