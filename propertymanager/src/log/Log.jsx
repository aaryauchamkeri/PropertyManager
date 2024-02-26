import styles from './log.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import {Typography} from '@mui/material';


export default function Log() {
    return (
        <div className={styles.parent}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding='checkbox'>
                                <Checkbox
                                    color="primary"
                                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                                    // checked={rowCount > 0 && numSelected === rowCount}
                                    // onChange={onSelectAllClick}
                                    inputProps={{
                                    'aria-label': 'select all desserts',
                                    }}
                                />
                            </TableCell>
                            <TableCell align='left'>
                                <Typography fontWeight={'bold'}>Name</Typography>
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell padding='checkbox'>
                                <Checkbox
                                    color="primary"
                                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                                    // checked={rowCount > 0 && numSelected === rowCount}
                                    // onChange={onSelectAllClick}
                                    inputProps={{
                                    'aria-label': 'select all desserts',
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                            <TableCell>
                                Sidharth
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}