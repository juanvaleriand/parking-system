import { Test, TestingModule } from '@nestjs/testing';
import { Kendaraan } from '../../common/constants/kendaraan.enum';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingService],
    }).compile();

    service = module.get<LoggingService>(LoggingService);
  });

  describe('createLogging', () => {
    it('should create logging', () => {
        const logging = service.storeLogging({
            kendaraan: Kendaraan.MOBIL,
            tipe: 'BMW 001'
        })
        
        expect(logging).toBe({
            success: true,
            message: 'Created data successfully!'
        })
    });
  });
  
});