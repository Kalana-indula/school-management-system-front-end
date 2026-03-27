'use client'

import React, {useCallback, useEffect, useState} from 'react'
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import Link from "next/link";
import {role, subjectsData} from "@/lib/data";
import {SubjectDetails} from "@/types/entityTypes";
import axios from "axios";
import FormModal from "@/app/components/FormModal";
import {ITEM_PER_PAGE} from "@/lib/settings";
import {useSearchParams} from "next/navigation";

const columns = [
    {
        header: "Subject Name",
        accessor: "name"
    },
    {
        header: "Teachers",
        accessor: "teachers",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions"
    }
]

const SubjectListPage = () => {

    const [subjects, setSubjects] = useState<SubjectDetails []>([]);
    const [subjectCount, setSubjectCount] = useState<number>(0);

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || 1);

    const getSubjectDetails = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/subjects`,
                {
                    params: {
                        page: currentPage,
                        size: ITEM_PER_PAGE,
                    },
                }
            );

            const payload = response.data;

            const fetchedSubjects: SubjectDetails[] = Array.isArray(payload)
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
                fetchedSubjects.length
            );

            const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
            const endIndex = startIndex + ITEM_PER_PAGE;

            setSubjects(fetchedSubjects.slice(startIndex, endIndex));
            setSubjectCount(Number.isFinite(totalCount) ? totalCount : fetchedSubjects.length);
        } catch (err) {
            let message = 'Failed to fetch subjects. Please try again later.';

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            console.error('Error fetching subjects:', message);
        }
    }, [currentPage]);

    useEffect(() => {
        getSubjectDetails();
    },[getSubjectDetails]);

    const renderRow = (item: SubjectDetails) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mypurpleLight">
            <td className="flex items-center gap-4 p-4">
                {item.subjectName}
            </td>
            <td className="hidden md:table-cell">
                {item.teacherList}
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-myskyblue">
                            <Image src={`/edit.png`} alt={``} width={16} height={16}/>
                        </button>
                    </Link>
                    {role === "admin" && (
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-mypurple">
                            <Image src={`/delete.png`} alt={``} width={16} height={16}/>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            {/*  TOP  */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
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
                            <FormModal table={`subject`} type={`create`}/>
                        )}
                    </div>
                </div>
            </div>
            {/*  LIST  */}
            <Table columns={columns} renderRow={renderRow} data={subjects}/>
            {/*   PAGINATION */}
            <Pagination page={currentPage} count={subjectCount}/>
        </div>
    );
}
export default SubjectListPage;
