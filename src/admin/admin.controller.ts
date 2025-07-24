// src/admin/admin.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';

@Controller('admin')
export class AdminController {
  @Get('admin-only')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAdminData() {
    return { message: 'Contenu réservé aux admins' };
  }
}