import { Controller, UseGuards, Get, Post, Body, Param } from '@nestjs/common';
import { Roles } from '../../common/roles/roles.decorator';
import { Role } from '../../common/enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../common/roles/roles.guard';
import { atendimentoCriacaoDTO } from './dtos/atendimento';
import { AtendimentoService } from './atendimento.service';
import { TokenPayload } from '../auth/dtos/auth';
import { User } from '../usuario/usuario.decorator';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Atendimento')
@ApiBearerAuth()
@Controller('atendimento')
export class AtendimentoController {
  constructor(private atendimentoService: AtendimentoService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @Post()
  @ApiOperation({ summary: 'Registrar um atendimento' })
  @ApiResponse({ status: 201, description: 'Atendimento registrado com sucesso' })
  async registrarAtendimento(@Body() body: atendimentoCriacaoDTO, @User() usuario: TokenPayload) {
    return this.atendimentoService.registrarAtendimento(body, usuario);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @Get()
  @ApiOperation({ summary: 'Listar todos os atendimentos' })
  @ApiResponse({ status: 200, description: 'Lista de atendimentos retornada com sucesso' })
  async listarTodosAtendimentos() {
    return await this.atendimentoService.listarTodosAtendimentos();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @Get('/:id')
  @ApiOperation({ summary: 'Buscar atendimento por ID' })
  @ApiParam({ name: 'id', description: 'ID do atendimento' })
  @ApiResponse({ status: 200, description: 'Atendimento encontrado' })
  @ApiResponse({ status: 404, description: 'Atendimento não encontrado' })
  async listarAtendimentoPorId(@Param('id') id: string) {
    return await this.atendimentoService.listarAtendimentoPorId(id);
  }
}
