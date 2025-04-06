'use client';
import React, {Key, useCallback, useEffect, useMemo, useState} from 'react';
import {ILiftGroupConference} from '@/types/Conference';
import {
    Checkbox,
    Pagination,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from '@nextui-org/react';
import {usePathname, useRouter} from 'next/navigation';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import moment from 'moment/moment';
import {Image, Button} from '@nextui-org/react';
import {AxiosInstance} from 'axios';
import {StringConferenceType} from '@/utils/ConferenceType';
import {
    ActivityService,
    ScienceCompetitionService, CooperationService,
    DocumentsService, DocumentTemplates,
    InnovationsService, InternationalService, LaboratoryService, PublicInformation,
    ResearchService, ScienceService, ConferencesService, InternationalPracticeService, EventsService
} from "@/services/CMS.service";
import {toast} from 'react-toastify';
import {IConsulting} from '@/types/Consulting';
import {ICooperation} from '@/types/Cooperation';
import {stripHtml} from '@/utils/StripHtml';
import {IResearch} from '@/types/Research';
import {IActivity} from '@/types/Activity';
import {IInnovation} from '@/types/Innovation';
import {IInternational} from '@/types/International';
import {ILaboratory} from '@/types/Laboratory';
import {IScience} from '@/types/Science';
import revalidateFetch from '@/services/revalidateFetch';
import {IDocuments} from "@/types/Documents";
import {useLocale} from "next-intl";
import {IDocumentsTemplates} from "@/types/DocumentsTemplates";

type Props<T> = {
    dataItems: T[]
    rowsViewPage?: number
    tableColumn: { title: string, key: string }[],
    tableType?: 'modal' | 'link',
    typeProduct: string
    controlPage?: number
    initialPage?: number
    searchInput?: string
    topContent?: React.ReactNode
    deleteMessage?: string
    selectionMode?: 'none' | 'multiple'
    selectedKeys?: Set<string>
    onSelectKeys?: (keys: Set<string>) => void
    totalDataItems?: number
    totalPages?: number
    disableShadow?: boolean
    refetch?: () => void
}

type ValidDataTypes =
    ILiftGroupConference
    | IConsulting
    | ICooperation
    | IResearch
    | IActivity
    | IInnovation
    | ILaboratory
    | IInternational
    | IDocuments
    | IScience
    | IDocumentsTemplates;

const TableItems = <T extends ValidDataTypes>(
    {
        dataItems,
        rowsViewPage = 6,
        tableColumn,
        tableType = 'link',
        initialPage,
        searchInput,
        selectedKeys,
        onSelectKeys,
        typeProduct,
        disableShadow = false,
        selectionMode = 'none',
        topContent,
        totalDataItems = 0,
        totalPages,
        deleteMessage = 'Ви впевнені що хочете видалити?',
    }: Props<T>) => {


    const router = useRouter();
    const pathname = usePathname();
    const $apiAuth = useAxiosAuth();
    const language = useLocale()

    const [data, setData] = useState<T[]>(dataItems);
    const [page, setPage] = useState(initialPage || 1);
    const rowsPerPage = rowsViewPage;
    const [items, setItems] = useState<T[]>([]);

    useEffect(() => {
        setData(dataItems);
        setPage(1);
    }, [dataItems]);

    useEffect(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        setItems(data.slice(start, end));
    }, [data, page, pathname, router, rowsPerPage]);

    const bottomContent = useMemo(() => {
        const total = Math.ceil(data.length / rowsPerPage);
        return (
            <div
                className={`flex w-full ${selectionMode === 'multiple' ? 'justify-between' : 'justify-center'} flex-1 items-end`}>
                {((totalPages ? totalPages : total) > 1) && <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    initialPage={initialPage}
                    page={searchInput ? 1 : page}
                    total={totalPages ? totalPages : total}
                    onChange={(page) => {
                        setPage(page);
                        // router.push(getQueryString('page', page.toString(), searchParams, pathname))
                    }}
                />}
                {selectionMode === 'multiple' &&
                    <div className={`!text-[14px] flex items-center ${total <= 1 ? 'w-full justify-end' : ''}`}>
                        <div>Вибрано {selectedKeys?.size || 0} з {totalDataItems}</div>
                    </div>}
            </div>
        );
    }, [totalPages, initialPage, page, data, totalDataItems, selectedKeys, rowsPerPage, searchInput, selectionMode]);

    const redirectItem = useCallback((key: string | number | bigint, item?: T) => {
        if (tableType == 'link' && !String(key).includes('action') && !item)
            router.push(`${typeProduct}/${key}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, tableType, typeProduct]);

    const renderCell = useCallback((item: T, idx: number, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof T];

        switch (columnKey) {
            case 'image':
                if (!('image' in item))
                    break;
                return (
                    <div className="w-[75px] flex justify-center">
                        {/*// @ts-ignore*/}
                        <Image src={item.image || ''} alt="SCINT image"/>
                    </div>
                );
            case 'image_slider':
                if (!('desktopImage' in item))
                    break;
                return (
                    <div className="w-[100px] flex justify-center">
                        {/*// @ts-ignore*/}
                        <Image src={item.desktopImage.image || ''} alt="SCINT image"/>
                    </div>
                );
            case 'isActive':
                return <div className="flex justify-center">
                    <Checkbox isSelected={Boolean(cellValue)} isReadOnly={true}/>
                </div>;
            case 'id':
                return <div>{idx + 1}</div>;
            case 'date':
                if (typeProduct === 'conference') { // @ts-ignore
                    return <div>{String(cellValue)} {item['toDate'] ? ` - ${String(item['toDate'])}` : ''}</div>;
                }
                return <div>{moment(String(cellValue)).locale(language).format('YYYY-MM-DD kk:mm')}</div>;
            case 'month':
                return <div>{String(cellValue)}</div>;
            case 'type':
                return <div>{StringConferenceType(cellValue)}</div>;
            case 'from':
                return moment(String(cellValue)).format('YYYY-MM-DD kk:mm');
            case 'to':
                return moment(String(cellValue)).format('YYYY-MM-DD kk:mm');
            case 'createdAt':
                return moment(String(cellValue)).locale(language).format('YYYY-MM-DD kk:mm');
            case 'updatedAt':
                return moment(String(cellValue)).locale(language).format('YYYY-MM-DD kk:mm');
            case 'sex':
                return !cellValue ? '' : String(cellValue) === 'MALE' ? 'Чоловіча' : 'Жіноча';
            case 'text':
                return <div>{stripHtml(cellValue)}</div>;
            case 'action':
                return (
                    <div className="flex flex-row gap-4 justify-center">
                        <Button isIconOnly
                                onClick={() => redirectItem(item.id,
                                    tableType === 'modal' ? item : undefined)}
                                className="w-[32px] h-[32px] bg-[#828282] rounded-[8px]">
                            <Tooltip content="Деталі">
                                <span
                                    className="text-lg w-[20px] text-white cursor-pointer active:opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path
                                        d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>
                                </span>
                            </Tooltip>
                        </Button>
                        <PopoverDeleteItem setData={setData} apiAuth={$apiAuth}
                                           idItem={item.id}
                                           typeProduct={typeProduct}
                                           deleteMessage={deleteMessage}
                        />
                    </div>
                );
            default:
                return <>{String(cellValue)}</>;
        }
    }, [typeProduct, language, $apiAuth, deleteMessage, redirectItem, tableType]);

    const changeHandler = useCallback((keys: 'all' | Set<Key>) => {
        if (onSelectKeys && selectedKeys && selectionMode === 'multiple') {
            if (keys === 'all') {
                const all = new Set<string>(selectedKeys);

                data.forEach(item => {
                    const id = item.id.toString();
                    if (!all.has(id))
                        all.add(id);
                });
                onSelectKeys(all);
            } else {
                // @ts-ignore
                onSelectKeys(keys);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKeys, selectionMode, data]);

    return (
        <div className="w-full h-full">
            <Table
                aria-label="all items"
                selectionMode={selectionMode}
                topContent={topContent}
                selectedKeys={selectedKeys}
                onSelectionChange={changeHandler}
                topContentPlacement="inside"
                bottomContent={bottomContent}
                className="max-[900px]:min-w-[1000px]"
                classNames={{
                    wrapper: `min-h-[650px] ${disableShadow ? '!shadow-none' : 'shadow-small'}`,
                }}
                color={'default'}
            >
                <TableHeader>
                    {tableColumn.map((item) => <TableColumn key={item.key}
                                                            className={`${['action', 'isActive'].includes(item.key) ? 'text-center' : ''}`}>{item.title.toUpperCase()}</TableColumn>)}
                </TableHeader>
                <TableBody items={items}
                           emptyContent={'Немає даних для відображення.'}
                >
                    {items.map((item, idx) => <TableRow key={item.id} className="!text-black h-full">
                        {(columnKey) =>
                            <TableCell>
                                {tableType === 'link' ?
                                    <div>
                                        {renderCell(item, idx, columnKey)}
                                    </div>
                                    :
                                    <div className="text-base cursor-pointer h-full">
                                        {renderCell(item, idx, columnKey)}
                                    </div>
                                }
                            </TableCell>
                        }
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    );
};

type PropsPopover<T> = {
    setData: React.Dispatch<React.SetStateAction<T[]>>,
    idItem: string,
    typeProduct: string,
    deleteMessage?: string
    apiAuth: AxiosInstance
}
const PopoverDeleteItem = <T extends ValidDataTypes>({
                                                         idItem,
                                                         typeProduct,
                                                         setData,
                                                         deleteMessage = 'Ви впевнені що хочете видалити?',
                                                         apiAuth,
                                                     }: PropsPopover<T>) => {

    const [popoverOpen, setPopoverOpen] = useState(false);

    const deleteItem = async (idItem: string) => {
        try {
            setPopoverOpen(false);
            setData((prevState) => prevState.filter((item) => item.id !== idItem));


            if (typeProduct === 'conference') {
                await ConferencesService.removeConferences(idItem, apiAuth);
                await revalidateFetch('conference');
            } else if (typeProduct === 'cooperation') {
                await CooperationService.removeCooperation(idItem, apiAuth);
                await revalidateFetch('cooperation');
            } else if (typeProduct === 'documents') {
                await DocumentsService.removeDocuments(idItem, apiAuth);
                await revalidateFetch('documents');
            } else if (typeProduct === 'science') {
                await ScienceService.removeScience(idItem, apiAuth);
                await revalidateFetch('science');
            } else if (typeProduct === 'research') {
                await ResearchService.removeResearch(idItem, apiAuth);
                await revalidateFetch('researchWork');
            } else if (typeProduct === 'activity') {
                await ActivityService.removeActivity(idItem, apiAuth);
                await revalidateFetch('activity');
            } else if (typeProduct === 'innovations') {
                await InnovationsService.removeInnovation(idItem, apiAuth);
                await revalidateFetch('innovation');
            } else if (typeProduct === 'international') {
                await InternationalService.removeInternational(idItem, apiAuth);
                await revalidateFetch('international');
            } else if (typeProduct === 'laboratory') {
                await LaboratoryService.removeLaboratory(idItem, apiAuth);
                await revalidateFetch('laboratory');
            } else if (typeProduct === 'public-information') {
                await PublicInformation.removePublicInformation(idItem, apiAuth);
                await revalidateFetch('public-information');
            } else if (typeProduct === 'documents-templates') {
                await DocumentTemplates.remove(idItem, apiAuth);
                await revalidateFetch('documents-templates');
            } else if (typeProduct === 'science-competition') {
                await ScienceCompetitionService.remove(idItem, apiAuth);
                await revalidateFetch('science-competition');
            } else if (typeProduct === 'international-practice') {
                await InternationalPracticeService.remove(idItem, apiAuth);
                await revalidateFetch('international-practice');
            } else if (typeProduct === 'events') {
                await EventsService.remove(idItem, apiAuth);
                await revalidateFetch('events');
            }

            toast.success('Запис видалено');
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <Popover backdrop="opaque" isOpen={popoverOpen} onClose={() => setPopoverOpen(false)}
                 className="flex flex-col items-center justify-center">
            <PopoverTrigger onClick={() => setPopoverOpen(true)}>
                <Button isIconOnly
                        className="w-[32px] h-[32px] bg-[#828282] rounded-[8px]">
                    <Tooltip color="default" content="Видалити">
                        <span className="text-lg w-[20px] text-white cursor-pointer active:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path
                                d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
                        </span>
                    </Tooltip>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="!p-8 max-md:!max-w-[90vw] max-sm:!p-4">
                <div className="!text-xl mb-4 !text-center max-sm:!text-base max-w-[600px]">
                    {deleteMessage}
                </div>
                <div className="flex gap-3">
                    <Button onPress={() => deleteItem(idItem)}
                            className="rounded-full bg-fd py-2 px-20 max-w-[210px] max-sm:px-10 text-[18px] max-sm:text-[14px]">
                        Так
                    </Button>
                    <Button onPress={() => setPopoverOpen(false)}
                            className="rounded-full text-[18px] data-[hover=true]:bg-primary-400 max-sm:px-10 max-sm:text-[14px] data-[hover=true]:opacity-100 data-[hover=true]:text-black border border-yellow-500 bg-transparent py-2 px-20 text-primary-400 max-w-[210px]">
                        Ні
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default TableItems;
