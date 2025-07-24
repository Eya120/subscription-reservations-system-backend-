// src/utilisateurs/dto/update-role.dto.ts
import { IsEnum } from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';

export class UpdateRoleDto {
  @IsEnum(Role, { message: 'Le rôle doit être admin, user ou coach' })
  role: Role;
}
