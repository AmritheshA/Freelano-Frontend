export default interface FreelancerInterface {
    freelancerId: string;
    freelancersAuthId: string;
    professionalRole: string;
    userName: string;
    email: string | null;
    description: string;
    service: string | null;
    profileImgUrl: string;
    coverImage:string;
    freelancerDetails: string;
    dateOfBirth: string;
    isProfileComplete: boolean;
    country: string;
    streetAddress: string | null;
    district: string;
    city: string;
    zipCode: string | null;
    mobileNumber: string | null;
    skills: string[];
    education: EducationData[];
    experience: ExperienceData[];
    languages: LanguageData[];
}

interface EducationData {
    school?: string | null;
    degree?: string | null;
    fieldOfStudy?: string | null;
    duration?: string[] | null;
    description?: string | null;
}

interface ExperienceData {
    workTitle?: string | null;
    company?: string | null;
    location?: string | null;
    country?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    description?: string | null;
}

interface LanguageData {
    language: string | null;
    proficiency: string;
}