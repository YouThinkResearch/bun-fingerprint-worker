// Hop-by-hop headers describe the client→proxy connection and must not be forwarded upstream.
// The RU relay (Caddy) sends browser GETs with `Transfer-Encoding: chunked`; forwarded as is,
// fpcdn.io waits for a body that never comes, Bun's idle timeout cuts the request after ~10 s
// and the browser never gets the agent script (respondents stuck in the hub screener).
const HOP_BY_HOP = ['connection', 'keep-alive', 'proxy-connection', 'te', 'transfer-encoding', 'upgrade', 'content-length']

/** A bodyless request (GET/HEAD) without hop-by-hop headers; other methods are returned untouched. */
export function withoutHopByHopHeaders(request: Request): Request {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return request
  }

  const headers = new Headers(request.headers)
  HOP_BY_HOP.forEach((name) => headers.delete(name))

  return new Request(request.url, { method: request.method, headers })
}
