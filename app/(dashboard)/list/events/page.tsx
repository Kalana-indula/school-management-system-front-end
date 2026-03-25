'use client'

import React, {useEffect, useState} from 'react'
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import Link from "next/link";
import {role} from "@/lib/data";
import axios from "axios";
import {EventDetails} from "@/types/entityTypes";
import FormModal from "@/app/components/FormModal";


const columns = [
    {
        header: "Title",
        accessor: "title",
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
    },
    {
        header: "Start Time",
        accessor: "startTime",
        className: "hidden md:table-cell",
    },
    {
        header: "End Time",
        accessor: "endTime",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "actions"
    }
]

const EventListPage = () => {

    const [events,setEvents]=useState<EventDetails []>([]);

    useEffect(() => {
        getEventList();
    }, []);

    const getEventList = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/events`);
            console.log(response.data);
            setEvents(response.data);
        }catch (err){
            let message = 'Failed to fetch events. Please try again later.';

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            console.error('Error fetching events:', err);
        }
    }

    const renderRow = (item: EventDetails) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mypurpleLight">
            <td className="flex items-center gap-4 p-4">{item.title}</td>
            <td>{item.className}</td>
            <td className="hidden md:table-cell">{item.date}</td>
            <td className="hidden md:table-cell">{item.startTime}</td>
            <td className="hidden md:table-cell">{item.endTime}</td>
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
                <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
                            <FormModal table={`event`} type={`create`}/>
                        )}
                    </div>
                </div>
            </div>
            {/*  LIST  */}
            <Table columns={columns} renderRow={renderRow} data={events}/>
            {/*   PAGINATION */}
            <Pagination/>
        </div>
    );
}
export default EventListPage;
