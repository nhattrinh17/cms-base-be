import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel, ProductModel } from 'src/model';
import { CategoryService } from 'src/category/category.service';
import { generateSlug } from 'src/utils';
import { messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@ApiTags('Product')
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: typeof ProductModel,
    private readonly categoryService: CategoryService,
  ) {}

  async create(dto: CreateProductDto) {
    if (!dto.categoryId || !dto.name || !dto.price || !dto.featuredImage || !dto.images?.length) throw new HttpException(messageResponse.product.missingData, HttpStatus.BAD_REQUEST);
    const category = await this.categoryService.findOne(dto.categoryId);
    if (!category) throw new HttpException(messageResponse.product.categoryNotFound, HttpStatus.BAD_REQUEST);
    const slug = generateSlug(dto.name.toLowerCase());
    const createBlog = await this.productModel.create({ ...dto, images: JSON.stringify(dto.images) });
    createBlog.slug = `${slug}i.${new Date().getTime()}i.${createBlog.id}`;
    return createBlog.save();
  }

  async findAll(pagination: Pagination, search: string, status: string, sort?: any) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search.trim()}%` };
    if (status) filter.status = status;
    const promise1 = this.productModel.count({ where: filter });
    const promise2 = this.productModel.findAll({
      //
      where: filter,
      order: sort ? [[sort, 'DESC']] : [['id', 'DESC']],
      offset: pagination.offset,
      limit: pagination.limit,
      // attributes: ['id', 'name', 'slug', 'status', 'kind'],
      include: [
        {
          model: CategoryModel,
          attributes: ['id', 'name'],
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
    return this.productModel.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateProductDto) {
    const productById = await this.findOne(id);
    if (!productById) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    if (productById.categoryId != dto.categoryId) {
      const category = await this.categoryService.findOne(dto.categoryId);
      if (!category) throw new HttpException(messageResponse.blog.categoryNotFound, HttpStatus.BAD_REQUEST);
    }
    let slug = productById.slug;
    if (productById.name != dto.name) {
      slug = `${generateSlug(dto.name.toLowerCase())}i.${new Date().getTime()}i.${id}`;
    }
    // console.log('🚀 ~ BlogService ~ update ~ slug:', slug);
    return this.productModel.update({ ...dto, slug: slug, images: dto.images?.length ? JSON.stringify(dto.images) : productById.images }, { where: { id } });
  }

  async remove(id: number) {
    const categoryType = await this.findOne(id);
    if (!categoryType) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    const dataUpdate = { isDeleted: true, deletedAt: new Date() };
    return this.productModel.update(dataUpdate, { where: { id } });
  }
}
