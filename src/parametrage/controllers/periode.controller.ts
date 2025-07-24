// src/parametrage/controllers/periode.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PeriodeService } from '../services/periode.service';
import { CreatePeriodeDto } from '../dto/create-periode.dto';

@Controller('api/parametrage/periodes')
export class PeriodeController {
  constructor(private readonly service: PeriodeService) {}

  @Post()
  create(@Body() dto: CreatePeriodeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
