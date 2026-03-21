import  api from '../router/api'
import type { Matricula, EditarMatriculaDTO, CriarMatriculaDTO } from '../types/matricula'

export const matriculaService = {
  async listarTodas(): Promise<Matricula[]> {
    const { data } = await api.get('/matricula')
    return data
  },

  async realizar(dto: CriarMatriculaDTO): Promise<Matricula> {
    const { data } = await api.post('/matricula', dto)
    return data
  },

  async registrarSaida(id: string, dto: EditarMatriculaDTO): Promise<Matricula> {
    const { data } = await api.put(`/matricula/${id}`, dto)
    return data
  },
}
