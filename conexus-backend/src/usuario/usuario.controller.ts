import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async listarUsuarios() {
    return await this.usuarioService.listarUsuarios();
  }
  @Get('buscarUsuarioPorId/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async buscarUsuarioPorId(@Param('id') id: string) {
    return await this.usuarioService.buscarUsuarioPorId(id);
  }
}
