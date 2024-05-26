export default interface Client {
    clientId?: string;
    clientAuthId?: string;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    clientAddress?: string;
    clientCity?: string;
    clientState?: string;
    clientZip?: string;
    clientCountry?: string;
    profileImgUrl?: string;
    coverImage?:string;
    blocked?:string;
    projects?: string[];
    companies?: Company[];
}

interface Company {
    companyName: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone: string;
    companyWebsite: string;
    companyDescription: string;
}

interface IntentRequestObj {
    name: string;
    description?: string;
    email: string;
    amount: number;
    projectTitle: string;
    freelancerId: string;
    clientId: string;
    projectId: string;
    commitedProjectId: string;
    clientName: string
}

interface Transaction {
    transactionId: string;
    clientId: string;
    freelancerId: string;
    projectId: string;
    clientName: string;
    transactionAmount: number;
    transactionDate: Date;
    transactionCompletedDate: Date;
    commitedProjectId: string;
    transactionStatus: string;
}
