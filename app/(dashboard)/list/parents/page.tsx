'use client'

import React, {useCallback, useEffect, useState} from 'react'
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import { role} from "@/lib/data";
import FormModal from "@/app/components/FormModal";
import {ParentDetails} from "@/types/entityTypes";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import {ITEM_PER_PAGE} from "@/lib/settings";

const columns = [
    {
        header: "Info",
        accessor: "info"
    },
    {
        header: "Student Names",
        accessor: "students",
        className: "hidden md:table-cell"
    },
    {
        header: "Phone",
        accessor: "phone",
        className: "hidden md:table-cell"
    },
    {
        header: "Address",
        accessor: "address",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions"
    }
]

const ParentsListPage = () => {

    const [parents,setParents]=useState<ParentDetails []>([]);
    const [parentCount, setParentCount] = useState<number>(0);

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || 1);

    const getParentsList = useCallback(async () => {
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/parents`, {
                params: {
                    page: currentPage,
                    size: ITEM_PER_PAGE
                }
            });

            const payload = response.data;

            const fetchedParents: ParentDetails[] = Array.isArray(payload)
                ? payload
                : Array.isArray(payload?.content)
                    ? payload.content
                    : Array.isArray(payload?.data)
                        ? payload.data
                        : [];

            const totalCount = Number(
                payload?.totalElements ??
                payload?.totalCount ??
                payload?.count ??
                payload?.meta?.total ??
                fetchedParents.length
            );

            const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
            const endIndex = startIndex + ITEM_PER_PAGE;

            setParents(fetchedParents.slice(startIndex, endIndex));
            setParentCount(Number.isFinite(totalCount) ? totalCount : fetchedParents.length);
        }catch(err){
            let message = 'Failed to fetch parents. Please try again later.';

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            console.error('Error fetching parents:', message);
        }
    }, [currentPage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getParentsList();
    }, [getParentsList]);

    const renderRow = (item: ParentDetails) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mypurpleLight">
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-extrabold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.email ?? "No email provided"}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">
                {item.studentNames}
            </td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">

                    {role === "admin" && (
                        <>
                            <FormModal table={`parent`} type={`update`} data={item}/>
                            <FormModal table={`parent`} type={`delete`} id={item.id}/>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            {/*  TOP  */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch/>
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mypeachyellow">
                            <Image src={`/filter.png`} alt={`filter`} width={14} height={14}/>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mypeachyellow">
                            <Image src={`/sort.png`} alt={`sort`} width={14} height={14}/>
                        </button>
                        {role === "admin" && (
                            <FormModal table={`parent`} type={`create`}/>
                        )}
                    </div>
                </div>
            </div>
            {/*  LIST  */}
            <Table columns={columns} renderRow={renderRow} data={parents}/>
            {/*   PAGINATION */}
            <Pagination page={currentPage} count={parentCount}/>
        </div>
    );
}
export default ParentsListPage;
