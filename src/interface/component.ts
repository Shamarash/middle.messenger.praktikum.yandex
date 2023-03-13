export type EventsWithSelector = Record<string, Record<string, (e: any) => void>>

export interface IBaseProps {
  attributes?: Record<string, string | undefined | boolean | number | RegExp>
  events?: Record<string, (value: any) => any>
  eventsWithSelector?: EventsWithSelector
}
