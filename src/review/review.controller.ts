import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperationCustom('Review', 'Post')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @ApiQuery({
    name: 'productId',
    description: 'Mã sản phẩm',
  })
  @ApiQuery({
    name: 'status',
    description: 'Trạng thái hiển thị',
  })
  @ApiQuery({
    name: 'sort',
    description: 'Thứ tự sắp xếp',
  })
  @BaseFilter()
  @ApiOperationCustom('Review', 'Get')
  findAll(@Req() req, @Query('productId') productId: string, @Query('status') status: string, @Query('sort') sort: string) {
    return this.reviewService.findAll(req['pagination'], productId, status, sort);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reviewService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  //   return this.reviewService.update(+id, updateReviewDto);
  // }

  @Delete(':id')
  @ApiOperationCustom('Review', 'Delete')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
