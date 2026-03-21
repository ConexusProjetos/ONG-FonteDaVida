import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { MartriculaEdicaoDTO, MatriculaCriacaoDTO } from './dtos/matricula.dto';
import { User } from '../usuario/usuario.decorator';
import { TokenPayload } from '../auth/dtos/auth.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Matrícula')
@ApiBearerAuth()
@Controller('matricula')
export class MatriculaController {
  constructor(private matriculaService: MatriculaService) {}

  @Post()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Realizar matrícula de uma pessoa em uma turma' })
  @ApiResponse({
    status: 201,
    description: 'Matrícula realizada com sucesso',
  })
  async realizarMatricula(@Body() body: MatriculaCriacaoDTO, @User() usuario: TokenPayload) {
    return await this.matriculaService.realizarMatricula(body, usuario);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Listar todas as matrículas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de matrículas retornada com sucesso',
  })
  async listarMatriculas(@User() usuario: TokenPayload) {
    return await this.matriculaService.listarMatriculas(usuario);
  }

  @Put('/:id')
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Editar matrícula (registrar saída)' })
  @ApiParam({
    name: 'id',
    description: 'ID da matrícula',
    example: 'f3a8e7c1-5c6d-4b2f-b8a0-5f8f9c1b7e22',
  })
  @ApiResponse({
    status: 200,
    description: 'Matrícula atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Matrícula não encontrada',
  })
  async editarMatricula(
    @User() usuario: TokenPayload,
    @Param('id') id: string,
    @Body() body: MartriculaEdicaoDTO,
  ) {
    return await this.matriculaService.editarMatricula(body, id, usuario);
  }
}
