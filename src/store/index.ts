import { configureStore } from '@reduxjs/toolkit'
import UserReducer, { UserStateType } from './userReducer'
export type StateType = {
  user: UserStateType
}
export default configureStore({
  reducer: {
    user: UserReducer,
  },
})
