'use client'

import React from 'react'

import {ITEM_PER_PAGE} from "@/lib/settings";
import {useRouter, useSearchParams} from "next/navigation";

const Pagination = ({page,count}:{page:number;count:number}) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get('page') || page || 1);
    const totalPages = Math.ceil(count / ITEM_PER_PAGE);
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    const changePage = (newPage:number) => {

        if (newPage < 1 || newPage > totalPages) return;

        //fetch existing params
        const params=new URLSearchParams(window.location.search);
        params.set("page",newPage.toString());
        router.push(`${window.location.pathname}?${params}`);
    }

    return (
        <div className="p-4 flex items-center justify-between text-gray-500">
            <button disabled={isPrevDisabled}
                    onClick={()=>changePage(currentPage - 1)}
                    className={`py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
            >
                Prev
            </button>
            <div className="flex items-center gap-2 text-sm">
                {Array.from(
                    {length:totalPages},
                    (_, index) => {
                        const pageIndex= index + 1;
                        return (
                            <button
                                key={pageIndex}
                                className={`cursor-pointer px-2 rounded-sm ${currentPage === pageIndex ? "bg-myskyblue":" "}`}
                                onClick={()=>{
                                    changePage(pageIndex);
                                }}
                            >
                                {pageIndex}
                            </button>
                        )
                    }
                )}
            </div>
            <button
                disabled={isNextDisabled}
                onClick={() => changePage(currentPage + 1)}
                className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                Next
            </button>
        </div>
    )
}
export default Pagination;