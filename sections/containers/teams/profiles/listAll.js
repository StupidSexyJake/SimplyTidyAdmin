import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import { handleClick } from '../../../../state/actions'
// API    
import { Query } from 'react-apollo'
import {
    LIST_ALL_TEAMS,
} from '../../../../server/api/graphql'
// Layout
import ListAllTeams from '../../../layout/teams/profiles/listAll'

export default function ListAllTeamsContainer() {
    // Get state contexts
    const { dispatch } = useContext(Store)

    return (
        <Query query={LIST_ALL_TEAMS}>
            {({ loading, error, data, subscribeToMore }) => {
                if (error) return 'ERROR...'
                if (loading) return 'LOADING TEAMS...'
                return (
                    <ListAllTeams
                        teams={data.teams}
                        subscribeToMore={subscribeToMore}
                        handleCreateTeamClick={() => dispatch(handleClick('dialog', 'teamCreate', true))}
                    />
                )
            }}
        </Query>
    )
}