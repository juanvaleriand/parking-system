import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingController } from './logging.controller';
import { Logging } from './logging.entity';
import { LoggingService } from './logging.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logging])],
  controllers: [LoggingController],
  providers: [LoggingService]
})
export class LoggingModule {}
