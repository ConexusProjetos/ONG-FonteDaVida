import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AtendimentoModule } from './modules/atendimento/atendimento.module';
import { PessoaModule } from './modules/pessoa/pessoa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsuarioModule,
    AtendimentoModule,
    PessoaModule,
  ],
  controllers: [],
})
export class AppModule {}
