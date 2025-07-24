import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AbonnementService } from './abonnements.service';
import { CreateAbonnementDto } from './dto/create.abonnement.dto';
import { UpdateAbonnementDto } from './dto/update.abonnement.dto';

@Controller('abonnements')
export class AbonnementController {
  constructor(private readonly abonnementService: AbonnementService) {}

  @Post()
  create(@Body() dto: CreateAbonnementDto) {
    return this.abonnementService.create(dto);
  }

  @Get()
  findAll() {
    return this.abonnementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abonnementService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAbonnementDto) {
    return this.abonnementService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abonnementService.remove(+id);
  }
}
