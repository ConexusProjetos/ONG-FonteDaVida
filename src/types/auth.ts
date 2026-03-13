export type AuthCadastro = {
  nome: string
  senha: string
  email: string
}
export type AuthLogin = {
  email: string
  senha: string
}

export type CadastroResponse = {
  status: number
  data: unknown
}

export type TokenPayload = {
  id: string
  email: string
  exp: number
  iat: number
  dataCriacao: Date
  nome: string
  role: string
}
