-- CreateEnum
CREATE TYPE "AtividadeEnum" AS ENUM ('REFORCO_ESCOLAR', 'PROGRAMA_60MAIS', 'FUTEBOL', 'QUENTINHAS', 'OUTRO');

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" TEXT NOT NULL,
    "pessoaId" TEXT NOT NULL,
    "turmaId" TEXT,
    "atividade" "AtividadeEnum" NOT NULL,
    "dataAtendimento" TIMESTAMP(3) NOT NULL,
    "presente" BOOLEAN NOT NULL,
    "observacao" TEXT NOT NULL,
    "registradoPor" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);
