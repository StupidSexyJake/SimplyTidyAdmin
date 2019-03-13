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
    CREATE_TEAM,
    DELETE_TEAM
} from '../../../../server/api/graphql'
// Layout
import TeamCreate from '../../../layout/teams/profiles/create'

export default function TeamUpdateContainer() {
    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Close dialog
    function closeDialog() {
        dispatch(handleClick('dialog', 'teamCreate', false))
    }

    // Handle create undo
    function handleTeamCreateUndo(id, client) {
        client.mutate({
            mutation: DELETE_TEAM,
            variables: { id },
        })
    }

    // Handle create
    const handleTeamCreate = async (event, createTeam) => {
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
                    () => handleTeamCreateUndo(res.data.createTeam.id, client),
                    true
                ))
            })
        } catch (error) { console.log(error) }
    }
    return (
        <Mutation
            mutation={CREATE_TEAM}
        >
            {(createTeam, { data, loading, error }) => (
                <TeamCreate
                    dialogState={state.dialog.teamCreate}
                    closeDialog={closeDialog}
                    onSubmit={event => handleTeamCreate(event, createTeam)}
                />
            )}
        </Mutation>
    )
}
