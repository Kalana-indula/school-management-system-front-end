'use client'

import React, {useEffect, useState} from 'react'
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import Link from "next/link";
import {role, teachersData} from "@/lib/data";
import FormModal from "@/app/components/FormModal";
import {TeacherDetails} from "@/types/entityTypes";
import axios from "axios";

const columns = [
    {
        header: "Info",
        accessor: "info"
    },
    {
        header: "Teacher ID",
        accessor: "teacherId",
        className: "hidden md:table-cell"
    },
    {
        header: "Subjects",
        accessor: "subjects",
        className: "hidden md:table-cell"
    },
    {
        header: "Classes",
        accessor: "classes",
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

const TeachersListPage = () => {

    //states
    const [teachers, setTeachers] = useState<TeacherDetails[]>([]);

    useEffect(() => {
        getAllTeachers();
    },[])

    //fetch all teacher details
    const getAllTeachers = async ()=>{
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teachers`);
            console.log(response.data);
            setTeachers(response.data);
        }catch(err){
            let message = 'Failed to fetch teachers. Please try again later.';

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            console.error('Error fetching teachers:', err);
        }
    }

    const renderRow = (item: TeacherDetails) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mypurpleLight">
            <td className="flex items-center gap-4 p-4">
                <Image
                    src={item.img || "/noAvatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h3 className="font-extrabold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.teacherId}</td>
            <td className="hidden md:table-cell">{item.subjects}</td>
            <td className="hidden md:table-cell">{item.classes}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.teacherId}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-myskyblue">
                            <Image src={`/view.png`} alt={``} width={16} height={16}/>
                        </button>
                    </Link>
                    {role === "admin" &&
                        (
                            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-mypurple">
                            //     <Image src={`/delete.png`} alt={``} width={16} height={16}/>
                            // </button>
                            <FormModal table={`teacher`} type={`delete`} id={item.id}/>
                        )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            {/*  TOP  */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
                            // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mypeachyellow">
                            //     <Image src={`/plus.png`} alt={`plus`} width={14} height={14}/>
                            // </button>)}
                            <FormModal table={`teacher`} type={`create`}/>
                        )}
                    </div>
                </div>
            </div>
            {/*  LIST  */}
            <Table columns={columns} renderRow={renderRow} data={teachers}/>
            {/*   PAGINATION */}
            <Pagination/>
        </div>
    );
}
export default TeachersListPage;
