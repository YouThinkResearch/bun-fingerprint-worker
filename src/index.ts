import { handleRequest } from './handler'
import { env } from 'node:process'
import { returnHttpResponse } from './utils'

export default {
  async fetch(request: Request) {
    return handleRequest(request, env as any).then(returnHttpResponse)
  },
}
