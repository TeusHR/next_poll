import React, {ReactNode} from 'react'
import CellItem, {ICellItem} from "@/components/Cell/CellItem";

type Props = {
    style: string
    children?: ReactNode
}

const cellItemsLeft: ICellItem[] = [
    {
        text: 'Lorem ipsum dolor sit amet',
        image: '/image/helmet.png',
        link: '/'
    },
    {
        text: 'Lorem ipsum dolor sit amet',
        image: '/image/atom.png',
        link: '/'
    }
]

const cellItemsRight: ICellItem[] = [
    {
        text: 'Lorem ipsum dolor sit amet',
        image: '/image/atom.png',
        link: '/'
    },
    {
        text: 'Lorem ipsum dolor sit amet',
        image: '/image/helmet.png',
        link: '/'
    }
]

const Cell = ({style}: Props) => {


    return (
        <div className={style}>
            {/*<div className="flex flex-col mt-6 text-4xl max-sm:text-3xl text-center gap-y-12 w-full justify-end">*/}
            {/*    <span>*/}
            {/*        Наукова робота ОНТУ*/}
            {/*    </span>*/}
            {/*    {cellItemsLeft.map((item, index) =>*/}
            {/*        <CellItem key={index} text={item.text} image={item.image} link={item.link}/>)*/}
            {/*    }*/}
            {/*</div>*/}

            {/*<div className="flex flex-col mt-6 text-4xl max-sm:text-3xl text-center gap-y-12 w-full justify-end">*/}
            {/*    */}
            {/*    <span>*/}
            {/*        Міжнародна діяльність ОНТУ*/}
            {/*    </span>*/}
            {/*    {cellItemsRight.map((item, index) =>*/}
            {/*        <CellItem key={index} text={item.text} image={item.image} link={item.link}/>)*/}
            {/*    }*/}
            {/*</div>*/}

            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-28 max-md:gap-16 max-xl:gap-16 mt-6 text-4xl max-sm:text-3xl text-center gap-y-12 w-full items-end">
                <div className="flex flex-col gap-12 max-xl:gap-6 mt-6 w-full justify-end">
                    <span>
                    Наукова робота ОНТУ
                </span>
                    {cellItemsLeft.map((item, index) =>
                        <CellItem key={index} text={item.text} image={item.image} link={item.link}/>)
                    }
                </div>
                <div className="flex flex-col gap-12 max-xl:gap-6 mt-6 w-full justify-end">
                    <span>
                    Міжнародна діяльність ОНТУ
                </span>
                    {cellItemsRight.map((item, index) =>
                        <CellItem key={index} text={item.text} image={item.image} link={item.link}/>)
                    }
                </div>
            </div>

            {/*<div*/}
            {/*    className="w-full text-4xl text-center mb-12 grid grid-cols-2 2xl:gap-x-56 max-2xl:gap-x-40 max-xl:gap-x-24 max-md:gap-x-16 gap-y-12">*/}
            {/*    <span>*/}
            {/*        Наукова робота ОНТУ*/}
            {/*    </span>*/}
            {/*    <span>*/}
            {/*        Міжнародна діяльність ОНТУ*/}
            {/*    </span>*/}
            {/*</div>*/}

            {/*<CellItem/>*/}
            {/*<CellItem/>*/}
        </div>
    )
}

export default Cell;