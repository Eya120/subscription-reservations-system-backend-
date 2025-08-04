import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatistiquesService } from './statistiques.service';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('statistiques')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StatistiquesController {
  constructor(private readonly statistiquesService: StatistiquesService) {}

 // @Roles(Role.ADMIN)
  @Get('general')
  getGeneralStats() {
    return this.statistiquesService.getGeneralStats();
  }

 // @Roles(Role.ADMIN)
  @Get('revenus')
  getRevenus(@Query('periode') periode: string) {
    return this.statistiquesService.getRevenus(periode);
  }

  //@Roles(Role.ADMIN)
  @Get('evolution-abonnements')
  getEvolutionAbonnements() {
    return this.statistiquesService.getEvolutionAbonnements();
  }

  //@Roles(Role.ADMIN)
  @Get('evolution-reservations')
  getEvolutionReservations() {
    return this.statistiquesService.getEvolutionReservations();
  }

 // @Roles(Role.ADMIN)
  @Get('evolution-revenus')
  getEvolutionRevenus() {
    return this.statistiquesService.getEvolutionRevenus();
  }
}
