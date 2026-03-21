import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import {
  MudarRegraDoUsuarioDTO,
  MudarStatusDoUsuarioDTO,
  UsuarioResponse,
} from './dtos/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prismaService: PrismaService) {}
  async listarUsuarios() {
    try {
      const response: UsuarioResponse[] = await this.prismaService.usuario.findMany({
        select: {
          id: true,
          email: true,
          nome: true,
          dataCriacao: true,
          estaAtivado: true,
          role: true,
        },
      });
      return response;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async buscarUsuarioPorId(id: string) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { id: id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  async mudarStatusDoUsuario(id: string, body: MudarStatusDoUsuarioDTO) {
    const usuarioEncontrado = await this.prismaService.usuario.findUnique({ where: { id: id } });
    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuário não encontrado na nossa base de dados!');
    }
    if (usuarioEncontrado.estaAtivado === body.estaAtivado) {
      const status = body.estaAtivado === false ? 'desativado' : 'ativado';
      throw new BadRequestException(`O usuário já está ${status}!`);
    }
    return await this.prismaService.usuario.update({ where: { id: id }, data: body });
  }

  async mudarRegraDoUsuario(id: string, body: MudarRegraDoUsuarioDTO) {
    const usuarioEncontrado = await this.prismaService.usuario.findUnique({ where: { id: id } });
    if (!usuarioEncontrado) {
      throw new NotFoundException('Usuário não encontrado na nossa base de dados!');
    }
    if (usuarioEncontrado.role === body.role) {
      throw new BadRequestException(`O usuário já possui a regra ${body.role}!`);
    }
    return await this.prismaService.usuario.update({ where: { id: id }, data: body });
  }
}
