import React from 'react'
import UserCard from "@/app/components/UserCard";
import CountChart from "@/app/components/CountChart";
import AttendanceChart from "@/app/components/AttendanceChart";
import FinanceChart from "@/app/components/FinanceChart";
import EventCalendar from "@/app/components/EventCalendar";
import Announcements from "@/app/components/Announcements";

// #region Sample data
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const AdminPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/*  LEFT  */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/*  USER CARD  */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student"/>
                    <UserCard type="teacher"/>
                    <UserCard type="parent"/>
                    <UserCard type="staff"/>
                </div>
            {/*  MIDDLE CHARTS  */}
                <div className="flex gap-4 flex-col lg:flex-row">
                {/*  COUNT CHART  */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChart/>
                    </div>
                {/*  ATTENDANCE CHART  */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart/>
                    </div>
                </div>
            {/*  BOTTOM CHART  */}
                <div className="w-full h-[500px]">
                    <FinanceChart/>
                </div>
            </div>
        {/*  RIGHT  */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalendar/>
                <Announcements/>
            </div>
        </div>
    )
}
export default AdminPage
