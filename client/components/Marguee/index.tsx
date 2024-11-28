import React from "react";
import Marquee from "react-fast-marquee";
import { Raleway } from "next/font/google";

const RalewaySlab = Raleway({subsets: ['latin', 'cyrillic']});

const MargueeComponent = () => {
  return (
    <Marquee autoFill={true} className={RalewaySlab.className}>
      <p className="text-white px-2">САЙТ ПРАЦЮЄ В ТЕСТОВОМУ РЕЖИМІ</p>
      <p className="text-[#B7B1DC] px-2">САЙТ ПРАЦЮЄ В ТЕСТОВОМУ РЕЖИМІ</p>
    </Marquee>
  );
};

export default MargueeComponent;