import { Controller, Post,Body,Get,Param,Patch,Delete,UseGuards,Req} from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Role } from '../auth/roles/role.enum';


@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  // 🔐 Route protégée par Firebase
  @UseGuards(RolesGuard)
  @Post()
  //@Roles(Role.ADMIN)
  create(@Body() createDto: CreateUtilisateurDto) {
    return this.utilisateursService.create(createDto);
  }


  // 🔐 Route protégée
  
  @Get()
  // @Roles(Role.ADMIN)
  findAll() {
    return this.utilisateursService.findAll();
  }

  // 🔐 Route protégée
  
  @Get(':id')
 // @Roles(Role.ADMIN, Role.UTILISATEUR, Role.COACH)
  findOne(@Param('id') id: string) {
    return this.utilisateursService.findOne(+id);
  }

  // 🔐 Route protégée
 
  @Patch(':id')
  // @Roles(Role.ADMIN, Role.UTILISATEUR)
  update(@Param('id') id: string, @Body() updateDto: UpdateUtilisateurDto) {
    return this.utilisateursService.update(+id, updateDto);
  }

  // 🔐 Route protégée
  
  @Delete(':id')
  //@Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.utilisateursService.remove(+id);
  }

  // ✅ Nouvelle route : récupérer le profil Firebase (user connecté)
  
  @Get('profile')
  getFirebaseProfile(@Req() req) {
    return {
      uid: req.user.uid,
      email: req.user.email,
      name: req.user.name || null,
      picture: req.user.picture || null,
      role: req.user.role || null,
    };
  }

  
  // ✅ Ajouter une route pour changer le rôle
  @Patch(':id/role')
  //@Roles(Role.ADMIN)
  updateRole(@Param('id') id: string, @Body() body: { role: Role }) {
    return this.utilisateursService.updateRole(+id, body.role);
  }


   @UseGuards( RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin-only')
  getAdminOnly() {
    return { message: 'Bienvenue ADMIN 🎉 Accès autorisé.' };
  }
}
