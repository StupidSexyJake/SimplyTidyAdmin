import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import {
    handleClick,
    openSnackbar
} from '../../../../state/actions'
// API
import { Mutation } from 'react-apollo'
import {
    DELETE_TEAM,
    UPDATE_TEAM,
    CREATE_TEAM
} from '../../../../server/api/graphql'
// Layout
import TeamDelete from '../../../layout/teams/profiles/delete'

export default function TeamDeleteContainer() {

    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Close dialog
    function closeDialog() {
        dispatch(handleClick('dialog', 'teamDelete', false))
        dispatch(handleClick('checkbox', 'teamDelete', false))
    }

    // Handle archive checkbox
    function handleCheckbox(event) {
        dispatch(handleClick('checkbox', 'teamDelete', event.target.checked))
    }

    // Handle delete undo
    function handleTeamDeleteUndo(client) {
        // Get previous values
        const team = state.selected.team,
            id = team.id,
            status = team.status,
            name = team.name,
            mobile = team.mobile
        // Update team to previous values
        client.mutate({
            mutation: CREATE_TEAM,
            variables: {
                id,
                status,
                name,
                mobile
            },
        })
    }

    // Handle delete
    const handleTeamDelete = async (id, deleteTeam) => {
        // Close dialog
        closeDialog()
        // Delete team
        try {
            await deleteTeam({ variables: { id } })
                .then(() => {
                    dispatch(openSnackbar(
                        true,
                        'success',
                        'Team Deleted',
                        () => handleTeamDeleteUndo(deleteTeam),
                        true
                    ))
                })
        } catch (error) { console.log(error) }
        // Remove team from selected teams if exists
        if (state.listTeams.selected.findIndex((e) => e.id === id) !== -1) {
            const selectedTeamsArray = state.listTeams.selected
            selectedTeamsArray.splice(state.listTeams.selected.findIndex((e) => e.id === id), 1)
            dispatch(handleClick('listTeams', 'selected', selectedTeamsArray))
        }
    }

    // Handle update
    function handleTeamUpdateStatus(id, status, client) {
        // Close dialog
        closeDialog()
        // Create snackbar message
        let snackbarMessage
        switch (status) {
            case 'Archived':
                snackbarMessage = 'Team Archived'
                break
            default:
                snackbarMessage = 'Team Status Updated'
                break
        }
        // Update team
        client.mutate({
            mutation: UPDATE_TEAM,
            variables: {
                id,
                status
            },
        })
            .then((res) => {
                dispatch(openSnackbar(
                    true,
                    'success',
                    snackbarMessage,
                    () => handleTeamUpdateStatus(res.data.updateTeam.id, state.selected.team.status, client),
                    true
                ))
                dispatch(handleClick('checkbox', 'teamDelete', false))
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

    // Determine whether to delete or archive team
    function selectDeleteOrArchive(deleteTeam) {
        state.checkbox.teamDelete ?
            handleTeamDelete(state.selected.team.id, deleteTeam)
            :
            handleTeamUpdateStatus(state.selected.team.id, 'Archived', deleteTeam)
    }

    return (
        <Mutation
            mutation={DELETE_TEAM}
        >
            {(deleteTeam, { data, loading, error }) => (
                <TeamDelete
                    dialogState={state.dialog.teamDelete}
                    closeDialog={closeDialog}
                    onSubmit={() => selectDeleteOrArchive(deleteTeam)}
                    checkbox={
                        {
                            checked: state.checkbox.teamDelete,
                            onChange: (event) => handleCheckbox(event)
                        }
                    }
                    team={state.selected.team}
                />
            )}
        </Mutation>
    )
}
