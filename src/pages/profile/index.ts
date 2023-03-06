import { Connect } from '../../store'
import Profile from './profile'
import { IStore } from '../../interface/store'

export default Connect(
  Profile,
  (state: IStore) => {
    return {
      user: state.user,
    }
  }
)
