import { api } from '../router/api'
import type { Atividade } from './turmaService'

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

export const atendimentoService = {
  async listarTodos(): Promise<Atendimento[]> {
    const { data } = await api.get('/atendimento')
    return data
  },

  async buscarPorId(id: string): Promise<Atendimento> {
    const { data } = await api.get(`/atendimento/${id}`)
    return data
  },

  async registrar(dto: CriarAtendimentoDTO): Promise<Atendimento> {
    const { data } = await api.post('/atendimento', dto)
    return data
  },
}
