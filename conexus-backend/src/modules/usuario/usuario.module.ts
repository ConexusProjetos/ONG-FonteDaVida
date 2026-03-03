import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { RolesGuard } from '../../common/roles/roles.guard';

@Module({
  providers: [UsuarioService, PrismaService, RolesGuard],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
