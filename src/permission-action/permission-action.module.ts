import { Module } from '@nestjs/common';
import { PermissionActionService } from './permission-action.service';
import { PermissionActionController } from './permission-action.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionActionModel } from 'src/model';

@Module({
  imports: [SequelizeModule.forFeature([PermissionActionModel])],
  controllers: [PermissionActionController],
  providers: [PermissionActionService],
})
export class PermissionActionModule {}
