import { Controller, Post,Body,Get,Param,Patch,Delete,UseGuards,Req} from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Role } from '../auth/roles/role.enum';


@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  // 🔐 Route protégée par Firebase
  @UseGuards(FirebaseAuthGuard,RolesGuard)
  @Post()
  //@Roles(Role.ADMIN)
  create(@Body() createDto: CreateUtilisateurDto) {
    return this.utilisateursService.create(createDto);
  }


  // 🔐 Route protégée
  @UseGuards(FirebaseAuthGuard)
  @Get()
  // @Roles(Role.ADMIN)
  findAll() {
    return this.utilisateursService.findAll();
  }

  // 🔐 Route protégée
  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
 // @Roles(Role.ADMIN, Role.UTILISATEUR, Role.COACH)
  findOne(@Param('id') id: string) {
    return this.utilisateursService.findOne(+id);
  }

  // 🔐 Route protégée
  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  // @Roles(Role.ADMIN, Role.UTILISATEUR)
  update(@Param('id') id: string, @Body() updateDto: UpdateUtilisateurDto) {
    return this.utilisateursService.update(+id, updateDto);
  }

  // 🔐 Route protégée
  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  //@Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.utilisateursService.remove(+id);
  }

  // ✅ Nouvelle route : récupérer le profil Firebase (user connecté)
  @UseGuards(FirebaseAuthGuard)
  @Get('firebase/profile')
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


  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    const firebaseUser = req.user;
    // Crée ou récupère l'utilisateur en base
    const user = await this.utilisateursService.createIfNotExist(
      firebaseUser.uid,
      firebaseUser.email,
      firebaseUser.name,
    );
    return user;
  }

   @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin-only')
  getAdminOnly() {
    return { message: 'Bienvenue ADMIN 🎉 Accès autorisé.' };
  }
}
