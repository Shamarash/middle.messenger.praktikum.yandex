import Component from '../../component'
import template from './template'
import input from '../input'
import { InputTypeEnum } from '../../enum/input'
import { LoginPattern } from '../../utils/Patterns'
import { IBaseProps } from '../../interface/component'
import { debounce } from '../../utils/debounce'

export interface IContactsSearchProps extends IBaseProps {
  contactsSearch: Component<any>
}

class ContactsSearch extends Component<IContactsSearchProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default new ContactsSearch('div', {
  contactsSearch: input({
    attributes: {
      class: 'searchContainer',
    },
    attributesWithSelector: {
      input: {
        id: 'сontactsSearch',
        title: 'Поиск среди чатов',
        placeholder: 'Поиск',
        type: InputTypeEnum.text,
        pattern: LoginPattern,
      },
    },
    minLength: 0,
    maxLength: 10,
  },
  // @ts-expect-error
  debounce(handleInput, 500))
})
