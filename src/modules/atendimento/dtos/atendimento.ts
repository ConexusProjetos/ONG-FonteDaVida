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
import { AtividadeEnum } from '../../../common/enums/atividade';
export class atendimentoCriacaoDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  pessoaId!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  turmaId?: string;

  @IsEnum(AtividadeEnum)
  atividade!: AtividadeEnum;

  @Type(() => Date)
  @IsDate()
  dataAtendimento!: Date;

  @IsBoolean()
  presente!: boolean;

  @IsString()
  @IsNotEmpty()
  observacao!: string;
}
