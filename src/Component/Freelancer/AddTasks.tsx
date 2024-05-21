import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IoMdAdd } from 'react-icons/io';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Tooltip from '@mui/material/Tooltip';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '../Custom/DatePickerWithRange';
import { DateRange } from 'react-day-picker';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT_TASK, MARK_AS_COMPLETE, REMOVE_COMMITED_PROJECT_TASK, STATUS_CHANGE } from '@/Graphql/mutation';
import CommitedProject, { ProjectContext, Task } from '@/Context/ProjectContext/ProjectProvider ';
import EditTaskModal from '../Custom/Modal/editTaskModal';
import FreelancerSideBar from '../Home/Freelancer/FreelancerSideBar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';
import { Alert } from '@mui/material';
import { CheckIcon } from 'lucide-react';


const AddTasks = () => {

    const [priority, setPriority] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const user = useSelector((state: RootState) => state.userDetails.user);

    const { projects, setProjects } = useContext(ProjectContext);

    const [commitedProject, setCommitedProject] = useState<CommitedProject>();
    const [createTask, { data: createdTask }] = useMutation(CREATE_PROJECT_TASK);
    const [removeTaskMethod] = useMutation(REMOVE_COMMITED_PROJECT_TASK);
    const [markAsCompleted] = useMutation(MARK_AS_COMPLETE, { variables: { freelancerId: projects } });
    const [changeProgression, { data: changedStatus }] = useMutation(STATUS_CHANGE);
    const [showAlert, setShowAlert] = useState<boolean>();
    const { commitedProjectId } = useParams()



    const modalRef = useRef<HTMLDialogElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };




    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ml_default");

            const headers = {
                'X-Unique-Upload-Id': `${Date.now()}-${Math.random()}`,
            };

            try {
                setShowAlert(true);

                setInterval(() => {
                    setShowAlert(false);
                }, 5000);

                modalRef.current?.close();

                const response = await axios.post("https://api.cloudinary.com/v1_1/duktwv58k/video/upload", formData, {
                    headers,
                });

                markAsCompleted({ variables: { freelancerId: user.userId, projectId: commitedProjectId, videoURL: response.data?.secure_url } })


            } catch (error) {
                console.error("Error uploading file to Cloudinary:", error);
            }

        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const droppedFile = droppedFiles[0];
            setFile(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
        }
    };

    useEffect(() => {
        if (projects.length > 0) {
            projects.map((project: CommitedProject) => {
                if (project.commitedProjectsId == commitedProjectId) {
                    setCommitedProject(project);
                }
            })
        }

    }, [projects]);


    useEffect(() => {
        if (createdTask) {

            const projectIndex = projects.findIndex(
                (project: CommitedProject) => project.commitedProjectsId === commitedProjectId
            );

            if (projectIndex !== -1) {
                const updatedProject = {
                    ...projects[projectIndex],
                    tasks: [...projects[projectIndex].tasks, createdTask.createProjectTask],
                };

                const updatedProjects = [
                    ...projects.slice(0, projectIndex),
                    updatedProject,
                    ...projects.slice(projectIndex + 1),
                ];
                setProjects(updatedProjects);
            }
        }

    }, [createdTask]);

    useEffect(() => {
        if (changedStatus) {
            const projectIndex = projects.findIndex(
                (project: CommitedProject) => project.commitedProjectsId === commitedProjectId
            );

            if (projectIndex !== -1) {
                const updatedProject = {
                    ...projects[projectIndex],
                    tasks: projects[projectIndex].tasks.map((task) =>
                        task.id === changedStatus.taskId
                            ? { ...task, status: changedStatus.statusChange }
                            : task
                    ),
                };

                const updatedProjects = [
                    ...projects.slice(0, projectIndex),
                    updatedProject,
                    ...projects.slice(projectIndex + 1),
                ];

                setProjects(updatedProjects);
            }
        }
    }, [changedStatus]);


    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

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

    const handlePostButtonClick = () => {
        const variables = {
            projectId: commitedProjectId,
            title,
            priority,
            startDate,
            endDate,
            description
        }
        createTask({ variables })

        setTitle("");
        setPriority("");
        setStartDate("");
        setEndDate("")
        setDescription("");

    };

    const handleRemoveTask = (commitedId: string) => {
        const variables = {
            commitedId: commitedId,
            commitedProjectId: commitedProject?.commitedProjectsId

        }
        removeTaskMethod({ variables })
        // if (removeTask) {
        //     setCommitedProjects(removeTask.removeCommitedProjectTask);
        // }
    }

    const handleStatusChange = (value: string, taskId: string) => {

        const variables = {
            commitedProductId: commitedProject?.commitedProjectsId,
            taskId,
            value
        }

        changeProgression({ variables })

    }

    return (
        <FreelancerSideBar>
            <h1 className="text-2xl font-bold mb-8">Tasks</h1>
            {showAlert && (
                <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                >
                    It takes time to complete this process and approval of client.
                </Alert>
            )}
            <div className='p-20'>
                <div className='flex justify-end mb-4 gap-6'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="submit" className='border-2 border-slate-400 text-black hover:text-white'>Mark As Completed</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure about Marking this project as completed , after this client review your work and continue the payment process.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={openModal} className='border-2 border-slate-400 text-black hover:text-white'>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                                <div className='flex justify-center items-center gap-2'>
                                    <IoMdAdd />New Task
                                </div>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[750px]">
                            <DialogHeader>
                                <DialogTitle>Add tasks</DialogTitle>
                                <DialogDescription>
                                    Add task to make your project more easy
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-4 py-4 ">
                                <div className=" flex flex-col w-[50%]">
                                    <label className="text-black font-medium clientFont">Task Title</label>
                                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-slate-300 h-12 mt-2' placeholder="Authentication.." />
                                </div>
                                <div className=" flex flex-col w-[50%]">
                                    <label className="text-black font-medium clientFont">Priority</label>
                                    <Select onValueChange={(value) => setPriority(value)} value={priority}>
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
                                    <DatePickerWithRange onDateChange={handleDateChange} className='h-12' />
                                </div>
                            </div>
                            <div className="my-3 flex flex-col mt-5">
                                <Label className="text-black">Task Decription</Label>
                                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className=" border-2 mt-5" placeholder="Describe your work task" />

                            </div>
                            <DialogFooter>
                                <Button type="submit" className='border-2 border-slate-400 text-black hover:text-white' onClick={handlePostButtonClick}>Add Task</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <dialog ref={modalRef} id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <form onSubmit={(eve) => { handleSubmit(eve) }}>
                                <div className="mb-4">
                                    <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
                                        Upload Your Video
                                    </label>
                                    <div
                                        className={`border-2 ${preview ? 'border-none' : "border-dashed"} border-gray-300 rounded-md h-64 flex justify-center items-center`}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleDrop}
                                    >
                                        <div className="text-center">
                                            {preview ? (
                                                <div>
                                                    <video src={preview} controls className="max-h-62 mx-auto"></video>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 mb-2">Click or drag and drop your video file here</p>
                                            )}
                                        </div>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        ref={fileInputRef}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!file}
                                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${!file
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                        }`}
                                >
                                    Complete
                                </button>
                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>Close</button>
                        </form>
                    </dialog>
                </div>
                {commitedProject?.tasks?.length === 0 ?
                    <div className="flex flex-col items-center justify-center bg-background rounded-lg p-8">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/014/814/192/original/creatively-designed-flat-conceptual-icon-of-no-task-vector.jpg"
                            alt="No Tasks Found"
                            className="mb-4 h-[400px]"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Tasks Found</h2>
                        <p className="text-gray-600 text-center">
                            There are no tasks to display at the moment.
                        </p>
                    </div>
                    : <>
                        <table className="w-full  border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Task Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Start Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        End Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {commitedProject?.tasks?.map((project: Task, index: number) => (
                                    <tr key={index} className={`${project.status === 'Completed' ? "bg-slate-100" : "bg-background"}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Tooltip className='font-bold ' title={`${project.description}`} followCursor>
                                                <div>
                                                    <div className="text-lg font-semibold text-gray-800">
                                                        {project.taskTitle}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-600">
                                                        Priority: {project.priority}
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                            {project.startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                            {project.endDate == null ? "Present" : project.endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <span className='px-2 inline-flex items-center gap-2 text-md cursor-pointer font-semibold rounded-full bg-green-100"text-green-800'>
                                                        {project.status}
                                                    </span>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-40 font-bold text-orange-500 bg-slate-200">
                                                    <DropdownMenuCheckboxItem
                                                        className='m-2'
                                                        onCheckedChange={() => handleStatusChange("Completed", project.id)}>
                                                        Completed
                                                    </DropdownMenuCheckboxItem>
                                                    <DropdownMenuCheckboxItem
                                                        className='m-1'
                                                        onCheckedChange={() => handleStatusChange("In progress", project.id)} >
                                                        In Progress
                                                    </DropdownMenuCheckboxItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">

                                                <EditTaskModal task={project} projectId={commitedProjectId} />

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" className='border-2 border-black'>Remove</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete your task
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className='border-2 border-black'>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleRemoveTask(project.id)} className='bg-gray-700'>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex justify-end items-center mt-5'>
                            <Stack spacing={2}>
                                <Pagination count={10} color="primary" />
                            </Stack>
                        </div>
                    </>
                }
            </div>
        </FreelancerSideBar>
    )
}
export default AddTasks;
