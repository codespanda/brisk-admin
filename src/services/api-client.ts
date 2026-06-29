export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function mockApiCall<T>(data: T, delayMs = 300): Promise<T> {
  await delay(delayMs)
  return data
}

export async function mockApiError(message: string, status = 400): Promise<never> {
  await delay(300)
  throw new ApiError(message, status)
}
