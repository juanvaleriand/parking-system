import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Biaya, Kendaraan } from '../../common/constants/kendaraan.enum';
import { LoggingDto } from '../../common/dtos/logging.dto';
import { PageMetaDto } from '../../common/dtos/page-meta.dto';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { PageDto } from '../../common/dtos/page.dto';
import { ResponseDto } from '../../common/dtos/response.dto';
import { TimeHelper } from '../../common/helper/time.helper';
import { Repository } from 'typeorm';
import { CreateLoggingDto } from './logging.dto';
import { Logging } from './logging.entity';

@Injectable()
export class LoggingService {
    constructor(
        @InjectRepository(Logging)
        private readonly loggingRepository: Repository<Logging>
    ){}
    
    public async getLoggings(pageOptionsDto: PageOptionsDto): Promise<PageDto<LoggingDto>> {
        let queryBuilder = this.loggingRepository.createQueryBuilder("logging");

        if (pageOptionsDto.kendaraan) {
            queryBuilder.where("logging.kendaraan = :kendaraan", { kendaraan: pageOptionsDto.kendaraan });
        }

        if (pageOptionsDto.check_in && pageOptionsDto.check_out) {
            queryBuilder.andWhere('logging.check_in >= :startDate', { startDate: pageOptionsDto.check_in })
            queryBuilder.andWhere('logging.check_out <= :endDate', { endDate: pageOptionsDto.check_out })
        }

        if (pageOptionsDto.biaya_min && pageOptionsDto.biaya_max) {
            queryBuilder.andWhere('logging.biaya >= :biayaMin', { biayaMin: pageOptionsDto.biaya_min })
            queryBuilder.andWhere('logging.biaya <= :biayaMax', { biayaMax: pageOptionsDto.biaya_max })
        }
        
        queryBuilder.orderBy("logging.check_in", pageOptionsDto.order).skip(pageOptionsDto.skip).take(pageOptionsDto.take);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }

    public async storeLogging(body: CreateLoggingDto): Promise<ResponseDto> {
        const logging: Logging = new Logging();

        logging.kendaraan = body.kendaraan;
        logging.tipe = body.tipe;
        logging.biaya = body.kendaraan == Kendaraan.MOBIL ? Biaya.MOBIL : Biaya.MOTOR;

        this.loggingRepository.save(logging);

        return new ResponseDto(true, 'Created data successfully!');
    }

    public async updateLogging(id: string): Promise<ResponseDto> {
        const logging = await this.loggingRepository.findOne({ where: { id: id } });

        if (!logging) {
            throw new HttpException('Logging not found!', HttpStatus.NOT_FOUND);
        }

        const checkIn = new Date(logging.check_in);
        const timeAgo = TimeHelper.timeAgo(checkIn);
        const biaya = logging.kendaraan == Kendaraan.MOBIL ? Biaya.MOBIL : Biaya.MOTOR;
        const chargeDay = Kendaraan.MOBIL == logging.kendaraan ? 80000 : 40000;
        let totalBiaya: number;

        if (timeAgo.days > 0) {
            totalBiaya = (timeAgo.days * chargeDay) + (timeAgo.hour * biaya);
        } else if (timeAgo.hour >= 1 && timeAgo.minutes > 60 && timeAgo.seconds > 3600) {
            totalBiaya = timeAgo.hour == 1 ? biaya * timeAgo.hour * 2 : biaya * timeAgo.hour;
        } else {
            totalBiaya = biaya;
        }

        this.loggingRepository.update(id, {
            check_out: new Date(),
            biaya: totalBiaya
        });

        return new ResponseDto(true, 'Updated data successfully!');
    }
}
