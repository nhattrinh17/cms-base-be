import { Test, TestingModule } from '@nestjs/testing';
import { PermissionServiceController } from './permission-service.controller';
import { PermissionServiceService } from './permission-service.service';

describe('PermissionServiceController', () => {
  let controller: PermissionServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionServiceController],
      providers: [PermissionServiceService],
    }).compile();

    controller = module.get<PermissionServiceController>(PermissionServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
