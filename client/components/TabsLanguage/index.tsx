import React, { FC, ReactNode, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";

type Props = {
  tabUkraine: ReactNode;
  tabEnglish: ReactNode;
};

const TabsLanguage: FC<Props> = ({ tabUkraine, tabEnglish }) => {
  const [selected, setSelected] = useState("Ukraine");

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      destroyInactiveTabPanel={false}
      onSelectionChange={(key: string | number) => setSelected(String(key))}
      classNames={{
        tab: "!text-medium max-xl:!text-base font-bold px-[20px] z-[1] data-[hover-unselected=true]:opacity-100",
        base: "relative",
        panel: "mt-[20px] p-0",
        cursor: "w-full text-[#ffdd00] bg-[#ffdd00] h-[3px] bottom-[-4px]",
        tabContent:
          "group-data-[selected=true]:text-black max-sm:text-[12px] max-lg:text-base text-black group-data-[hover-unselected=true]:text-primary-400",
      }}
      variant="solid"
    >
      <Tab key="Ukraine" title="Українська">
        {tabUkraine}
      </Tab>
      <Tab key="English" title="Англійська">
        {tabEnglish}
      </Tab>
    </Tabs>
  );
};

export default TabsLanguage;
