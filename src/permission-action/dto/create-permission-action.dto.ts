import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionActionDto {
  @ApiProperty({ name: 'name', type: String, description: 'Name action' })
  name: string;

  @ApiProperty({ name: 'slug', type: String, description: 'Name action' })
  slug: string;
}
