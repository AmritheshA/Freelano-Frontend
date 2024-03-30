import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { Selects, SelectOption } from "../Custom/Selects";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ChildComponent1Props {
    setActive: (componentName: string) => void;
}

interface Education {
    school: string,
    degree: string,
    feildOfStudy: string,
    description: string
    startYear: string,
    endYear: string
}


const Details_3: React.FC<ChildComponent1Props> = ({ setActive }) => {
    const [school, setSchool] = useState<string>("");
    const [degree, setDegree] = useState<string>("");
    const [feildOfStudy, setFeildOfStudy] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startYear, setStartYear] = useState<string>("2000");
    const [endYear, setEndYear] = useState<string>("2000");

    const [education, setEducation] = useState<Education[]>([]);

    const years: SelectOption[] = Array.from({ length: 25 }, (_, index) => {
        const year = 2000 + index;
        return { label: year.toString(), value: year.toString() };
    });
    const handleStartYear: any = (value: string) => {
        setStartYear(value);
    };
    const handleEndYear: any = (value: string) => {
        setEndYear(value);
    };

    const handleSubmit = () => {

        const newEducation = {
            school,
            degree,
            feildOfStudy,
            description,
            endYear,
            startYear,
        }

        const existingEducationJSON: string | null = localStorage.getItem("education");
        const existingEducation: Education[] = existingEducationJSON ? JSON.parse(existingEducationJSON) : [];
        const updatedEducation: Education[] = [...existingEducation, newEducation];

        setEducation((prev) => [...prev, newEducation]);
        localStorage.setItem("education", JSON.stringify(updatedEducation));
    }

    return (
        <div className="bg-white w-full h-screen ">
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
                <div className="p-10 sm:pl-36 font-bold text-xl text-black ">3/7</div>
                <div className="text-black pr-10 pl-10 sm:pl-36 pb-0 font-bold text-xl sm:text-4xl">
                    Clients like to know what you know - add your education here
                </div>
                <div className="text-black pr-10 pl-10 pt-2 sm:pl-36 max-w-[1000px] font-semibold text-sm">
                    You don’t have to have a degree. Adding any relevant education helps make your profile more visible. OR
                </div>
                <div className="text-black pl-10 pt-10 sm:pl-36 ">
                    Just head on to the next page.
                </div>
                {education.length == 0 ? "" :
                    <div className="pl-10 pt-10 sm:pl-36 flex gap-5 h-[250px] ">
                        {education.map((exp) => (
                            <div className="relative">
                                <div className="absolute top-2 right-2 text-black px-2 py-1 rounded-full">
                                    <X
                                        onClick={() => {
                                            setEducation(prevExperience => prevExperience.filter(exp1 => exp1 !== exp))
                                        }}
                                        className="w-5 cursor-pointer" />
                                </div>
                                <div className="border-2 rounded-lg shadow-md p-4">
                                    <div className="flex gap-5">
                                        <h5 className="text-2xl font-bold mb-2">{exp.degree}</h5>
                                    </div>
                                    <p className="text-gray-700 mb-4">
                                        {exp.school} | {exp.startYear} - {exp.endYear}
                                    </p>
                                    <p className="text-gray-500 max-w-[350px]">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="pl-10 pt-10 sm:pl-36">
                            <button className="flex justify-center items-center w-16 h-16 bg-yellow-400 rounded-full">
                                <span className="text-black text-4xl font-bold">+</span>
                            </button>
                        </div></DialogTrigger>
                    <DialogContent className="max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle>Add Work Experience</DialogTitle>
                        </DialogHeader>
                        <div>
                            <div className="flex gap-5 mt-5">
                                <div className=" flex flex-col w-[50%]">
                                    <label className="text-black font-normal  freelancerFont" >School</label>
                                    <Input onChange={(e) => setSchool(e.target.value)} className="border-2 text-black  sm:w-full sm:h-10" placeholder="Software Eng" />
                                </div>

                            </div>
                            <div className="flex gap-5 mt-5 ">
                                <div className=" flex flex-col w-[50%]">
                                    <label className="text-black font-normal  freelancerFont" >Degree</label>
                                    <Input onChange={(e) => setDegree(e.target.value)} className="border-2 text-black  sm:w-full sm:h-10" placeholder="Degree" />
                                </div>
                                <div className=" flex flex-col w-[50%]">
                                    <label className="text-black font-normal  freelancerFont" >Field of study</label>
                                    <Input onChange={(e) => setFeildOfStudy(e.target.value)} className="border-2 text-black  sm:w-full sm:h-10" placeholder="Degree" />
                                </div>
                            </div>
                            <div className="flex gap-5 mt-5 ">
                                <div className="w-[50%]">

                                    <label className="text-black font-normal  freelancerFont" >Duration</label>
                                    <div className="flex gap-5">
                                        <Selects
                                            options={years}
                                            value={startYear}
                                            onChange={handleStartYear}
                                            className="w-full border-2 p-2 rounded-md sm:w-full sm:h-10 bg-white"
                                            isDisabled={false}
                                        />

                                    </div>
                                </div>
                                <div className=" flex items-end w-[50%]">
                                    <Selects
                                        options={years}
                                        value={endYear}
                                        onChange={handleEndYear}
                                        className="w-full border-2 p-2 rounded-md sm:w-full sm:h-10 bg-white"
                                        isDisabled={false}
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <label className="text-black font-normal  freelancerFont" >Description</label>
                                <Textarea onChange={(e) => setDescription(e.target.value)} className=" border-2" placeholder="Describe your work experience" />
                            </div>
                        </div>
                        <DialogFooter className="">
                            <div className="flex gap-5">
                                <button onClick={handleSubmit} className="w-28 h-10 rounded-xl text-white bg-orange-500 ">Add Work</button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div className="absolute flex bottom-16 right-0">
                    <button
                        onClick={() => setActive("component4")}
                        className="flex mr-5 sm:mr-10 justify-center items-center gap-2 border-2 text-black border-black w-40 h-12 rounded-3xl">
                        Skip now
                    </button>
                    <button onClick={() => setActive("component4")} className="flex mr-5 sm:mr-10 justify-center items-center gap-2 text-white bg-orange-500 w-40 h-12 rounded-3xl">
                        Next <FaLongArrowAltRight />
                    </button>
                </div>
            </div>

        </div >
    );
}

export default Details_3;
