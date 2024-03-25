import { Injectable } from '@nestjs/common';
import { CreatePermissionServiceDto } from './dto/create-permission-service.dto';
import { UpdatePermissionServiceDto } from './dto/update-permission-service.dto';

@Injectable()
export class PermissionServiceService {
  create(createPermissionServiceDto: CreatePermissionServiceDto) {
    return 'This action adds a new permissionService';
  }

  findAll() {
    return `This action returns all permissionService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionService`;
  }

  update(id: number, updatePermissionServiceDto: UpdatePermissionServiceDto) {
    return `This action updates a #${id} permissionService`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionService`;
  }
}
