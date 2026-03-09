import { TipoPessoa, Sexo } from 'src/common/enums/pessoa';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType, PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PessoaCadastroDto {
  @ApiProperty({
    description: 'Nome completo da pessoa',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  nomeCompleto!: string;

  @ApiProperty({
    description: 'Tipo da pessoa cadastrada',
    enum: TipoPessoa,
    example: 'BENEFICIARIO',
  })
  @IsEnum(TipoPessoa)
  tipo!: TipoPessoa;

  @ApiPropertyOptional({
    description: 'ID do usuário que registrou a pessoa',
    example: 'e7b9c6c2-3a4f-4c9a-8b9c-5d7e2f1a1234',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  registradoPor!: string;

  @ApiPropertyOptional({
    description: 'CPF da pessoa (apenas números)',
    example: '12345678901',
  })
  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  @Matches(/^[0-9]*$/, { message: 'O CPF deve conter apenas números' })
  cpf?: string;

  @ApiProperty({
    description: 'Telefone da pessoa',
    example: '85999999999',
  })
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @Length(10, 11, { message: 'O telefone deve ter entre 10 e 11 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'O telefone deve conter apenas números' })
  telefone?: string;

  @ApiProperty({
    description: 'Data de nascimento',
    example: '2010-05-10T00:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  dataNascimento!: Date;

  @ApiPropertyOptional({
    description: 'Sexo da pessoa',
    enum: Sexo,
    example: 'MASCULINO',
  })
  @IsOptional()
  @IsEnum(Sexo)
  sexo?: Sexo;

  @ApiPropertyOptional({
    description: 'Nome do responsável',
    example: 'Maria da Silva',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nomeResponsavel?: string;

  @ApiPropertyOptional({
    description: 'Telefone do responsável',
    example: '85988888888',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(10, 11, { message: 'O telefone deve ter entre 10 e 11 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'O telefone deve conter apenas números' })
  telefoneResponsavel?: string;

  @ApiPropertyOptional({
    description: 'Observações adicionais sobre a pessoa',
    example: 'Aluno com dificuldade em matemática.',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observacoes?: string;
}

export class PessoaEdicaoDto extends PartialType(OmitType(PessoaCadastroDto, ['cpf'] as const)) {}
