import React from 'react'
// MUI components
import { makeStyles } from '@material-ui/styles'
import Table from '@material-ui/core/Table'
import Toolbar from '@material-ui/core/Toolbar'
import Fab from '@material-ui/core/Fab'
// Custom components
import SearchBar from '../../../../components/SearchBar'
import TableTitle from '../containers/tableTitle'
import TableHead from '../containers/tableHead'
// CRUD sections
import TeamCreate from '../containers/crud/create'
import TeamRead from '../containers/crud/read'
import TeamUpdate from '../containers/crud/update'
import TeamDelete from '../containers/crud/delete'
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

export default function Index(props) {
    // Define styles
    const classes = moduleListSyles()
    return (
        <React.Fragment>
            <TableTitle teams={props.teams} />
            <Toolbar className={classes.searchBar}>
                <SearchBar />
            </Toolbar>
            <Table>
                <TableHead teams={props.teams} />
                <TeamRead
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
}