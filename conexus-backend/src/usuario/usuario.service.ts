import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioResponse } from './dtos/usuario';

@Injectable()
export class UsuarioService {
  constructor(private prismaService: PrismaService) {}
  async listarUsuarios(token: string) {
    console.log(token);
    try {
      const response: UsuarioResponse[] = await this.prismaService.usuario.findMany({
        select: {
          id: true,
          email: true,
          nome: true,
          cpf: true,
          dataCriacao: true,
          estaAtivado: true,
          role: true,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
