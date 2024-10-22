import React from "react";
import Title from "components/UI/Title";
import ButtonDetails from "components/UI/ButtonDetails";
import { ConferencesService } from "@/services/client.service";
import { StringConferenceType } from "@/utils/ConferenceType";

type Props = {
  params: {
    locale: string;
  };
};

const ConferenceItem = async ({ params: { locale } }: Props) => {
  const conferences = await ConferencesService.getAll(locale.toUpperCase());

  return (
    <div className="my-16 flex flex-col gap-8">
      <div className="flex flex-col">
        {conferences.map((conference, index) => (
          <React.Fragment key={conference.month}>
            <div
              key={conference.month}
              className="flex flex-row max-md:flex-col gap-y-4 gap-x-96 max-xl:gap-x-16 max-lg:gap-x-6 max-xl:justify-between text-[#111318] text-xl"
            >
              <Title
                text={conference.month}
                style={"text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-bold min-w-[300px]"}
              />
              <div className="flex flex-col gap-9 w-full">
                {conference.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between max-sm:flex-col gap-y-6 gap-x-24 max-xl:gap-x-8"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2">
                        <span>{item.date}</span>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>{StringConferenceType(item.type)}</span>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>{item.country}</span>
                      </div>
                      <div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </div>
                    <ButtonDetails link={`/conference/${item.id}`}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.714045 0.285955L0.714045 1.94766L7.29603 1.95355L0.124789 9.12479L1.3033 10.3033L8.47454 3.13206L8.48043 9.71404L10.1421 9.71405V0.285955H0.714045Z"
                          fill="#111318"
                        />
                      </svg>
                    </ButtonDetails>
                  </div>
                ))}
              </div>
            </div>
            {index !== conferences.length - 1 && conferences.length !== 0 ? (
              <span className="my-14 border border-[#6E8880]"></span>
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ConferenceItem;
