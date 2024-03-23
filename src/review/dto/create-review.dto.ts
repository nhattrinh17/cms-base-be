import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ name: 'reviewerName', description: 'Name of the reviewer', type: String, required: true })
  reviewerName: string;

  @ApiProperty({ name: 'reviewerEmail', description: 'Email người gửi', type: String, required: true })
  reviewerEmail: string;

  @ApiProperty({ name: 'reviewerPhone', description: 'Số điện thoại người gửi', type: String, required: true })
  reviewerPhone: string;

  @ApiProperty({ name: 'content', description: 'Nội dung', type: String, required: true })
  content: string;

  @ApiProperty({ name: 'starsCount', description: 'Số sao đánh giá', type: Number, required: true })
  starsCount: number;

  @ApiProperty({ name: 'images', description: 'Danh sách ảnh', type: String, required: true })
  images: string;

  @ApiProperty({ name: 'productId', description: 'id sản phẩm', type: Number, required: true })
  productId: number;
}
