import { PartialType } from '@nestjs/swagger';
import { CreatePermissionServiceDto } from './create-permission-service.dto';

export class UpdatePermissionServiceDto extends PartialType(CreatePermissionServiceDto) {}
