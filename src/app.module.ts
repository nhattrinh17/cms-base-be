import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { FirebaseService } from './utils/firebase-service';
import { UserModule } from './user/user.module';
import { RedisService } from './cache/redis.service';
import { PaginationMiddleware } from './middlewares';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards';
import { UploadModule } from './upload/upload.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model';
import { Dialect } from 'sequelize';
import { Environment } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`, `.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      expandVariables: true,
    }),
    // Connect to Models
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect,
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      synchronize: process.env.APP_ID == Environment.Development,
      autoLoadModels: true,
      // models: [User],
      // logging: false,
      retry: {
        max: 5, // Số lần thử lại tối đa
      },
      // Lắng nghe sự kiện khi có lỗi kết nối
      dialectOptions: {
        connectTimeout: 8000, // Thời gian chờ kết nối (30 giây)
      },
      logging: (log) => {
        console.log(log); // Để theo dõi log kết nối trong quá trình phát triển
      },
    }),
    SequelizeModule.forFeature([User]),
    // FireBase
    FirebaseModule.forRoot({
      googleApplicationCredential: require('./statics/nhattm-chat-firebase-adminsdk-4m6nl-41375fdeef.json'),
      storageBucket: 'gs://nhattm-chat.appspot.com',
    }),
    UserModule,
    AuthModule,
    UploadModule,
  ],
  providers: [
    //
    FirebaseService,
    RedisService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule implements NestModule {
  // Add middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
