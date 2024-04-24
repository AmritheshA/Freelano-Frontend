import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($projectTitle: String!,$category: String!,$skills: String,$jobDescription: String!,$projectDuration: String!,$experienceLevel: String!,$location: String!,$budgetType: String!,$prize: Float!,$email:String!) {
    createProject(
      projectTitle: $projectTitle
      category: $category 
      skills: $skills
      jobDescription: $jobDescription
      projectDuration: $projectDuration
      experienceLevel: $experienceLevel
      location: $location
      budgetType: $budgetType
      prize: $prize
      email:$email
    ) {
      projectTitle
      
    }
  }
`;
export const APPLY_JOB = gql`
  mutation ApplyJob($commitedProjectId: String!, $commitedFreelancerId: String!,$resume:String!) {
    applyJob(commitedProjectId: $commitedProjectId, commitedFreelancerId: $commitedFreelancerId,resume:$resume)
  }
`;