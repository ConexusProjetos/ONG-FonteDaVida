import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class MatriculaCriacaoDTO {
  @IsUUID()
  @IsNotEmpty()
  turmaId!: string;
  @IsUUID()
  @IsNotEmpty()
  pessoaId!: string;
  @Type(() => Date)
  @IsDate()
  dataMatricula!: Date;
}
