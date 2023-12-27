import { configureStore } from '@reduxjs/toolkit'
import UserReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
export type StateType = {
  user: UserStateType
  components: ComponentsStateType
}
export default configureStore({
  reducer: {
    user: UserReducer,
    components: componentsReducer,
  },
})
