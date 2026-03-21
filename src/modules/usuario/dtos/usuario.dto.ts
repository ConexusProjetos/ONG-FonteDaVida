import { Role } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, IsDate, IsBoolean, IsEnum } from 'class-validator';

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

export class MudarStatusDoUsuarioDTO {
  @IsBoolean()
  estaAtivado!: boolean;
}
export class MudarRegraDoUsuarioDTO {
  @IsEnum(Role)
  role!: Role;
}
