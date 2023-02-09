export interface IBaseProps {
  attributes?: Record<string, string | undefined | boolean | number | RegExp>
  events?: Record<string, (value: any) => any>
}
