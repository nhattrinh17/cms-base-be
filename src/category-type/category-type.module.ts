import { Module } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { CategoryTypeController } from './category-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryTypeModel } from 'src/model';

@Module({
  imports: [SequelizeModule.forFeature([CategoryTypeModel])],
  controllers: [CategoryTypeController],
  providers: [CategoryTypeService],
  exports: [CategoryTypeService],
})
export class CategoryTypeModule {}
