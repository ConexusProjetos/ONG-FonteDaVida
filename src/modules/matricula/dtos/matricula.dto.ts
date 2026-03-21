import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MatriculaCriacaoDTO {
  @ApiProperty({
    description: 'ID da turma em que a pessoa será matriculada',
    example: 'c7f6e8e2-3f4c-4b2e-9c3a-8f6b5e9f1234',
  })
  @IsUUID()
  @IsNotEmpty()
  turmaId!: string;

  @ApiProperty({
    description: 'ID da pessoa que será matriculada',
    example: 'd9a7c5e4-8a3f-4f6a-b3e2-9d6f8a7b1234',
  })
  @IsUUID()
  @IsNotEmpty()
  pessoaId!: string;

  @ApiProperty({
    description: 'Data em que a matrícula foi realizada',
    example: '2026-03-09T14:30:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  dataMatricula!: Date;
}

export class MartriculaEdicaoDTO {
  @ApiProperty({
    description: 'Data de saída da matrícula',
    example: '2026-12-10T14:30:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  dataSaida!: Date;
}
