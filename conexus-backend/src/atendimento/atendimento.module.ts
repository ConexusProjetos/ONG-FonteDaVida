import { Module } from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoController } from './atendimento.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [AtendimentoService, PrismaService],
  controllers: [AtendimentoController],
})
export class AtendimentoModule {}
