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
