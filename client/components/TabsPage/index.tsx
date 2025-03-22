'use client'
import React, {FC, Key, useState} from 'react';
import {Tab, Tabs} from "@nextui-org/react";
import {Raleway} from "next/font/google";

const RalewaySlab = Raleway({weight: '400', subsets: ['cyrillic']});

type Props = {
    tabs: TabItem[];
}

export interface TabItem {
    key: string;
    title: string;
    content: React.ReactNode;
    bottomContent?: React.ReactNode;
}

const TabsPage: FC<Props> = ({tabs}) => {
    const [selected, setSelected] = useState('');
    const activeTab = tabs.find(tab => tab.key === selected);

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size={"lg"} classNames={{
                tabList: "gap-8 bg-transparent px-3 pl-0 flex-wrap",
                tab: `${RalewaySlab.className} uppercase data-[selected=true]:font-semibold px-0 max-w-max`,
                cursor: 'shadow-none bg-transparent rounded-none',
                tabContent: 'text-[#2E2C39]'
            }} selectedKey={selected} onSelectionChange={(key: Key) => setSelected(key.toString())}>
                {tabs.map((tab, idx) => (
                    <Tab key={tab.key} title={
                        <div className="flex items-center gap-8">
                            <span>{tab.title}</span>
                            <div className={`${tabs.length - 1 === idx ? 'hidden' : ' font-normal'}`}>|</div>
                        </div>
                    }>
                        {tab.content}
                    </Tab>
                ))}
            </Tabs>
            {activeTab?.bottomContent && (
                <div className="flex flex-col gap-3 px-3">
                    {activeTab.bottomContent}
                </div>
            )}
        </div>
    );
};

export default TabsPage;