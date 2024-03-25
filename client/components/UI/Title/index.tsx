import React from 'react'

type Props = {
    text:string,
    style?:string,
}

const Title = ({text,style}:Props) => {


    return (
        <div className={`${style ? style : 'text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl mb-12 font-semibold'}`}>
            {text}
        </div>
    )
}

export default Title;