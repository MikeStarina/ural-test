export function getRequestStatus(request, messages) {
  if (!request || typeof request !== 'object') return null

  if (request.status === 'loading') {
    return { tone: 'loading', message: messages.loading }
  }
  if (request.status === 'error') {
    return { tone: 'error', message: request.error }
  }

  const items = Array.isArray(request.items) ? request.items : []
  if (request.status === 'success' && items.length === 0) {
    return { tone: 'empty', message: messages.empty }
  }
  return null
}
