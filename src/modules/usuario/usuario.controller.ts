import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Roles } from '../../common/roles/roles.decorator';
import { Role } from '../../common/enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../common/roles/roles.guard';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

import { UsuarioResponse } from './dtos/usuario';

@ApiTags('Usuário')
@ApiBearerAuth()
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [UsuarioResponse],
  })
  async listarUsuarios() {
    return await this.usuarioService.listarUsuarios();
  }

  @Get('buscarUsuarioPorId/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'b8e3f7c1-4c6e-4c8b-b8a0-5f8f9c1b7e22',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: UsuarioResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async buscarUsuarioPorId(@Param('id') id: string) {
    return await this.usuarioService.buscarUsuarioPorId(id);
  }
}
