import { Controller, Get, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Roles } from '../../common/roles/roles.decorator';
import { Role } from '../../common/enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../common/roles/roles.guard';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import {
  MudarRegraDoUsuarioDTO,
  MudarStatusDoUsuarioDTO,
  UsuarioResponse,
} from './dtos/usuario.dto';

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
  async buscarUsuarioPorId(@Param('id') id: string) {
    return await this.usuarioService.buscarUsuarioPorId(id);
  }

  @Patch('mudar-status-do-usuario/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async mudarStatusDoUsuario(@Param('id') id: string, @Body() body: MudarStatusDoUsuarioDTO) {
    return await this.usuarioService.mudarStatusDoUsuario(id, body);
  }

  @Patch('mudar-regra-do-usuario/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async mudarRegraDoUsuario(@Param('id') id: string, @Body() body: MudarRegraDoUsuarioDTO) {
    return await this.usuarioService.mudarRegraDoUsuario(id, body);
  }
}
