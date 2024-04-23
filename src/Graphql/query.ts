import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
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
`;

export const GET_RECOMMANDED_PROJECTS = gql`
  query RecommendedProject($freelancerId: String!) {
    recommendedProject(freelancerId: $freelancerId) {
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