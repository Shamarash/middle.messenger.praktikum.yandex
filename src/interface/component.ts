export interface IBaseProps {
    attributes?: {
        [key: string]: string | undefined | boolean
    }
    events?: {
        [key: string]: (value: any) => any
    }
}
