import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AtendimentoModule } from './modules/atendimento/atendimento.module';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { TurmaModule } from './modules/turma/turma.module';
import { MatriculaModule } from './modules/matricula/matricula.module';

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
    TurmaModule,
    MatriculaModule,
  ],
  controllers: [],
})
export class AppModule {}
