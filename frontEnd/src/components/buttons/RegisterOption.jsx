import React from 'react'

export const RegisterOption = ({icon, text}) => {
    return (
        <div className='bg-white h-52 w-full xl:max-w-[340px] 2xl:max-w-[520px] rounded-2xl shadow-xl flex flex-col justify-center items-center p-8 text-darkBlue gap-y-3'>
            <i className={`${icon} text-5xl`}></i>
            <p className='font-cocogooseLight text-subTitle'>{text}</p>
        </div>
    )
}
