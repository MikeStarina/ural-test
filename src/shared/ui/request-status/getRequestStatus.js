export function getRequestStatus(request, messages) {
  if (request.status === 'loading') {
    return { tone: 'loading', message: messages.loading }
  }
  if (request.status === 'error') {
    return { tone: 'error', message: request.error }
  }
  if (request.status === 'success' && request.items.length === 0) {
    return { tone: 'empty', message: messages.empty }
  }
  return null
}
