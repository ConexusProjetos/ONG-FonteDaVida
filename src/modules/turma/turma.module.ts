import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  providers: [TurmaService, PrismaService],
  controllers: [TurmaController],
})
export class TurmaModule {}
