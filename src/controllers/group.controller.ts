import { NextFunction, Request, Response } from 'express';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import * as S from '../services/index.service';

class GroupController {
  public groupService = new S.groupService();

  async getGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllGroup: I.Group[] = await this.groupService.findAllGroup();
      res.status(200).json({ data: findAllGroup, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  async getGroupById(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = Number(req.params.id);
      const findGroup: I.Group = await this.groupService.findGroupById(groupId);

      res.status(200).json({ data: findGroup, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupData: dto.createGroupDto = req.body;
      const createGroupData: I.Group = await this.groupService.createGroup(groupData);

      res.status(201).json({ data: createGroupData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = Number(req.params.id);
      const groupData: dto.createGroupDto = req.body;
      const updateGroupData: I.Group = await this.groupService.updateGroup(groupId, groupData);

      res.status(200).json({ data: updateGroupData, message: 'update' });
    } catch (error) {
      next(error);
    }
  }

  async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = Number(req.params.id);
      const deleteGrouprData: I.Group = await this.groupService.deleteGroup(groupId);

      res.status(200).json({ data: deleteGrouprData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default GroupController;
