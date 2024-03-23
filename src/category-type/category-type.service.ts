import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryTypeDto } from './dto/create-category-type.dto';
import { UpdateCategoryTypeDto } from './dto/update-category-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryTypeModel } from 'src/model';
import { generateSlug } from 'src/utils';
import { messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class CategoryTypeService {
  constructor(
    @InjectModel(CategoryTypeModel)
    private readonly categoryTypeModel: typeof CategoryTypeModel,
  ) {}

  async create(dto: CreateCategoryTypeDto) {
    if (!dto.kind || !dto.name) throw new HttpException(messageResponse.categoryType.missingData, HttpStatus.BAD_REQUEST);
    dto.slug = dto.slug || generateSlug(dto.name);
    const checkDuplicate = await this.categoryTypeModel.findOne({
      where: {
        slug: dto.slug,
      },
    });
    if (checkDuplicate) throw new HttpException(messageResponse.categoryType.duplicate, HttpStatus.BAD_REQUEST);

    return this.categoryTypeModel.create({ ...dto });
  }

  async findAll(pagination: Pagination, search: string, status: string, sort?: any) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search.trim()}%` };
    if (status) filter.status = status;
    const promise1 = this.categoryTypeModel.count({ where: filter });
    const promise2 = this.categoryTypeModel.findAll({
      //
      where: filter,
      order: sort ? [[sort, 'DESC']] : [['id', 'DESC']],
      offset: pagination.offset,
      limit: pagination.limit,
      attributes: ['id', 'name', 'slug', 'status', 'kind'],
    });
    const [countDocument, data] = await Promise.all([promise1, promise2]);
    return {
      pagination: { limit: pagination.limit, page: pagination.page, total: countDocument },
      data,
    };
  }

  findOne(id: number) {
    return this, this.categoryTypeModel.findOne({ where: { id }, attributes: ['id', 'name', 'slug', 'status', 'kind'] });
  }

  async update(id: number, dto: UpdateCategoryTypeDto) {
    const categoryType = await this.findOne(id);
    if (!categoryType) throw new HttpException(messageResponse.categoryType.notFound, HttpStatus.BAD_REQUEST);
    if (categoryType.slug !== dto.slug) {
      const checkDuplicate = await this.categoryTypeModel.findOne({
        where: {
          slug: dto.slug,
        },
      });
      if (checkDuplicate) throw new HttpException(messageResponse.categoryType.duplicate, HttpStatus.BAD_REQUEST);
    }
    return this.categoryTypeModel.update(dto, { where: { id } });
  }

  async remove(id: number) {
    const categoryType = await this.findOne(id);
    if (!categoryType) throw new HttpException(messageResponse.categoryType.notFound, HttpStatus.BAD_REQUEST);
    const dataUpdate = { isDeleted: true, deletedAt: new Date() };
    return this.categoryTypeModel.update(dataUpdate, { where: { id } });
  }
}
