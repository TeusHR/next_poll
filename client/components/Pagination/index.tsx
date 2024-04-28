'use client'
import React, {FC} from 'react'
import {Pagination} from "@nextui-org/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {getQueryString} from "@/utils/StripHtml";

type Props = {
    total: number,
    rowsPerPage: number,
    initPage?: number,
}

const PaginationCustom: FC<Props> = ({
                                         total,
                                         rowsPerPage,
                                         initPage = 1,
                                     }) => {
    const searchParams = useSearchParams()
    const router = useRouter();
    const pathname = usePathname()
    const currentPage = parseInt(searchParams.get('page') || '1', 10);


    const handlePageChange = (page: number) => {
        router.replace(getQueryString('page', page.toString(), searchParams, pathname));
        // router.push(getQueryString('page', page.toString(), searchParams, pathname))
    };

    return (
        <>
            {Math.ceil(total / rowsPerPage) > 1 &&
                <Pagination
                    total={Math.ceil(total / rowsPerPage)}
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={currentPage}
                    onChange={handlePageChange}
                />
            }
        </>
    )
}

export default PaginationCustom;