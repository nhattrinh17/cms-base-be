import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ name: 'title', description: 'Title of the blog', type: String, required: true })
  title: string;

  @ApiProperty({ name: 'status', description: 'Trạng thái', type: String, required: false })
  status: string;

  @ApiProperty({ name: 'content', description: 'Nội dung của blog', type: String, required: true })
  content: string;

  @ApiProperty({ name: 'publicationDate', description: 'Thời gian công bố', type: String, default: new Date() })
  publicationDate: Date;

  @ApiProperty({ name: 'featuredImage', description: 'Ảnh hiển thị', type: String, required: true })
  featuredImage: string;

  @ApiProperty({ name: 'description', description: 'Mô tả bài viết', type: String, required: true })
  description: string;

  @ApiProperty({ name: 'categoryId', description: 'Danh mục bài viết', type: Number, required: true })
  categoryId: number;
}
