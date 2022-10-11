import { NextFunction, Request, Response } from 'express';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import * as S from '../services/index.service';

class GroupController {
  public groupService = new S.groupService();

  public getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllGroup: I.Group[] = await this.groupService.findAllGroup();
      res.status(200).json({ data: findAllGroup, message: 'findAll' });
    } catch (e) {
      next(e);
    }
  };

  public getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = Number(req.params.id);
      const findGroup: I.Group = await this.groupService.findGroupById(groupId);

      res.status(200).json({ data: findGroup, message: 'findOne' });
    } catch (e) {
      next(e);
    }
  };

  public createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupData: dto.createGroupDto = req.body;
      const createGroupData: I.Group = await this.groupService.createGroup(groupData);

      res.status(201).json({ data: createGroupData, message: 'created' });
    } catch (e) {
      next(e);
    }
  };

  public updateGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = Number(req.params.id);
      const groupData: dto.createGroupDto = req.body;
      const updateGroupData: I.Group = await this.groupService.updateGroup(groupId, groupData);

      res.status(200).json({ data: updateGroupData, message: 'update' });
    } catch (e) {
      next(e);
    }
  };

  public deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = Number(req.params.id);
      const deleteGrouprData: I.Group = await this.groupService.deleteGroup(groupId);

      res.status(200).json({ data: deleteGrouprData, message: 'deleted' });
    } catch (e) {
      next(e);
    }
  };
}

export default GroupController;
