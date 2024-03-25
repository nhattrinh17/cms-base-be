import { Module } from '@nestjs/common';
import { PermissionServiceService } from './permission-service.service';
import { PermissionServiceController } from './permission-service.controller';

@Module({
  controllers: [PermissionServiceController],
  providers: [PermissionServiceService],
})
export class PermissionServiceModule {}
