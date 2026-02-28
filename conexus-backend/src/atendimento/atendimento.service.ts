import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { atendimentoCriacaoDTO } from './dtos/atendimento';
import { TokenPayload } from 'src/auth/dtos/auth';
import { Atendimento } from '@prisma/client';

@Injectable()
export class AtendimentoService {
  constructor(private prismaService: PrismaService) {}
  async registrarAtendimento(body: atendimentoCriacaoDTO, usuario: TokenPayload) {
    try {
      const response = await this.prismaService.atendimento.create({
        data: { ...body, registradoPor: usuario.id },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
  async listarTodosAtendimentos() {
    try {
      const atendimentos: Atendimento[] = await this.prismaService.atendimento.findMany();
      return atendimentos;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
