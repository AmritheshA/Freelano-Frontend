import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import { TechBox } from "../Custom/TechBox";
import { toast } from "react-toastify";


interface ChildComponent1Props {
    setActive: (componentName: string) => void;
}

const Details_5: React.FC<ChildComponent1Props> = ({ setActive }) => {

    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [inputValue, setInputValue] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);

    const datas = [
        'javaScript',
        'typeScript',
        'python',
        'java',
        'c++',
        'c#',
        'pHP',
        'ruby',
        'swift',
        'kotlin',
        'go',
        'rust',
        'dart',
        'scala',
        'perl',
        'spring'
    ];


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            if (!skills.some((skill) => skill === inputValue.trim())) {
                if ((datas.some((data) => data == inputValue.trim()))) {
                    setSkills([...skills, inputValue.trim()]);
                    setInputValue('');
                } else {
                    toast.warn("Skill is not registered")
                }
            } else {
                setShowAlert(true);
            }
        }
        setTimeout(() => setShowAlert(false), 1500);
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleNextClick = () => {
        if (skills.length >= 3) {
            setActive("component6")
        }else{
            toast("Atleast 3 skills required")
        }
    }

    useEffect(() => {
        localStorage.removeItem('skils');
        localStorage.setItem("skills", JSON.stringify(skills));
    }, [skills]);

    return (
        <div className="absolute bg-white w-full h-screen ">
            {showAlert && (
                <Alert
                    severity="error"
                    color="error"
                    className="fixed top-10 left-0 right-0 mx-auto z-50 w-[50%]"
                >
                    Please enter a valid skill.
                </Alert>
            )}
            <div className="p-10 sm:pl-36">
                <div className="text-white font-bold text-lg">
                    <img
                        className="h-16 xl:h-35 md:h-35 sm:h-22"
                        src="/src/assets/logo.png"
                        alt="Logo"
                    />
                </div>
            </div>
            {/* Text */}
            <div className="flex flex-col">
                <div className="p-10 sm:pl-36 font-bold text-xl">5/8</div>
                <div className="pr-10 pl-10 sm:pl-36 pb-0 font-bold text-xl sm:text-4xl">
                    Nearly there! What work are you here to do?
                </div>
                <div className="pr-10 pl-10 pt-2 sm:pl-36 font-semibold text-sm">
                    Your skills show clients what you can offer, and help us choose which jobs to
                    recommend to you. Add or remove the ones we’ve suggested,
                    or start typing to pick more. It’s up to you.
                </div>
                <div className="pl-10 pt-10 sm:pl-36 ">Your skills</div>
                <div className="pr-10 pl-10 p-2 sm:pl-36">
                    <div className="mb-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Enter skills"
                            className="p-2 mr-2 w-[350px] sm:w-[700px] focus:border-gray-400 rounded-md border border-gray-300"
                        />
                        <div>
                            {skills.map((skill, index) => (
                                <div key={index} className="relative inline-block mt-5 mr-5 rounded">
                                    <TechBox badge={<svg onClick={() => handleRemoveSkill(skill)} cursor="pointer" stroke="currentColor" fill="red" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"></path></svg>} value={skill} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Button */}
            <div className="absolute flex bottom-16 right-0">

                <button
                    onClick={handleNextClick}
                    className="flex mr-5 sm:mr-10 justify-center items-center gap-2 bg-orange-500 w-40 h-12 rounded-3xl"
                >
                    Next <FaLongArrowAltRight />
                </button>
            </div>
        </div>
    );
}

export default Details_5;
