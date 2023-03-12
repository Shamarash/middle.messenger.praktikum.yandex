import { Component } from '../../component'
import { IProfileProps } from '../../interface/profile'
import template from './template'
import { ChangeAvatar, ChangeProfile, ChangeProfileState, GetMe, LogOut } from '../../store/actions'
import * as handlebars from 'handlebars'
import { ProfileModeEnum } from '../../enum/profile'
import store from '../../store'
import { router } from '../../router'
import { IProfileChangeProps } from '../../interface/api/profile'
import link from '../../components/link'

handlebars.registerHelper('log', function (something) {
  console.log(something)
})

class Profile extends Component<IProfileProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }

  componentDidMount () {
    super.componentDidMount()
    GetMe()
  }
}

export default () => {
  return new Profile(
    'div',
    {
      attributes: {
        class: 'centeredFlex formContainer'
      },
      events: {
        click: function (e: MouseEvent) {
          console.log(e)
          const el = e.target as HTMLDivElement
          if (el?.classList.contains('profileSubmitButton')) {
            e.preventDefault()
            const form = el.closest('form') as HTMLFormElement
            if (form) {
              const formData = new FormData(form)
              let result: IProfileChangeProps = {
                email: '',
                login: '',
                first_name: '',
                second_name: '',
                display_name: '',
                phone: '',
              }
              formData.forEach((value, key) => {
                if (typeof value === 'string' && Object.keys(result).includes(key)) {
                  result = { ...result, [key]: value }
                }
              })
              ChangeProfile(result)

              const avatarForm = el.closest('.profileContent')?.querySelector('.profileAvatarForm') as HTMLFormElement
              if (avatarForm) {
                const avatarFormData = new FormData(avatarForm)
                ChangeAvatar(avatarFormData)
              }
              console.log('Profile form submit', result)
            }

            return
          }
          if (el?.classList.contains('changeProfile')) {
            ChangeProfileState(ProfileModeEnum.changeInfo)
            return
          }
          if (el?.classList.contains('cancelEdit')) {
            ChangeProfileState(ProfileModeEnum.normal)
            return
          }
          if (el?.classList.contains('changePassword')) {
            ChangeProfileState(ProfileModeEnum.changePassword)
            return
          }
          if (el?.classList.contains('exitLink')) {
            LogOut()
          }
        }
      }
    }
  )
}
