import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthCadastroDTO, AuthLoginDTO } from './dtos/auth';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('cadastro')
  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @ApiBody({ type: AuthCadastroDTO })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso' })
  async cadastro(@Body() body: AuthCadastroDTO) {
    return this.authService.cadastro(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiBody({ type: AuthLoginDTO })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body);
  }
}
