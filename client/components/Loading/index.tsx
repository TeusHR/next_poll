import {FC} from 'react';
import {Spinner} from "@nextui-org/react";

type Props = {
    absolute?: boolean
    transparent?: boolean
}
const Loading: FC<Props> = ({absolute, transparent}) => {
    const Loader = <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${transparent ? '' : 'bg-brand-gray-200'} bg-opacity-70 w-full h-full flex items-center justify-center z-40`}>
        <Spinner size="lg" classNames={{circle2: 'border-b-primary-400', circle1: 'border-b-primary-400'}}/>
    </div>

    if (absolute)
        return <div>
            <div className="fixed top-0 w-full h-screen z-50">
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-gray-200 bg-opacity-70 w-full h-screen flex items-center justify-center z-10">
                    <Spinner size="lg" classNames={{circle2: 'border-b-primary-400', circle1: 'border-b-primary-400'}}/>
                </div>
            </div>
        </div>


    return Loader
};

export default Loading;