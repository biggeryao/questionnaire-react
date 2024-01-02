import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { produce } from 'immer'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
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
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft
      const newSelectedId = getNextSelectedId(removedId, componentList)
      draft.selectedId = newSelectedId
      const index = componentList.findIndex(c => c.fe_id === removedId)
      componentList.splice(index, 1)
    }),
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList } = draft
        const { fe_id, isHidden } = action.payload

        let newSelectedId = ''
        if (isHidden) {
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList } = draft
        const { fe_id } = action.payload

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
} = componentsSlice.actions

export default componentsSlice.reducer
