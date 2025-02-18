import React, { FC } from "react";
import Title from "components/UI/Title";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import { ConsultingService, TrainingService } from "@/services/client.service";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import NewsItem from "@/components/NewsItem";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    locale: string;
  };
};

// export const metadata: Metadata = {
//   title: "Консалтинговий центр НДІ",
//   openGraph: {
//     url: "/consulting/",
//   },
// };

export async function generateMetadata(
  {params}: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale:params.locale, namespace: 'Page'});

  return {
    title: t('consulting'),
    openGraph: {
      url: "/consulting/",
    },
  };
}

const Consulting: FC<Props> = async ({ params: { locale } }) => {
  const consulting = await ConsultingService.getAll(locale.toUpperCase());
  const training = await TrainingService.getAll(locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  if (consulting === null) return notFound();

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title text={titlePage('consulting')} style="text-[#111318] text-5xl max-xl:text-3xl font-semibold" />
        {consulting.images.map((item, index) => (
          <div
            key={`${item.image}-${index}`}
            className="flex flex-row gap-20 max-sm:flex-col max-xl:gap-14 max-sm:gap-8 text-xl"
          >
            <div className="flex flex-col gap-14 max-sm:gap-10 max-w-[400px]">
              <div className="flex flex-col gap-5 max-sm:items-center max-sm:justify-center">
                <Image
                  src={encodeURI(item.image)}
                  width={400}
                  height={400}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                  classNames={{
                    wrapper: "w-full max-w-[400px] max-h-[400px] max-lg:max-w-[300px] max-lg:max-h-[300px]",
                  }}
                  alt={"preview"}
                  radius="none"
                  as={NextImage}
                  fetchPriority={"high"}
                />
                <div className="mx-auto my-0 text-center">{item.description}</div>
              </div>
            </div>
            <div className="flex flex-col gap-14 max-sm:gap-10">
              <Title
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                style="text-[#111318] text-3xl max-xl:text-2xl font-semibold"
              />
              <div dangerouslySetInnerHTML={{ __html: consulting.text }}></div>
            </div>
          </div>
        ))}

        {training && (
          <div className="flex flex-col gap-14 max-sm:gap-8">
            <div className="flex flex-col gap-3">
              <Title text="Тренінг" style="text-[#111318] text-5xl max-xl:text-3xl font-semibold" />
              <span className="border border-[#6E8880]"></span>
            </div>
            <div className="flex flex-col gap-14">
              {training.map((item, index) => (
                <NewsItem
                  title={item.title}
                  imageObj={{
                    image: item.images[0],
                    width: 400,
                    height: 210,
                    imageStyle: `max-h-[210px]`,
                  }}
                  lightBoxImage={{
                    show: true,
                    images: item.images,
                  }}
                  key={index}
                  text={item.text}
                  date={item.createdAt}
                  index={index}
                  buttonDetails
                  link={`/trainings/${item.id}`}
                  lengthArr={training.length}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consulting;
