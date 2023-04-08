import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon'
import { expect } from 'chai'
import { HttpRequest } from './base'

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  let instance: HttpRequest
  const requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()

    // @ts-expect-error
    global.XMLHttpRequest = xhr

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }

    instance = new HttpRequest()
  })

  afterEach(() => {
    requests.length = 0
  })

  it('.get() should send GET request', () => {
    void instance.get('/user')

    const [request] = requests

    expect(request.method).to.eq('GET')
  })
})
