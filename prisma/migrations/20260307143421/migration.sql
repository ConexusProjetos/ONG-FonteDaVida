-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VISUALIZADOR', 'EDUCADOR');

-- CreateEnum
CREATE TYPE "AtividadeEnum" AS ENUM ('REFORCO_ESCOLAR', 'PROGRAMA_60MAIS', 'FUTEBOL', 'QUENTINHAS', 'OUTRO');

-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('BENEFICIARIO', 'VOLUNTARIO');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F', 'OUTRO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
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
    "registradoPor" TEXT NOT NULL,
    "dataCriacao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" TEXT NOT NULL,
    "pessoaId" UUID NOT NULL,
    "turmaId" TEXT,
    "atividade" "AtividadeEnum" NOT NULL,
    "dataAtendimento" TIMESTAMP(3) NOT NULL,
    "presente" BOOLEAN NOT NULL,
    "observacao" TEXT NOT NULL,
    "registradoPor" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_registradoPor_fkey" FOREIGN KEY ("registradoPor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_registradoPor_fkey" FOREIGN KEY ("registradoPor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
