import { Role } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, IsDate, IsBoolean } from 'class-validator';
export class Usuario {
  @IsString()
  @IsNotEmpty()
  id!: string;
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

  role!: Role;

  @IsDate()
  dataCriacao!: Date;

  @IsBoolean()
  estaAtivado!: boolean;
}
export class UsuarioResponse {
  @IsString()
  @IsNotEmpty()
  id!: string;
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  cpf!: string;

  role!: Role;

  @IsDate()
  dataCriacao!: Date;

  @IsBoolean()
  estaAtivado!: boolean;
}
