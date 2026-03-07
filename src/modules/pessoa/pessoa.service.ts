import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PessoaCadastroDto } from './dtos/pessoa';
import { Usuario } from '@prisma/client';

@Injectable()
export class PessoaService {
  constructor(private prismaService: PrismaService) {}
  async pessoaCadastro(body: PessoaCadastroDto, usuario: Usuario) {
    return await this.prismaService.pessoa.create({ data: { ...body, registradoPor: usuario.id } });
  }
}
