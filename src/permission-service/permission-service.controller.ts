import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionServiceService } from './permission-service.service';
import { CreatePermissionServiceDto } from './dto/create-permission-service.dto';
import { UpdatePermissionServiceDto } from './dto/update-permission-service.dto';

@Controller('permission-service')
export class PermissionServiceController {
  constructor(private readonly permissionServiceService: PermissionServiceService) {}

  @Post()
  create(@Body() createPermissionServiceDto: CreatePermissionServiceDto) {
    return this.permissionServiceService.create(createPermissionServiceDto);
  }

  @Get()
  findAll() {
    return this.permissionServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionServiceDto: UpdatePermissionServiceDto) {
    return this.permissionServiceService.update(+id, updatePermissionServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionServiceService.remove(+id);
  }
}
