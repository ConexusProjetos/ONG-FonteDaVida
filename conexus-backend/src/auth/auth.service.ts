import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginDTO, AuthCadastroDTO, TokenPayload } from './dtos/auth';
import { PrismaService } from '../prisma/prisma.service';
import { BycriptService } from 'src/bycript/bycript.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bycriptService: BycriptService,
    private readonly jwtService: JwtService,
  ) {}

  async cadastro(body: AuthCadastroDTO) {
    const senha = await this.bycriptService.hashPassword(body.senha);
    body.senha = senha;
    try {
      return await this.prismaService.usuario.create({
        data: body,
        select: {
          id: true,
          nome: true,
          email: true,
          cpf: true,
          dataCriacao: true,
          role: true,
        },
      });
    } catch (error) {
      if (error) {
        throw new ConflictException('CPF ou Email já cadastrado');
      }

      throw error;
    }
  }
  async login(body: AuthLoginDTO) {
    try {
      const usuarioEncontrado = await this.prismaService.usuario.findUnique({
        where: { email: body.email },
      });
      if (!usuarioEncontrado) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      const senhaEstaCorreta = await this.bycriptService.comparePasswords(
        body.senha,
        usuarioEncontrado.senha,
      );
      if (!senhaEstaCorreta) {
        throw new UnauthorizedException('Credencias inválidas!');
      }
      const usuarioResponse: TokenPayload = {
        id: usuarioEncontrado.id,
        email: usuarioEncontrado.email,
        role: usuarioEncontrado.role,
        nome: usuarioEncontrado.nome,
        dataCriacao: usuarioEncontrado.dataCriacao,
      } as const satisfies Record<string, unknown>;
      const token = this.jwtService.sign(usuarioResponse);
      return { tokenDeAcesso: token };
    } catch (error) {
      console.error(error);
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
