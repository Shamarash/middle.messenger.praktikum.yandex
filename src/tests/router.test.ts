import { expect } from 'chai'
import { router } from '../router'
import Register, { registerProps } from '../pages/register'
import LoginPage, { loginProps } from '../pages/login'

describe('Проверяем переходы у Роута', () => {
  it('Переход на новую страницу router должен менять состояние сущности history', () => {
    router.use('/sign-up', Register, 'div', registerProps)
      .use('/sign-in', LoginPage, 'div', loginProps)
    router.go('/sign-up')
    router.go('/sign-in')

    expect(window.history.length).to.eq(3)
  })
})
