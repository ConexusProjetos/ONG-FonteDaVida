import type { AxiosError } from 'axios'
import api from '../router/api'
import type { CriarTurmaDTO, EditarTurmaDTO, Turma } from '@/types/turma'

export const turmaService = {
  async listarTodas(): Promise<Turma[]> {
    const response = await api.get('/turma')
    console.log(response)
    const { data } = response
    return data
  },

  async criar(dto: CriarTurmaDTO): Promise<Turma> {
    try {
      const response = await api.post('/turma', dto)
      console.log('Sucesso:', response.data)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      console.error('Erro detalhado do Backend:', axiosError.response?.data)

      // Lança o erro para o componente TurmaView saber que falhou
      throw error
    }
  },

  async editar(id: string, dto: EditarTurmaDTO): Promise<Turma> {
    const { data } = await api.put(`/turma/${id}`, dto)
    return data
  },
}
