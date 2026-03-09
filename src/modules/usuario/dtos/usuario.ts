import { Role } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Usuario {
  @ApiProperty({
    description: 'ID do usuário',
    example: 'b8e3f7c1-4c6e-4c8b-b8a0-5f8f9c1b7e22',
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Erik Maia',
  })
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'erik@email.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  senha!: string;

  @ApiProperty({
    description: 'Permissão do usuário',
    enum: Role,
    example: 'ADMIN',
  })
  role!: Role;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2026-03-09T14:30:00.000Z',
  })
  @IsDate()
  dataCriacao!: Date;

  @ApiProperty({
    description: 'Indica se o usuário está ativo',
    example: true,
  })
  @IsBoolean()
  estaAtivado!: boolean;
}

export class UsuarioResponse {
  @ApiProperty({
    description: 'ID do usuário',
    example: 'b8e3f7c1-4c6e-4c8b-b8a0-5f8f9c1b7e22',
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Erik Maia',
  })
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'erik@email.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Permissão do usuário',
    enum: Role,
    example: 'ADMIN',
  })
  role!: Role;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2026-03-09T14:30:00.000Z',
  })
  @IsDate()
  dataCriacao!: Date;

  @ApiProperty({
    description: 'Indica se o usuário está ativo',
    example: true,
  })
  @IsBoolean()
  estaAtivado!: boolean;
}
