import Component from '../../component'
import template from './template'
import { IContactsListProps } from '../../interface/contactsList'

class ChatList extends Component<IContactsListProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default (props: IContactsListProps) => new ChatList(
  'ul',
  {
    ...props,
    attributes: {
      class: 'contactsList'
    },
    events: {
      click: function (e: MouseEvent) {
        e.preventDefault()
      }
    }
  }
)
