-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_registradoPor_fkey" FOREIGN KEY ("registradoPor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
