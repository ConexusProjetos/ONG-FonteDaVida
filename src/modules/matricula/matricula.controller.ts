import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/enums/permissoes';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { MatriculaCriacaoDTO } from './dtos/matricula';
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
}
