import { withoutHopByHopHeaders } from '../../src/utils/withoutHopByHopHeaders'

describe('withoutHopByHopHeaders', () => {
  it('drops chunked transfer-encoding and connection headers from a GET, keeps the rest', () => {
    const request = new Request('https://hub.ru.youthink.io/fp-proxy/agent?apiKey=k', {
      headers: { 'transfer-encoding': 'chunked', connection: 'keep-alive', 'user-agent': 'ua', 'x-forwarded-for': '1.2.3.4' },
    })

    const result = withoutHopByHopHeaders(request)

    expect(result.headers.get('transfer-encoding')).toBeNull()
    expect(result.headers.get('connection')).toBeNull()
    expect(result.headers.get('user-agent')).toBe('ua')
    expect(result.headers.get('x-forwarded-for')).toBe('1.2.3.4')
    expect(result.url).toBe(request.url)
    expect(result.body).toBeNull()
  })

  it('leaves a POST untouched', () => {
    const request = new Request('https://hub.ru.youthink.io/fp-proxy/result', { method: 'POST', body: 'x' })

    expect(withoutHopByHopHeaders(request)).toBe(request)
  })
})
