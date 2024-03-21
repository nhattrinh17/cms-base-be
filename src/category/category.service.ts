import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category, CategoryType } from 'src/model';
import { messageResponse } from 'src/constants';
import { CategoryTypeService } from 'src/category-type/category-type.service';
import { generateSlug } from 'src/utils';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    private readonly categoryTypeService: CategoryTypeService,
  ) {}

  async create(dto: CreateCategoryDto) {
    if (!dto.categoryTypeId || !dto.name) throw new HttpException(messageResponse.category.missingData, HttpStatus.BAD_REQUEST);
    const checkCategoryType = await this.categoryTypeService.findOne(dto.categoryTypeId);
    if (!checkCategoryType) throw new HttpException(messageResponse.category.categoryTypeNotFound, HttpStatus.BAD_REQUEST);
    dto.slug = dto.slug || generateSlug(dto.name);
    const checkDuplicate = await this.categoryModel.findOne({
      where: {
        slug: dto.slug,
        categoryTypeId: dto.categoryTypeId,
      },
    });
    if (checkDuplicate) throw new HttpException(messageResponse.category.duplicate, HttpStatus.BAD_REQUEST);

    return this.categoryModel.create({ ...dto });
  }

  async findAll(pagination: Pagination, search: string, status: string, sort?: any) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search.trim()}%` };
    if (status) filter.status = status;
    const promise1 = this.categoryModel.count({ where: filter });
    const promise2 = this.categoryModel.findAll({
      //
      where: filter,
      order: sort ? [[sort, 'DESC']] : [['id', 'DESC']],
      offset: pagination.offset,
      limit: pagination.limit,
      // attributes: ['id', 'name', 'slug', 'status', 'kind'],
      include: [
        {
          model: CategoryType,
          attributes: ['id', 'name', 'slug', 'status', 'kind'],
        },
      ],
    });
    const [countDocument, data] = await Promise.all([promise1, promise2]);
    return {
      pagination: { limit: pagination.limit, page: pagination.page, total: countDocument },
      data,
    };
  }

  findOne(id: string) {
    return this, this.categoryModel.findOne({ where: { id }, attributes: ['id', 'name', 'slug', 'status', 'kind'] });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    const categoryType = await this.findOne(id);
    if (!categoryType) throw new HttpException(messageResponse.category.notFound, HttpStatus.BAD_REQUEST);
    const dataUpdate = { isDeleted: true, deletedAt: new Date() };
    return this.categoryModel.update(dataUpdate, { where: { id } });
  }
}
