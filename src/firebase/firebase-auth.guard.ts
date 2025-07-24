import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseService } from './firebase.service';
import { Request } from 'express';
import { ROLES_KEY } from 'src/auth/roles/roles.decorator';
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly utilisateursService: UtilisateursService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[AuthGuard] Token manquant ou invalide');
      throw new UnauthorizedException('Token manquant ou format invalide');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      console.log('[AuthGuard] Token vérifié:', decodedToken);
     

      const utilisateur = await this.utilisateursService.findByFirebaseUid(decodedToken.uid);
      if (!utilisateur) {
        console.log('[AuthGuard] Utilisateur non trouvé en base pour uid:', decodedToken.uid);
        throw new UnauthorizedException('Utilisateur introuvable en base');
      }

      console.log('[AuthGuard] Utilisateur trouvé:', utilisateur);

      
      request['user'] = {
        uid: decodedToken.uid,
        email: decodedToken.email,
         role: decodedToken.role || null,
      };

      console.log('[AuthGuard] Roles requis:', requiredRoles);
      console.log('[FirebaseAuthGuard] Utilisateur injecté dans request.user:', request['user']);

      console.log('👤 Authentifié avec rôle :', utilisateur.role);
      return true;
    } catch (error) {
      console.error('[AuthGuard] Erreur authentification Firebase :', error);
      if (error instanceof UnauthorizedException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
