import { ref, computed } from 'vue'
import { pessoaService } from '@/service/pessoaService'
import type { Pessoa } from '@/types/pessoa'
import type { Turma } from '@/types/turma'
import type { Atendimento } from '@/types/atendimento'
import { turmaService } from '@/service/turmaService'
import { atendimentoService } from '@/service/atendimentoService'

/**
 * Normaliza qualquer resposta do backend para array.
 * Cobre: array direto, { data: [] }, string vazia, null, undefined, etc.
 */
function toArray<T>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[]
  if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>
    for (const key of ['data', 'items', 'content', 'results']) {
      if (Array.isArray(obj[key])) return obj[key] as T[]
    }
  }
  // string vazia, null, undefined, ou formato desconhecido
  if (raw !== undefined && raw !== null && raw !== '') {
    console.warn('[useDashboard] Formato de resposta inesperado:', raw)
  }
  return []
}

export function useDashboard() {
  const pessoas = ref<Pessoa[]>([])
  const turmas = ref<Turma[]>([])
  const atendimentos = ref<Atendimento[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const totalPessoas = computed(() => pessoas.value.length)
  const turmasAtivas = computed(() => turmas.value.filter((t) => t.ativa).length)

  const atendimentosRecentes = computed(() => {
    return [...atendimentos.value]
      .sort((a, b) => new Date(b.dataAtendimento).getTime() - new Date(a.dataAtendimento).getTime())
      .slice(0, 5)
  })

  const totalAtendimentos = computed(() => atendimentos.value.length)

  async function carregarDados() {
    loading.value = true
    error.value = null

    try {
      const resultados = await Promise.all([
        pessoaService.listarTodas(),
        turmaService.listarTodas(),
        atendimentoService.listarTodos(),
      ])

      console.log('[useDashboard] resultados brutos:', resultados)

      pessoas.value = toArray<Pessoa>(resultados[0])
      turmas.value = toArray<Turma>(resultados[1])
      atendimentos.value = toArray<Atendimento>(resultados[2])

      console.log('[useDashboard] após normalização:', {
        pessoas: pessoas.value,
        turmas: turmas.value,
        atendimentos: atendimentos.value,
      })
    } catch {
      // if (e?.response?.status === 401) {
      //   error.value = 'Sessão expirada. Faça login novamente.'
      // } else if (e?.code === 'ERR_NETWORK' || e?.code === 'ERR_CONNECTION_REFUSED') {
      //   error.value = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.'
      // } else {
      //   error.value = 'Erro ao carregar dados do painel.'
      // }
      // console.error('[useDashboard] Erro ao carregar dados:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    pessoas,
    turmas,
    atendimentos,
    totalPessoas,
    turmasAtivas,
    atendimentosRecentes,
    totalAtendimentos,
    loading,
    error,
    carregarDados,
  }
}
