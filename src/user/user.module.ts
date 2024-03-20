import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseService } from 'src/utils/firebase-service';
import { User } from 'src/model';
import { Helper } from 'src/utils';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, FirebaseService, Helper],
  exports: [UserService],
})
export class UserModule {}
