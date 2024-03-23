import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from 'src/model';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule, SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
