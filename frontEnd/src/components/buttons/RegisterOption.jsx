import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterOption = ({icon, text, link}) => {
    return (
        <Link to={`/${link}`}>
            <div className='bg-white h-52 w-full xl:w-[340px] 2xl:w-[520px] rounded-2xl shadow-xl flex flex-col justify-center items-center p-8 text-darkBlue gap-y-3 cursor-pointer'>
                <i className={`${icon} text-5xl`}></i>
                <p className='font-cocogooseLight text-subTitle'>{text}</p>
            </div>
        </Link>
    )
}
