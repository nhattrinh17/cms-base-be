import { Module } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { CategoryTypeController } from './category-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryType } from 'src/model';

@Module({
  imports: [SequelizeModule.forFeature([CategoryType])],
  controllers: [CategoryTypeController],
  providers: [CategoryTypeService],
  exports: [CategoryTypeService],
})
export class CategoryTypeModule {}
