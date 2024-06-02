import  {  InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement>{}

export default function Input({ ...rest}: IProps) {
  return (
    <input {...rest}/>
  )
}
