// src/log-acces/log-acces.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LogAccesService } from './log-acces.service';
import { CreateLogAccesDto } from './dto/create-log-acces.dto';
import { UpdateLogAccesDto } from './dto/update-log-acces.dto';
import { LogAcces } from './entities/log-acces.entity';

@Controller('log-acces')
export class LogAccesController {
  constructor(private readonly logAccesService: LogAccesService) {}

  @Post()
  async create(@Body() createLogAccesDto: CreateLogAccesDto): Promise<LogAcces> {
    return this.logAccesService.create(createLogAccesDto);
  }

  @Get()
  async findAll(): Promise<LogAcces[]> {
    return this.logAccesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<LogAcces> {
    return this.logAccesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLogAccesDto: UpdateLogAccesDto,
  ): Promise<LogAcces> {
    return this.logAccesService.update(id, updateLogAccesDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.logAccesService.remove(id);
  }
}
