import { Component } from '../component'

export default function render (query: string, component: Component<any>) {
  const root = document.querySelector(query)

  if (root) { root.appendChild(component.getContent()) }

  component.dispatchComponentDidMount()

  return root
}
