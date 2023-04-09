
import proxyquire from 'proxyquire'
import { expect } from 'chai'
import sinon from 'sinon'
import type BlockType from './component'

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

const { default: Block } = proxyquire('./component', {
  './eventBus': {
    EventBus: class {
      emit = eventBusMock.emit
      on = eventBusMock.on
    }
  }
}) as { default: typeof BlockType }

describe('Block', () => {
  class ComponentMock extends Block<any> {}

  it('should fire init event on initialization', () => {
    // eslint-disable-next-line no-new
    new ComponentMock('div', {})

    expect(eventBusMock.emit.calledWith('init')).to.eq(true)
  })
})
