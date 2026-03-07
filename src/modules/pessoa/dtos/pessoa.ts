import { TipoPessoa, Sexo } from 'src/common/enums/pessoa';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
export class PessoaCadastroDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto!: string;
  @IsEnum(TipoPessoa)
  tipo!: TipoPessoa;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  registradoPor!: string;
  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  @Matches(/^[0-9]*$/, { message: 'O CPF deve conter apenas números' })
  cpf?: string;
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @Length(10, 11, { message: 'O telefone deve ter entre 10 e 11 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'O telefone deve conter apenas números' })
  telefone?: string;
  @IsEnum(Sexo)
  @Type(() => Date)
  @IsDate()
  dataNascimento!: Date;
  @IsOptional()
  @IsEnum(Sexo)
  sexo?: Sexo;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nomeResponsavel?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(10, 11, { message: 'O telefone deve ter entre 10 e 11 dígitos' })
  @Matches(/^[0-9]+$/, { message: 'O telefone deve conter apenas números' })
  telefoneResponsavel?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  observacoes?: string;
  @IsBoolean()
  ativo?: boolean;
}
