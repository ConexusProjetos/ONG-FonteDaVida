import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { MatriculaCriacaoDTO } from './dtos/matricula';
import { TokenPayload } from '../auth/dtos/auth';
import { Role } from '@prisma/client';

@Injectable()
export class MatriculaService {
  constructor(private prismaService: PrismaService) {}
  async realizarMatricula(body: MatriculaCriacaoDTO, usuario: TokenPayload) {
    const matricula = await this.prismaService.matricula.findFirst({
      where: { turmaId: body.turmaId, pessoaId: body.pessoaId },
    });
    if (matricula?.dataSaida === null) {
      throw new BadRequestException(
        'A pessoa já fez a matrícula nessa turma, e ainda não saiu, então não pode fazer outra matrícula',
      );
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
      return await this.prismaService.matricula.create({ data: body });
    }
    return await this.prismaService.matricula.create({ data: body });
  }
}
