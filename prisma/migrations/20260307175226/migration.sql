-- DropForeignKey
ALTER TABLE "Atendimento" DROP CONSTRAINT "Atendimento_pessoaId_fkey";

-- AlterTable
ALTER TABLE "Atendimento" ALTER COLUMN "pessoaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
