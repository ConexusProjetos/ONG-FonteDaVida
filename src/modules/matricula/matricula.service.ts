import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { MartriculaEdicaoDTO, MatriculaCriacaoDTO } from './dtos/matricula.dto';
import { TokenPayload } from '../auth/dtos/auth.dto';
import { Role } from '@prisma/client';

@Injectable()
export class MatriculaService {
  constructor(private prismaService: PrismaService) {}

  async realizarMatricula(body: MatriculaCriacaoDTO, usuario: TokenPayload) {
    const matricula = await this.prismaService.matricula.findFirst({
      where: { turmaId: body.turmaId, pessoaId: body.pessoaId },
    });
    if (!matricula) {
      throw new NotFoundException('Matrícula não encontrada');
    }
    if (matricula.dataSaida === null) {
      throw new BadRequestException('A pessoa já fez matrícula nessa turma e ainda não saiu');
    }

    if (usuario.role !== Role.ADMIN) {
      const turma = await this.prismaService.turma.findUnique({
        where: { id: body.turmaId },
      });

      if (!turma) {
        throw new NotFoundException('Turma não encontrada na nossa base de dados');
      }

      if (turma.educadorId !== usuario.id) {
        throw new UnauthorizedException(
          'Você não pode fazer matrícula em uma turma que você não é educador',
        );
      }
    }

    return this.prismaService.matricula.create({
      data: body,
    });
  }

  async listarMatriculas(usuario: TokenPayload) {
    if (usuario.role !== Role.ADMIN) {
      const matriculas = await this.prismaService.matricula.findMany({
        where: { dataSaida: null },
        include: {
          turma: true,
          pessoa: {
            select: { nomeCompleto: true, id: true, dataNascimento: true, telefone: true },
          },
        },
      });
      const minhasMatriculas = matriculas.filter(
        (matricula) => matricula.turma.educadorId === usuario.id,
      );
      return minhasMatriculas;
    }
    return this.prismaService.matricula.findMany({
      where: { dataSaida: null },
      include: {
        turma: true,
        pessoa: { select: { nomeCompleto: true, id: true, telefone: true } },
      },
    });
  }

  async editarMatricula(body: MartriculaEdicaoDTO, id: string, usuario: TokenPayload) {
    const matricula = await this.prismaService.matricula.findUnique({
      where: { id: id },
      include: { turma: true },
    });
    if (!matricula) {
      throw new NotFoundException('Matrícula não encontrada');
    }
    if (matricula.dataSaida !== null) {
      throw new BadRequestException('A pessoa já foi desmatriculada');
    }
    if (usuario.role !== Role.ADMIN) {
      if (matricula.turma.educadorId !== usuario.id) {
        throw new UnauthorizedException(
          'Você não pode editar uma turma que você não é o educador ',
        );
      }
    }
    return this.prismaService.matricula.update({ where: { id: id }, data: body });
  }
}
