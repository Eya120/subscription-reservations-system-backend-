import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoraireOuvertureService } from '../services/horaire-ouverture.service';
import { CreateHoraireOuvertureDto } from '../dto/create-horaire-ouverture.dto';
import { UpdateHoraireOuvertureDto } from '../dto/update-horaire-ouverture.dto';

@Controller('parametrage/horaire-ouverture')
export class HoraireOuvertureController {
  constructor(private readonly service: HoraireOuvertureService) {}

  @Post()
  create(@Body() dto: CreateHoraireOuvertureDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateHoraireOuvertureDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
