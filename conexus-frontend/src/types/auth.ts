export type AuthCadastro = {
  nome: string
  senha: string
  cpf: string
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
