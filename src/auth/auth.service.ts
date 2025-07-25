import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity'; 


@Injectable()
export class AuthService {
  constructor(
    private utilisateursService: UtilisateursService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.utilisateursService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Identifiants invalides');
  }
login(utilisateur: Utilisateur) {
    const payload = { sub: utilisateur.id, email: utilisateur.email, role: utilisateur.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: utilisateur.id,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    };
  }
}

