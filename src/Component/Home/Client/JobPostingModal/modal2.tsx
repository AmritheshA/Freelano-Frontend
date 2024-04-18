import { useState } from 'react'
import { TechBox } from '@/Component/Custom/TechBox'
import { Textarea } from "@/components/ui/textarea";
import AddSkills from '@/Component/Custom/AddSkills';

interface propsType {
    setActive: (modalName: string) => void;
}

const Modal2: React.FC<propsType> = ({ setActive }) => {


    const [description, setDescription] = useState<string>(localStorage.getItem("jobDescription") ?? "");
    const initialSkills = localStorage.getItem("jobSkills")
        ? JSON.parse(localStorage.getItem("jobSkills")!)
        : [];

    const [skills, setSkills] = useState<string[]>(initialSkills);

    const onSkillChange = (value: any) => {
        setSkills([...skills, value]);
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleNext = () => {
        localStorage.setItem("jobSkills", JSON.stringify(skills));
        localStorage.setItem("jobDescription", description);
        setActive("modal3");
    }

    return (
        <div className="h-[520px]">
            <div className="mx-10 mt-8">
                <div className="flex justify-start items-end">
                    <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Add up to 10 skills</h1>
                </div>
                <div className="my-3">

                    <AddSkills flag={false} onSkillChange={onSkillChange} />
                    <div>
                        {skills?.map((skill, index) => (
                            <div key={index} className="relative inline-block mt-5 mr-5 rounded">
                                <TechBox badge={<svg onClick={() => handleRemoveSkill(skill)} cursor="pointer" stroke="currentColor" fill="red" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"></path></svg>} value={skill} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-start items-end">
                    <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Job Description</h1>
                </div>
                <div className="mt-3">
                    <Textarea value={description} placeholder="Type your message here." onChange={(e) => setDescription(e.target.value)} className="w-[500px] sm:w-[500px] border-2 border-gray-300 focus:border-none min-h-[120px]" />
                    <div className="flex justify-between sm:w-[500px] mt-2">
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-16 gap-5 mr-10">
                <button className="border-2 border-black text-black py-2 px-4 rounded-md focus:outline-none" onClick={() => setActive("modal1")}>Back</button>
                <button className="text-black border-2 border-black py-2 px-4 rounded-md focus:outline-none" onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}

export default Modal2
