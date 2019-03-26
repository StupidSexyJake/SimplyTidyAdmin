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
    CREATE_TEAM,
    DELETE_TEAM
} from '../../../../../api/graphql'
// Layout
import TeamCreate from '../../layouts/crud/create'

export default function TeamUpdateContainer() {
    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Close dialog
    function closeDialog() {
        dispatch(handleClick('dialog', 'teamCreate', false))
    }

    // Handle create undo
    const handleTeamCreateUndo = async (id, deleteTeam) => {
        try {
            await deleteTeam({ variables: { id } })
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

    // Handle create
    const handleTeamCreate = async (event, createTeam, deleteTeam) => {
        event.preventDefault()
        // Close dialog
        closeDialog()
        // Get form values
        const form = event.target
        const formData = new window.FormData(form)
        const status = formData.get('status')
        const name = formData.get('name')
        const mobile = formData.get('mobile')
        // Rest form
        form.reset()
        // Create team
        try {
            await createTeam({ variables: { status, name, mobile } })
                .then((res) => {
                    dispatch(openSnackbar(
                        true,
                        'success',
                        'Team Created',
                        () => handleTeamCreateUndo(res.data.createTeam.id, deleteTeam),
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
        <Mutation mutation={CREATE_TEAM}>
            {(createTeam, { data, loading, error }) => (
                <Mutation mutation={DELETE_TEAM}>
                    {(deleteTeam, { data, loading, error }) => (
                        <TeamCreate
                            dialogState={state.dialog.teamCreate}
                            closeDialog={closeDialog}
                            onSubmit={event => handleTeamCreate(event, createTeam, deleteTeam)}
                        />
                    )}
                </Mutation>
            )}
        </Mutation>
    )
}
