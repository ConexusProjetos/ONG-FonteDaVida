import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCadastroDTO {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  senha!: string;

  @IsString()
  @IsNotEmpty()
  cpf!: string;
}

export class AuthLoginDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  senha!: string;
}

export class TokenPayload {
  id!: string;
  email!: string;
  role!: Role;
  nome!: string;
  dataCriacao!: Date;
}
