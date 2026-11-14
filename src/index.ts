import { handleRequest } from './handler'
import { env } from 'node:process'
import { returnHttpResponse, withoutHopByHopHeaders } from './utils'

export default {
  async fetch(request: Request) {
    return handleRequest(withoutHopByHopHeaders(request), env as any).then(returnHttpResponse)
  },
}
