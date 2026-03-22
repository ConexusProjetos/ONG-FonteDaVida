export interface Pessoa {
  id: string
  nomeCompleto: string
  tipo: 'BENEFICIARIO' | 'VOLUNTARIO'
  cpf?: string
  telefone?: string
  dataNascimento?: Date
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
