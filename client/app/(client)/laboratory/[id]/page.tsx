import React from 'react'
import DetailsPage from "@/components/DetailsPage";
import NewsItem from "@/components/NewsItem";

const laboratory = [
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
]

const LaboratoryItem = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14">
                <DetailsPage/>
                <div className="flex flex-col gap-14 max-sm:gap-5">
                    {laboratory.map((item, index) =>
                        <NewsItem title={item.title}
                                  imageObj={
                                      {
                                          image: item.image,
                                          width: 400,
                                          height: 210,
                                          imageStyle: `max-h-[210px]`
                                      }
                                  }
                                  key={index}
                                  text={item.text}
                                  date={"28 січня"}
                                  index={index}
                                  buttonDetails
                                  link={'/'}
                                  lengthArr={laboratory.length}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LaboratoryItem;