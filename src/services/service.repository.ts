import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.dataSource.getRepository(Service).find();
  }
}
