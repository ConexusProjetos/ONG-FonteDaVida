import api from '../router/api'
import type { Pessoa, CriarPessoaDTO, EditarPessoaDTO } from '@/types/pessoa'

export const pessoaService = {
  async listarTodas(): Promise<Pessoa[]> {
    const { data } = await api.get('/pessoa')
    return data
  },

  async buscarPorId(id: string): Promise<Pessoa> {
    const { data } = await api.get(`/pessoa/buscar-pessoa-por-id/${id}`)
    return data
  },

  async cadastrar(dto: CriarPessoaDTO) {
    try {
      const { data } = await api.post('/pessoa', dto)
      return data
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        return error
      }
    }
  },

  async editar(id: string, dto: EditarPessoaDTO): Promise<Pessoa> {
    const { data } = await api.put(`/pessoa/${id}`, dto)
    return data
  },
}
