import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ name: 'name', type: String, description: 'Họ và tên', required: true })
  name: string;

  @ApiProperty({ name: 'slug', type: String, description: 'slug url' })
  slug: string;

  @ApiProperty({ name: 'status', type: String, description: 'Trạng thái' })
  status: string;

  @ApiProperty({ name: 'categoryType', type: Number, description: 'id loại danh mục', required: true })
  categoryTypeId: number;
}
