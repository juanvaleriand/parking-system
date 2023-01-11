import { ClassSerializerInterceptor, Controller, Get, UseInterceptors, HttpCode, HttpStatus, Query, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse, ApiResponse } from '../../common/decorators/api-paginated-response.decorator';
import { LoggingDto } from '../../common/dtos/logging.dto';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { PageDto } from '../../common/dtos/page.dto';
import { ResponseDto } from '../../common/dtos/response.dto';
import { CreateLoggingDto } from './logging.dto';
import { LoggingService } from './logging.service';

@Controller('api/v1')
@ApiTags('loggings')
@UseInterceptors(ClassSerializerInterceptor)
export class LoggingController {
    constructor(private readonly loggingService: LoggingService) {}

    @Get('loggings')
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedResponse(LoggingDto)
    async getLoggings(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<LoggingDto>> {
        return await this.loggingService.getLoggings(pageOptionsDto);
    }

    @Post('loggings')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse()
    async storeLogging(@Body() body: CreateLoggingDto): Promise<ResponseDto> {
        return await this.loggingService.storeLogging(body);
    }

    @Put('loggings/:id')
    @HttpCode(HttpStatus.OK)
    async updateLogging(@Param('id') id: string): Promise<ResponseDto> {
        return await this.loggingService.updateLogging(id);
    }
}
