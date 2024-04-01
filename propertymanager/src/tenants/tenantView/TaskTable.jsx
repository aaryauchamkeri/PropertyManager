import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckIcon from '@mui/icons-material/Check';
import {Avatar, Tooltip, Skeleton, Button, Modal, Box, IconButton} from '@mui/material';
import React from 'react';

export default function TaskTable({tasks, complete}) {
    function getRandomColor() {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);

        return `rgb(${red}, ${green}, ${blue})`;
    }

    console.log(tasks.map);
    console.log(tasks);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>
                            Created By
                        </TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>
                            Description
                        </TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>
                            Status
                        </TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>
                            Deadline
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tasks.map(elem => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        <Tooltip title={elem.first_name.charAt(0).toUpperCase()
                                                        + elem.first_name.slice(1) + ' '
                                                        + elem.last_name.charAt(0).toUpperCase()
                                                        + elem.last_name.slice(1)}
                                            placement='top'>
                                            <Avatar sx={{bgcolor: getRandomColor()}}>
                                                {elem.first_name.toUpperCase().charAt(0)}
                                                {elem.last_name.toUpperCase().charAt(0)}
                                            </Avatar>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {elem.task}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            elem.completed ? (
                                                <Button disabled>
                                                    <CheckIcon sx={{color: 'green'}}/>
                                                </Button>
                                            ) :
                                            new Date(elem.deadline).getTime() < new Date().getTime() ?
                                                <Button onClick={() => {complete(elem.id)}}>
                                                    <Tooltip title={
                                                        'overdue'}>
                                                        <Skeleton variant='circular' width={'1em'} height={'1em'}
                                                                sx={{
                                                                        color: 'red', 
                                                                        bgcolor: 'red',
                                                                        position: 'relative'
                                                                    }}
                                                        />
                                                    </Tooltip> 
                                                </Button>:
                                                <Button onClick={() => {complete(elem.id)}}>
                                                    <Tooltip title={
                                                        'upcoming'}>
                                                        <Skeleton variant='circular' width={'1em'} height={'1em'}
                                                                sx={{ 
                                                                        bgcolor: '#cad108',
                                                                        position: 'relative'
                                                                    }}
                                                        />
                                                    </Tooltip> 
                                                </Button>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {new Date(elem.deadline).toDateString()}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}