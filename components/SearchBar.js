import React, { useContext } from 'react'
import classNames from 'classnames'
// State
import { Store } from '../state/store'
// Actions
import { handleClick } from '../state/actions'
// Material components
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
// Icons
import SearchIcon from '@material-ui/icons/Search'

const searchBarStyles = makeStyles((theme) => ({
    root: {
        padding: `${0.5 * theme.spacing.unit}px ${theme.spacing.unit}px`,
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    icon: {
        margin: 10,
        color: theme.palette.primary.dark
    },
}))

export default function SearchBar(props) {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Define styles
    const classes = searchBarStyles()
    // Update search term state
    function handleSearch(event) {
        dispatch(handleClick('listTeams', 'searchTerm', event.target.value))
    }
    return (
        <Paper elevation={1} className={classNames(classes.root, props.className)}>
            <SearchIcon className={classes.icon} />
            <InputBase
                className={classes.input}
                placeholder="Search Teams..."
                onChange={(event) => handleSearch(event)}
            />
        </Paper>
    )
}