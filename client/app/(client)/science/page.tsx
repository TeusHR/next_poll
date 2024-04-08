import React from 'react'
import Title from "@/UI/Title";
import DirectItem from "@/components/DirectItem";

const directItem = [
    {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et imperdiet quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id luctus. Sed commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum dapibus. Ut suscipit euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue varius. Donec sed feugiat felis, quis fringilla nulla.',
        title: 'Lorem ipsum dolor sit amet'
    },
    {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et imperdiet quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id luctus. Sed commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum dapibus. Ut suscipit euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue varius. Donec sed feugiat felis, quis fringilla nulla.',
        title: 'Lorem ipsum dolor sit amet'
    },
    {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et imperdiet quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id luctus. Sed commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum dapibus. Ut suscipit euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue varius. Donec sed feugiat felis, quis fringilla nulla.',
        title: 'Lorem ipsum dolor sit amet'
    },
]

const School = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text="Наукові школи"
                       style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                {directItem.map((item, index) =>

                    <React.Fragment key={index}>
                        <DirectItem title={item.title} text={item.text} index={index + 1}/>
                        {index !== directItem.length - 1 && <span className="border border-[#6E8880]"></span>}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default School;
