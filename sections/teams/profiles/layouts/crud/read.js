import React, { useEffect } from 'react'
// MUI components
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
// Icons
import UpdateIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

export default function ListAllTeamsData(props) {
    // Subscribe to data changes on component mount
    useEffect(() => {
        props.subscribeToMoreTeams()
    })
    return (
        <TableBody>
            {props.teams.map(team => {
                return (
                    <TableRow
                        hover
                        key={team.id}
                        tabIndex={-1}
                    >
                        <TableCell padding='checkbox'>
                            <Checkbox
                                color='primary'
                                aria-checked={props.isSelected(team.id)}
                                onClick={() => props.handleSelect(team)}
                                checked={props.isSelected(team.id)}
                            />
                        </TableCell>
                        <TableCell
                            component='th'
                            scope='row'
                            padding='none'
                        >
                            {team.name}
                        </TableCell>
                        <TableCell>
                            {team.status}
                        </TableCell>
                        <TableCell>
                            {team.mobile}
                        </TableCell>
                        <TableCell align='center'>
                            <IconButton
                                onClick={() => props.updateTeam(team)}
                            >
                                <UpdateIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                            <IconButton
                                onClick={() => props.deleteTeam(team)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    )
}