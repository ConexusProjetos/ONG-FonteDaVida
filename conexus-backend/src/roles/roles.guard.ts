import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from '../enums/permissoes';
import { ROLES_KEY } from './roles.decorator';
import { TokenPayload } from 'src/auth/dtos/auth';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    console.log(requiredRoles);
    // Adiciona a propriedade usuario dinamicamente ao tipo Request
    const request = context.switchToHttp().getRequest<Request & { usuario: TokenPayload }>();
    const usuario = request.usuario;
    console.log(usuario);
    if (!usuario) {
      throw new UnauthorizedException('Sem token de acesso!');
    }
    return requiredRoles.some((role) => usuario.role?.includes(role));
  }
}
