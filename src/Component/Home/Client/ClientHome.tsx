import {useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Modal1 from "../../Client/JobPostingModal/modal1";
import Modal2 from "../../Client/JobPostingModal/modal2";
import Modal3 from "../../Client/JobPostingModal/modal3";
import ClientSideBar from "./ClientSideBar";


export default function ClientHome() {

    const [activeModal, setActiveModal] = useState("modal1");

    const handleActiveModal = (value: string) => {
        setActiveModal(value);
    }

    return (
        <ClientSideBar>
            <div className="flex justify-center w-[75%] mt-20">
                <div className="flex justify-between w-full items-center ">
                    <h1 className="font-semibold text-2xl ">Your Workspace</h1>
                </div>
            </div>
            <div className="flex gap-5">
                <Dialog>
                    <DialogTrigger asChild >
                        <div className="flex flex-col cursor-pointer mt-10 shadow-sm px-9 py-20 text-lg font-medium leading-7 text-center bg-white rounded-2xl border-2  border-solid  border-gray-400 border-opacity-50 max-w-[226px] text-black text-opacity-90">
                            <svg className="self-center mt-2.5 w-7 aspect-square" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M8,16V4h12 l0.002,12H8z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zM15 6L13 6 13 9 10 9 10 11 13 11 13 14 15 14 15 11 18 11 18 9 15 9z"></path></svg>
                            <div className="mt-5 freelancerFont font-semibold">Start you next post</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="min-w-[35%]">
                        <DialogHeader>
                            <DialogTitle className="text-gray-400 text-xl mt-5">Add Project</DialogTitle>
                            <DialogDescription>
                                {activeModal === 'modal1' && (
                                    <Modal1 setActive={handleActiveModal} />
                                )}
                                {activeModal === 'modal2' && (
                                    <Modal2 setActive={handleActiveModal} />
                                )}
                                {activeModal === 'modal3' && (
                                    <Modal3 setActive={handleActiveModal} />

                                )}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </ClientSideBar>
    );
}