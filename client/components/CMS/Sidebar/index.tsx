'use client'
import React, {ReactElement, useState} from 'react'
import { Link } from "@/routing/*";
import {usePathname} from "next/navigation";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

export type SideNavItem = {
    title: string;
    path: string;
    icon?: ReactElement;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};

export const SIDENAV_ITEMS: SideNavItem[] = [
    // {
    //     title: 'Home',
    //     path: '/cms',
    // },
    // {
    //     title: 'Projects',
    //     path: '/cms',
    //     submenu: true,
    //     subMenuItems: [
    //         {title: 'All', path: '/cms'},
    //         {title: 'Web Design', path: '/cms'},
    //         {title: 'Graphic Design', path: '/cms'},
    //     ],
    // },
    {
        title: 'Конференції',
        path: '/cms/conference',
    },
    {
        title: 'Напрямки для співпраці',
        path: '/cms/cooperation',
    },
    {
        title: 'Шаблони документів',
        path: '/cms/documents',
    },
    {
        title: 'Договори про співпрацю',
        path: '/cms/agreements',
    },
    {
        title: 'Асоціації та членства',
        path: '/cms/associations',
    },
    {
        title: 'Наукові школи',
        path: '/cms/science',
    },
    {
        title: 'Інноваційні розробки',
        path: '/cms/innovations',
    },
    {
        title: 'Міжнародні проекти',
        path: '/cms/international',
    },
    {
        title: 'Публічна інформація',
        path: '/cms/public-information',
    },
    {
        title: 'Наукова робота ОНТУ',
        path: '/cms/research',
    },
    {
        title: 'Міжнародна діяльність ОНТУ',
        path: '/cms/activity',
    },
    {
        title: 'Науково-дослідні лабораторії',
        path: '/cms/laboratory',
    },
    {
        title: 'Консалтинговий центр НДІ',
        path: '/cms/consulting',
    },
    {
        title: 'Відділ міжнародних грантів та академічної мобільності',
        path: '/cms/digam',
    },
    {
        title: 'Студентська наука',
        path: '/cms/student',
    },
];

const Sidebar = ({}) => {

    return (
        <>
            <div className="lg:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden lg:flex">
                <div className="flex flex-col space-y-6 w-full">
                    <Link href="/" className="flex gap-1 items-center justify-center p-2 border-b border-zinc-200 h-[90px] w-full">
                        <Image src="/image/logoft.png"
                               alt="scint_ontu логотип"
                               as={NextImage}
                               width={0}
                               height={0}
                               sizes="100vh auto"
                               style={{width: '90px', height: 'auto'}}
                               radius="none"
                               fetchPriority="high"/>
                        <span className="font-bold text-xl hidden lg:flex">SCINT ONTU</span>
                    </Link>

                    <div className="flex flex-col space-y-2 lg:px-6 overflow-y-auto">
                    {SIDENAV_ITEMS.map((item, idx) => {
                            return <MenuItem key={idx} item={item}/>;
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

const MenuItem = ({ item }: { item: SideNavItem }) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    return (
        <div>
            {item.submenu ? (
                <>
                    <button
                        onClick={toggleSubMenu}
                        className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
                            pathname.includes(item.path) ? 'bg-zinc-100' : ''
                        }`}
                    >
                        <div className="flex flex-row space-x-4 items-center">
                            {item.icon}
                            <span className="font-semibold text-base  flex">{item.title}</span>
                        </div>

                        <div className={`${subMenuOpen ? 'rotate-180' : ''} w-[24px] h-[24px] flex`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                            </svg>
                        </div>
                    </button>

                    {subMenuOpen && (
                        <div className="my-2 ml-8 flex flex-col space-y-4">
                            {item.subMenuItems?.map((subItem, idx) => {
                                return (
                                    <Link
                                        key={idx}
                                        href={subItem.path}
                                        className={`${
                                            subItem.path === pathname ? 'font-bold' : ''
                                        }`}
                                    >
                                        <span>{subItem.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </>
            ) : (
                <Link
                    href={item.path}
                    className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
                        item.path === pathname ? 'bg-zinc-100' : ''
                    }`}
                >
                    {item.icon}
                    <span className="font-semibold text-base flex">{item.title}</span>
                </Link>
            )}
        </div>
    );
};

export default Sidebar;