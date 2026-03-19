import type { Atividade } from '@/types/turma'
export interface Atendimento {
  id: string
  pessoaId: string
  turmaId: string
  atividade: Atividade
  dataAtendimento: string
  presente: boolean
  observacao?: string
}

export interface CriarAtendimentoDTO {
  pessoaId: string
  turmaId: string
  atividade: Atividade
  dataAtendimento: string
  presente: boolean
  observacao?: string
}
