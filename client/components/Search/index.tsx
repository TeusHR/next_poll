'use client'
import React, {Key, useCallback, useEffect, useMemo, useState} from 'react'
import {
    Autocomplete, AutocompleteItem, AutocompleteSection,
    Image,
    Modal, ModalBody,
    ModalContent,
    useDisclosure
} from "@nextui-org/react";
import NextImage from "next/image";
import debounce from "lodash.debounce";
import {useRouter} from "next/navigation";
import {getBySearch} from "@/services/client.service";
import {ISearchInput} from "@/types/Search";
import {getKeyDescription, getKeyLink} from "@/utils/PageName";
import {stripHtml} from "@/utils/StripHtml";


const Search = ({}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false)
    const [searches, setSearch] = useState<ISearchInput[]>([])
    const router = useRouter()

    const editRequestHandler = useMemo(
        () =>
            debounce(async (searchTerm: string) => {
                setIsLoading(true)
                await fetchSearch(searchTerm)
                setIsLoading(false)
            }, 600),
        []
    );

    useEffect(() => {
        if (searchTerm !== '')
            editRequestHandler(searchTerm)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const fetchSearch = async (search: string) => {
        const searchOutput = await getBySearch(search);
        if (searchOutput) {
            const newSearches = Object.keys(searchOutput).map(key => ({
                type: key,
                // @ts-ignore
                items: searchOutput[key] ?? [],
            }));
            setSearch(newSearches);
        } else {
            setSearch([]);
        }
    };

    const handleSelect = useCallback((key: Key) => {
        if (key) {
            const [type, id] = key.toString().split(' ')
            setSearchTerm('')
            router.push(getKeyLink(type, id))
        }
    }, [router])

    const handleModalClose = useCallback(() => {
        setSearch([])

        setTimeout(() => {
            onClose();
        }, 100);
    }, [onClose]);

    return (
        <>
            <div className="cursor-pointer" onClick={onOpen}>
                <Image src={'/image/search.svg'}
                       alt={'Пошук'}
                       as={NextImage}
                       width={34}
                       height={22}
                       fetchPriority={"high"}
                />
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                hideCloseButton={true}
                placement="top"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                    base: "w-full !mt-24 !mx-12 max-w-[none] bg-transparent shadow-none"
                }}
            >
                <ModalContent>
                    <ModalBody>
                        <Autocomplete
                            className="w-full !h-full bg-transparent select-none !pl-12 !p-[9.5px] border data-[open=true]:border-primary-400 border-solid border-gray-300 !rounded-full bg-white"
                            placeholder="Пошук"
                            onInputChange={setSearchTerm}
                            inputValue={searchTerm}
                            items={searches}
                            isLoading={isLoading}
                            onSelectionChange={handleSelect}
                            onSelect={() => {}}
                            isClearable={false}
                            allowsCustomValue={true}
                            shouldCloseOnBlur={false}
                            startContent={<SVGSearchElement/>}
                            classNames={{
                                listbox: 'relative px-12 w-full h-full',
                                base: "bg-transparent outline-none",
                                listboxWrapper: "bg-transparent max-h-[60vh]",
                            }}
                            fullWidth
                            onClose={() => handleModalClose()}
                            popoverProps={{
                                classNames: {
                                    content: "mt-2",
                                },
                            }}
                            inputProps={{
                                classNames: {
                                    inputWrapper: 'bg-white select-none border-none box-shadow shadow-none  group/input data-[focus=true]:!bg-white data-[hover=true]:!bg-white gap-0 py-0 px-4  h-full min-h-0',
                                    innerWrapper: 'gap-4'
                                }
                            }}
                            listboxProps={{
                                emptyContent: "Нічого не знайдено.",
                            }}
                            selectorIcon={<div></div>}
                            selectorButtonProps={{isDisabled: true}}
                            disableAnimation={true}
                            disableSelectorIconRotation={true}
                            aria-label="Пошук"
                        >
                            {(output) => (
                                <AutocompleteSection key={output.type}
                                                     classNames={{
                                                         heading: "text-lg max-lg:text-base font-bold text-primary",
                                                         group: "pl-3"
                                                     }}
                                                     onSelect={() => {}}
                                                     title={getKeyDescription(output.type)}
                                                     showDivider>
                                    {output.items.map((item, index) => (
                                        <AutocompleteItem key={`${output.type} ${item.id}`}
                                                          textValue={item.text}
                                                          onSelect={() => {}}
                                                          className="capitalize">
                                            <div key={`${item}-${index}`}
                                                 className="flex gap-4 items-center">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-base max-md:text-sm">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-sm max-md:text-xs text-default-400">
                                                        {stripHtml(item.text)}
                                                    </span>
                                                </div>
                                            </div>
                                        </AutocompleteItem>
                                    ))}
                                </AutocompleteSection>
                            )}
                        </Autocomplete>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Search;


export const SVGSearchElement = ({}) => {
    return (
        <div className="fill-[#808080] aria-[hidden=true]:fill-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"
                 fill="inherit">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M0 9.49999C0 4.25321 4.25322 0 9.5 0C14.7468 0 19 4.25321 19 9.49999C19 14.7468 14.7468 19 9.5 19C4.25322 19 0 14.7468 0 9.49999ZM9.5 2.11846C5.42321 2.11846 2.11847 5.42321 2.11847 9.49999C2.11847 13.5768 5.42321 16.8815 9.5 16.8815C13.5768 16.8815 16.8815 13.5768 16.8815 9.49999C16.8815 5.42321 13.5768 2.11846 9.5 2.11846Z"
                />
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M7.91557 4.38594C8.51773 4.1311 9.16321 4.00028 9.81497 4.00098C10.4667 4.00028 11.1122 4.1311 11.7144 4.38594C12.317 4.64096 12.8643 5.01516 13.3249 5.48701C13.7324 5.90442 13.7315 6.58032 13.323 6.99667C12.9145 7.41302 12.253 7.41216 11.8456 6.99475C11.5794 6.72206 11.2631 6.50581 10.9148 6.35843C10.5666 6.21106 10.1933 6.13545 9.81636 6.13596H9.81357C9.43665 6.13545 9.06333 6.21106 8.71509 6.35843C8.36685 6.50581 8.05055 6.72206 7.78436 6.99475C7.3769 7.41216 6.71543 7.41302 6.30693 6.99667C5.89843 6.58032 5.89758 5.90442 6.30505 5.48701C6.76566 5.01516 7.31298 4.64096 7.91557 4.38594ZM15.0614 14.9329C15.4694 14.516 16.1309 14.516 16.5389 14.9329L20.694 19.1786C21.102 19.5955 21.102 20.2714 20.694 20.6883C20.286 21.1052 19.6246 21.1052 19.2166 20.6883L15.0614 16.4425C14.6534 16.0256 14.6534 15.3497 15.0614 14.9329Z"
                />
            </svg>
        </div>
    )
}
