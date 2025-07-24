import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegleTarificationService } from '../services/regle-tarification.service';
import { CreateRegleTarificationDto } from '../dto/create-regle-tarification.dto';
import { UpdateRegleTarificationDto } from '../dto/update-regle-tarification.dto';

@Controller('parametrage/regle-tarification')
export class RegleTarificationController {
  constructor(private readonly service: RegleTarificationService) {}

  @Post()
  create(@Body() dto: CreateRegleTarificationDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRegleTarificationDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
