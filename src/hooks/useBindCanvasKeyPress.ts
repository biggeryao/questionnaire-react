import { useKeyPress } from 'ahooks'
import {
  copySelectedComponent,
  pasteCopyComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'
import { useDispatch } from 'react-redux'

function isActiveElementValid() {
  const activeElem = document.activeElement
  if (activeElem === document.body) return true //光标不在input
  if (activeElem?.matches('div[role="button"]')) return true //光标不在input
  return false
}
function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopyComponent())
  })
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
}

export default useBindCanvasKeyPress
