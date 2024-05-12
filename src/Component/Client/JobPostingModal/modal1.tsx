import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { SelectOption } from "@/Component/Custom/Selects";
import { Input } from "@/components/ui/input";

interface propsType {
    setActive: (modalName: string) => void;
}

const Modal1: React.FC<propsType> = ({ setActive }) => {

    const localStorageTitle = localStorage.getItem("jobTitle");
    const [title, setTitle] = useState(localStorageTitle ?? "");

    const localStorageCategory = localStorage.getItem("selectedJobCategory");
    const [selectedCategory, setSelectedCategory] = useState(localStorageCategory ?? "");

    const categories: SelectOption[] = [
        { label: "Web Development", value: "web-development" },
        { label: "Front-end", value: "front-end" },
        { label: "Back-end", value: "back-end" },
        { label: "Web Design", value: "web-design" },
        { label: "Full Stack", value: "full-stack" },
        { label: "Marketing", value: "marketing" },
        { label: "UI/UX Design", value: "ui-ux" },
        { label: "Cloud Computing", value: "cloud-computing" },

    ];

    const handleNext = () => {
        localStorage.setItem("jobTitle", title);
        localStorage.setItem("selectedJobCategory", selectedCategory);
        setActive("modal2");
    }

    return (
        <div className="h-[450px]">
            <div className="mx-10 mt-8">
                <div className="flex justify-start items-end">
                    <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Write a title for your job post</h1>
                </div>
                <div className="mt-5 max-w-[450px]">
                    <Input type="email" onChange={(e) => setTitle(e.target.value)} value={title} className="border-2 h-12 text-black border-gray-300" placeholder="Full Stack Web Application" />
                    <h1 className="p-2 text-sm clientFont font-semibold" >We will match you with candidate that best for {title}</h1>
                </div>
                <div className="flex justify-start items-end">
                    <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Job Category</h1>
                </div>
                <div className="mt-3">
                    <Select onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger className="w-[400px] h-12 border-2 border-gray-300 text-black">
                            <SelectValue className="text-black" placeholder="Select your category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className="text-black">
                                {categories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-end mt-16 gap-5 mr-10">
                <button className="border-2 border-black text-black py-2 px-4 rounded-md focus:outline-none " onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}
export default Modal1;
