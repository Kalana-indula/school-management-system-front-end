'use client'

import React from 'react'
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/app/components/InputField";
import Image from "next/image";

const schema = z.object({
    username: z
        .string()
        .min(3, {message: "Username must be at least 3 characters long"})
        .max(3, {message: "Username must be at least 20 characters long"}),
    email: z.email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
    firstName: z.string().min(2, {message: "First name is required"}),
    lastName: z.string().min(2, {message: "Last name is required"}),
    phone: z.string().min(10, {message: "Phone number is required"}),
    address: z.string().min(1, {message: "Address is required"}),
    bloodType: z.string().min(1, {message: "BloodType is required"}),
    birthday: z.date({message: "Birthday is required"}),
    gender: z.enum(["male", "female"], {message: "Gender is required"}),
    img: z.instanceof(File, {message: "Image is required"}),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({type, data}: { type: "create" | "update"; data?: any }) => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Create a new teacher</h1>
            <span className="text-xs text-gray-400 font-medium">
                Authentication Information
            </span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label={`Username`}
                    register={register}
                    name={`username`}
                    defaultValue={data?.username}
                    error={errors?.username}
                />
                <InputField
                    label={`Email`}
                    register={register}
                    name={`email`}
                    type="email"
                    defaultValue={data?.email}
                    error={errors?.email}
                />
                <InputField
                    label={`Password`}
                    register={register}
                    name={`password`}
                    type="password"
                    defaultValue={data?.password}
                    error={errors?.password}
                />
            </div>

            <span className="text-xs text-gray-400 font-medium">
                 Personal Information
             </span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="First Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors.firstName}
                />
                <InputField
                    label="Last Name"
                    name="surname"
                    defaultValue={data?.surname}
                    register={register}
                    error={errors.lastName}
                />
                <InputField
                    label="Phone"
                    name="phone"
                    defaultValue={data?.phone}
                    register={register}
                    error={errors.phone}
                />
                <InputField
                    label="Address"
                    name="address"
                    defaultValue={data?.address}
                    register={register}
                    error={errors.address}
                />
                <InputField
                    label="Blood Type"
                    name="bloodType"
                    defaultValue={data?.bloodType}
                    register={register}
                    error={errors.bloodType}
                />
                <InputField
                    label="Birthday"
                    name="birthday"
                    defaultValue={data?.birthday.toISOString().split("T")[0]}
                    register={register}
                    error={errors.birthday}
                    type="date"
                />

                {/*Gender select*/}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Gender</label>
                    <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("gender")}
                            defaultValue={data?.gender}>
                        <option className="male">Male</option>
                        <option className="female">Female</option>
                    </select>
                    {errors.gender?.message &&
                        <p className="text-xs text-red-400">
                            {errors.gender.message.toString()}
                        </p>
                    }
                </div>

                {/*file upload*/}
                <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
                    <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                        <Image src={`/upload.png`} alt={`image upload`} width={28} height={28}/>
                        <span>Upload a photo</span>
                    </label>
                    <input type="file" id="img" {...register("img")} className="hidden"/>
                    {errors.gender?.message &&
                        <p className="text-xs text-red-400">
                            {errors.gender.message.toString()}
                        </p>
                    }
                </div>
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    )
}
export default TeacherForm
