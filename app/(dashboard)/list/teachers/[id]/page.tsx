'use client'

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import BigCalendar from "@/app/components/BigCalendar";
import Announcements from "@/app/components/Announcements";
import Link from "next/link";
import Performance from "@/app/components/Performance";
import FormModal from "@/app/components/FormModal";
import {useSearchParams} from "next/navigation";
import axios, {AxiosError} from "axios";
import {TeacherDetails} from "@/types/entityTypes";

const SingleTeacherPage = () => {

    const [teacherDetails,setTeachersDetails] = useState<TeacherDetails>();

    const searchParams=useSearchParams();
    const idParam=searchParams.get("id");
    const id=idParam ? Number(idParam) : null;

    const teachersBirthday=teacherDetails?.birthday
        ? new Date(teacherDetails.birthday).toLocaleDateString()
        : "";

    console.log(id);

    useEffect(() => {
        if(id === null || isNaN(id)) return;

        getSingleTeacherDetails(id);
    }, [id]);

    const getSingleTeacherDetails = async (teacherId:number)=>{
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teachers/${teacherId}`);
            console.log(response.data);
            setTeachersDetails(response.data);
        }catch(error){
          console.log(error);
        }
    }

    return (
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
            {/*  LEFT  */}
            <div className="w-full xl:w-2/3">
                {/*  TOP  */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/*  USER INFO CARD  */}
                    <div className="bg-myskyblue py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image
                                src={`/noAvatar.png`}
                                alt="teacher"
                                width={144}
                                height={144}
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">

                            <div className="flex items-center justify-center gap-4">
                                <h1 className="text-xl font-semibold">
                                    {teacherDetails?.name} {teacherDetails?.surname}
                                </h1>
                                <FormModal
                                    table="teacher"
                                    type="update"
                                    data={{
                                        id: 1,
                                        username: "uname",
                                        email: "email@example.com",
                                        firstName: "Dean",
                                        lastName: "Johns",
                                        phone: "+1 232 534 321",
                                        address: "1234 Main st, Anytown, USA",
                                        bloodType: "A+",
                                        birthday: new Date("2000-01-01"),
                                        gender: "male",
                                        img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
                                    }}
                                />
                            </div>
                            <p className="text-sm text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </p>
                            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/blood.png" alt="" width={14} height={14}/>
                                    <span>{teacherDetails?.bloodType}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/date.png" alt="" width={14} height={14}/>
                                    <span>{teachersBirthday} </span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/mail.png" alt="" width={14} height={14}/>
                                    <span>{teacherDetails?.email}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/phone.png" alt="" width={14} height={14}/>
                                    <span>{teacherDetails?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  SMALL CARDS  */}
                    <div className="flex-1 flex gap-4 justify-between flex-wrap">
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image
                                src="/singleAttendance.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-400">Attendance</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image
                                src="/singleBranch.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">
                                    3
                                </h1>
                                <span className="text-sm text-gray-400">Branches</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image
                                src="/singleLesson.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">
                                    4
                                </h1>
                                <span className="text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>
                        {/* CARD */}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image
                                src="/singleClass.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">
                                    5
                                </h1>
                                <span className="text-sm text-gray-400">Classes</span>
                            </div>
                        </div>

                    </div>
                </div>
                {/*Bottom*/}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Teacher&apos;s Schedule</h1>
                    <BigCalendar/>
                </div>
            </div>
            {/*   RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link
                            className="p-3 rounded-md bg-myskyblue"
                            href={`/list/classes?supervisorId=${"teacher2"}`}
                        >
                            Teacher&apos;s Classes
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-mypurpleLight"
                            href={`/list/students?teacherId=${"TCH001"}`}
                        >
                            Teacher&apos;s Students
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-mypeachyellow"
                            href={`/`}
                        >
                            Teacher&apos;s Lessons
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-pink-50"
                            href={`/`}
                        >
                            Teacher&apos;s Exams
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-myskyblue"
                            href={`/`}
                        >
                            Teacher&apos;s Assignments
                        </Link>
                    </div>
                </div>
                <Performance/>
                <Announcements/>
            </div>
        </div>
    )
}
export default SingleTeacherPage;
