import { Component } from '../../component'
import template from './template'
import { IContactsListProps } from '../../interface/contactsList'
import {log} from "handlebars";

class ContactsList extends Component<IContactsListProps> {
  render (): Node | void {
    return this.compile(template, this._props)
  }
}

export default (props: IContactsListProps) => new ContactsList(
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
