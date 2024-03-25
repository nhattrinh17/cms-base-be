import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionActionDto } from './dto/create-permission-action.dto';
import { UpdatePermissionActionDto } from './dto/update-permission-action.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PermissionActionModel } from 'src/model';
import { messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class PermissionActionService {
  constructor(
    @InjectModel(PermissionActionModel)
    private readonly permissionActionModel: typeof PermissionActionModel,
  ) {}

  async create(dto: CreatePermissionActionDto) {
    const checkDuplicate = await this.permissionActionModel.findOne({ where: { slug: dto.slug.trim() } });
    if (checkDuplicate) throw new HttpException(messageResponse.permissionAction.duplicate, HttpStatus.BAD_REQUEST);
    return this.permissionActionModel.create({ ...dto });
  }

  async findAll(pagination: Pagination, search: string, status: string, sort?: any) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search.trim()}%` };
    if (status) filter.status = status;
    const promise1 = this.permissionActionModel.count({ where: filter });
    const promise2 = this.permissionActionModel.findAll({
      //
      where: filter,
      order: sort ? [[sort, 'DESC']] : [['id', 'DESC']],
      offset: pagination.offset,
      limit: pagination.limit,
    });
    const [countDocument, data] = await Promise.all([promise1, promise2]);
    return {
      pagination: { limit: pagination.limit, page: pagination.page, total: countDocument },
      data,
    };
  }

  findOne(id: number) {
    return this.permissionActionModel.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdatePermissionActionDto) {
    const permissionActionById = await this.findOne(id);
    if (!permissionActionById) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    if (permissionActionById.name.trim() != dto.name.trim()) {
      const checkDuplicate = await this.permissionActionModel.findOne({ where: { slug: dto.slug.trim() } });
      if (checkDuplicate) throw new HttpException(messageResponse.permissionAction.duplicate, HttpStatus.BAD_REQUEST);
      return this.permissionActionModel.update({ ...dto }, { where: { id } });
    }
  }

  async remove(id: number) {
    const categoryType = await this.findOne(id);
    if (!categoryType) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    const dataUpdate = { isDeleted: true, deletedAt: new Date() };
    return this.permissionActionModel.update(dataUpdate, { where: { id } });
  }
}
