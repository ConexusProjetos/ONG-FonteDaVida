-- CreateTable
CREATE TABLE "Matricula" (
    "id" UUID NOT NULL,
    "turmaId" UUID NOT NULL,
    "pessoaId" UUID NOT NULL,
    "dataMatricula" TIMESTAMP(3) NOT NULL,
    "dataSaida" TIMESTAMP(3),

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
