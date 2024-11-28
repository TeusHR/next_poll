import React, { FC } from "react";
import Marquee from "react-fast-marquee";
import { Raleway } from "next/font/google";

const RalewaySlab = Raleway({subsets: ['latin', 'cyrillic']});

type Props = {
  translate:string,
}

const MargueeComponent:FC<Props> = ({translate}) => {
  return (
    <Marquee autoFill={true} className={RalewaySlab.className}>
      <p className="text-white px-2 uppercase">{translate}</p>
      <p className="text-[#B7B1DC] px-2 uppercase">{translate}</p>
    </Marquee>
  );
};

export default MargueeComponent;