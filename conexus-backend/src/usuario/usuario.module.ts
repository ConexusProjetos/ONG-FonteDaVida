import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../roles/roles.guard';

@Module({
  providers: [UsuarioService, PrismaService, RolesGuard],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
