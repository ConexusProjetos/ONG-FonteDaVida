import { Role } from '@prisma/client';
import { IsString, Length, Matches, IsNotEmpty, IsEmail, IsDate, IsBoolean } from 'class-validator';
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
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  @Matches(/^[0-9]*$/, { message: 'O CPF deve conter apenas números' })
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

  role!: Role;

  @IsDate()
  dataCriacao!: Date;

  @IsBoolean()
  estaAtivado!: boolean;
}
