import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import UserReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import PageInfoReducer, { PageInfoType } from './pageInfoReducer'
export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoType
}
export default configureStore({
  reducer: {
    user: UserReducer,
    // components: componentsReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: PageInfoReducer,
  },
})
