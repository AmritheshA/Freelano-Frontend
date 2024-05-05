import { GET_COMMITED_PROJECT } from '@/Graphql/query';
import { RootState } from '@/Redux/Store';
import { useQuery } from '@apollo/client';
import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


export default interface CommitedProject {
    commitedProjectsId: String
    commitedFreelancerId: String
    freelancerResume: String
    commitedProjectIds: String
    commitedProjectName: String
    progression: number
    status: String
    clientName: String
    startDate: String
    endDate: null | string;
    tasks: Task[]
}
export interface Task {
    id: string;
    taskTitle: string;
    startDate: string;
    endDate: string;
    status: string;
    description: string;
    priority: string;
}

interface ProjectContextValue {
    projects: CommitedProject[];
    setProjects: React.Dispatch<React.SetStateAction<CommitedProject[]>>;
    loading:boolean
}

export const ProjectContext = createContext<ProjectContextValue>({
    projects: [],
    setProjects: () => { },
    loading:false
});

interface ProjectProviderProps {
    children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    const [projects, setProjects] = useState<CommitedProject[]>([]);

    const user = useSelector((state: RootState) => state.userDetails.user);
    const { data , loading} = useQuery(GET_COMMITED_PROJECT, { variables: { freelancerId: user?.userId } });


    useEffect(() => {

        if (data && data.getCommitedProject) {
            setProjects(data.getCommitedProject);
        }

    }, [data])

    return (
        <ProjectContext.Provider value={{ projects, setProjects, loading }}>
            {children}
        </ProjectContext.Provider>
    );
};