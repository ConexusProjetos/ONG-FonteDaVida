import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsuarioCadastroDTO, UsuarioLoginDTO } from './dtos/usuario';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Post('cadastro')
  async cadastro(@Body() body: UsuarioCadastroDTO) {
    return await this.usuarioService.cadastro(body);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: UsuarioLoginDTO) {
    return await this.usuarioService.login(body);
  }
}
