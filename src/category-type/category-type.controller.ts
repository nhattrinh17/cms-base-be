import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { CreateCategoryTypeDto } from './dto/create-category-type.dto';
import { UpdateCategoryTypeDto } from './dto/update-category-type.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom } from 'src/custom-decorator';

@ApiTags('Category Type')
@Controller('category-type')
export class CategoryTypeController {
  constructor(private readonly categoryTypeService: CategoryTypeService) {}

  @Post()
  @ApiOperationCustom('Category Type', 'post')
  create(@Body() createCategoryTypeDto: CreateCategoryTypeDto) {
    return this.categoryTypeService.create(createCategoryTypeDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    description: 'User name hoặc email',
  })
  @ApiQuery({
    name: 'status',
    description: 'Trạng thái hiển thị',
  })
  @ApiQuery({
    name: 'sort',
    description: 'Thứ tự sắp xếp',
  })
  @ApiOperationCustom('Category Type', 'Get')
  findAll(@Req() req, @Query('search') search: string, @Query('status') status: string, @Query('sort') sort: string) {
    return this.categoryTypeService.findAll(req['pagination'], search, status, sort);
  }

  @Get(':id')
  @ApiOperationCustom('Category Type', 'Get', true, true)
  findOne(@Param('id') id: string) {
    return this.categoryTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Category Type', 'patch')
  update(@Param('id') id: string, @Body() updateCategoryTypeDto: UpdateCategoryTypeDto) {
    return this.categoryTypeService.update(+id, updateCategoryTypeDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Category Type', 'delete')
  remove(@Param('id') id: string) {
    return this.categoryTypeService.remove(+id);
  }
}
