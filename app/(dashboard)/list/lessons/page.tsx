'use client'

import React, {useEffect, useState} from 'react'
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import Link from "next/link";
import {role} from "@/lib/data";
import {LessonDetails} from "@/types/entityTypes";
import axios, {AxiosError} from "axios";
import FormModal from "@/app/components/FormModal";
import {useSearchParams} from "next/navigation";
import {ITEM_PER_PAGE} from "@/lib/settings";

const columns = [
    {
        header: "Subject Name",
        accessor: "name"
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className:"hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions"
    }
]

const LessonsListPage = () => {

    const [lessons, setLessons] = useState<LessonDetails[]>([]);
    const [lessonCount, setLessonCount] = useState<number>(0);

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || 1);

    const teacherIdParam=searchParams.get('teacherId');
    const parsed=Number(teacherIdParam);

    const teacherId=teacherIdParam && !isNaN(parsed) ? parsed :null;

    const getLessonList = async () => {

        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/lessons`, {
                params: {
                    page: currentPage,
                    size: ITEM_PER_PAGE
                }
            });
            const payload = response.data;

            const fetchedLessons: LessonDetails[] = Array.isArray(payload)
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
                fetchedLessons.length
            );

            const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
            const endIndex = startIndex + ITEM_PER_PAGE;
            setLessons(fetchedLessons.slice(startIndex, endIndex));
            setLessonCount(Number.isFinite(totalCount) ? totalCount : fetchedLessons.length);
        }catch(err){
            let message = 'Failed to fetch lessons. Please try again later.';

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
                console.log(message);
            } else if (err instanceof Error) {
                message = err.message;
                console.log(message);
            }else{
                console.log(message);
            }

            console.error('Error fetching lessons:', err);
        }
    }

    const getLessonsByTeacher = async (id:number)=>{
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teachers/${id}/lessons`);
            setLessons(response.data);
        }catch(err){
            if(err instanceof AxiosError){
                if(err.response?.status === 404){
                    console.warn("No classes found for teacher id: ",id);
                    setLessons([]);
                    return;
                }

                const errorMessage=err.response?.data?.message || err.message || "An error occurred";
                console.error(errorMessage);
            }else if(err instanceof Error){
                console.log(err.message);
            }else{
                console.log("An unknown error");
            }
        }
    };

    useEffect(() => {
        const loadLessons= async ()=>{
            if(teacherId !== null){
                await getLessonsByTeacher(teacherId);
                return;
            }

            await getLessonList();
        };
        void loadLessons();
    }, [currentPage, teacherId]);

    const renderRow = (item: LessonDetails) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mypurpleLight">
            <td className="flex items-center gap-4 p-4">{item.subjectName}</td>
            <td>{item.className}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
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
                <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
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
                            <FormModal table={`lesson`} type={`create`}/>
                        )}
                    </div>
                </div>
            </div>
            {/*  LIST  */}
            <Table columns={columns} renderRow={renderRow} data={lessons}/>
            {/*   PAGINATION */}
            <Pagination page={currentPage} count={lessonCount}/>
        </div>
    );
}
export default LessonsListPage;
