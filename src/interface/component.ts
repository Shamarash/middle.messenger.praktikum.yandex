export type EventsWithSelector = Record<string, Record<string, (e: any) => void>>
export type Attribute = Record<string, string | undefined | boolean | number | RegExp>
export interface IBaseProps {
  attributes?: Attribute
  events?: Record<string, (value: any) => any>
  eventsWithSelector?: EventsWithSelector
  attributesWithSelector?: Record<string, Attribute>
}
