'use client'

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import {role} from "@/lib/data";
import TableSearch from "@/app/components/TableSearch";
import Table from "@/app/components/Table";
import Pagination from "@/app/components/Pagination";
import FormModal from "@/app/components/FormModal";
import {StudentDetails} from "@/types/entityTypes";
import axios, {AxiosError} from "axios";
import {useSearchParams} from "next/navigation";
import {ITEM_PER_PAGE} from "@/lib/settings";

const columns = [
    {
        header: "Info",
        accessor: "info"
    },
    {
        header: "Student ID",
        accessor: "studentId",
        className: "hidden md:table-cell"
    },
    {
        header: "Grade",
        accessor: "grade",
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

const StudentsListPage = () => {

    //states
    const [students, setStudents] = useState<StudentDetails[]>([]);

    //store students count
    const [studentCount, setStudentCount] = useState<number>(0);

    //page
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || 1);

    //get teacher id
    const teacherIdParam = searchParams.get('teacherId');
    const parsed = Number(teacherIdParam);
    const teacherId = teacherIdParam && !isNaN(parsed) ? parsed : null;

    //get all student details
    const getAllStudents = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/students`, {
                params: {
                    page: currentPage,
                    size: ITEM_PER_PAGE
                }
            });
            const payload = response.data;

            const fetchedStudents: StudentDetails[] = Array.isArray(payload)
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
                fetchedStudents.length
            );

            const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
            const endIndex = startIndex + ITEM_PER_PAGE;
            setStudents(fetchedStudents.slice(startIndex, endIndex));
            setStudentCount(Number.isFinite(totalCount) ? totalCount : fetchedStudents.length);
        } catch (err) {
            let message = 'Failed to fetch students. Please try again later.';

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            console.error('Error fetching students:', err);
        }
    }

    const getStudentsByTeacher = async (id: number) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teachers/${id}/students`);
            const payload = response.data;
            setStudents(payload);

        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 404) {
                    console.warn("No students found for teacher id: ", id);
                    setStudents([]);
                    return;
                }
                const errorMessage = err.response?.data?.message || err.message || "An error occurred";
                console.error(errorMessage);
            } else if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log("An unknown error");
            }
        }
    };

    useEffect(() => {
        const loadStudents = async () => {
            if (teacherId !== null) {
                await getStudentsByTeacher(teacherId);
                return;
            }

            await getAllStudents();
        };
        void loadStudents();
    }, [currentPage]);

    const renderRow = (item: StudentDetails) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mypurpleLight">
            <td className="flex items-center gap-4 p-4">
                <Image
                    src={item.image || "/noAvatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h3 className="font-extrabold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.className}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.id}</td>
            <td className="hidden md:table-cell">{item.grade}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={{
                        pathname: `/list/students/${item.studentId}`,
                        query: {id: item.id}
                    }}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-myskyblue">
                            <Image src={`/view.png`} alt={``} width={16} height={16}/>
                        </button>
                    </Link>
                    {role === "admin" && (
                        // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-mypurple">
                        //     <Image src={`/delete.png`} alt={``} width={16} height={16}/>
                        // </button>
                        <FormModal table={`student`} type={`delete`} id={item.id}/>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4">
            {/*  TOP  */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch/>
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mypeachyellow">
                            <Image src={`/filter.png`} alt={`filter`} width={14} height={14}/>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mypeachyellow">
                            <Image src={`/sort.png`} alt={`sort`} width={14} height={14}/>
                        </button>
                        {role === "admin" &&
                            (
                                // <button
                                //     className="w-8 h-8 flex items-center justify-center rounded-full bg-mypeachyellow">
                                //     <Image src={`/plus.png`} alt={`plus`} width={14} height={14}/>
                                // </button>
                                <FormModal table={`student`} type={`create`}/>
                            )}
                    </div>
                </div>
            </div>
            {/*  LIST  */}
            <Table columns={columns} renderRow={renderRow} data={students}/>
            {/*   PAGINATION */}
            <Pagination page={currentPage} count={studentCount}/>
        </div>
    );
}
export default StudentsListPage;
