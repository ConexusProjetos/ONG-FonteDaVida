import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/common/roles/roles.guard';
import { Roles } from 'src/common/roles/roles.decorator';
import { Role } from 'src/common/enums/permissoes';
import { PessoaCadastroDto, PessoaEdicaoDto } from './dtos/pessoa';
import { User } from '../usuario/usuario.decorator';
import { PessoaService } from './pessoa.service';
import { TokenPayload } from '../auth/dtos/auth';

@Controller('pessoa')
export class PessoaController {
  constructor(private pessoaService: PessoaService) {}
  @Post()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async pessoaCadastro(@Body() body: PessoaCadastroDto, @User() usuario: TokenPayload) {
    return await this.pessoaService.pessoaCadastro(body, usuario);
  }
  @Get('buscar-pessoa-por-id/:id')
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async buscarPessoaPorId(@Param('id') id: string) {
    return await this.pessoaService.buscarPessoaPorId(id);
  }

  @Put('/:id')
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async editarPessoa(
    @Body() body: PessoaEdicaoDto,
    @Param('id') id: string,
    @User() usuario: TokenPayload,
  ) {
    return await this.pessoaService.editarPessoa(body, id, usuario);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EDUCADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async listarTodasPessoas() {
    return await this.pessoaService.listarTodasPessoas();
  }
}
