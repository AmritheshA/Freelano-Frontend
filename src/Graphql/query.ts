import { gql } from "@apollo/client"

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
}`;