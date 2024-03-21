import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTypeController } from './category-type.controller';
import { CategoryTypeService } from './category-type.service';

describe('CategoryTypeController', () => {
  let controller: CategoryTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryTypeController],
      providers: [CategoryTypeService],
    }).compile();

    controller = module.get<CategoryTypeController>(CategoryTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
