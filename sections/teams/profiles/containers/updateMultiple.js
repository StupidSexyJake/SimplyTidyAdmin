import React, { useContext } from 'react'
// State
import { Store } from '../../../../../state/store'
// Actions
import {
    handleClick,
    openSnackbar
} from '../../../../../state/actions'
// API
import { ApolloConsumer } from 'react-apollo'
import {
    LIST_ALL_TEAMS,
    UPDATE_TEAM
} from '../../../../../server/api/graphql'
// Functions
import {
    stableSort,
    getSorting
} from '../../../../../utils/functions'
// Layout
import TeamUpdate from '../layouts/update'

export default function TeamUpdateContainer() {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Close dialog
    function closeDialog() {
        dispatch(handleClick('dialog', 'teamUpdate', false))
    }
    // Handle update undo
    function handleTeamsUpdateUndo(client) {
        // Get previous values
        const team = state.selected.team,
            id = team.id,
            status = team.status
        // Update team to previous values
        client.mutate({
            mutation: UPDATE_TEAM,
            variables: {
                ids,
                status,
            },
            update: (cache) => {
                const data = cache.readQuery({
                    query: LIST_ALL_TEAMS,
                })
                cache.writeQuery({
                    query: LIST_ALL_TEAMS,
                    data: {
                        ...data,
                        teams: stableSort(data.teams, getSorting(state.listTeams.order, state.listTeams.orderBy))
                    },
                })
            }
        })
    }
    // Handle update
    function handleTeamsUpdate(event, client) {
        event.preventDefault()
        // Close dialog
        closeDialog()
        // Get form values
        const form = event.target,
            formData = new window.FormData(form),
            status = formData.get('status'),
            ids = state.listTeams.selected.map(selectedTeam => selectedTeam.id)
        // Update team
        client.mutate({
            mutation: UPDATE_TEAM,
            variables: {
                ids,
                status,
            },
            update: (cache) => {
                const data = cache.readQuery({
                    query: LIST_ALL_TEAMS,
                })
                cache.writeQuery({
                    query: LIST_ALL_TEAMS,
                    data: {
                        ...data,
                        teams: stableSort(data.teams, getSorting(state.listTeams.order, state.listTeams.orderBy))
                    },
                })
            }
        })
            .then(() => {
                dispatch(openSnackbar(
                    true,
                    'success',
                    'Teams Updated',
                    () => handleTeamsUpdateUndo(client),
                    true
                ))
            })
            .catch((err) => {
                dispatch(openSnackbar(
                    true,
                    'error',
                    err.toString(),
                    '',
                    false
                ))
            })
    }
    return (
        <ApolloConsumer>
            {client => (
                <TeamUpdate
                    dialogState={state.dialog.teamUpdateMultiple}
                    closeDialog={closeDialog}
                    onSubmit={(event) => handleTeamsUpdate(event, state.listTeams.selected, client)}
                    teams={state.listTeams.selected}
                />
            )}
        </ApolloConsumer>
    )
}
