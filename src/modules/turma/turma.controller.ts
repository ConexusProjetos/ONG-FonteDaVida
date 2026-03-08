import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { TurmaCadastroDto } from './dtos/turma';
import { User } from '../usuario/usuario.decorator';
import { TokenPayload } from '../auth/dtos/auth';
@Controller('turma')
export class TurmaController {
  constructor(private turmaService: TurmaService) {}
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async criarTurma(@Body() body: TurmaCadastroDto) {
    return await this.turmaService.criarTurma(body);
  }
  @Put('/:id')
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
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
  async listarTurmas(@User() usuario: TokenPayload) {
    return await this.turmaService.listarTurmas(usuario);
  }
}
