import {
  IsBoolean,
  IsOptional,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AtividadeEnum } from '../../../common/enums/atividade';

export class atendimentoCriacaoDTO {
  @ApiPropertyOptional({
    description: 'ID da pessoa atendida',
    example: 'c7f6e8e2-3f4c-4b2e-9c3a-8f6b5e9f1234',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  pessoaId!: string;

  @ApiPropertyOptional({
    description: 'ID da turma vinculada ao atendimento',
    example: 'a8b7c6d5-1f2e-4a3b-9d8c-7e6f5a4b3210',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  turmaId?: string;

  @ApiProperty({
    description: 'Tipo de atividade realizada no atendimento',
    enum: AtividadeEnum,
    example: 'REFORCO_ESCOLAR',
  })
  @IsEnum(AtividadeEnum)
  atividade!: AtividadeEnum;

  @ApiProperty({
    description: 'Data em que ocorreu o atendimento',
    example: '2026-03-09T14:30:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  dataAtendimento!: Date;

  @ApiProperty({
    description: 'Indica se a pessoa esteve presente no atendimento',
    example: true,
  })
  @IsBoolean()
  presente!: boolean;

  @ApiProperty({
    description: 'Observações sobre o atendimento realizado',
    example: 'Aluno apresentou dificuldade em matemática durante a atividade.',
  })
  @IsString()
  @IsNotEmpty()
  observacao!: string;
}
