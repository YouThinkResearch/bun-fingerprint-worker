import { getProxySecret, WorkerEnv } from '../env'

export function addProxyIntegrationHeaders(headers: Headers, url: string, env: WorkerEnv) {
  const proxySecret = getProxySecret(env)
  if (proxySecret) {
    headers.set('FPJS-Proxy-Secret', proxySecret)
  }

  headers.delete('host')
  headers.set('FPJS-Proxy-Client-IP', getIPFromHeaders(headers))
  headers.set('FPJS-Proxy-Forwarded-Host', new URL(url).hostname)

  headers.forEach((value, key) => {
    if (key.startsWith('x-')) {
      headers.delete(key)
    }
  })
}

export function getIPFromHeaders(headers: Headers) {
  const allowedHeaders = ['X-Envoy-External-Address', 'CF-Connecting-IP', 'X-Real-Ip']
  const connectingIPHeader = allowedHeaders.find((header) => headers.get(header))

  return connectingIPHeader ? headers.get(connectingIPHeader)! : '45.85.105.85'
}
