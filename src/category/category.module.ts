import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from 'src/model/category.model';
import { CategoryTypeModule } from 'src/category-type/category-type.module';

@Module({
  imports: [CategoryTypeModule, SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
