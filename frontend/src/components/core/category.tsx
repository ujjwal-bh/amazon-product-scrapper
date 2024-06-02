import React, { LiHTMLAttributes } from 'react'

interface IProps extends LiHTMLAttributes<HTMLLIElement>{
    category: string,
    setCategory: React.Dispatch<React.SetStateAction<string>>
    name: string
}

export default function Category({name,category,setCategory,...rest}: IProps) {
    const handleClick = () => {
        setCategory(name)
    }
  return (
    <li {...rest} className={`category-item ${category === name ? "active": ""}`} onClick={handleClick}>{name}</li>
  )
}
