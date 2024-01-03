import {TableContainer, Table, TableHead, TableRow, TableCell, TablePagination,
        TableBody} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';

const headCellStyle = {
    paddingTop: '0.7em',
    paddingBottom: '0.7em'
}

const rowCellStyle = {
    paddingTop: '0.3em',
    paddingBottom: '0.3em'
}

export default function DataTable({head, rows, buttonHandlers}) {
    console.log(typeof head + " " + typeof row);
    console.log(head);
    console.log(rows);
    return (
        <>
            <TableContainer>
                <Table style={{tableLayout: 'fixed'}}>
                    <TableHead sx={{backgroundColor: 'rgb(247, 247, 247)',
                                    color: 'white'}}>
                        {
                            head.map((cell, index) => {
                                return (<TableCell key={index} sx={{paddingTop: headCellStyle.paddingTop,
                                            paddingBottom: headCellStyle.paddingBottom}}>
                                            {cell}    
                                        </TableCell>)
                            })
                        }
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{backgroundColor: 'white'}}>
                            {
                                rows.map((cell, index) => {
                                    return cell.map((c, i) => {
                                        return (<TableCell key={(i + 1) * (index + 1)} sx={{paddingTop: headCellStyle.paddingTop,
                                                    paddingBottom: headCellStyle.paddingBottom}}>
                                                    {c}    
                                                </TableCell>)
                                    })
                                })
                            }
                            {/* <TableCell key={1} sx={{paddingTop: rowCellStyle.paddingTop,
                                                paddingBottom: rowCellStyle.paddingBottom}}>
                                <Typography variant='subtitle1'>
                                    <span className={styles.occupiedLabelStyle}>
                                        Occupied
                                    </span>
                                </Typography>
                            </TableCell> */}
                            <TableCell key={1} sx={{paddingTop: rowCellStyle.paddingTop,
                                                paddingBottom: rowCellStyle.paddingBottom}}>
                                <IconButton onClick={buttonHandlers[0]}>
                                    <VisibilityIcon sx = 
                                        {{
                                            color: 'blue',
                                        }}/>
                                </IconButton>
                                <IconButton onClick={buttonHandlers[0]}>
                                    <ModeEditIcon sx = 
                                        {{
                                            color: 'green',
                                        }}/>
                                </IconButton>
                                <IconButton onClick={buttonHandlers[0]}>
                                    <DeleteIcon sx = 
                                        {{
                                            color: 'red',
                                        }}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={1}
                rowsPerPage={10}
                page={1}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
            />
        </>
    )
}