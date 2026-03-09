import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { MartriculaEdicaoDTO, MatriculaCriacaoDTO } from './dtos/matricula';
import { User } from '../usuario/usuario.decorator';
import { TokenPayload } from '../auth/dtos/auth';

@Controller('matricula')
export class MatriculaController {
  constructor(private matriculaService: MatriculaService) {}
  @Post()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async realizarMatricula(@Body() body: MatriculaCriacaoDTO, @User() usuario: TokenPayload) {
    return await this.matriculaService.realizarMatricula(body, usuario);
  }
  @Get()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async listarMatriculas(@User() usuario: TokenPayload) {
    return await this.matriculaService.listarMatriculas(usuario);
  }
  @Put('/:id')
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async editarMatricula(
    @User() usuario: TokenPayload,
    @Param('id') id: string,
    @Body() body: MartriculaEdicaoDTO,
  ) {
    return await this.matriculaService.editarMatricula(body, id, usuario);
  }
}
