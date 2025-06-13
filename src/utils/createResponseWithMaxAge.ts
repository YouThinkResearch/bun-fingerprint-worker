import { getCacheControlHeaderWithMaxAgeIfLower } from './getCacheControlHeaderWithMaxAgeIfLower'

export async function createResponseWithMaxAge(
  oldResponse: Response,
  maxMaxAge: number,
  maxSMaxAge: number
): Promise<Response> {
  const buf = await oldResponse.text()
  const response = new Response(buf, oldResponse)
  const oldCacheControlHeader = oldResponse.headers.get('cache-control')
  if (!oldCacheControlHeader) {
    return response
  }

  const cacheControlHeader = getCacheControlHeaderWithMaxAgeIfLower(oldCacheControlHeader, maxMaxAge, maxSMaxAge)
  response.headers.delete('content-encoding')
  response.headers.set('cache-control', cacheControlHeader)
  return response
}
