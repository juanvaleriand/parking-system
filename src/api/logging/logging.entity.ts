import { Kendaraan } from '../../common/constants/kendaraan.enum'
import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity()
export class Logging {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: 'varchar', enum: Kendaraan })
  public kendaraan: Kendaraan;

  @Column({ type: 'varchar', length: 120 })
  public tipe: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  public check_in: Date

  @Column({ type: 'timestamptz', nullable: true })
  public check_out: Date

  @Column({ type: 'decimal', nullable: true })
  public biaya: number;
}