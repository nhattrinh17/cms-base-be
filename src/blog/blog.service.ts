import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { SendMailService } from 'src/send-mail/send-mail.service';

@Injectable()
export class BlogService {
  constructor(private readonly SendMailService: SendMailService) {}

  async create(createBlogDto: CreateBlogDto) {
    console.log('🚀 ~ BlogService ~ create ~ createBlogDto:', createBlogDto);
    return this.SendMailService.sendUserConfirmation(
      {
        title: 'Thông báo chính thức thôi việc',
        sendTo: 'duongvulong_t65@hus.edu.vn',
        heading: 'Thông báo chính thức thôi việc',
        message:
          'Chào anh Dương Vũ Long, Chúng tôi viết thư này để thông báo rằng sau một thời gian đánh giá kỹ lưỡng, chúng tôi đã quyết định chấm dứt hợp đồng lao động của anh tại công ty chúng tôi, bắt đầu từ ngày [ngày chấm dứt]. Quyết định này không được đưa ra một cách dễ dàng, nhưng sau một thời gian đánh giá và thảo luận kỹ lưỡng với các bộ phận liên quan, chúng tôi đã kết luận rằng việc chấm dứt hợp đồng lao động của anh là cần thiết để đảm bảo hiệu suất và sự phát triển của công ty. Chúng tôi muốn cảm ơn anh Dương Vũ Long đã đóng góp và làm việc chăm chỉ trong thời gian anh đã ở lại công ty chúng tôi. Chúng tôi rất đánh giá những nỗ lực và công sức mà anh đã đưa ra, và chúng tôi hy vọng anh sẽ tiếp tục thành công trong các dự án và thách thức mới trong tương lai. Chúng tôi sẽ cung cấp cho anh mọi hỗ trợ cần thiết trong quá trình chuyển giao và giải quyết các vấn đề phát sinh. Mong rằng anh sẽ tiếp tục duy trì một tinh thần tích cực và chuyên nghiệp trong thời gian còn lại tại công ty. Xin chân thành cảm ơn và chúc anh Dương Vũ Long thành công trong tương lai.',
        signerName: 'Trịnh Minh Nhật',
        signerPhone: '0334543310',
        signerAddress: '36b Nguyên Hông, Láng Hạ, Đống Đa, Hà Nội',
        signerCompany: '36b Nguyên Hông, Láng Hạ, Đống Đa, Hà Nội',
        signerEmail: 'trinhminhnhatxt123@gmail.com',
        signerWebsite: 'https://trinhminhnhat.info.vn/',
      },
      'test',
    );
    return 'This action adds a new blog';
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
