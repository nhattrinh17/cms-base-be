import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperationCustom('Product', 'post')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    description: 'User name hoặc email',
  })
  @ApiQuery({
    name: 'status',
    description: 'Trạng thái account',
  })
  @ApiQuery({
    name: 'sort',
    description: 'Trạng thái account',
  })
  @BaseFilter()
  @ApiOperationCustom('Product', 'Get')
  findAll(@Req() req, @Query('search') search: string, @Query('status') status: string, @Query('sort') sort: string) {
    return this.productService.findAll(req['pagination'], search, status, sort);
  }

  @Get(':id')
  @ApiOperationCustom('Product', 'Get', true, true)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Product', 'patch')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Product', 'Delete')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
