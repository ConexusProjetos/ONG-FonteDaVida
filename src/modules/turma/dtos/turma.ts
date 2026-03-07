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

export class TurmaCadastroDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da turma é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  nome!: string;

  @IsEnum(AtividadeEnum, { message: 'Atividade inválida' })
  @IsNotEmpty({ message: 'A atividade é obrigatória' })
  atividade!: AtividadeEnum;

  @IsOptional()
  @IsEnum(Turno, { message: 'Turno inválido' })
  turno?: Turno;

  @IsOptional()
  @IsUUID('4', { message: 'O ID do educador deve ser um UUID válido' })
  educadorId?: string;

  @IsOptional()
  @IsBoolean({ message: 'O campo ativa deve ser um booleano' })
  ativa?: boolean;
}
