import { api } from './api'

export type Atividade =
  | 'REFORCO_ESCOLAR'
  | 'OFICINA_ARTE'
  | 'ESPORTE'
  | 'MUSICA'
  | 'INFORMATICA'
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

export const turmaService = {
  async listarTodas(): Promise<Turma[]> {
    const { data } = await api.get('/turma')
    return data
  },

  async criar(dto: CriarTurmaDTO): Promise<Turma> {
    const { data } = await api.post('/turma', dto)
    return data
  },

  async editar(id: string, dto: EditarTurmaDTO): Promise<Turma> {
    const { data } = await api.put(`/turma/${id}`, dto)
    return data
  },
}
