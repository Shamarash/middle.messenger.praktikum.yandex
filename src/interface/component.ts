export interface IBaseProps {
    attributes?: {
        [key: string]: string | undefined | boolean | number
    }
    events?: {
        [key: string]: (value: any) => any
    }
}
