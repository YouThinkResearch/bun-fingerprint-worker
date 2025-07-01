import { getProxySecret, WorkerEnv } from '../env'

export function addProxyIntegrationHeaders(headers: Headers, url: string, env: WorkerEnv) {
  const proxySecret = getProxySecret(env)
  if (proxySecret) {
    headers.set('FPJS-Proxy-Secret', proxySecret)
  }

  // cloudflare usually drops that headers, but bun does not so we need to
  // manually remove them
  headers.delete('host')
  headers.set('FPJS-Proxy-Client-IP', getIPFromHeaders(headers))
  headers.set('FPJS-Proxy-Forwarded-Host', new URL(url).hostname)

  headers.forEach((_, key) => {
    if (key.toLowerCase().startsWith('x-')) {
      headers.delete(key)
    }
  })
}

export function getIPFromHeaders(headers: Headers) {
  const allowedHeaders = ['X-Envoy-External-Address', 'CF-Connecting-IP', 'X-Real-Ip', 'X-Forwarded-For']
  const connectingIPHeader = allowedHeaders.find((header) => headers.get(header))

  if (!connectingIPHeader) {
    throw new Error('failed to resolve connecting IP from headers')
  }

  return headers.get(connectingIPHeader)!
}
