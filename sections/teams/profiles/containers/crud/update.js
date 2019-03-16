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
import { UPDATE_TEAM } from '../../../../../api/graphql'
// Layout
import TeamUpdate from '../../layouts/crud/update'

export default function TeamUpdateContainer() {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Close dialog
    function closeDialog() {
        dispatch(handleClick('dialog', 'teamUpdate', false))
    }
    // Handle update undo
    const handleTeamUpdateUndo = async (updateTeam) => {
        // Get previous team values
        const { id, status, name, mobile } = state.selected.team
        // Update team to previous values
        try {
            await updateTeam({ variables: { id, status, name, mobile } })
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
    const handleTeamUpdate = async (event, updateTeam) => {
        event.preventDefault()
        // Close dialog
        closeDialog()
        // Get form values
        const id = state.selected.team.id
        const form = event.target
        const formData = new window.FormData(form)
        const status = formData.get('status')
        const name = formData.get('name')
        const mobile = formData.get('mobile')
        // Update team
        try {
            await updateTeam({ variables: { id, status, name, mobile } })
                .then(() => {
                    dispatch(openSnackbar(
                        true,
                        'success',
                        'Team Updated',
                        () => handleTeamUpdateUndo(updateTeam),
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
    return (
        <Mutation
            mutation={UPDATE_TEAM}
        >
            {(updateTeam, { data, loading, error }) => (
                <TeamUpdate
                    dialogState={state.dialog.teamUpdate}
                    closeDialog={closeDialog}
                    onSubmit={(event) => handleTeamUpdate(event, updateTeam)}
                    team={state.selected.team}
                />
            )}
        </Mutation>
    )
}
