import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  providers: [PessoaService, PrismaService],
  controllers: [PessoaController],
})
export class PessoaModule {}
