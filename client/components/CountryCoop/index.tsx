import React, {FC} from 'react'
import Title from "@/components/UI/Title";
import { IForeignUniversities } from "@/types/Agreements";
import Document from "@/components/Document";

type Props = {
    foreignUniversities: IForeignUniversities,
    title:string,
}

const CountryCoop: FC<Props> = ({foreignUniversities, title}) => {


    return (
        <div className="flex flex-col gap-20 max-sm:gap-10">
            {Object.entries(foreignUniversities).length > 0 &&
                <>
                    <Title
                        text={title}
                        style="text-[#111318] text-4xl max-xl:text-2xl max-sm:text-xl font-semibold"/>

                    {Object.entries(foreignUniversities).map(([country, universities]) => (
                        <div key={country}
                             className="flex flex-row max-sm:flex-col gap-40 max-lg:gap-16 max-md:gap-8 max-sm:gap-6">
                            <div
                                className="text-6xl  max-md:text-5xl max-te:text-4xl max-sm:text-6xl min-w-[330px] max-lg:min-w-[250px] font-mono font-bold text-white"
                                style={{WebkitTextStroke: "2px black", WebkitTextFillColor: "transparent"}}>
                                {country}
                            </div>
                            <div className="flex flex-col gap-16 max-md:gap-10 max-sm:gap-8 text-base w-full">
                                {universities.map((universities, index) => (
                                    <div key={`${country}-${universities.title}-${index}`}
                                         className="flex flex-col gap-8 max-md:gap-6">
                                        <Title
                                            text={universities.title}
                                            style="text-[#111318] text-4xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
                                        <div className="flex flex-row gap-4 justify-between">
                                            <span>
                                                {universities.description}
                                            </span>
                                            {universities.files &&
                                              <span className="flex flex-col gap-3 relative w-max">
                                                  {universities.files.map(item => (<Document key={item} link={item} />))}
                                              </span>}
                                        </div>
                                    </div>))}
                            </div>

                        </div>
                    ))}
                </>
            }
        </div>
    )
}

export default CountryCoop;