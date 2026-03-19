import { api } from '../router/api'
import type { CriarTurmaDTO, EditarTurmaDTO, Turma } from '@/types/turma'

export const turmaService = {
  async listarTodas(): Promise<Turma[]> {
    const response = await api.get('/turma')
    console.log(response)
    const { data } = response
    return data
  },

  async criar(dto: CriarTurmaDTO): Promise<Turma> {
    const response = await api.post('/turma', dto)
    console.log(response)
    const { data } = response
    return data
  },

  async editar(id: string, dto: EditarTurmaDTO): Promise<Turma> {
    const { data } = await api.put(`/turma/${id}`, dto)
    return data
  },
}
