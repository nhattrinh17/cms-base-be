import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ProductModule } from 'src/product/product.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewModel } from 'src/model';

@Module({
  imports: [ProductModule, SequelizeModule.forFeature([ReviewModel])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
