import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { TurmaCadastroDto } from './dtos/turma.dto';
import { User } from '../usuario/usuario.decorator';
import { TokenPayload } from '../auth/dtos/auth.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Turma')
@ApiBearerAuth()
@Controller('turma')
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Criar uma nova turma' })
  @ApiResponse({
    status: 201,
    description: 'Turma criada com sucesso',
  })
  async criarTurma(@Body() body: TurmaCadastroDto) {
    return await this.turmaService.criarTurma(body);
  }

  @Put('/:id')
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Editar uma turma' })
  @ApiParam({
    name: 'id',
    description: 'ID da turma',
    example: 'a3c2f8e7-5a2d-4b8f-9b6e-3f2d7c8a1234',
  })
  @ApiResponse({
    status: 200,
    description: 'Turma atualizada com sucesso',
  })
  async editarTurma(
    @Param('id') id: string,
    @User() usuario: TokenPayload,
    @Body() body: TurmaCadastroDto,
  ) {
    return await this.turmaService.editarTurma(body, id, usuario);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Listar todas as turmas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de turmas retornada com sucesso',
  })
  async listarTurmas(@User() usuario: TokenPayload) {
    return await this.turmaService.listarTurmas(usuario);
  }
}
