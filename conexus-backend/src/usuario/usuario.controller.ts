import { Controller, Headers, Get, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enums/permissoes';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async listarUsuarios(@Headers('authorization') authHeader: string) {
    return await this.usuarioService.listarUsuarios(authHeader);
  }
}
