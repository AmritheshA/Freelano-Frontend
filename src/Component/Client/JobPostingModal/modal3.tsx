import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SelectOption } from '@/Component/Custom/Selects';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { CREATE_PROJECT } from '@/Graphql/mutation';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';
 

interface propsType {
    setActive: (modalName: string) => void;
    
}

const Modal3: React.FC<propsType> = ({ setActive }) => {


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
    const user = useSelector((state: RootState) => state.userDetails.user);
    const [duration, setDuration] = useState("");
    const [experience, setExperience] = useState("");
    const [country, setCountry] = useState("");
    const [budgetType, setBudgetType] = useState("");
    const [price, setPrice] = useState("");
    const [createJobListing, { data, loading, error }] = useMutation(CREATE_PROJECT);

    console.log(data);
    console.log(loading);
    console.log(error);

    const handleSubmit = async () => {
        const projectTitle = localStorage.getItem("jobTitle");
        const category = localStorage.getItem("selectedJobCategory");
        const skills = JSON.parse(localStorage.getItem("jobSkills") ?? "");
        const jobDescription = localStorage.getItem("jobDescription");

        try {
            await createJobListing({
                variables: {
                    projectTitle,
                    category,
                    skills,
                    jobDescription,
                    projectDuration: duration,
                    experienceLevel: experience,
                    location: country,
                    budgetType: budgetType,
                    prize: price,
                    email:'Client@gamil.com',
                    clientId:user.userId,

                },
            });
            toast.success("Job created Successfully");
            localStorage.clear();
            setActive("modal1");
        } catch (error) {
            console.error('Error creating job listing:', error);
        }
    };

    return (
        <div className="h-[380px]">
            <div className="mx-10 mt-8">
                <div className="flex gap-5 mt-5 ">
                    <div className=" flex flex-col w-[50%]">
                        <label className="text-black font-medium clientFont" >Project Duration</label>
                        <Select onValueChange={(value) => setDuration(value)} value={duration}>
                            <SelectTrigger className="w-full h-12 mt-2 border-2 border-gray-300 text-black">
                                <SelectValue className="text-black" placeholder="Select project duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="text-black">
                                    <SelectItem value="more than 6 months">more than 6 months</SelectItem>
                                    <SelectItem value="3 to 6 months">3 to 6 months</SelectItem>
                                    <SelectItem value="1 to 3 months">1 to 3 months</SelectItem>
                                    <SelectItem value="with in 1 month">with in 1 month</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className=" flex flex-col w-[50%]">
                        <label className="text-black font-medium clientFont" >Expererience Level</label>
                        <Select onValueChange={(value) => setExperience(value)} value={experience}>
                            <SelectTrigger className="w-full h-12 mt-2 border-2 border-gray-300 text-black">
                                <SelectValue className="text-black" placeholder="Select your category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="text-black">
                                    <SelectItem value="Entry">Entry</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Expert">Expert</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mt-5 flex">
                    <div className="flex flex-col w-[50%]">
                        <label className="text-black font-medium clientFont" >Location</label>
                        <Select onValueChange={(value) => setCountry(value)} value={country}>
                            <SelectTrigger className="w-[260px] mt-2 h-12 border-2 text-black border-gray-300">
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
                    <div className="flex flex-col ml-4">
                        <label className="text-black font-medium clientFont" >Budget Type</label>
                        <RadioGroup defaultValue="option-one" onValueChange={(e) => setBudgetType(e)} value={budgetType}>
                            <div className="mt-6 flex gap-10" >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Fixed" className="w-5 h-5" id="option-one" />
                                    <Label htmlFor="option-one">Fixed</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Hourly" className="w-5 h-5" id="option-two" />
                                    <Label htmlFor="option-two">Hourly</Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className="my-3 flex flex-col mt-5">
                    <Label className="text-black">Prize</Label>
                    <input
                        type="number"
                        value={price}
                        min={0}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter project prize"
                        className="p-2 mt-3 mr-2 w-[350px] sm:w-[350px] text-black h-12 focus:border-gray-400 rounded-md border-2 border-gray-300"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-16 gap-5 mr-10">
                <button className="border-2 border-black text-black py-2 px-4 rounded-md focus:outline-none" onClick={() => setActive("modal2")}>Back</button>
                <button className="bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-900" onClick={handleSubmit}>Post</button>
            </div>
        </div>
    )
}

export default Modal3