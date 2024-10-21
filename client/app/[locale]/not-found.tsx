import React from 'react'
import ButtonDetails from '@/UI/ButtonDetails';

const NotFound = ({}) => {


    return (
        <div className="flex gap-4 flex-col h-[100vh] text-center items-center justify-center">
            <div className="flex flex-row gap-12 text-3xl">
                <span className="font-bold">404</span>
                Цю сторінку не вдалося знайти.
            </div>
            <ButtonDetails link="/" text="На головну"/>
        </div>
    )
}

export default NotFound;
