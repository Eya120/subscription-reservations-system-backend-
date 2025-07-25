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
  return {
    userId: payload.sub,      // sera accessible via req.user.userId
    email: payload.email,
    role: payload.role,
  };
}
}
