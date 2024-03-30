import { FaLongArrowAltRight } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";

const languages: string[] = ['English',
    'Spanish',
    'French',
    'Italian',
    'Chinese',
    'Japanese',
    'Russian',
    'Arabic',
    'Portuguese',
    'Hindi',
    'Bengali',
    'Urdu',
    'Indonesian',
    'Swahili',
    'Dutch',
    'Greek',
    'Korean',
    'Turkish',
    'Thai',
    'Vietnamese',
    'Polish',
    'Czech',
    'Swedish',
    'German'
];

interface props {
    name: string;
    proficiency: string
}

interface ChildComponent1Props {
    setActive: (componentName: string) => void;
}


const Details_4: React.FC<ChildComponent1Props> = ({ setActive }) => {

    const [userLangs, setUserLangs] = useState<props[]>([{ name: "English", proficiency: "Must" }]);


    const updateProficiency = (langName: string, newProficiency: string) => {
        setUserLangs(prevLangs =>
            prevLangs.map(lang =>
                lang.name === langName ? { ...lang, proficiency: newProficiency } : lang
            )
        );
    };
    const removeLang = (langName: string) => {
        setUserLangs((prevLangs) =>
            prevLangs.filter((lang) => lang.name != langName)
        );
    };

    useEffect(() => {
        localStorage.removeItem('languages');

        localStorage.setItem("languages", JSON.stringify(userLangs));
    }, [userLangs]);

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
                <div className="p-10 sm:pl-36 font-bold text-xl text-black ">4/7</div>
                <div className="text-black pr-10 pl-10 sm:pl-36 pb-0 font-bold text-xl sm:text-4xl">
                    Looking Good.Next, tell us which languages you speak
                </div>
                <div className="text-black pr-10 pl-10 pt-2 sm:pl-36 max-w-[1000px] font-semibold text-sm">
                    Clients are often interested to know what languages you speak. English is a must, but do you speak any other languages?
                </div>
                <div className="text-black pl-10 pt-10 sm:pl-36 ">
                    <div className="overflow-hidden border border-gray-200 rounded-md shadow-md w-[50%]">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Language</th>
                                    <th className="py-3 px-6 text-right">Proficiency</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {userLangs.map((language: props) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={language.name}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap freelancerFont font-semibold text-xl">{language.name}</td>
                                        <td className="py-3 px-6 text-right">
                                            <div className="flex justify-end items-center gap-5">
                                                <select
                                                    onChange={(event) => updateProficiency(language.name, event.target.value)}
                                                    value={language.proficiency}
                                                    className="bg-white border-0 w-[150px] text-lg freelancerFont font-semibold rounded-md px-2 py-1">
                                                    <option value="Good" className="freelancerFont font-semibold">Good</option>
                                                    <option value="Fluent" className="freelancerFont font-semibold">Fluent</option>
                                                    <option value="Native" className="freelancerFont font-semibold">Native</option>
                                                </select>
                                                {language.name != "English" ?
                                                    <svg onClick={() => removeLang(language.name)} className="cursor-pointer" stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224h-181c-8.5 0-16-6-16-16s7.2-16 16-16h181c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path></svg>
                                                    : ""}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Rounded Button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="pl-10 pt-10 sm:pl-36  w-[100px]">
                            <button className="flex justify-center items-center w-16 h-16 bg-yellow-400 rounded-full">
                                <span className="text-black text-4xl font-bold">+</span>
                            </button>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Language</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex justify-center items-center gap-4">
                                <select
                                    className="bg-white border-0 w-[280px] text-lg freelancerFont font-semibold rounded-md px-2 py-1"
                                    onChange={(event) => {
                                        const selectedLanguage = event.target.value;
                                        setUserLangs(prevLangs => [...prevLangs, { name: selectedLanguage, proficiency: '' }]);

                                    }}
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang} className="freelancerFont font-semibold">{lang}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <div className="absolute flex bottom-16 right-0">
                    <button onClick={() => setActive("component5")} className="flex mr-5 sm:mr-10 justify-center items-center gap-2 text-black bg-orange-500 w-40 h-12 rounded-3xl">
                        Next <FaLongArrowAltRight />
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Details_4;








