import { api } from '../router/api'

export interface Usuario {
  id: string
  nome: string
  email: string
  role: string
  dataCriacao: string
  estaAtivado: boolean
}

export const usuarioService = {
  async listarTodos(): Promise<Usuario[]> {
    const { data } = await api.get('/usuario')
    return data
  },

  async buscarPorId(id: string): Promise<Usuario> {
    const { data } = await api.get(`/usuario/buscarUsuarioPorId/${id}`)
    return data
  },
}
