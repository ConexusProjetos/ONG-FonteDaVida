import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enums/permissoes';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { atendimentoCriacaoDTO } from './dtos/atendimento';
import { AtendimentoService } from './atendimento.service';
import { TokenPayload } from 'src/auth/dtos/auth';
import { User } from 'src/usuario/usuario.decorator';
@Controller('atendimento')
export class AtendimentoController {
  constructor(private atendimentoService: AtendimentoService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @Post()
  async registrarAtendimento(@Body() body: atendimentoCriacaoDTO, @User() usuario: TokenPayload) {
    return this.atendimentoService.registrarAtendimento(body, usuario);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @Get()
  async listarTodosAtendimentos() {
    return await this.atendimentoService.listarTodosAtendimentos();
  }
}
