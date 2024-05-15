import React, { createContext, useState, useEffect } from "react";
import FreelancerInterface from '../../Interfaces/FreelancerInterface';
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { toast } from "react-toastify";

interface FreelancerProviderProps {
    children: React.ReactNode;
}

interface FreelancerContextType {
    freelancerDetails: FreelancerInterface;
    setFreelancerDetails: React.Dispatch<React.SetStateAction<FreelancerInterface>>;
}

export const FreelancerContext = createContext<FreelancerContextType>({
    freelancerDetails: {
        freelancerId: '',
        freelancersAuthId: '',
        professionalRole: '',
        userName: '',
        email: '',
        description: '',
        service: null,
        profileImgUrl: '',
        coverImage: '',
        freelancerDetails: '',
        dateOfBirth: '',
        isProfileComplete: false,
        country: '',
        streetAddress: null,
        district: '',
        city: '',
        zipCode: null,
        mobileNumber: '',
        skills: [],
        education: [],
        experience: [],
        languages: [],
    },
    setFreelancerDetails: () => { }
});

export const FreelancerProvider: React.FC<FreelancerProviderProps> = ({ children }) => {
    const [freelancerDetails, setFreelancerDetails] = useState<FreelancerInterface>({
        freelancerId: '',
        freelancersAuthId: '',
        professionalRole: '',
        userName: '',
        email: '',
        description: '',
        service: null,
        profileImgUrl: '',
        coverImage: '',
        freelancerDetails: '',
        dateOfBirth: '',
        isProfileComplete: false,
        country: '',
        streetAddress: null,
        district: '',
        city: '',
        zipCode: null,
        mobileNumber: '',
        skills: [],
        education: [],
        experience: [],
        languages: [],
    });

    const user = useSelector((state: RootState) => state.userDetails.user);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await axiosInstance.get(`/api/v1/user/getAllInfo?userId=${user.userId}&role=${user.role}`);
                    if (response.status === 200) {
                        setFreelancerDetails(response.data);
                    }
                } catch (error: any) {
                    console.error("Error:", error);
                    if (error.response && error.response.data) {
                        toast.error(error.response.data);
                    } else {
                        toast.error("Something went wrong");
                    }
                }
            }
        };

        fetchData();
    }, [user]);

    return (
        <FreelancerContext.Provider value={{ freelancerDetails, setFreelancerDetails }}>
            {children}
        </FreelancerContext.Provider>
    );
};