import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import { handleClick } from '../../../../state/actions'
// API    
import { Query } from 'react-apollo'
import { LIST_ALL_TEAMS } from '../../../../server/api/graphql'
// MUI components
import { makeStyles } from '@material-ui/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
// Sections
import TeamCreate from '../../../containers/teams/profiles/create'
import TeamUpdate from '../../../containers/teams/profiles/update'
import TeamDelete from '../../../containers/teams/profiles/delete'
// Icons
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

// Create ModuleList styles
const moduleListSyles = makeStyles((theme) => ({
    paper: {
        // width: '100%'
    },
    addBtn: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 3 * theme.spacing.unit
    }
}))
export default function TeamList() {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Define styles
    const classes = moduleListSyles()
    // Open TeamUpdate dialog
    function updateTeam(team) {
        // Open dialog
        dispatch(handleClick('dialog', 'teamUpdate', true))
        // Set selected team
        dispatch(handleClick('selected', 'team', team))
    }
    return (
        <Paper className={classes.paper}>
            <Toolbar>
                <Typography
                    variant="h6"
                    id="tableTitle"
                >
                    Teams
                </Typography>
            </Toolbar>
            <Table>
                <TableBody>
                    <Query query={LIST_ALL_TEAMS}>
                        {({ loading, error, data }) => {
                            if (error) return <div>Error</div>
                            if (loading) return (
                                <TableRow>
                                    <TableCell>
                                        LOADING TEAMS...
                                    </TableCell>
                                </TableRow>
                            )
                            return (
                                data.teams.map((team) => (
                                    <TableRow key={team.id}>
                                        <TableCell>
                                            {team.name}
                                        </TableCell>
                                        <TableCell>
                                            {team.mobile}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => updateTeam(team)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <TeamDelete teamId={team.id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }}
                    </Query>
                </TableBody>
            </Table>
            <Fab
                className={classes.addBtn}
                color='primary'
                onClick={() => dispatch(handleClick('dialog', 'teamCreate', true))}
            >
                <AddIcon />
            </Fab>
            <TeamCreate />
            <TeamUpdate />
        </Paper>
    )
}