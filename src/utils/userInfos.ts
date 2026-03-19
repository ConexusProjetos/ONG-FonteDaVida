import { useAuthStore } from '@/stores/auth'
import { parseJwtPayload } from './decodificarJwt'
import type { TokenPayload } from '@/types/auth'
export const usuarioInformacoes = (): TokenPayload | null => {
  const authStore = useAuthStore()
  const token = authStore.token
  if (!token) return null
  const usuario: TokenPayload | null = parseJwtPayload(token)
  return usuario
}
