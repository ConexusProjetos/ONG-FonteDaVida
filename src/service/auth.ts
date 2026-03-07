import { type AuthCadastro, type AuthLogin, type CadastroResponse } from '../types/auth'
import { api } from './api'

export default {
  async cadastro(body: AuthCadastro): Promise<CadastroResponse> {
    return await api.post('auth/cadastro', body)
  },
  async login(body: AuthLogin) {
    return await api.post('auth/login', body)
  },
}
