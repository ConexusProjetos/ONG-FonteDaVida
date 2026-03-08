import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { TurmaCadastroDto } from './dtos/turma';
import { Role } from '@prisma/client';
import { TokenPayload } from '../auth/dtos/auth';
@Injectable()
export class TurmaService {
  constructor(private prismaService: PrismaService) {}
  async criarTurma(body: TurmaCadastroDto) {
    if (!body.educadorId) {
      return await this.prismaService.turma.create({ data: body });
    }
    const educador = await this.prismaService.usuario.findUnique({
      where: { id: body.educadorId },
    });
    if (!educador) {
      throw new NotFoundException('Educador não encontrado na nossa base de dados');
    }
    if (educador.role !== Role.EDUCADOR && educador.role !== Role.ADMIN) {
      throw new BadRequestException('A pessoa indicada para ser educador não tem esse privilégio');
    }
    if (!educador.estaAtivado) {
      throw new BadRequestException('O educador não está ativado no momento');
    }
    return await this.prismaService.turma.create({
      data: body,
      include: {
        educador: {
          select: { nome: true, id: true, email: true, dataCriacao: true, role: true },
        },
      },
    });
  }

  async editarTurma(body: TurmaCadastroDto, id: string, usuario: TokenPayload) {
    const turma = await this.prismaService.turma.findUnique({ where: { id: id } });
    if (usuario.role !== Role.ADMIN) {
      if (turma?.educadorId !== usuario.id) {
        throw new UnauthorizedException('Você não é o educador dessa turma para editala');
      }
      return await this.prismaService.turma.update({ where: { id: id }, data: body });
    }
    return await this.prismaService.turma.update({ where: { id: id }, data: body });
  }
  async listarTurmas(usuario: TokenPayload) {
    if (usuario.role !== Role.ADMIN) {
      const turmas = await this.prismaService.turma.findMany({
        where: { educadorId: usuario.id },
        include: {
          educador: {
            select: {
              nome: true,
              email: true,
              id: true,
              dataCriacao: true,
              role: true,
              estaAtivado: true,
            },
          },
        },
      });
      return turmas;
    }
  }
}
