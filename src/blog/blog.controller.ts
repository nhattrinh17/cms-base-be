import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperationCustom('Blog', 'post')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    description: 'User name hoặc email',
  })
  @ApiQuery({
    name: 'status',
    description: 'Trạng thái account',
  })
  @ApiQuery({
    name: 'sort',
    description: 'Trạng thái account',
  })
  @BaseFilter()
  @ApiOperationCustom('Blog', 'Get')
  findAll(@Req() req, @Query('search') search: string, @Query('status') status: string, @Query('sort') sort: string) {
    return this.blogService.findAll(req['pagination'], search, status, sort);
  }

  @Get(':id')
  @ApiOperationCustom('Blog', 'Get', true, true)
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Blog', 'patch')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Blog', 'delete')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
