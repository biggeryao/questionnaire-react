export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}
export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: 'item1' },
    { value: 'item2', text: 'item2' },
  ],
  value: '',
}
