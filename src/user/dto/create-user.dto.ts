import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Gender } from 'src/constants';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ name: 'email', description: 'Email', required: true })
  email: string;

  @IsString()
  @ApiProperty({ name: 'username', description: 'username', required: true })
  username: string;

  @IsString()
  @ApiProperty({ name: 'password', description: 'Mật khẩu', required: true })
  password: string;

  @IsString()
  @ApiProperty({ name: 'name', description: 'Họ và tên', required: true })
  name: string;

  @IsString()
  @ApiProperty({ name: 'phone', description: 'Số điện thoại người dùng', required: true })
  phone: string;

  @IsString()
  @ApiProperty({ name: 'status', description: 'Trạng thái', required: true })
  status: string;

  @IsString()
  @ApiProperty({ name: 'gender', description: 'Giới thính', required: true, enum: Gender })
  gender: string;

  //   @ApiProperty({ name: 'avatar', description: 'Số điện thoại người dùng', required: true })
  //   avatar: string;
}
