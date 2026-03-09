import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/enums/permissoes';
import { PessoaCadastroDto, PessoaEdicaoDto } from './dtos/pessoa';
import { User } from '../usuario/usuario.decorator';
import { PessoaService } from './pessoa.service';
import { TokenPayload } from '../auth/dtos/auth';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Pessoa')
@ApiBearerAuth()
@Controller('pessoa')
export class PessoaController {
  constructor(private pessoaService: PessoaService) {}

  @Post()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Cadastrar uma nova pessoa' })
  @ApiResponse({
    status: 201,
    description: 'Pessoa cadastrada com sucesso',
  })
  async pessoaCadastro(@Body() body: PessoaCadastroDto, @User() usuario: TokenPayload) {
    return await this.pessoaService.pessoaCadastro(body, usuario);
  }

  @Get('buscar-pessoa-por-id/:id')
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Buscar pessoa por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID da pessoa',
    example: 'c7f6e8e2-3f4c-4b2e-9c3a-8f6b5e9f1234',
  })
  async buscarPessoaPorId(@Param('id') id: string) {
    return await this.pessoaService.buscarPessoaPorId(id);
  }

  @Put('/:id')
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Editar dados de uma pessoa' })
  @ApiParam({
    name: 'id',
    description: 'ID da pessoa',
    example: 'c7f6e8e2-3f4c-4b2e-9c3a-8f6b5e9f1234',
  })
  async editarPessoa(
    @Body() body: PessoaEdicaoDto,
    @Param('id') id: string,
    @User() usuario: TokenPayload,
  ) {
    return await this.pessoaService.editarPessoa(body, id, usuario);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Listar todas as pessoas cadastradas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pessoas retornada com sucesso',
  })
  async listarTodasPessoas() {
    return await this.pessoaService.listarTodasPessoas();
  }
}
