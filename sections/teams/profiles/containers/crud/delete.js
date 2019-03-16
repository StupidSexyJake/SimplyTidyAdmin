import React, { useContext } from 'react'
// State
import { Store } from '../../../../../state/store'
// Actions
import {
    handleClick,
    openSnackbar
} from '../../../../../state/actions'
// API
import { Mutation } from 'react-apollo'
import {
    DELETE_TEAM,
    UPDATE_TEAM,
    CREATE_TEAM
} from '../../../../../api/graphql'
// Layout
import TeamDelete from '../../layouts/crud/delete'

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
    const handleTeamDeleteUndo = async (createTeam) => {
        // Get previous team values
        const { id, status, name, mobile } = state.selected.team
        // Update team to previous values
        try {
            await createTeam({ variables: { id, status, name, mobile } })
                .then(() => {
                    dispatch(openSnackbar(
                        true,
                        'success',
                        'Undone',
                        ''
                    ))
                })
        } catch (error) {
            dispatch(openSnackbar(
                true,
                'error',
                error.message,
                ''
            ))
        }
    }

    // Handle delete
    const handleTeamDelete = async (deleteTeam, createTeam) => {
        // Close dialog
        closeDialog()
        // Get team id
        const id = state.selected.team.id
        // Delete team
        try {
            await deleteTeam({ variables: { id } })
                .then(() => {
                    dispatch(openSnackbar(
                        true,
                        'success',
                        'Team Deleted',
                        () => handleTeamDeleteUndo(createTeam),
                        true
                    ))
                })
        } catch (error) {
            dispatch(openSnackbar(
                true,
                'error',
                error.message,
                ''
            ))
        }
        // Remove team from selected teams if exists
        if (state.listTeams.selected.findIndex((e) => e.id === id) !== -1) {
            const selectedTeamsArray = state.listTeams.selected
            selectedTeamsArray.splice(state.listTeams.selected.findIndex((e) => e.id === id), 1)
            dispatch(handleClick('listTeams', 'selected', selectedTeamsArray))
        }
    }

    // Handle update undo
    const handleTeamArchiveUndo = async (archiveTeam) => {
        // Close dialog
        closeDialog()
        // Get team id and previous status
        const id = state.selected.team.id,
            status = state.selected.team.status
        // Update team
        try {
            await archiveTeam({ variables: { id, status } })
                .then(() => {
                    dispatch(openSnackbar(
                        true,
                        'success',
                        'Undone',
                        ''
                    ))
                })
        } catch (error) {
            dispatch(openSnackbar(
                true,
                'error',
                error.message,
                ''
            ))
        }
    }

    // Handle update
    const handleTeamArchive = async (archiveTeam) => {
        // Close dialog
        closeDialog()
        // Get team id
        const id = state.selected.team.id
        // Update team
        try {
            await archiveTeam({ variables: { id, status: 'Archived' } })
                .then(() => {
                    dispatch(openSnackbar(
                        true,
                        'success',
                        'Team Archived',
                        () => handleTeamArchiveUndo(archiveTeam),
                        true
                    ))
                })
        } catch (error) {
            dispatch(openSnackbar(
                true,
                'error',
                error.message,
                ''
            ))
        }
    }

    // Determine whether to delete or archive team
    function selectDeleteOrArchive(deleteTeam, createTeam, updateTeam) {
        state.checkbox.teamDelete || state.selected.team.status === 'Archived' ?
            handleTeamDelete(deleteTeam, createTeam)
            :
            handleTeamArchive(updateTeam)
    }

    return (
        <Mutation
            mutation={DELETE_TEAM}
        >
            {(deleteTeam, { data, loading, error }) => (
                <Mutation
                    mutation={CREATE_TEAM}
                >
                    {(createTeam, { data, loading, error }) => (

                        <Mutation
                            mutation={UPDATE_TEAM}
                        >
                            {(updateTeam, { data, loading, error }) => (
                                <TeamDelete
                                    dialogState={state.dialog.teamDelete}
                                    closeDialog={closeDialog}
                                    onSubmit={() => selectDeleteOrArchive(deleteTeam, createTeam, updateTeam)}
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
                    )}
                </Mutation>
            )}
        </Mutation>
    )
}
