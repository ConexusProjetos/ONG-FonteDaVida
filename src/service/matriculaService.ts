import { api } from './api'

export interface Matricula {
  id: string
  turmaId: string
  pessoaId: string
  dataMatricula: string
  dataSaida?: string
}

export interface CriarMatriculaDTO {
  turmaId: string
  pessoaId: string
  dataMatricula: string
}

export interface EditarMatriculaDTO {
  dataSaida: string
}

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
