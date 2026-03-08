import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  providers: [MatriculaService, PrismaService],
  controllers: [MatriculaController],
})
export class MatriculaModule {}
