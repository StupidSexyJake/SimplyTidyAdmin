import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import {
    handleClick,
} from '../../../../state/actions'
// MUI components
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Checkbox from '@material-ui/core/Checkbox'

// Create table head array
const rows = [
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Team Name',
        sort: true
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status',
        sort: true
    },
    {
        id: 'mobile',
        align: 'left',
        disablePadding: false,
        label: 'Mobile',
        sort: true
    },
    {
        id: 'edit',
        align: 'center',
        disablePadding: false,
        label: 'Edit'
    },
    {
        id: 'remove',
        align: 'center',
        disablePadding: false,
        label: 'Remove'
    },
]

export default function MyTableHead(props) {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Define variables
    const checkboxIndeterminate = state.listTeams.selected.length > 0 && state.listTeams.selected.length < props.teams.length
    const checkboxChecked = state.listTeams.selected.length === props.teams.length
    // Handle select all click
    function handleSelectAllClick(event, data) {
        if (event.target.checked) {
            const newSelecteds = data.map(n => n)
            dispatch(handleClick('listTeams', 'selected', newSelecteds))
            return
        }
        dispatch(handleClick('listTeams', 'selected', []))
    }
    // Handle sorting
    function handleRequestSort(property) {
        const isDesc = state.listTeams.orderBy === property && state.listTeams.order === 'desc'
        dispatch(handleClick('listTeams', 'order', isDesc ? 'asc' : 'desc'))
        dispatch(handleClick('listTeams', 'orderBy', (property)))
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox'>
                    <Checkbox
                        color='primary'
                        indeterminate={state.listTeams.selected.length > 0 && state.listTeams.selected.length < props.teams.length}
                        checked={state.listTeams.selected.length === props.teams.length}
                        onChange={(event) => handleSelectAllClick(event, props.teams)}
                    />
                </TableCell>
                {rows.map(row => {
                    const sortLabel = `Sort by ${row.label}`
                    return (
                        <TableCell
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={state.listTeams.orderBy === row.id ? state.listTeams.order : false}
                        >
                            {row.sort ?
                                <Tooltip
                                    title={sortLabel}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={row.sort && state.listTeams.orderBy === row.id}
                                        direction={state.listTeams.order}
                                        onClick={() => handleRequestSort(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                                : row.label
                            }
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}