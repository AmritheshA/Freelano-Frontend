import { gql } from "@apollo/client";

<<<<<<< HEAD
export const GET_RECOMMANDED_PROJECTS = gql`
  query RecommendedProject($freelancerId: String!) {
    recommendedProject(freelancerId: $freelancerId) {
=======
export const GET_PROJECTS = gql`
  query GetAllProjects($page: Int) {
    getAllProjects(page: $page) {
>>>>>>> 5709ea7 (fix: some ui updates)
      projectId
      projectTitle
      projectPostedDate
      category
      skills
      jobDescription
      projectDuration
      experienceLevel
      location
      budgetType
      prize
      applicantRequired
      enrolledApplicant
      clientId
      freelancerId
    }
  }
<<<<<<< HEAD
`;



export const GET_FILTERED_PROJECTS = gql`
query GetFilteredProjects($experience: [String], $jobType: [String], $category: [String], $projectLength: [String], $clientLocation: [String],$page:Int) {
  filteredProjects(
    experience: $experience,
    jobType: $jobType,
    category: $category,
    projectLength: $projectLength,
    clientLocation: $clientLocation,
    page:$page
  ){
    projectId
    projectTitle
    projectPostedDate
    category
    skills
    jobDescription
    projectDuration
    experienceLevel
    location
    budgetType
    prize
    applicantRequired
    enrolledApplicant
    clientId
    freelancerId
  }
}
`

export const GET_CLIENTSIDE_PROJECTS = gql`
  query getPendingProject($clientId: String!,$status:String!,$markAsCompleted:Boolean){
    getPendingProject(clientId: $clientId,status: $status,markAsCompleted:$markAsCompleted){
      projectId
      projectTitle
      projectPostedDate
      category
      skills
      jobDescription
      projectDuration
      experienceLevel
      location
      budgetType
      prize
      applicantRequired
      enrolledApplicant
      clientId
      freelancerId
    }
  }
`

export const GET_COMMITED_PROJECT = gql`
  query GetCommitedProject($freelancerId: String!) {
  getCommitedProject(freelancerId: $freelancerId) {
    commitedProjectsId
    commitedFreelancerId
    commitedProjectIds
    commitedProjectName
    progression
    status
    startDate
    endDate
      tasks {
      id
      taskTitle
      priority
      startDate
      endDate
      status
      description
    }
  }
}
`;
=======
`;
>>>>>>> 5709ea7 (fix: some ui updates)
