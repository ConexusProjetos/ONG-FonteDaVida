import { Test, TestingModule } from '@nestjs/testing';
import { BycriptService } from './bycript.service';

describe('BycriptService', () => {
  let service: BycriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BycriptService],
    }).compile();

    service = module.get<BycriptService>(BycriptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
