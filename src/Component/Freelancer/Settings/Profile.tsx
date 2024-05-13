import { Button, IconButton } from "@mui/material";
import { FaAddressBook, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoMdAddCircle, IoMdCalendar, IoMdCall, IoMdLock, IoMdMail, IoMdRefresh } from "react-icons/io";
import { TechBox } from "@/Component/Custom/TechBox";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";

interface FormData {
    username: string;
    location: string;
    role: string;
}

function Profile() {

    const [coverImage, setCoverImage] = useState<string | null>("https://images.pexels.com/photos/585752/pexels-photo-585752.jpeg?cs=srgb&dl=pexels-ifreestock-585752.jpg&fm=jpg");
    const [profilePic, setProfilePic] = useState<string | null>("https://i.pinimg.com/736x/34/f8/e9/34f8e9e519bbe75d0ded14748469c30d.jpg");

    const user = useSelector((state: RootState) => state.userDetails.user);


    useEffect(() => {

    })

    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCoverImage(URL.createObjectURL(file));
        }
    };

    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const submitImageChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("hello");
    };

    const initialValues: FormData = {
        username: '',
        location: 'India',
        role: 'Java Full Stack Dev'
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        location: Yup.string().required('Location is required'),
        role: Yup.string().required('Role is required')
    });

    const handleSubmit = async (values: FormData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { username, role, ...payloadWithoutRole } = values;
            const payload = {
                userId: user.userId,
                professionalRole: role,
                userName: username,
                ...payloadWithoutRole
            };
            console.log(payload);
            const response = await axiosInstance.put("api/v1/user/editFreelancerProfile", payload, config);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex  gap-3">
            {/* first part */}
            <div className=" w-[65%]">
                {/* Profile pic and Text Part*/}
                <div className="w-full  border-2 border-dashed h-[450px] flex flex-col">
                    <div className="bg-cover bg-no-repeat h-[55%] w-full relative">
                        <div
                            style={{
                                backgroundImage: `url(https://www.gagandevelopers.com/wp-content/uploads/2023/01/contact-us-gagan-developers-1.png)`,
                            }}
                            className="h-full w-full bg-cover"
                        >
                            <div className="bg-white absolute -bottom-16 left-8 rounded-full p-2 shadow-2xl">
                                <img
                                    src="https://media.licdn.com/dms/image/C4E03AQFXQDabVRTEfQ/profile-displayphoto-shrink_800_800/0/1655121851261?e=2147483647&v=beta&t=tpj_avQmD2NTSYF3VuiqaM8DGOQ-6BvJiudN3ZCyj0s"
                                    alt="Profile"
                                    className="w-44 h-44 rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[45%]">
                        <div className="flex justify-end w-full h-full p-2 gap-2">

                            <div className="w-[50%] h-full items-start">
                                <h1 className="poetsen-one-regular font-bold text-5xl mt-4">Amrithesh A</h1>
                                <h1 className="mt-3 text-lg text-slate-500">Full Stack Java Developer</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <h1 className="text-lg text-slate-500">
                                        India, Kerala
                                    </h1>
                                </div>
                                <div className="mt-2">
                                    <Button variant="outlined" color="warning">
                                        Browse Projects
                                    </Button>
                                </div>
                            </div>
                            <div className=" w-[25%] h-full ">
                                <div className="flex justify-end">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outlined" color="primary">
                                                Edit Details
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Edit Details</AlertDialogTitle>
                                                <AlertDialogDescription className="min-h-[500px]">
                                                    <form className="w-full space-y-2" onSubmit={submitImageChange}>
                                                        <label htmlFor="cover" className="flex w-full h-32 relative rounded-md border items-center cursor-grabbing overflow-hidden">

                                                            <input type="file" className="hidden" id="cover" onChange={handleCoverImageChange} />

                                                            {coverImage && <img src={coverImage} alt="Cover" className="h-full w-full object-cover absolute left-0" />}

                                                            <label htmlFor="icon" className="size-28 rounded-full absolute left-4 cursor-pointer z-10 overflow-hidden p-1 bg-white">
                                                                <input type="file" className="hidden" id="icon" onChange={handleProfilePicChange} />
                                                                {profilePic && <img src={profilePic} alt="Icon" className="size-full rounded-full object-cover" />}
                                                            </label>

                                                        </label>
                                                        <div className="flex justify-end">
                                                            <button type="submit" className="w-[100px] flex items-center justify-center h-10 bg-primary rounded-md font-semibold text-white text-[14px] false undefined">
                                                                Update
                                                            </button>
                                                        </div>
                                                    </form>

                                                    <div className="p-4 mt-4 bg-gray-100 rounded-md">
                                                        <Formik
                                                            initialValues={initialValues}
                                                            validationSchema={validationSchema}
                                                            onSubmit={handleSubmit}
                                                        >
                                                            <Form>
                                                                <div className="mb-4">
                                                                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username:</label>
                                                                    <Field
                                                                        type="text"
                                                                        id="username"
                                                                        name="username"
                                                                        placeholder="Enter username"
                                                                        className="w-full px-3 py-2 border bg-background rounded-md focus:outline-none focus:border-black -blue-500"
                                                                    />
                                                                    <ErrorMessage name="username" component="div" className="text-red-500" />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location:</label>
                                                                    <Field
                                                                        type="text"
                                                                        id="location"
                                                                        name="location"
                                                                        placeholder="Enter location"
                                                                        className="w-full px-3 py-2 border bg-background rounded-md focus:outline-none focus:border-blue-500"
                                                                    />
                                                                    <ErrorMessage name="location" component="div" className="text-red-500" />
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role:</label>
                                                                    <Field
                                                                        type="text"
                                                                        id="role"
                                                                        name="role"
                                                                        placeholder="Enter role"
                                                                        className="w-full px-3 py-2 border bg-background rounded-md focus:outline-none focus:border-blue-500"
                                                                    />
                                                                    <ErrorMessage name="role" component="div" className="text-red-500" />
                                                                </div>
                                                                <div className="flex justify-end gap-3">
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Save Changes</button>
                                                                </div>
                                                            </Form>
                                                        </Formik>
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* My self */}
                <div className="w-full border-2 border-dashed min-h-[100px] mt-5 ">
                    <div className="flex justify-between p-3">
                        <h1 className="text-xl poetsen-one-regular text-gray-700">About Me</h1>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <IconButton aria-label="edit" color="primary">
                                    <FaEdit />
                                </IconButton>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Edit Details</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <div className="">
                                            <Textarea
                                                value="  I am a self-taught Full Stack Java Spring Boot developer. Eager to navigate the complexities of developingscalable distributed systems, and passionate about effective problem-solving and committed to craftingcode that is not only functional but also prioritizes speed, security, and high readability"
                                                className="min-h-[150px]"
                                                placeholder="Type your message here."
                                            />
                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <button
                                        type="button"
                                        className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                    >
                                        Update
                                    </button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div>
                        <p className="text-black font-medium poetsen-one-regular py-2 m-h-[100px] max-h-[200px] ml-5">
                            I am a self-taught Full Stack Java Spring Boot developer. Eager to navigate the complexities of developing
                            scalable distributed systems, and passionate about effective problem-solving and committed to crafting
                            code that is not only functional but also prioritizes speed, security, and high readability
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="w-full border-2 border-dashed min-h-[100px] mt-5 ">
                    <div className="flex justify-between p-3">
                        <h1 className="text-xl poetsen-one-regular text-gray-700">Skills</h1>
                        <IconButton aria-label="delete" color="primary">
                            <IoMdAddCircle size={32} />
                        </IconButton>
                    </div>
                    <div className="flex gap-2 p-3">
                        {Array("java", "spring boot", "react", "node js").map((skill) => (
                            <TechBox value={skill} />
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="w-full border-2 border-dashed min-h-[100px] mt-5">
                    <div className="flex justify-between p-3">
                        <h1 className="text-xl poetsen-one-regular text-gray-700">Experience</h1>
                        <IconButton aria-label="delete" color="primary">
                            <IoMdAddCircle size={32} />
                        </IconButton>
                    </div>
                    {Array(2).fill(null).map((_, index) => (
                        <div key={index} className="m-5 border-b-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-lg font-bold px-4 text-black">Sinor Java Dev</h1>
                                    <h1 className="text-md font-semibold px-4">
                                        Brototype <span className="text-sm text-black">2023 - 2024</span>
                                    </h1>
                                </div>
                                <div className="flex items-center gap-3 mr-5">
                                    <FaRegTrashAlt size={22} color="blue" />
                                    <FaEdit size={22} color="blue" />
                                </div>
                            </div>
                            <p className="mt-3 w-[92%] p-4">
                                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, whe n an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                            </p>
                        </div>
                    ))}

                </div>

                {/* Education */}
                <div className="w-full border-2 border-dashed min-h-[100px] mt-5">
                    <div className="flex justify-between p-3">
                        <h1 className="text-xl poetsen-one-regular text-gray-700">Education</h1>
                        <IconButton aria-label="delete" color="primary">
                            <IoMdAddCircle size={32} />
                        </IconButton>
                    </div>
                    {Array(4).fill(null).map((_, index) => (
                        <div key={index} className="m-5 border-b-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-lg font-bold px-4 text-black">Higher Secondary</h1>
                                    <h1 className="text-md font-semibold px-4">
                                        Computer Science
                                    </h1>
                                    <h1 className="text-md font-semibold px-4">
                                        Collage Of Eng <span className="text-sm ml-4 text-black">2023 - 2024</span>
                                    </h1>
                                </div>
                                <div className="flex items-center gap-3 mr-5">
                                    <FaRegTrashAlt size={22} color="blue" />
                                    <FaEdit size={22} color="blue" />
                                </div>
                            </div>
                            <p className="mt-3 w-[92%] p-4">
                                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, whe n an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                            </p>
                        </div>
                    ))}

                </div>
            </div>
            {/* Second part */}
            <div className="w-[35%] h-[400px] border-dashed border-2">
                {/* Additional Details */}
                <div>
                    <div className="flex justify-between p-4">
                        <h1 className="text-xl poetsen-one-regular text-gray-700">Additional Details</h1>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <IconButton aria-label="delete" color="primary">
                                    <FaEdit />
                                </IconButton></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Personal Details</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <form>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center gap-4">
                                                    <label htmlFor="email">
                                                        <IoMdMail color="gray" size={22} />
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        defaultValue="amrithesh0000@gmail.com"
                                                        className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                        placeholder="Email"
                                                    />
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <label htmlFor="phone">
                                                        <IoMdCall color="gray" size={28} />
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        defaultValue="9961811304"
                                                        className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                        placeholder="Phone"
                                                    />
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <label htmlFor="dob">
                                                        <IoMdCalendar color="gray" size={22} />
                                                    </label>
                                                    <input
                                                        id="dob"
                                                        type="date"
                                                        defaultValue="2005-12-27"
                                                        className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                        placeholder="Date of Birth"
                                                    />
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <label htmlFor="address">
                                                        <FaAddressBook color="gray" size={22} />
                                                    </label>
                                                    <input
                                                        id="address"
                                                        type="text"
                                                        defaultValue="Divyalayam(HO), Wayanad, Kerala"
                                                        className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                        placeholder="Address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <Button variant="outlined" >Update</Button>
                                            </div>
                                        </form>
                                        <form>
                                            <div className="mt-6F">
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <label htmlFor="password">
                                                            <IoMdLock color="gray" size={22} />
                                                        </label>
                                                        <input
                                                            id="password"
                                                            type="password"
                                                            name="password"
                                                            // onChange={formik.handleChange}
                                                            className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                            placeholder="Password"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <label htmlFor="newPassword">
                                                            <IoMdRefresh color="gray" size={22} />
                                                        </label>
                                                        <input
                                                            id="newPassword"
                                                            type="password"
                                                            name="newPassword"
                                                            // value={formik.values.resetPassword}
                                                            // onChange={formik.handleChange}
                                                            className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                            placeholder="New Password"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <label htmlFor="confirmPassword">
                                                            <IoMdRefresh color="gray" size={22} />
                                                        </label>
                                                        <input
                                                            id="confirmPassword"
                                                            type="password"
                                                            name="confirmPassword"
                                                            // value={formik.values.resetPassword}
                                                            // onChange={formik.handleChange}
                                                            className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                            placeholder="Confirm Password"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-2 gap-2">
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <Button variant="outlined">Update</Button>
                                            </div>
                                        </form>

                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                            </AlertDialogContent>
                        </AlertDialog>


                    </div>
                    <div className="flex items-start gap-4 p-4 ">
                        <IoMdMail color="gray " size={22} />
                        <div>
                            <h1 className="poetsen-one-regular text-black  tracking-wider">Email</h1>
                            <h1 className="poetsen-one-regular text-slate-500 mt-1 tracking-wider">amrithesh0000@gmail.com</h1>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3">
                        <IoMdCall color="gray " size={28} />
                        <div>
                            <h1 className="poetsen-one-regular text-slate-800 tracking-wider">Phone</h1>
                            <h1 className="poetsen-one-regular text-slate-500 mt-1 tracking-widest">9961811304</h1>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3">
                        <IoMdMail color="gray " size={22} />
                        <div>
                            <h1 className="poetsen-one-regular text-slate-800 tracking-wider">Date Of Brith</h1>
                            <h1 className="poetsen-one-regular text-slate-500 mt-1 tracking-wider">27-12-2005</h1>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3">
                        <FaAddressBook color="gray " size={22} />
                        <div>
                            <h1 className="poetsen-one-regular text-slate-800 tracking-wider">Address</h1>
                            <h1 className="poetsen-one-regular text-slate-500 mt-1 tracking-wider">Divyalayam(HO), Wayanad, Kerala</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Profile