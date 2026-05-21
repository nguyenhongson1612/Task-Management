export function parseApiError(error, fallback = 'Đã có lỗi xảy ra') {
  const errors = error.response?.data?.errors
  if (errors && typeof errors === 'object') {
    return Object.values(errors).join('. ')
  }
  return error.response?.data?.detail || error.message || fallback
}
