import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import { handleClick } from '../../../../state/actions'
// API    
import { Query } from 'react-apollo'
import { LIST_ALL_TEAMS } from '../../../../api/graphql'
// Layout
import Index from '../layouts/'

export default function IndexContainer() {

    // Get state contexts
    const { dispatch } = useContext(Store)

    return (
        <Query query={LIST_ALL_TEAMS}>
            {({ loading, error, data, subscribeToMore }) => {
                if (error) return 'ERROR...'
                if (loading) return 'LOADING TEAMS...'
                return (
                    <Index
                        teams={data.teams}
                        subscribeToMore={subscribeToMore}
                        handleCreateTeamClick={() => dispatch(handleClick('dialog', 'teamCreate', true))}
                    />
                )
            }}
        </Query>
    )
}