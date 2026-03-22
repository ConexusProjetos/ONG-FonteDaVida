import api from '../router/api'
import type { Atendimento, CriarAtendimentoDTO } from '@/types/atendimento'

export const atendimentoService = {
  async listarTodos(): Promise<Atendimento[]> {
    const { data } = await api.get('/atendimento')
    return data
  },

  async buscarPorId(id: string): Promise<Atendimento> {
    const { data } = await api.get(`/atendimento/${id}`)
    return data
  },

  async registrar(dto: CriarAtendimentoDTO) {
    const response = await api.post('/atendimento', dto)
    return response
  },
  async editar(dto: CriarAtendimentoDTO) {
    const response = await api.put('/atendimento', dto)
    return response
  },
}
