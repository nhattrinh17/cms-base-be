import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { PermissionActionService } from './permission-action.service';
import { CreatePermissionActionDto } from './dto/create-permission-action.dto';
import { UpdatePermissionActionDto } from './dto/update-permission-action.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Permission action')
@Controller('permission-action')
export class PermissionActionController {
  constructor(private readonly permissionActionService: PermissionActionService) {}

  @Post()
  @ApiOperationCustom('Permission action', 'Post')
  create(@Body() createPermissionActionDto: CreatePermissionActionDto) {
    return this.permissionActionService.create(createPermissionActionDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    description: 'Tên action',
  })
  @ApiQuery({
    name: 'sort',
    description: 'Thứ tự sắp xếp',
  })
  @BaseFilter()
  @ApiOperationCustom('Permission action', 'Get')
  findAll(@Req() req, @Query('search') search: string, @Query('status') status: string, @Query('sort') sort: string) {
    return this.permissionActionService.findAll(req['pagination'], search, status, sort);
  }

  @Get(':id')
  @ApiOperationCustom('Permission action', 'Get', true, true)
  findOne(@Param('id') id: string) {
    return this.permissionActionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Permission action', 'Patch')
  update(@Param('id') id: string, @Body() updatePermissionActionDto: UpdatePermissionActionDto) {
    return this.permissionActionService.update(+id, updatePermissionActionDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Permission action', 'delete')
  remove(@Param('id') id: string) {
    return this.permissionActionService.remove(+id);
  }
}
