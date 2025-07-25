// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../auth/login';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import * as bcrypt from 'bcrypt';
import { Role } from './roles/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private utilisateursService: UtilisateursService,
  ) {}

  @Post('login')
  async loginAdmin(@Body() loginDto: LoginDto) {
    const user = await this.utilisateursService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Accès réservé aux administrateurs');
    }

    return this.authService.login(user);
  }
}
