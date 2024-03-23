import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { SendMailService } from 'src/send-mail/send-mail.service';
import { InjectModel } from '@nestjs/sequelize';
import { BlogModel, CategoryModel } from 'src/model';
import { CategoryService } from 'src/category/category.service';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogModel)
    private readonly blogModel: typeof BlogModel,
    private readonly categoryService: CategoryService,
  ) {}

  async create(dto: CreateBlogDto) {
    const category = await this.categoryService.findOne(dto.categoryId);
    if (!category) throw new HttpException(messageResponse.blog.categoryNotFound, HttpStatus.BAD_REQUEST);
    const slug = generateSlug(dto.title.toLowerCase());
    const createBlog = await this.blogModel.create({ ...dto });
    createBlog.slug = `${slug}i.${new Date().getTime()}i.${createBlog.id}`;
    return createBlog.save();
  }

  async findAll(pagination: Pagination, search: string, status: string, sort?: any) {
    const filter: any = {};
    if (search) filter.title = { [Op.like]: `%${search.trim()}%` };
    if (status) filter.status = status;
    const promise1 = this.blogModel.count({ where: filter });
    const promise2 = this.blogModel.findAll({
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
    return this.blogModel.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateBlogDto) {
    const blogById = await this.findOne(id);
    if (!blogById) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    if (blogById.categoryId != dto.categoryId) {
      const category = await this.categoryService.findOne(dto.categoryId);
      if (!category) throw new HttpException(messageResponse.blog.categoryNotFound, HttpStatus.BAD_REQUEST);
    }
    let slug = blogById.slug;
    if (blogById.title != dto.title) {
      slug = `${generateSlug(dto.title.toLowerCase())}i.${new Date().getTime()}i.${id}`;
    }
    // console.log('🚀 ~ BlogService ~ update ~ slug:', slug);
    return this.blogModel.update({ ...dto, slug: slug }, { where: { id } });
  }

  async remove(id: number) {
    const categoryType = await this.findOne(id);
    if (!categoryType) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    const dataUpdate = { isDeleted: true, deletedAt: new Date() };
    return this.blogModel.update(dataUpdate, { where: { id } });
  }
}
