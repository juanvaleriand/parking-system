import { Module } from '@nestjs/common';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [LoggingModule]
})
export class ApiModule {}
