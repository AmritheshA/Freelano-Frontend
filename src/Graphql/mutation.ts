import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($projectTitle: String!,$category: String!,$skills: String,$jobDescription: String!,$projectDuration: String!,$experienceLevel: String!,$location: String!,$budgetType: String!,$prize: Float!,$email:String!,$clientId:String!) {
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
      clientId:$clientId
    ) {
      projectTitle
      
    }
  }
`;

export const GET_PROJECTS = gql`
  mutation GetProjects($projectIds: [String!]) {
    getProjects(projectIds: $projectIds) {
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

export const APPLY_JOB = gql`
  mutation ApplyJob($commitedProjectId: String!, $commitedFreelancerId: String!,$resume:String!,$clientId:String!) {
    applyJob(commitedProjectId: $commitedProjectId, commitedFreelancerId: $commitedFreelancerId,resume:$resume,clientId:$clientId)
  }
`;

export const CREATE_PROJECT_TASK = gql`
  mutation CreateProjectTask(
    $projectId: String!
    $title: String!
    $priority: String!
    $startDate: String!
    $endDate: String!
    $description: String!
  ) {
    createProjectTask(
      projectId: $projectId
      title: $title
      priority: $priority
      startDate: $startDate
      endDate: $endDate
      description: $description
    ) {
      id
      taskTitle
      priority
      startDate 
      endDate
      status
      description
    }
  }
`;

export const GET_COMMITED_PROJECT_TASK = gql`
mutation GetCommitedProjectTask($commitedProjectsId: String!) {
    getCommitedProjectTask(commitedProjectsId:$commitedProjectsId) {
      id
      taskTitle
      priority
      startDate 
      endDate
      status
      description
    }
  }
`;

export const REMOVE_COMMITED_PROJECT_TASK = gql`
  mutation RemoveCommitedProjectTask($commitedId: String!, $commitedProjectId: String!) {
    removeCommitedProjectTask(commitedId: $commitedId, commitedProjectId: $commitedProjectId) {
      id
      taskTitle
      priority
      startDate 
      endDate
      status
      description
    }
  }
`;

export const STATUS_CHANGE = gql`
mutation statusChange($commitedProductId: String!,$taskId:String!, $value: String!) {
  statusChange(commitedProductId: $commitedProductId, taskId: $taskId,value: $value)
}
`

export const EDIT_TASK = gql`
  mutation editTask(
    $projectsId: String!
    $taskId: String!
    $title: String
    $priority: String
    $startDate: String
    $endDate: String
    $description: String
  ) {
    editTask(
      projectsId: $projectsId
      taskId: $taskId
      title: $title
      priority: $priority
      startDate: $startDate
      endDate: $endDate
      description: $description
    ) {
      id
      taskTitle
      priority
      status
      startDate
      endDate
      description
    }
  }
`;


export const MARK_AS_COMPLETE = gql`
mutation MarkAsCompleted($freelancerId:String!,$projectId:String!,$videoURL:String!){
    markAsCompleted(freelancerId:$freelancerId,projectId:$projectId,videoURL:$videoURL)
  }
`