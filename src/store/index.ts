import { configureStore } from '@reduxjs/toolkit'
import UserReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import PageInfoReducer, { PageInfoType } from './pageInfoReducer'
export type StateType = {
  user: UserStateType
  components: ComponentsStateType
  pageInfo: PageInfoType
}
export default configureStore({
  reducer: {
    user: UserReducer,
    components: componentsReducer,
    pageInfo: PageInfoReducer,
  },
})
