import { api } from '../router/api'

export interface Pessoa {
  id: string
  nomeCompleto: string
  tipo: 'BENEFICIARIO' | 'VOLUNTARIO'
  cpf?: string
  telefone?: string
  dataNascimento?: string
  sexo?: 'M' | 'F' | 'OUTRO'
  nomeResponsavel?: string
  telefoneResponsavel?: string
  observacoes?: string
  registradoPor?: string
}

export interface CriarPessoaDTO {
  nomeCompleto: string
  tipo: 'BENEFICIARIO' | 'VOLUNTARIO'
  registradoPor?: string
  cpf?: string
  telefone?: string
  dataNascimento?: string
  sexo?: 'M' | 'F' | 'OUTRO'
  nomeResponsavel?: string
  telefoneResponsavel?: string
  observacoes?: string
}

export interface EditarPessoaDTO {
  nomeCompleto?: string
  tipo?: 'BENEFICIARIO' | 'VOLUNTARIO'
  registradoPor?: string
  telefone?: string
  dataNascimento?: string
  sexo?: 'M' | 'F' | 'OUTRO'
  nomeResponsavel?: string
  telefoneResponsavel?: string
  observacoes?: string
}

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
