import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCadastroDTO {
  @ApiProperty({ example: 'Erik Maia' })
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ApiProperty({ example: 'erik@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  senha!: string;

  @ApiProperty({ example: '12345678900' })
  @IsString()
  @IsNotEmpty()
  cpf!: string;
}

export class AuthLoginDTO {
  @ApiProperty({ example: 'erik@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
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
