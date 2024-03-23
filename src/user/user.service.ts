import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pagination } from 'src/middlewares';
import { UserModel } from 'src/model';
import { Helper } from 'src/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
    private readonly helper: Helper,
  ) {}

  async create(dto: CreateUserDto) {
    if (+dto.phone.split('')[0] == 0) dto.phone = dto.phone.slice(1);
    const checkDuplicate = await this.userModel.findOne({
      where: {
        [Op.or]: [{ username: dto.username }, { email: dto.email }, { phone: dto.phone }],
      },
    });
    if (checkDuplicate) throw new HttpException('Account already exists, please try again', HttpStatus.BAD_REQUEST);
    if (!dto.password) throw new HttpException('Password required', HttpStatus.BAD_REQUEST);
    const password = String(dto.password).trim();
    dto.password = await this.helper.hashString(password);
    dto.gender = dto.gender.toUpperCase();
    return this.userModel.create({ ...dto });
  }

  async findAll(pagination: Pagination, search: string, status: string, sort?: any) {
    const filter: any = {};
    if (search) filter[Op.or] = [{ username: { [Op.like]: `%${search.trim()}%` } }, { name: { [Op.like]: `%${search.trim()}%` } }];
    if (status) filter.status = status;
    const promise1 = this.userModel.count({ where: filter });
    console.log('🚀 ~ file: user.service.ts:32 ~ UserService ~ findAll ~ filter:', JSON.stringify(filter));
    const promise2 = this.userModel.findAll({
      //
      where: filter,
      order: sort ? [sort, 'DESC'] : ['id', 'DESC'],
      offset: pagination.offset,
      limit: pagination.limit,
      attributes: ['id', 'email', 'username', 'name', 'phone', 'status', 'gender', 'avatar'],
    });
    const [countDocument, data] = await Promise.all([promise1, promise2]);
    return {
      pagination: { limit: pagination.limit, page: pagination.page, total: countDocument },
      data,
    };
  }

  findOne(id: string) {
    return this, this.userModel.findOne({ where: { id }, attributes: ['id', 'email', 'username', 'name', 'phone', 'status', 'gender', 'avatar'] });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
