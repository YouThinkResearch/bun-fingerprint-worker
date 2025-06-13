// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchCacheable(request: Request, _ttl: number) {
  request.headers.delete('host')
  request.headers.delete('accept-encoding')

  return fetch(request)
}
