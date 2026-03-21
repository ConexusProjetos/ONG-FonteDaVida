import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  MaxLength,
} from 'class-validator';
import { AtividadeEnum } from '@prisma/client';
import { Turno } from 'src/common/enums/turno';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TurmaCadastroDto {
  @ApiProperty({
    description: 'Nome da turma',
    example: 'Turma A - Matemática',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome da turma é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  nome!: string;

  @ApiProperty({
    description: 'Atividade realizada pela turma',
    enum: AtividadeEnum,
    example: 'REFORCO_ESCOLAR',
  })
  @IsEnum(AtividadeEnum, { message: 'Atividade inválida' })
  @IsNotEmpty({ message: 'A atividade é obrigatória' })
  atividade!: AtividadeEnum;

  @ApiPropertyOptional({
    description: 'Turno da turma',
    enum: Turno,
    example: 'MANHA',
  })
  @IsOptional()
  @IsEnum(Turno, { message: 'Turno inválido' })
  turno?: Turno;

  @ApiPropertyOptional({
    description: 'ID do educador responsável pela turma',
    example: 'a3c2f8e7-5a2d-4b8f-9b6e-3f2d7c8a1234',
  })
  @IsOptional()
  @IsUUID()
  educadorId?: string;

  @ApiProperty({
    description: 'Indica se a turma está ativa',
    example: true,
  })
  @IsBoolean({ message: 'O campo ativa deve ser um booleano' })
  ativa!: boolean;
}
