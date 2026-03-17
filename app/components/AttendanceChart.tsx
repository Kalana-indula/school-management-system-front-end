'use client'

import React from 'react'
import Image from "next/image";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {RechartsDevtools} from "@recharts/devtools";

// #region Sample data
const data = [
    {
        name: 'Mon',
        present: 70,
        absent: 30,
    },
    {
        name: 'Tue',
        present: 60,
        absent: 40,
    },
    {
        name: 'Wed',
        present: 65,
        absent: 35,
    },
    {
        name: 'Thu',
        present: 55,
        absent: 45,
    },
    {
        name: 'Fri',
        present: 30,
        absent: 70,
    },
];

const AttendanceChart = () => {
    return (
        <div className="bg-white rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Attendee</h1>
                <Image src={`/moreDark.png`} alt={``} width={20} height={20}/>
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart width={500} height={300} data={data} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd"/>
                    <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
                    <YAxis width="auto" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
                    <Tooltip contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
                    <Legend align="left"
                            verticalAlign="top"
                            wrapperStyle={{paddingTop:"20px",paddingBottom:"40px"}}
                    />
                    <Bar dataKey="present"
                         fill="#ffe491"
                         legendType="circle"
                        />
                    <Bar dataKey="absent"
                         fill="#7aaaf6"
                         legendType="circle"
                         />
                    <RechartsDevtools/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default AttendanceChart
