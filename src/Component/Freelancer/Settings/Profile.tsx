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
import { useContext, useEffect, useState } from "react";
import * as Yup from 'yup';
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { FreelancerContext } from "@/Context/UserContext/FreelancerProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface FormData {
    username: string;
    location: string;
    role: string;
}

function Profile() {
    const { freelancerDetails, setFreelancerDetails } = useContext(FreelancerContext);

    const [coverImage, setCoverImage] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [about, setAbout] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const user = useSelector((state: RootState) => state.userDetails.user);

    useEffect(() => {

        if (freelancerDetails) {
            setCoverImage(freelancerDetails.coverImage);
            setProfilePic(freelancerDetails.profileImgUrl);
            setAbout(freelancerDetails?.description);
            setEmail(freelancerDetails?.email);
            setPhone(freelancerDetails?.mobileNumber);
            setDob(freelancerDetails?.dateOfBirth.substring(0, 10));
        }
    }, [freelancerDetails]);

    const handleCoverImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setCoverImage(URL.createObjectURL(file));

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ml_default");
            try {
                const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                    method: "POST",
                    body: formData,
                });

                const responseData = await response.json();

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };


                const responseFromBackend = await axiosInstance.
                    put(`/api/v1/user/updateProfileImage?freelancerId=${freelancerDetails.freelancersAuthId}&image=${responseData.secure_url}&coverImage=${true}`, config)

                toast.success(responseFromBackend.data);

                setFreelancerDetails((prevFreelancerDetails) => ({
                    ...prevFreelancerDetails,
                    coverImage: responseData?.secure_url
                }));

            } catch (error) {
                console.error("Error uploading file to Cloudinary:", error);
            }

        }
    };

    const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ml_default");

            try {
                const cloudinaryResponse = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                    method: "POST",
                    body: formData,
                });

                const cloudinaryData = await cloudinaryResponse.json();

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const responseFromBackend = await axiosInstance.put(`/api/v1/user/updateProfileImage?freelancerId=${freelancerDetails?.freelancersAuthId}&image=${cloudinaryData.secure_url}&coverImage=${false}`, config);

                setFreelancerDetails((prevFreelancerDetails) => ({
                    ...prevFreelancerDetails,
                    profileImgUrl: cloudinaryData.secure_url,
                }));

                toast.success(responseFromBackend.data);
            } catch (error) {
                console.error("Error uploading file to Cloudinary | updating image:", error);
            }


        };
    }
    const initialValues: FormData = {
        username: freelancerDetails?.userName,
        location: freelancerDetails?.country,
        role: freelancerDetails?.professionalRole
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
                country: location,
                userName: username,
                ...payloadWithoutRole
            };

            await axiosInstance.put("api/v1/user/editFreelancerProfile", payload, config);

            toast.success("Updated Successfully")

            setFreelancerDetails((prevFreelancerDetails) => ({
                ...prevFreelancerDetails,
                professionalRole: role,
                userName: values.username,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const onAboutUpdate = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axiosInstance.put(`/api/v1/user/updateAbout?freelancerId=${freelancerDetails.freelancersAuthId}`, { about }, config);

            toast.success(response.data);

            setFreelancerDetails((prevFreelancerDetails) => ({
                ...prevFreelancerDetails,
                description: about
            }));
        } catch (error) {

        }
    }

    const handlePersonalDetails = async () => {

        try {
            const payload = {
                phone,
                dateOfBirth: dob,
                userAuthId: freelancerDetails.freelancersAuthId
            }
            const response = await axiosInstance.put("/api/v1/user/editPersonalDetails", payload);

            setFreelancerDetails((prevFreelancerDetails) => ({
                ...prevFreelancerDetails,
                dateOfBirth: dob,
                mobileNumber: phone,
            }));

            toast.success(response.data);
        } catch (error) {

        }
    }

    const handleRestPassword = async () => {
        try {
            if (oldPassword != '' || newPassword != '' && newPassword == confirmPassword) {
                const response = await axiosInstance.put(`/api/v1/auth/restFreelancerPassword?freelancerId=${freelancerDetails?.freelancersAuthId}&oldPassword=${oldPassword}&newPassword=${newPassword}`);
                toast.success(response.data);
            } else {
                toast.info("new password and confirm password not match ")
            }
        } catch (error: any) {
            toast.error(error?.response?.data);
        }
    }


    return (
        <div className="flex  gap-3">
            {/* first part */}
            <div className=" w-[65%]">
                {/* Profile pic and Text Part*/}
                <div className="w-full  border-2 border-dashed h-[450px] flex flex-col">
                    <div className="bg-cover bg-no-repeat h-[55%] w-full relative">
                        <div
                            style={{
                                backgroundImage: `url(${freelancerDetails?.coverImage})`,
                            }}
                            className="h-full w-full bg-cover"
                        >
                            <div className="bg-white absolute -bottom-16 left-8 rounded-full p-2 shadow-2xl">
                                <img
                                    src={`${freelancerDetails?.profileImgUrl}`}
                                    alt="Profile"
                                    className="w-44 h-44 rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[45%]">
                        <div className="flex justify-end w-full h-full p-2 gap-2">

                            <div className="w-[50%] h-full items-start">
                                <h1 className="poetsen-one-regular font-bold text-5xl mt-4">{freelancerDetails?.userName}</h1>
                                <h1 className="mt-3 text-lg text-slate-500">{freelancerDetails?.professionalRole}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <h1 className="text-lg text-slate-500">
                                        {freelancerDetails?.country}, {freelancerDetails?.district}
                                    </h1>
                                </div>
                                <div className="mt-2">
                                    <Link to={"/jobs"}>
                                        <Button variant="outlined" color="warning">
                                            Browse Projects
                                        </Button>
                                    </Link>

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
                                                    <form className="w-full space-y-2">
                                                        <label htmlFor="cover" className="flex w-full h-32 relative rounded-md border items-center cursor-grabbing overflow-hidden">

                                                            <input type="file" className="hidden" id="cover" onChange={handleCoverImageChange} />

                                                            <img src={coverImage} alt="Cover" className="h-full w-full object-cover absolute left-0" />

                                                            <label htmlFor="icon" className="size-28 rounded-full absolute left-4 cursor-pointer z-10 overflow-hidden p-1 bg-white">
                                                                <input type="file" className="hidden" id="icon" onChange={handleProfilePicChange} />
                                                                <img src={profilePic} alt="Icon" className="size-full rounded-full object-cover" />
                                                            </label>
                                                        </label>
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
                                                value={about}
                                                onChange={(even) => setAbout(even.target.value)}
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
                                        onClick={onAboutUpdate}
                                    >
                                        Update
                                    </button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div>
                        <p className="text-black font-medium poetsen-one-regular py-2 m-h-[100px] max-h-[200px] ml-5">
                            {freelancerDetails?.description}
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
                        {freelancerDetails?.skills.map((skill) => (
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
                    {freelancerDetails?.experience.map((experience, index) => (
                        <div key={index} className="m-5 border-b-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-lg font-bold px-4 text-black">{experience.workTitle}</h1>
                                    <h1 className="text-md font-semibold px-4">
                                        {experience.company} <span className="text-sm text-black">{experience.startDate} - {experience.endDate}</span>
                                    </h1>
                                </div>
                                <div className="flex items-center gap-3 mr-5">
                                    <FaRegTrashAlt size={22} color="blue" />
                                    <FaEdit size={22} color="blue" />
                                </div>
                            </div>
                            <p className="mt-3 w-[92%] p-4">
                                {experience.description}
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
                    {freelancerDetails?.education.map((education, index) => (
                        <div key={index} className="m-5 border-b-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-lg font-bold px-4 text-black">{education.school}</h1>
                                    <h1 className="text-md font-semibold px-4">
                                        {education.fieldOfStudy}
                                    </h1>
                                    <h1 className="text-md font-semibold px-4">
                                        {education.degree} <span className="text-sm ml-4 text-black">{education.duration}</span>
                                    </h1>
                                </div>
                                <div className="flex items-center gap-3 mr-5">
                                    <FaRegTrashAlt size={22} color="blue" />
                                    <FaEdit size={22} color="blue" />
                                </div>
                            </div>
                            <p className="mt-3 w-[92%] p-4">
                                {education.description}
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
                                                        defaultValue={email}
                                                        disabled={true}
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
                                                        value={phone}
                                                        onChange={(eve) => { setPhone(eve.target.value) }}
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
                                                        value={dob}
                                                        onChange={(eve) => { console.log(eve.target.value) }}
                                                        className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                        placeholder="Date of Birth"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <Button onClick={handlePersonalDetails} variant="outlined" >Update</Button>
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
                                                            value={oldPassword}
                                                            onChange={(eve) => setOldPassword(eve.target.value)}
                                                            name="password"
                                                            className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                            placeholder="Old password"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <label htmlFor="newPassword">
                                                            <IoMdRefresh color="gray" size={22} />
                                                        </label>
                                                        <input
                                                            id="newPassword"
                                                            type="password"
                                                            min={6}
                                                            required
                                                            value={newPassword}
                                                            onChange={(eve) => setNewpassword(eve.target.value)}
                                                            name="newPassword"
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
                                                            value={confirmPassword}
                                                            onChange={(eve) => setConfirmPassword(eve.target.value)}
                                                            name="confirmPassword"
                                                            className="flex-grow rounded-md border bg-background border-gray-300 px-3 py-2"
                                                            placeholder="Confirm Password"
                                                        />
                                                    </div>
                                                    {newPassword != confirmPassword && <p className="ml-10 text-red-800">Passwords do not match !!</p>}
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-2 gap-2">
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <Button onClick={handleRestPassword} variant="outlined">Update</Button>
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
                            <h1 className="poetsen-one-regular text-slate-500 mt-1 tracking-wider">{freelancerDetails?.email}</h1>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3">
                        <IoMdCall color="gray " size={28} />
                        <div>
                            <h1 className="poetsen-one-regular text-slate-800 tracking-wider">Phone</h1>
                            <h1 className="poetsen-one-regular text-slate-500 mt-1 tracking-widest">{freelancerDetails?.mobileNumber}</h1>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3">
                        <IoMdMail color="gray " size={22} />
                        <div>
                            <h1 className="poetsen-one-regular text-slate-800 tracking-wider">Date Of Brith</h1>
                            <h1 className="poetsen-one-regular text-slate-500 mt-1 tracking-wider">{freelancerDetails?.dateOfBirth.substring(0, 10)}</h1>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-3">
                        <FaAddressBook color="gray " size={22} />
                        <div>
                            <h1 className="poetsen-one-regular text-slate-800 tracking-wider">Address</h1>
                            <h1 className="poetsen-one-regular text-slate-500 mt-1 tracking-wider">{freelancerDetails?.streetAddress}(HO), {freelancerDetails?.district}, {freelancerDetails?.country}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Profile