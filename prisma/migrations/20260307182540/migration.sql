-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VISUALIZADOR', 'EDUCADOR');

-- CreateEnum
CREATE TYPE "AtividadeEnum" AS ENUM ('REFORCO_ESCOLAR', 'PROGRAMA_60MAIS', 'FUTEBOL', 'QUENTINHAS', 'OUTRO');

-- CreateEnum
CREATE TYPE "Turno" AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('BENEFICIARIO', 'VOLUNTARIO');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F', 'OUTRO');

-- CreateTable
CREATE TABLE "Turma" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "atividade" "AtividadeEnum" NOT NULL,
    "turno" "Turno",
    "educadorId" UUID,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'VISUALIZADOR',
    "estaAtivado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" UUID NOT NULL,
    "nomeCompleto" VARCHAR(200) NOT NULL,
    "cpf" VARCHAR(14),
    "dataNascimento" DATE NOT NULL,
    "telefone" VARCHAR(20),
    "tipo" "TipoPessoa" NOT NULL,
    "sexo" "Sexo",
    "nomeResponsavel" VARCHAR(200),
    "telefoneResponsavel" VARCHAR(20),
    "observacoes" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "registradoPor" UUID NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" UUID NOT NULL,
    "pessoaId" UUID,
    "turmaId" UUID,
    "atividade" "AtividadeEnum" NOT NULL,
    "dataAtendimento" TIMESTAMP(3) NOT NULL,
    "presente" BOOLEAN NOT NULL,
    "observacao" TEXT NOT NULL,
    "registradoPor" UUID NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_educadorId_fkey" FOREIGN KEY ("educadorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_registradoPor_fkey" FOREIGN KEY ("registradoPor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_registradoPor_fkey" FOREIGN KEY ("registradoPor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
