import { Progress } from '@/components/ui/progress';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FreelanoFooter from "../FreelanoFooter"
import CommitedProject, { ProjectContext } from '@/Context/ProjectContext/ProjectProvider ';
import FreelancerSideBar from '../Home/Freelancer/FreelancerSideBar';

const Project = () => {

    const { projects, loading } = useContext(ProjectContext);

    return (
        <FreelancerSideBar>
            <h1 className="text-2xl font-bold">Projects</h1>
            {loading ?
                <div className='p-20'>
                    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    <div className="h-4 bg-gray-300 rounded-full w-32 animate-pulse"></div>
                                </th>
                                <th className="px-6 py-3"></th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    <div className="h-4 bg-gray-300 rounded-full w-24 animate-pulse"></div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    <div className="h-4 bg-gray-300 rounded-full w-24 animate-pulse"></div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    <div className="h-4 bg-gray-300 rounded-full w-20 animate-pulse"></div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    <div className="h-4 bg-gray-300 rounded-full w-16 animate-pulse"></div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    <div className="h-4 bg-gray-300 rounded-full w-16 animate-pulse"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Array.from({ length: 5 }, (_, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-12 bg-gray-300 rounded-full w-full animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap"></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-300 rounded-full w-24 animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-4 bg-gray-300 rounded-full w-24 animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-3 bg-gray-300 rounded-full w-full animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"></div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="h-8 bg-gray-300 rounded-full w-24 animate-pulse"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : projects.length != 0 ?
                    <div className='p-20 min-h-[50%]'>
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Project
                                    </th>
                                    <th className="px-6 py-3"></th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Start Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        End Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Progression
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
                                {projects.map((project: CommitedProject, index: number) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3">
                                                <img
                                                    src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <div className="text-lg font-semibold text-gray-800">
                                                    {project.commitedProjectName}
                                                </div>
                                                <div className="text-sm font-medium text-gray-600">
                                                    {project.clientName}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap"></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                            {project.startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                            {project.endDate != null ? project.endDate : "Present"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Progress value={
                                                project?.tasks || project?.tasks?.length != 0
                                                    ? Math.abs((project.progression / project.tasks?.length) * 100)
                                                    : 0
                                            } className="w-full h-3 rounded-full bg-gray-200" />

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-md  font-semibold rounded-full bg-green-100 text-green-800">
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-150 ease-in-out">
                                                <Link
                                                    to={`/projects/addTasks/${project.commitedProjectsId}`}
                                                    state={project}
                                                >
                                                    View Tasks
                                                </Link>
                                            </button>
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
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center bg-background rounded-lg p-8">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/014/814/192/original/creatively-designed-flat-conceptual-icon-of-no-task-vector.jpg"
                            alt="No Tasks Found"
                            className="mb-4 h-[400px]"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Tasks Found</h2>
                        <p className="text-gray-600 text-center">
                            There are no project to display at the moment.
                        </p>
                    </div>
            }
            <div className="mt-32 mb-0">
                <FreelanoFooter />
            </div>
        </FreelancerSideBar>
    )
}
export default Project;