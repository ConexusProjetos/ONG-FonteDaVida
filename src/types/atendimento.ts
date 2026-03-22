import type { Atividade, Turma } from '@/types/turma'
import type { Pessoa } from './pessoa'
export interface Atendimento {
  id: string
  pessoaId: string
  turmaId: string
  atividade: Atividade
  dataAtendimento: Date
  presente: boolean
  observacao?: string
  pessoa: Pessoa
  turma: Turma
}

export interface CriarAtendimentoDTO {
  pessoaId: string
  turmaId: string
  atividade: Atividade
  dataAtendimento: Date
  presente: boolean
  observacao?: string
}
