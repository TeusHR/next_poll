import React from 'react'

const NotFound = ({}) => {


    return (
        <div className="flex flex-col h-[100vh] text-center items-center justify-center">
            <div className="flex flex-row gap-12 text-3xl">
                <span className="font-bold">404</span>
                Цю сторінку не вдалося знайти.
            </div>
        </div>
    )
}

export default NotFound;