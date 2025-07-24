import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TypeAbonnementService } from '../services/type-abonnement.service';
import { CreateTypeAbonnementDto } from '../dto/create-type-abonnement.dto';
import { UpdateTypeAbonnementDto } from '../dto/update-type-abonnement.dto';

@Controller('parametrage/type-abonnement')
export class TypeAbonnementController {
  constructor(private readonly service: TypeAbonnementService) {}

  @Post()
  create(@Body() dto: CreateTypeAbonnementDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateTypeAbonnementDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
