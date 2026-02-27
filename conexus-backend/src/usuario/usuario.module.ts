import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  providers: [UsuarioService, PrismaService, RolesGuard],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
