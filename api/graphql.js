import gql from 'graphql-tag'
//
// ::::::::::::::::::::::
// Users & Authentication
// ::::::::::::::::::::::
export const GET_ME = gql`
    {
        me {
            id
            username
            email
            role
        }
    }
`
export const REFRESH_ACCESS_TOKEN = gql`
    mutation refreshAccessToken($refreshToken: String!) {
        refreshAccessToken(refreshToken: $refreshToken) {
            token
            refreshToken
        }
    }
`
export const USER_SIGN_IN = gql`
    mutation signIn($login: String!, $password: String!, $remember: Boolean!) {
        signIn(login: $login, password: $password, remember: $remember) {
            token
            refreshToken
        }
    }
`
export const USER_FORGOT_PASSWORD = gql`
    query userForgotPassword($login: String!) {
        userForgotPassword(login: $login)
    }
`
export const USER_VALIDATE_RESET_PASSWORD_TOKEN = gql`
    query userValidateResetPasswordToken($token: String!) {
        userValidateResetPasswordToken(token: $token)
    }
`
//
// ::::::::::::::::::::::
// Teams
// ::::::::::::::::::::::
//
// Create
export const CREATE_TEAM = gql`
    mutation createTeam($status: String!, $name: String!, $mobile: String) {
        createTeam(status: $status, name: $name, mobile: $mobile) {
            id
            status
            name
            mobile
        }
    }
`
export const CREATE_TEAM_SUBSCRIPTION = gql`
    subscription createTeamSubscription{
        teamCreated {            
            id
            status                
            name
            mobile
        }
    }
`

// Read
export const LIST_ALL_TEAMS = gql`
    {
        teams {
            id
            status
            name
            mobile
        }
    }
`

// Update
export const UPDATE_TEAM = gql`
    mutation updateTeam($id: ID!, $status: String, $name: String, $mobile: String) {
        updateTeam(id: $id, status: $status, name: $name, mobile: $mobile) {
            id
            status
            name
            mobile
        }
    }
`
export const UPDATE_TEAM_SUBSCRIPTION = gql`
    subscription updateTeamSubscription{
        teamUpdated {            
            id
            status                
            name
            mobile
        }
    }
`

// Delete
export const DELETE_TEAM = gql`
    mutation deleteTeam($id: ID!) {
        deleteTeam(id: $id)
    }
`
export const DELETE_TEAM_SUBSCRIPTION = gql`
    subscription deleteTeamSubscription {
        teamDeleted {           
            id
        }
    }
`