import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ name: 'name', description: 'Tên sản phẩm', type: String, required: true })
  name: string;

  @ApiProperty({ name: 'status', description: 'Trạng thái sản phẩm', type: String, required: true })
  status: string;

  @ApiProperty({ name: 'content', description: 'Nội dung sản phẩm', type: String, required: true })
  content: string;

  @ApiProperty({ name: 'price', description: 'Giá sản phẩm', type: Number, required: true })
  price: number;

  @ApiProperty({ name: 'featuredImage', description: 'Tên sản phẩm', type: String, required: true })
  featuredImage: string;

  @ApiProperty({ name: 'images', description: 'Tên sản phẩm', type: [String], required: true })
  images: string[];

  @ApiProperty({ name: 'description', description: 'Mô tả sản phẩm', type: String, required: true })
  description: string;

  @ApiProperty({ name: 'code', description: 'Mã sp', type: String, required: true })
  code: string;

  @ApiProperty({ name: 'netWeight', description: 'Khối lượng tịnh', type: String, required: true })
  netWeight: number;

  @ApiProperty({ name: 'brand', description: 'Tên thương hiệu', type: String, required: true })
  brand: string;

  @ApiProperty({ name: 'categoryId', description: 'Id danh mục', type: String, required: true })
  categoryId: number;
}
