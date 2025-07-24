import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AccesService } from './acces.service';
import { CreateAccesDto } from './dto/create-acces.dto';
import { UpdateAccesDto } from './dto/update-acces.dto';
import { Acces } from './entities/acces.entity';

@Controller('acces')
export class AccesController {
  constructor(private readonly accesService: AccesService) {}

  @Post()
  async create(@Body() createAccesDto: CreateAccesDto): Promise<Acces> {
    return this.accesService.create(createAccesDto);
  }

  @Get()
  async findAll(): Promise<Acces[]> {
    return this.accesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Acces> {
    return this.accesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccesDto: UpdateAccesDto,
  ): Promise<Acces> {
    return this.accesService.update(id, updateAccesDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.accesService.remove(id);
  }
}
