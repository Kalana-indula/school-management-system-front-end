'use client'

import React, {useEffect, useState} from 'react'
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import Link from "next/link";
import {assignmentsData, role} from "@/lib/data";
import {AssignmentDetails} from "@/types/entityTypes";
import axios from "axios";
import FormModal from "@/app/components/FormModal";

type Assignment = {
    id: number;
    subject: string;
    class: string;
    teacher:string;
    dueDate: string;
}

const columns = [
    {
        header: "Subject Name",
        accessor: "name"
    },
    {
        header: "Class",
        accessor: "class"
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell"
    },
    {
        header: "Due Date",
        accessor: "dueDate",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions"
    }
]

const AssignmentListPage = () => {

    const [assignments,setAssignments]=useState<AssignmentDetails []>([]);

    useEffect(()=>{
        getAssignmentList();
    },[]);

    const getAssignmentList = async () => {

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/assignments`);
            console.log(response.data);
            setAssignments(response.data);
        }catch (err){
            let message = 'Failed to fetch assignments. Please try again later.';

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            console.error('Error fetching assignments:', err);
        }
    }

    const renderRow = (item: AssignmentDetails) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mypurpleLight">
            <td className="flex items-center gap-4 p-4">
                {item.subjectName}
            </td>
            <td>{item.className}</td>
            <td className="hidden md:table-cell">
                {item.teacher}
            </td>
            <td className="hidden md:table-cell">
                {item.dueDate}
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
                <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
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
                            <FormModal table={`assignment`} type={`create`}/>
                        )}
                    </div>
                </div>
            </div>
            {/*  LIST  */}
            <Table columns={columns} renderRow={renderRow} data={assignments}/>
            {/*   PAGINATION */}
            <Pagination/>
        </div>
    );
}
export default AssignmentListPage;
