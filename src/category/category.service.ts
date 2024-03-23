import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel, CategoryTypeModel } from 'src/model';
import { messageResponse } from 'src/constants';
import { CategoryTypeService } from 'src/category-type/category-type.service';
import { generateSlug } from 'src/utils';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly categoryModel: typeof CategoryModel,
    private readonly categoryTypeService: CategoryTypeService,
  ) {}

  async checkCategoryTypeAndSlug(categoryTypeId: number, slug?: string): Promise<void> {
    const checkCategoryType = await this.categoryTypeService.findOne(categoryTypeId);
    if (!checkCategoryType) throw new HttpException(messageResponse.category.categoryTypeNotFound, HttpStatus.BAD_REQUEST);
    if (slug) {
      const checkDuplicate = await this.categoryModel.findOne({
        where: {
          slug: slug,
          categoryTypeId: categoryTypeId,
        },
      });
      if (checkDuplicate) throw new HttpException(messageResponse.category.duplicate, HttpStatus.BAD_REQUEST);
    }
  }

  async create(dto: CreateCategoryDto) {
    if (!dto.categoryTypeId || !dto.name) throw new HttpException(messageResponse.category.missingData, HttpStatus.BAD_REQUEST);
    dto.slug = dto.slug || generateSlug(dto.name);
    await this.checkCategoryTypeAndSlug(dto.categoryTypeId, dto.slug);
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
          model: CategoryTypeModel,
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

  findOne(id: number) {
    return this, this.categoryModel.findOne({ where: { id }, attributes: ['id', 'name', 'slug', 'status'] });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const checkExit = await this.findOne(id);
    if (!checkExit) throw new HttpException(messageResponse.category.notFound, HttpStatus.BAD_REQUEST);
    if (dto.categoryTypeId !== checkExit.categoryTypeId) await this.checkCategoryTypeAndSlug(dto.categoryTypeId);
    if (dto.slug !== checkExit.slug) await this.checkCategoryTypeAndSlug(dto.categoryTypeId, dto.slug);
    return this.categoryModel.update(dto, { where: { id } });
  }

  async remove(id: number) {
    const categoryType = await this.findOne(id);
    if (!categoryType) throw new HttpException(messageResponse.category.notFound, HttpStatus.BAD_REQUEST);
    const dataUpdate = { isDeleted: true, deletedAt: new Date() };
    return this.categoryModel.update(dataUpdate, { where: { id } });
  }
}
