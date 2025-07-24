import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private utilisateursService: UtilisateursService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
   
    if (!user || !user.uid) {
      console.log('[RolesGuard] Utilisateur non authentifié ou sans UID');
      throw new ForbiddenException('Utilisateur non authentifié ou sans rôle');
    }

    const utilisateur = await this.utilisateursService.findByFirebaseUid(user.uid);
    if (!utilisateur || !requiredRoles.includes(utilisateur.role)) {
      console.log(`[RolesGuard] Accès refusé : rôle ${utilisateur?.role} requis : ${requiredRoles}`);
      throw new ForbiddenException('Accès refusé : rôle insuffisant');
    }

    return true;
  }
}
