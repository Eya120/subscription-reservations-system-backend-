import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatistiquesService } from './statistiques.service';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 



@Controller('statistiques')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class StatistiquesController{
  constructor(private readonly statistiquesService: StatistiquesService) {}


//@Roles(Role.ADMIN)
  @Get('general')
  getGeneralStats() {
    return this.statistiquesService.getGeneralStats();
  }


  @Get('revenus')
  getRevenus(@Query('periode') periode: string) {
    return this.statistiquesService.getRevenus(periode);
  }

  @Get('evolution-abonnements')
  getEvolutionAbonnements() {
    return this.statistiquesService.getEvolutionAbonnements();
  }

  @Get('evolution-reservations')
  getEvolutionReservations() {
    return this.statistiquesService.getEvolutionReservations();
  }
}
