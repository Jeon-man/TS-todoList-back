import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';

export class groupService {
  public group = DB.GroupModel;

  public async findAllGroup(): Promise<I.Group[]> {
    return await this.group.findAll();
  }

  public async findGroupById(groupId: number): Promise<I.Group> {
    const findGroup: I.Group = await this.group.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, '');
    return findGroup;
  }

  public async createGroup(groupData: dto.createGroupDto): Promise<I.Group> {
    const createGroupData: I.Group = await this.group.create({ ...groupData });
    return createGroupData;
  }

  public async updateGroup(groupId: number, groupData: dto.createGroupDto): Promise<I.Group> {
    const findGroup: I.Group = await this.group.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, '');
    await this.group.update({ ...groupData }, { where: { groupId: groupId } });
    const updateGroup = await this.findGroupById(groupId);
    return updateGroup;
  }

  public async deleteGroup(groupId: number): Promise<I.Group> {
    const findGroup = await this.group.findByPk(groupId);
    if (!findGroup) throw new HttpException(409, '');
    await this.group.destroy({ where: { groupId: groupId } });
    return findGroup;
  }
}
