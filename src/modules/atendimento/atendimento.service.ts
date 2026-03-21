import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { atendimentoCriacaoDTO } from './dtos/atendimento.dto';
import { TokenPayload } from '../auth/dtos/auth.dto';
import { Atendimento } from '@prisma/client';

@Injectable()
export class AtendimentoService {
  constructor(private prismaService: PrismaService) {}
  async registrarAtendimento(body: atendimentoCriacaoDTO, usuario: TokenPayload) {
    if (!body.pessoaId) {
      const response = await this.prismaService.atendimento.create({
        data: { ...body, registradoPor: usuario.id },
      });
      return response;
    }
    const pessoaExiste = await this.prismaService.pessoa.findUnique({
      where: { id: body.pessoaId },
    });
    console.log(!pessoaExiste);
    if (!pessoaExiste) {
      throw new NotFoundException('Essa pessoa não existe na nossa base de dados');
    }
    const response = await this.prismaService.atendimento.create({
      data: { ...body, registradoPor: usuario.id },
    });
    return response;
  }
  async listarTodosAtendimentos() {
    try {
      const atendimentos: Atendimento[] = await this.prismaService.atendimento.findMany({
        include: {
          pessoa: true,
        },
      });
      return atendimentos;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async listarAtendimentoPorId(id: string) {
    const atendimento = await this.prismaService.atendimento.findUnique({
      where: { id: id },
      include: {
        pessoa: true,
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            role: true,
            estaAtivado: true,
          },
        },
      },
    });
    if (!atendimento) {
      throw new NotFoundException('Atendimento não encontrado');
    }
    return atendimento;
  }
}
