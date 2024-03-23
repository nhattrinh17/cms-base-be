import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel, ReviewModel } from 'src/model';
import { ProductService } from 'src/product/product.service';
import { messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';
import { isValidPhoneNumber } from 'src/utils';
import { isEmail } from 'class-validator';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: typeof ReviewModel,
    private readonly productService: ProductService,
  ) {}

  async create(dto: CreateReviewDto) {
    if (!dto.reviewerName || !dto.reviewerEmail || !dto.reviewerPhone) throw new HttpException(messageResponse.review.missingData, HttpStatus.BAD_REQUEST);
    // Check email and phone number
    const checkEmail = isEmail(dto.reviewerEmail);
    if (!checkEmail) throw new HttpException(messageResponse.system.emailNotInvalid, HttpStatus.BAD_REQUEST);
    const checkPhoneNumber = isValidPhoneNumber(dto.reviewerPhone);
    if (!checkPhoneNumber) throw new HttpException(messageResponse.system.phoneNumberInvalid, HttpStatus.BAD_REQUEST);

    const product = await this.productService.findOne(dto.productId);
    if (!product) throw new HttpException(messageResponse.review.productNotFound, HttpStatus.BAD_REQUEST);
    return this.reviewModel.create({ ...dto });
  }

  async findAll(pagination: Pagination, productId: string, status: string, sort?: any) {
    const filter: any = {};
    if (productId) filter.productId = productId;
    if (status) filter.status = status;
    const promise1 = this.reviewModel.count({ where: filter });
    const promise2 = this.reviewModel.findAll({
      //
      where: filter,
      order: sort ? [[sort, 'DESC']] : [['id', 'DESC']],
      offset: pagination.offset,
      limit: pagination.limit,
      // attributes: ['id', 'name', 'slug', 'status', 'kind'],
      include: [
        {
          model: ProductModel,
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
    return this.reviewModel.findOne({ where: { id } });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const categoryType = await this.findOne(id);
    if (!categoryType) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    const dataUpdate = { isDeleted: true, deletedAt: new Date() };
    return this.reviewModel.update(dataUpdate, { where: { id } });
  }
}
