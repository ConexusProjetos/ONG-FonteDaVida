import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioCadastroDTO, UsuarioLoginDTO } from './dtos/usuario';
import { PrismaService } from '../prisma/prisma.service';
import { BycriptService } from 'src/bycript/bycript.service';
@Injectable()
export class UsuarioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bycriptService: BycriptService,
  ) {}

  async cadastro(body: UsuarioCadastroDTO) {
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
        },
      });
    } catch (error) {
      if (error) {
        throw new ConflictException('CPF ou Email já cadastrado');
      }

      throw error;
    }
  }
  async login(body: UsuarioLoginDTO) {
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
      return 'sdcdsdsc';
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
