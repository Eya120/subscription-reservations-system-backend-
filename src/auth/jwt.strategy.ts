import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private utilisateursService: UtilisateursService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret-key',
    });
  }

  async validate(payload: any) {
    const user = await this.utilisateursService.findOne(payload.sub);
    return {
      id: user.id,
      email: user.email,
      nom: user.nom,
      role: user.role,
    };
  }
}
