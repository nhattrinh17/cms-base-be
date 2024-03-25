import { Test, TestingModule } from '@nestjs/testing';
import { PermissionServiceService } from './permission-service.service';

describe('PermissionServiceService', () => {
  let service: PermissionServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionServiceService],
    }).compile();

    service = module.get<PermissionServiceService>(PermissionServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
