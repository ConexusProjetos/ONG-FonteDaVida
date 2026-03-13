export function parseJwtPayload<T>(token: string): T | null {
  try {
    const part = token.split('.')[1]
    if (!part) return null
    return JSON.parse(atob(part)) as T
  } catch {
    return null
  }
}
