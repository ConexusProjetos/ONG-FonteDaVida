import { IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { AtividadeEnum } from 'src/enums/atividade';
export class atendimentoCriacaoDTO {
  @IsString()
  @IsNotEmpty()
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
