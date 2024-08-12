import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert } from "@mui/material";
import logo from "@/assets/logo.png"



interface ChildComponent1Props {
    setActive: (componentName: string) => void;
}

const Details_7: React.FC<ChildComponent1Props> = ({ setActive }) => {

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>(" ");

    const services: string[] = [
        'Amazon Web Services (AWS)',
        'Microsoft Azure',
        'Google Cloud Platform (GCP)',
        'Firebase',
        'TypeScript',
        'Python',
        'React',
        'Angular',
    ];


    const handleNextClick = () => {

        if (selectedValue.trim().length != 0) {
            localStorage.setItem("service", JSON.stringify(selectedValue));
            setActive("component8")
        } else {

            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 1500);
        }
    }
    useEffect(() => {

    }, []);

    return (
        <div className="absolute bg-white w-full h-screen ">
            {showAlert && (
                <Alert
                    severity="warning"
                    color="warning"
                    className="fixed top-10 left-0 right-0 mx-auto z-50 w-[50%] item-center"
                >
                    Select a service
                </Alert>
            )}
            <div className="p-10 sm:pl-36">
                <div className="text-white font-bold text-lg">
                    <img
                        className="h-16 xl:h-35 md:h-35 sm:h-22"
                        src={logo}
                        alt="Logo"
                    />
                </div>
            </div>
            {/* Text */}
            <div className="flex flex-col">
                <div className="p-10 sm:pl-36 font-bold text-xl">7/8</div>
                <div className="pr-10 pl-10 sm:max-w-[1200px]  freelancerFont sm:pl-36 pb-0 font-semibold text-xl sm:text-4xl">
                    What are the main services you offer?
                </div>
                <div className="pr-10 pl-10 pt-2 sm:pl-36 freelancerFont sm:max-w-[1200px] font-semibold text-sm">
                    Choose at least one service that best describes the type of work you do.
                    This helps us match you with clients who need your unique expertise.
                </div>
                <div className="pl-10 pt-10 sm:pl-36 ">Service</div>
                <div className="pr-10 pl-10 p-2 sm:pl-36">
                    <Select onValueChange={(eve) => setSelectedValue(eve)}>
                        <SelectTrigger className="w-[700px] border-2 border-gray-300">
                            <SelectValue placeholder="Select your service" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {services.map((service) => (
                                    <SelectItem value={service}>{service}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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

export default Details_7;
