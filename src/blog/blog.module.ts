import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SendMailService } from 'src/send-mail/send-mail.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, SendMailService],
})
export class BlogModule {}
