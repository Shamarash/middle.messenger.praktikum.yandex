import Store from './store'

export default function connect (Component: any, mapStateToProps: any) {
  return class extends Component {
    constructor (tag: string, props = {}) {
      const store = new Store()

      super(tag, { ...props, ...mapStateToProps(store.getState()) })

      store.on(Store.EVENT_UPDATE, () => {
        this.setProps({ ...mapStateToProps(store.getState()) })
      })
    }
  }
}
