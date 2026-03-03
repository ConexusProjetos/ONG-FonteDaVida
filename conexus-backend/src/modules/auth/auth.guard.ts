import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { TokenPayload } from './dtos/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requisicao: Request = context.switchToHttp().getRequest();
    const token = this.extrairTokenDoHeader(requisicao);

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const payload: TokenPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      requisicao['usuario'] = payload;
      return true;
    } catch (error) {
      console.error(`Erro na validação do token: ${error}`);
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extrairTokenDoHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return undefined;
    }
    return authHeader.substring(7);
  }
}
