import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "../DatePickerWithRange";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import { format } from 'date-fns';
import { useContext, useEffect, useState } from "react";
import CommitedProject, { ProjectContext, Task } from "@/Context/ProjectContext/ProjectProvider ";
import { useMutation } from "@apollo/client";
import { EDIT_TASK } from "@/Graphql/mutation";


interface EditTaskModalProps {
    task: Task;
    projectId: string | undefined;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, projectId }) => {

    const [priority, setPriority] = useState(task.priority);
    const [title, setTitle] = useState(task.taskTitle);
    const [startDate, setStartDate] = useState(task.startDate);
    const [endDate, setEndDate] = useState(task.endDate);
    const [description, setDescription] = useState(task.description);
    const [editTask, { data }] = useMutation(EDIT_TASK);
    const { projects, setProjects } = useContext(ProjectContext);


    const handleDateChange = (date: DateRange | undefined) => {
        if (date) {
            if (date.from) {
                setStartDate(formatDate(date.from));
            }
            if (date.to) {
                setEndDate(formatDate(date.to));
            }
        }
    };

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        if (data) {
            if (data.editTask) {
                const projectIndex = projects.findIndex(
                    (project: CommitedProject) => project.commitedProjectsId === projectId
                );

                if (projectIndex !== -1) {
                    const updatedProject = {
                        ...projects[projectIndex],
                        tasks: data.editTask
                    };

                    const updatedProjects = [
                        ...projects.slice(0, projectIndex),
                        updatedProject,
                        ...projects.slice(projectIndex + 1),
                    ];

                    setProjects(updatedProjects);
                }
            }
        }

    }, [data]);

    const handleEditTask = () => {

        const variables = {
            projectsId: projectId,
            taskId: task.id,
            title,
            priority,
            startDate,
            endDate,
            description,
        }
        editTask({ variables })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='border-2 border-black'>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle>
                        Edit tasks</DialogTitle>
                    <DialogDescription>
                        Edit task to make your project more easy
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 py-4 ">
                    <div className=" flex flex-col w-[50%]">
                        <label className="text-black font-medium clientFont">Task Title</label>
                        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-slate-300 h-12 mt-2' placeholder="Authentication.." />
                    </div>
                    <div className=" flex flex-col w-[50%]">
                        <label className="text-black font-medium clientFont">Priority</label>
                        <Select defaultValue={priority} onValueChange={(value) => setPriority(value)} value={priority}>
                            <SelectTrigger className="w-full h-12 mt-2 border-2 border-gray-300 text-black">
                                <SelectValue className="text-black" placeholder="Select your priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="text-black">
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mt-5 flex">
                    <div className="flex flex-col w-[50%]">
                        <label className="text-black font-medium clientFont">Start Date - End Date</label>
                        <DatePickerWithRange startDate={startDate} endDate={endDate} onDateChange={handleDateChange} className='h-12' />
                    </div>
                </div>
                <div className="my-3 flex flex-col mt-5">
                    <Label className="text-black">Task Decription</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className=" border-2 mt-5" placeholder="Describe your work task" />
                </div>
                <DialogFooter>
                    <Button type="submit" className='border-2 border-slate-400 text-black hover:text-white' onClick={handleEditTask}>Edit Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditTaskModal