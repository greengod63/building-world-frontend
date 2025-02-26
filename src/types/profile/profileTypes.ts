import { MouseEventHandler, ReactNode } from 'react'

export type profileInputProps = { inputName: string, value: string, keyName: string, type: string }
export type profileButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>,
  children: ReactNode
}
