import React from 'react'
// MUI components
import { makeStyles } from '@material-ui/styles'
import Table from '@material-ui/core/Table'
import Toolbar from '@material-ui/core/Toolbar'
import Fab from '@material-ui/core/Fab'
// Custom components
import SearchBar from '../../../../components/SearchBar'
// Sections
import TableTitle from '../../../containers/teams/profiles/tableTitle'
import TableHead from '../../../containers/teams/profiles/tableHead'
import ListAllTeamsData from '../../../containers/teams/profiles/listAllTeamsData'
import TeamCreate from '../../../containers/teams/profiles/create'
import TeamUpdate from '../../../containers/teams/profiles/update'
import TeamDelete from '../../../containers/teams/profiles/delete'
// Icons
import CreateIcon from '@material-ui/icons/Add'

// Create ModuleList styles
const moduleListSyles = makeStyles((theme) => ({
    addBtn: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 3 * theme.spacing.unit
    },
    searchBar: {
        width: '800px'
    },
}))

const ListAllTeams = React.memo(props => {
    // Define styles
    const classes = moduleListSyles()
    return (
        <React.Fragment>
            <TableTitle />
            <Toolbar className={classes.searchBar}>
                <SearchBar />
            </Toolbar>
            <Table>
                <TableHead
                    teams={props.teams}
                />
                <ListAllTeamsData
                    teams={props.teams}
                    subscribeToMore={props.subscribeToMore}
                />
            </Table>
            <Fab
                className={classes.addBtn}
                color='secondary'
                onClick={props.handleCreateTeamClick}
            >
                <CreateIcon />
            </Fab>
            <TeamCreate />
            <TeamUpdate />
            <TeamDelete />
        </React.Fragment>
    )
})

export default ListAllTeams