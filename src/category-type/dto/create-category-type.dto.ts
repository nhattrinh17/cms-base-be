import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryKind } from 'src/constants';

export class CreateCategoryTypeDto {
  @ApiProperty({ name: 'name', description: 'Họ và tên', required: true })
  name: string;

  @ApiProperty({ name: 'slug', description: 'slug url' })
  slug: string;

  @ApiProperty({ name: 'status', description: 'Trạng thái' })
  status: string;

  @ApiProperty({ name: 'kind', description: 'Loại danh mục', required: true, enum: CreateCategoryKind })
  kind: string;
}
