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
    LIST_ALL_TEAMS,
    UPDATE_TEAM
} from '../../../../server/api/graphql'
// Layout
import TeamUpdate from '../../../layout/teams/profiles/update'

export default function TeamUpdateContainer() {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Close dialog
    function closeDialog() {
        dispatch(handleClick('dialog', 'teamUpdate', false))
    }
    // Handle update undo
    const handleTeamUpdateUndo = async (event, updateTeam) => {
        // Get previous values
        const team = state.selected.team,
            id = team.id,
            status = team.status,
            name = team.name,
            mobile = team.mobile
        // Update team to previous values
        try {
            await updateTeam({ variables: { id, status, name, mobile } })
        } catch (error) { console.log(error) }
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
                        () => handleTeamUpdateUndo(client),
                        true
                    ))
                })
        } catch (error) { console.log(error) }
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
