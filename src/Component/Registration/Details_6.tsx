import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import { Textarea } from "@/components/ui/textarea";


interface ChildComponent1Props {
    setActive: (componentName: string) => void;
}

const Details_6: React.FC<ChildComponent1Props> = ({ setActive }) => {

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [count, setCount] = useState<number>(0);


    const handleNextClick = () => {
    
        if (count >= 60) {
            localStorage.setItem("description",JSON.stringify(description));
            setActive("component7")
        } else {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 1500);
        }

    }
    const handleDescribeChange = (eve: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = eve.target.value;
        setCount(value.trim().split(/\s+/).length);
        console.log("count"+count);

        console.log("length"+value.split(" ").length);

        if (count < 60) {
            setDescription(value)
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
                    Max 60 words
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
                <div className="p-10 sm:pl-36 font-bold text-xl">6/8</div>
                <div className="pr-10 pl-10 sm:max-w-[1200px]  freelancerFont sm:pl-36 pb-0 font-semibold text-xl sm:text-4xl">
                    Great. Now write a bio to tell the world about yourself
                </div>
                <div className="pr-10 pl-10 pt-2 sm:pl-36 freelancerFont sm:max-w-[1200px] font-semibold text-sm">
                    Help people get to know you at a glance. What work do you do best? Tell them clearly,
                    using paragraphs or bullet points. You can always edit later; just make sure you proofread now.
                </div>
                <div className="pl-10 pt-10 sm:pl-36 ">Describe yourself</div>
                <div className="pr-10 pl-10 p-2 sm:pl-36">
                    <Textarea value={description} placeholder="Type your message here." onChange={handleDescribeChange} className="w-[500px] sm:w-[800px] border-2 border-gray-300 focus:border-none min-h-[150px]" />
                    <div className="flex justify-between sm:w-[800px] mt-2">
                        <p className="text-sm justify-end text-muted-foreground">
                            {count}/60
                        </p>
                        {count < 50 ? <p className="freelancerFont font-extralight text-md">min 50 words</p> : "  "}
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

export default Details_6;
