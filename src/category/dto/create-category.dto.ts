import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ name: 'name', description: 'Họ và tên', required: true })
  name: string;

  @ApiProperty({ name: 'slug', description: 'slug url' })
  slug: string;

  @ApiProperty({ name: 'status', description: 'Trạng thái' })
  status: string;

  @ApiProperty({ name: 'categoryType', description: 'id loại danh mục', required: true })
  categoryTypeId: string;
}
