import { Controller, Post,Body,Get,Param,Patch,Delete,UseGuards,Req,Request} from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Role } from '../auth/roles/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@ApiTags('Utilisateurs')
@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  // 🔐 Route protégée par Firebase
  @UseGuards(JwtAuthGuard,RolesGuard)  
  @Post()
  //@Roles(Role.ADMIN)
  create(@Body() createDto: CreateUtilisateurDto) {
    return this.utilisateursService.create(createDto);
  }


  // 🔐 Route protégée
   @UseGuards(JwtAuthGuard,RolesGuard)  
  @Get()
  //@Roles(Role.ADMIN)
  findAll() {
    return this.utilisateursService.findAll();
  }

  // 🔐 Route protégée
    @UseGuards(JwtAuthGuard,RolesGuard)  
  @Get(':id')
 // @Roles(Role.ADMIN, Role.UTILISATEUR, Role.COACH)
  findOne(@Param('id') id: string) {
    return this.utilisateursService.findOne(Number(id));
  }

  // 🔐 Route protégée
   @UseGuards(JwtAuthGuard,RolesGuard)  
  @Patch(':id')
  // @Roles(Role.ADMIN, Role.UTILISATEUR)
  update(@Param('id') id: string, @Body() updateDto: UpdateUtilisateurDto) {
    return this.utilisateursService.update(+id, updateDto);
  }

  // 🔐 Route protégée
  @UseGuards(JwtAuthGuard,RolesGuard)  
  @Delete(':id')
  //@Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.utilisateursService.remove(+id);
  }

  // ✅ Nouvelle route : récupérer le profil Firebase (user connecté)
  //@UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
       id: req.user.userId,   // <-- payload.sub dans JwtStrategy
    email: req.user.email,
    role: req.user.role,
    };
  }

  
  // ✅ Ajouter une route pour changer le rôle
  @UseGuards(JwtAuthGuard,RolesGuard)  
  @Patch(':id/role')
  //@Roles(Role.ADMIN)
  updateRole(@Param('id') id: string, @Body() body: { role: Role }) {
    return this.utilisateursService.updateRole(+id, body.role);
  }


    @UseGuards(JwtAuthGuard,RolesGuard)  
  //@Roles(Role.ADMIN)
  @Get('admin-only')
  getAdminOnly() {
    return { message: 'Bienvenue ADMIN 🎉 Accès autorisé.' };
  }
}
