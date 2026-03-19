import { api } from '@/router/api'
import type { Usuario } from '@/types/usuario'

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
