import { getProxySecret, WorkerEnv } from '../env'

export function addProxyIntegrationHeaders(headers: Headers, url: string, env: WorkerEnv) {
  const proxySecret = getProxySecret(env)
  if (proxySecret) {
    headers.set('FPJS-Proxy-Secret', proxySecret)
  }

  headers.set('FPJS-Proxy-Client-IP', getIPFromHeaders(headers))
  headers.set('FPJS-Proxy-Forwarded-Host', new URL(url).hostname)
}

export function getIPFromHeaders(headers: Headers) {
  const allowedHeaders = ['X-Envoy-External-Address', 'CF-Connecting-IP', 'X-Real-Ip']
  const connectingIP = allowedHeaders.find((header) => headers.get(header))

  return connectingIP || '45.85.105.85'
}
