import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}
export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
  selectedId: string
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
}
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        const { selectedId, componentList } = draft
        const index = componentList.findIndex(c => c.fe_id === selectedId)
        if (index < 0) {
          componentList.push(newComponent)
        } else {
          componentList.splice(index + 1, 0, newComponent)
        }
        draft.selectedId = newComponent.fe_id
      }
    ),
  },
})

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions

export default componentsSlice.reducer
