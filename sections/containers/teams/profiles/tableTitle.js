import React, { useContext } from 'react'
import classNames from 'classnames'
// State
import { Store } from '../../../../state/store'
// MUI components
import { makeStyles } from '@material-ui/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
// Icons
import FilterListIcon from '@material-ui/icons/FilterList'
import UpdateIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

// Create ModuleList styles
const tableTitleStyles = makeStyles((theme) => ({
    highlight: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
    },
    title: {
        flex: '0 0 auto',
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        flex: '0 0 auto',
    },
}))

export default function TableTitle() {
    // Get state contexts
    const { state } = useContext(Store)

    // Set variables
    const numSelected = state.listTeams.selected.length

    // Define styles
    const classes = tableTitleStyles()
    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 1,
            })}
        >
            <div className={classes.title}>
                {numSelected > 1 ? (
                    <Typography
                        color="inherit"
                        variant="subtitle1"
                    >
                        {numSelected} teams selected
                        </Typography>
                ) : (
                        <Typography
                            variant='h6'
                            id='tableTitle'
                        >
                            Teams
                            </Typography>
                    )
                }
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 1 ? (
                    <React.Fragment>
                        <Tooltip title="Edit teams">
                            <IconButton aria-label="Edit">
                                <UpdateIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Archive teams">
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )
                }
            </div>
        </Toolbar>
    )
}