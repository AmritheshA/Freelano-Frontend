import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import React, {useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { Selects, SelectOption } from "../Custom/Selects";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ChildComponent1Props {
  setActive: (componentName: string) => void;
}

interface Experience {
  isCheckboxChecked: boolean;
  workTitle: string;
  company: string;
  location: string;
  selectedCountry: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  description: string;
}

const Details_2: React.FC<ChildComponent1Props> = ({ setActive }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [workTitle, setWorkTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [startMonth, setStartMonth] = useState('January');
  const [startYear, setStartYear] = useState("2000");
  const [endMonth, setEndMonth] = useState('January');
  const [endYear, setEndYear] = useState("2000");
  const [description, setDescription] = useState('');

  const [experience, setExperience] = useState<Experience[]>([]);


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
  const months: SelectOption[] = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];
  const years: SelectOption[] = Array.from({ length: 25 }, (_, index) => {
    const year = 2000 + index;
    return { label: year.toString(), value: year.toString() };
  });
  const handleSelectedCountry: any = (value: string) => {
    setSelectedCountry(value);
  };
  const handleStartMonth: any = (value: string) => {
    setStartMonth(value);
  };
  const handleEndMonth: any = (value: string) => {
    setEndMonth(value);
  };
  const handleStartYear: any = (value: string) => {
    setStartYear(value);
  };
  const handleEndYear: any = (value: string) => {
    setEndYear(value);
  };
  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };
  const handleSubmit = () => {
    const newExperience: Experience = {
      workTitle,
      company,
      isCheckboxChecked,
      location,
      selectedCountry,
      startMonth,
      startYear,
      endMonth,
      endYear,
      description
    };

    const existingExperienceJSON: string | null = localStorage.getItem("experience");
    const existingExperience: Experience[] = existingExperienceJSON ? JSON.parse(existingExperienceJSON) : [];
    const updatedExperience: Experience[] = [...existingExperience, newExperience];


    setExperience((prev) => [...prev, newExperience]);
    localStorage.setItem("experience", JSON.stringify(updatedExperience));
    setIsCheckboxChecked(false);
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
        <div className="p-10 sm:pl-36 font-bold text-xl text-black ">2/8</div>
        <div className="text-black pr-10 pl-10 sm:pl-36 pb-0 font-bold text-xl sm:text-4xl">
          If you have relevant work experience, add it here
        </div>
        <div className="text-black pr-10 pl-10 pt-2 sm:pl-36 max-w-[1000px] font-semibold text-sm">
          Freelancers who add their experience are twice as likely to win work.
          But if you’re just starting out, you can still create a great profile.
        </div>
        <div className="text-black pl-10 pt-10 sm:pl-36 ">
          Just head on to the next page.
        </div>
        {experience.length == 0 ? "" :
          <div className="pl-10 pt-10 sm:pl-36 flex gap-5 h-[250px] ">
            {experience.map((exp) => (
              <div className="relative">
                <div className="absolute top-2 right-2 text-black px-2 py-1 rounded-full">
                  <X
                    onClick={() => {
                      setExperience(prevExperience => prevExperience.filter(exp1 => exp1 !== exp))
                    }}
                    className="w-5 cursor-pointer" />
                </div>
                <div className="border-2 rounded-lg shadow-md p-4">
                  <div className="flex gap-5">
                    <h5 className="text-2xl font-bold mb-2">{exp.workTitle}</h5>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {exp.company} | {exp.startMonth} - {exp.startYear} - {exp.isCheckboxChecked ? "Present" : exp.endMonth + "-" + exp.endYear} <br /> {exp.location}, {exp.selectedCountry}
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
                <div className=" flex flex-col gap-3 w-[50%]">
                  <label className="text-black font-normal  freelancerFont" >Work Title</label>
                  <Input onChange={(e) => setWorkTitle(e.target.value)} className="border-2  sm:w-full sm:h-10" placeholder="Software Eng" />
                </div>
                <div className=" flex flex-col gap-3 w-[50%]">
                  <label className="text-black font-normal  freelancerFont">Company</label>
                  <Input onChange={(e) => setCompany(e.target.value)} className="border-2  sm:w-full sm:h-10" placeholder="Google" />
                </div>
              </div>
              <div className="flex gap-5 mt-5 ">
                <div className=" flex flex-col gap-3 w-[50%]">
                  <label className="text-black font-normal  freelancerFont">Location</label>
                  <Input onChange={(e) => setLocation(e.target.value)} className="border-2 sm:w-full sm:h-10" placeholder="Kerala" />
                </div>
                <div className=" flex items-end w-[50%]">
                  <Selects
                    options={countries}
                    value={selectedCountry}
                    onChange={handleSelectedCountry}
                    className="w-full  border-2 "
                    isDisabled={false}
                  />
                </div>
              </div>
              <div className="flex gap-5 mt-5 ">
                <div className="w-[50%]">
                  <label className="text-black font-normal freelancerFont">Start Date</label>
                  <div className="flex gap-5 mt-3">
                    <Selects
                      options={months}
                      value={startMonth}
                      onChange={handleStartMonth}
                      className="w-full border-2 sm:h-10 "
                      isDisabled={false}
                    />
                    <Selects
                      options={years}
                      value={startYear}
                      onChange={handleStartYear}
                      className="w-full border-2 sm:h-10 "
                      isDisabled={false}
                    />
                  </div>
                </div>
                <div className="w-[50%]">
                  <label className="text-black font-normal freelancerFont">End Date</label>
                  <div className="flex gap-5 mt-3">
                    <Selects
                      options={months}
                      value={endMonth}
                      onChange={handleEndMonth}
                      className="w-full border-2 sm:h-10 "
                      isDisabled={isCheckboxChecked}
                    />
                    <Selects
                      options={years}
                      value={endYear}
                      onChange={handleEndYear}
                      className="w-full border-2 sm:h-10 "
                      isDisabled={isCheckboxChecked}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-[50%] flex mt-4 items-center gap-4  justify-end">
                  {/* <input type="checkbox"   /> */}
                  <Checkbox id="terms1" onCheckedChange={handleCheckboxChange} className="w-5 h-5" />
                  <h1 className="text-center ">I am currently working in this role</h1>
                </div>
              </div>
              <div>
                <h1 className="text-black freelancerFont font-normal">Description</h1>
                <Textarea onChange={(e) => setDescription(e.target.value)} className=" border-2" placeholder="Describe your work experience" />
              </div>
            </div>
            <DialogFooter>
              <div className="flex gap-5 mt-5">
                <Button onClick={handleSubmit} className="w-28 h-10 hover:bg-orange-600  text-white bg-orange-500 " >Add work</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="absolute flex bottom-16 right-0">
          <button onClick={() => setActive("component3")} className="flex mr-5 sm:mr-10 justify-center items-center gap-2 border-2 text-black border-black w-40 h-12 rounded-3xl">
            Skip Now
          </button>
          <button onClick={() => setActive("component3")} className="flex mr-5 sm:mr-10 justify-center items-center gap-2 text-white bg-orange-500 w-40 h-12 rounded-3xl">
            Next <FaLongArrowAltRight />
          </button>
        </div>
      </div>

    </div >
  );
}

export default React.memo(Details_2);
