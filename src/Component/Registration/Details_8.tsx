import { format } from "date-fns";
import React, { ChangeEvent, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import * as Yup from "yup";
import { SlCalender } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SelectOption } from "../Custom/Selects";
import { FaCirclePlus } from "react-icons/fa6";
import { ErrorMessage, Field, Form, Formik } from "formik";

interface ChildComponent1Props {
    setActive: (componentName: string) => void;
}

const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Street address is required"),
    district: Yup.string().required("District is required"),
    city: Yup.string().required("City is required"),
    mobile: Yup.number()
        .min(10, "Must be more than 10 characters")
        .required("This field is requried"),
    zipCode: Yup.number()
        .min(6, "Must be more than 10 characters")
        .required("This field is requried")

});

interface Details {
    dateOfBirth: string| Date |undefined;
    photo: string;
    country: string;
    streetAddress: string;
    district: string;
    city: string;
    mobile: number;
    zipCode: number;
}


const Details_8: React.FC<ChildComponent1Props> = () => {
    const initialValues: Details = {
        dateOfBirth: "",
        photo: "",
        country: "India",
        streetAddress: "",
        district: "",
        city: "",
        mobile: 123456,
        zipCode: 1234567890,
    };

    const countries: SelectOption[] = [
        { label: "India", value: "India" },
        { label: "United States", value: "United States" },
        { label: "Canada", value: "Canada" },
        { label: "United Kingdom", value: "United Kingdom" },
        { label: "Japan", value: "Japan" },
        { label: "Australia", value: "Australia" },
        { label: "Germany", value: "Germany" },
        { label: "France", value: "France" },
        { label: "Brazil", value: "Brazil" },
        { label: "China", value: "China" },
    ];

    const [date, setDate] = useState<Date>();
    const [country,setCountry] = useState<string>("");

    const handleSubmit = (values: Details) => {
        values.dateOfBirth = date;
        values.photo = selectedImage;
        values.country = country;
        
        console.log(values);
    };

    const [selectedImage, setSelectedImage] = useState("/src/assets/image.png");

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e:any) => setSelectedImage(e.target.result);
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    

    return (
        <div className="absolute bg-white w-full h-screen">
            <div className="p-10 sm:pl-36">
                <div className="text-white font-bold text-lg">
                    <img
                        className="h-16 xl:h-35 md:h-35 sm:h-22"
                        src="/src/assets/logo.png"
                        alt="Logo"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="p-10 sm:pl-36 font-bold text-xl">8/8</div>
                <div className="pr-10 pl-10 sm:max-w-[1200px]  freelancerFont sm:pl-36 pb-0 font-semibold text-xl sm:text-4xl">
                    A few last details, then you can check and publish your profile.
                </div>
                <div className="pr-10 pl-10 pt-2 sm:pl-36 freelancerFont sm:max-w-[1200px] font-semibold text-sm">
                    A professional photo helps you build trust with your clients. To keep things safe and simple,
                    they’ll pay you through us - which is why we need your personal information.
                </div>
                <div className="pr-10 pl-10 p-2 sm:pl-36">
                    <div className="sm:flex justify-between w-[90%]">
                        <div className="w-[30%] ml-20 mt-8">
                            <div className="w-48 h-48">
                                <img
                                    src={selectedImage}
                                    alt="Profile Picture"
                                    className=" rounded-full cur bg-blue-500 top-0 object-cover border-8 border-black left-0 w-full h-full"
                                />

                                <label htmlFor="profile-upload" className=" flex items-center justify-center">
                                    <input
                                        type="file"
                                        id="profile-upload"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <div className="flex items-center gap-3 rounded-full mt-7 bg-none p-2 text-black border-2 border-yellow-400 cursor-pointer ">
                                        <FaCirclePlus size={20} className="text-yellow-500" />

                                        <h1 className="mr-2 text-yellow-500">Upload Picture</h1>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="w-[70%]">
                            <div className="container mx-auto px-4 py-10">
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    <Form >
                                        <div className="grid grid-cols-1 gap-4">
                                            <label htmlFor="dob" className="text-sm freelancerFont font-medium">
                                                Date Of Birth
                                            </label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className="w-[240px] border-2 border-gray-300 pl-3 text-left font-normal"
                                                    >
                                                        {date ? (
                                                            format(date, "PPP")
                                                        ) : (
                                                            <span>Select your Date</span>
                                                        )}
                                                        <SlCalender className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={(data: any) => { setDate(data) }}
                                                        initialFocus
                                                        fromYear={2000}
                                                        toYear={2024}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <div className="flex gap-8 mt-5">
                                                <div>
                                                    <label htmlFor="country" className="text-sm freelancerFont font-medium">
                                                        Country
                                                    </label>
                                                    <Select onValueChange={(value) => setCountry(value)}>
                                                        <SelectTrigger className="w-[190px] border-2 border-gray-300">
                                                            <SelectValue placeholder="Select your country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {countries.map((country) => (
                                                                    <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <label htmlFor="streetAddress" className="text-sm freelancerFont font-medium">
                                                        Street address
                                                    </label>
                                                    <Field
                                                        id="streetAddress"
                                                        type="text"
                                                        name="streetAddress"
                                                        className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                        placeholder="Enter your address"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        name="streetAddress"
                                                        component="div"
                                                        className="text-red-600"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-6">
                                                <div>
                                                    <label htmlFor="district" className="text-sm freelancerFont font-medium">
                                                        District
                                                    </label>
                                                    <Field
                                                        id="district"
                                                        type="text"
                                                        name="district"
                                                        className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                        placeholder="Enter your district"
                                                    />
                                                    <ErrorMessage
                                                        name="district"
                                                        component="div"
                                                        className="text-red-600"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="city" className="text-sm font-medium freelancerFont">
                                                        City
                                                    </label>
                                                    <Field
                                                        id="city"
                                                        type="text"
                                                        name="city"
                                                        className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                        placeholder="Enter your city"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        name="city"
                                                        component="div"
                                                        className="text-red-600"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-8 mt-5">
                                                <div>
                                                    <label htmlFor="zipCode" className="text-sm freelancerFont font-medium">
                                                        Zip(Optional)
                                                    </label>
                                                    <Field
                                                        id="zipCode"
                                                        type="text"
                                                        name="zipCode"
                                                        className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                        placeholder="Enter your zip code"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="mobile" className="text-sm font-medium">
                                                        Mobile
                                                    </label>
                                                    <Field
                                                        id="mobile"
                                                        type="text"
                                                        name="mobile"
                                                        className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                        placeholder="Enter your mobile number"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        name="mobile"
                                                        component="div"
                                                        className="text-red-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute flex bottom-16 right-0">
                                            <Button
                                                type="submit"
                                                className="flex mr-5 sm:mr-10 justify-center items-center gap-2 hover:bg-orange-650 bg-orange-500 w-40 h-12 rounded-3xl">
                                                Finish <FaLongArrowAltRight />
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details_8;
