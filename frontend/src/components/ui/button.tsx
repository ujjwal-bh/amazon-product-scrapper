import { ButtonHTMLAttributes } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{}

export default function Button({children, ...rest}: IProps) {
  return (
    <button {...rest}>{children}</button>
  )
}
