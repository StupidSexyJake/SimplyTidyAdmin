import React, { useContext } from 'react'
// State
import { Store } from '../../../../../state/store'
// Actions
import {
    handleClick,
} from '../../../../../state/actions'
// API    
import {
    CREATE_TEAM_SUBSCRIPTION,
    UPDATE_TEAM_SUBSCRIPTION,
    DELETE_TEAM_SUBSCRIPTION,
} from '../../../../../api/graphql'
// Functions
import {
    stableSort,
    getSorting
} from '../../../../../utils/functions'
// Layout
import TeamRead from '../../layouts/crud/read'


export default function ListAllTeamsData(props) {

    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Subscribe to teams created, updated, and deleted
    function subscribeToMoreTeams() {
        // Team created
        props.subscribeToMore({
            document: CREATE_TEAM_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newTeam = subscriptionData.data.teamCreated
                const exists = prev.teams.find(({ id }) => id === newTeam.id)
                if (exists) return prev
                return Object.assign({}, prev, {
                    teams: [newTeam, ...prev.teams]
                })
            },
        })
        // Team updated: Not sure why prev already includes the subscribtionData.data.teamUpdated data, but it works...
        props.subscribeToMore({
            document: UPDATE_TEAM_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                return Object.assign({}, prev, {
                    teams: prev.teams
                })
            },
        })
        // Team deleted
        props.subscribeToMore({
            document: DELETE_TEAM_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const teamDeleted = subscriptionData.data.teamDeleted
                const exists = prev.teams.findIndex((e) => e.id === teamDeleted.id) !== -1
                if (!exists) return prev
                const newTeamsArray = Object.assign({}, prev, {
                    teams: prev.teams.splice(prev.teams.findIndex((e) => e.id === teamDeleted.id), 1)
                })
                if (newTeamsArray.teams.findIndex((e) => e.id === teamDeleted.id) !== -1) return prev
                return newTeamsArray
            },
        })
    }

    // Sort teams
    const sortTeams = (teams) => stableSort(teams, getSorting(state.listTeams.order, state.listTeams.orderBy))
        .filter(currentRow =>
            currentRow.name.toLowerCase().includes(state.listTeams.searchTerm.toLowerCase())
            ||
            currentRow.mobile.toLowerCase().includes(state.listTeams.searchTerm.toLowerCase())
        )

    // Handle single team select
    function handleSelect(team) {
        const selectedIndex = state.listTeams.selected.map(selectedTeam => selectedTeam.id).indexOf(team.id)
        let newSelected = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(state.listTeams.selected, team)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(state.listTeams.selected.slice(1))
        } else if (selectedIndex === state.listTeams.selected.length - 1) {
            newSelected = newSelected.concat(state.listTeams.selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                state.listTeams.selected.slice(0, selectedIndex),
                state.listTeams.selected.slice(selectedIndex + 1),
            )
        }
        dispatch(handleClick('listTeams', 'selected', newSelected))
    }

    // Check if team is selected
    const isSelected = id => state.listTeams.selected.map(team => team.id).indexOf(id) !== -1

    // Open TeamUpdate dialog
    function updateTeam(team) {
        // Open dialog
        dispatch(handleClick('dialog', 'teamUpdate', true))
        // Set selected team
        dispatch(handleClick('selected', 'team', team))
    }

    // Open TeamDelete dialog
    function deleteTeam(team) {
        // Open dialog
        dispatch(handleClick('dialog', 'teamDelete', true))
        // Set selected team
        dispatch(handleClick('selected', 'team', team))
    }
    return (
        <React.Fragment>
            <TeamRead
                handleSelect={handleSelect}
                updateTeam={updateTeam}
                deleteTeam={deleteTeam}
                teams={sortTeams(props.teams)}
                isSelected={isSelected}
                subscribeToMoreTeams={subscribeToMoreTeams}
            />
        </React.Fragment>
    )
}