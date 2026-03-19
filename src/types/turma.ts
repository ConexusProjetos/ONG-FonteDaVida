export type Atividade =
  | 'REFORCO_ESCOLAR'
  | 'PROGRAMA_60MAIS'
  | 'FUTEBOL'
  | 'QUENTINHAS'
  | 'OUTRO'
  | string

export type Turno = 'MANHA' | 'TARDE' | 'NOITE'

export interface Turma {
  id: string
  nome: string
  atividade: Atividade
  turno: Turno
  educadorId: string
  ativa: boolean
}

export interface CriarTurmaDTO {
  nome: string
  atividade: Atividade
  turno: Turno
  educadorId: string
  ativa: boolean
}

export interface EditarTurmaDTO {
  nome?: string
  atividade?: Atividade
  turno?: Turno
  educadorId?: string
  ativa?: boolean
}
