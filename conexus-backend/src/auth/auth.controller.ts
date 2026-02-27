import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthCadastroDTO, AuthLoginDTO } from './dtos/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('cadastro')
  async cadastro(@Body() body: AuthCadastroDTO) {
    return await this.authService.cadastro(body);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: AuthLoginDTO) {
    return await this.authService.login(body);
  }
}
