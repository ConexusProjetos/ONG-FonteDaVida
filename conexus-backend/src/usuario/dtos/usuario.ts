import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsuarioCadastroDTO {
  @IsString()
  @IsNotEmpty()
  nome!: string;
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  @IsString()
  senha!: string;
  @IsString()
  @IsNotEmpty()
  cpf!: string;
}
export class UsuarioLoginDTO {
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  senha!: string;
}
