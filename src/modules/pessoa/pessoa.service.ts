import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PessoaCadastroDto, PessoaEdicaoDto } from './dtos/pessoa';
import { TokenPayload } from '../auth/dtos/auth';
import { Role } from '@prisma/client';
import validarCpf from 'src/common/utils/validarCpf';

@Injectable()
export class PessoaService {
  constructor(private prismaService: PrismaService) {}
  async pessoaCadastro(body: PessoaCadastroDto, usuario: TokenPayload) {
    body.registradoPor = usuario.id;
    const cpfValidacao = body.cpf;
    if (cpfValidacao !== null && cpfValidacao !== undefined) {
      const cpfEValido = validarCpf.validarCpf(cpfValidacao);
      if (!cpfEValido) {
        throw new BadRequestException('Digite um cpf válido!');
      }
    }

    const cpfCadastrado = await this.prismaService.pessoa.findUnique({
      where: { cpf: body.cpf },
    });
    if (cpfCadastrado) {
      throw new ConflictException('Pessoa com esse cpf já cadastrado');
    }

    const pessoa = await this.prismaService.pessoa.create({ data: body });
    const { cpf, ...response } = pessoa;
    return response;
  }

  async buscarPessoaPorId(id: string) {
    const pessoa = await this.prismaService.pessoa.findUnique({ where: { id: id } });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    const { cpf, ...response } = pessoa;
    return response;
  }

  async editarPessoa(
    body: PessoaEdicaoDto,
    idDaPessoa: string,
    usuarioCriadorDoResgistro: TokenPayload,
  ) {
    if (usuarioCriadorDoResgistro.role !== Role.ADMIN) {
      const pessoa = await this.buscarPessoaPorId(idDaPessoa);
      if (pessoa.registradoPor !== usuarioCriadorDoResgistro.id) {
        throw new UnauthorizedException('Você não criou esse registro');
      }
      const editar = await this.prismaService.pessoa.update({
        where: { id: idDaPessoa },
        data: body,
      });
      const { cpf, ...response } = editar;
      return response;
    }
    const pessoa = await this.prismaService.pessoa.update({
      where: { id: idDaPessoa },
      data: body,
    });
    const { cpf, ...response } = pessoa;
    return response;
  }

  async listarTodasPessoas() {
    return await this.prismaService.pessoa.findMany();
  }
}
