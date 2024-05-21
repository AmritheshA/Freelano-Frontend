export default interface Project {
    projectId:string
    projectTitle:string
    category:string
    skills:[string]
    submittedVideoURL:string
    jobDescription:string
    projectDuration:string
    experienceLevel:string
    location:string
    budgetType:string
    prize:number
    applicantRequired:number | undefined
    enrolledApplicant:number | undefined
    clientId:string
    freelancerId:string
  }

  