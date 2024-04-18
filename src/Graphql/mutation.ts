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
