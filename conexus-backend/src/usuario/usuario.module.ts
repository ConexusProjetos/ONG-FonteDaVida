import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BycriptService } from 'src/bycript/bycript.service';

@Module({
  providers: [UsuarioService, PrismaService, BycriptService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
