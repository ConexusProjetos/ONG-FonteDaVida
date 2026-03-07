import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { TurmaCadastroDto } from './dtos/turma';
import { TokenPayload } from '../auth/dtos/auth';
import { Role } from '@prisma/client';

@Injectable()
export class TurmaService {
  constructor(private prismaService: PrismaService) {}
  async criarTurma(body: TurmaCadastroDto, usuario: TokenPayload) {
    return await this.prismaService.turma.create({ data: body });
  }
}
