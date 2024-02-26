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

export default function DataTable({head, rows, buttonHandlers, ...otherInfo}) {
    return (
        <>
            <TableContainer>
                <Table style={{tableLayout: 'fixed'}}>
                    <TableHead>
                        <TableRow sx={{backgroundColor: 'rgb(247, 247, 247)',
                                    color: 'white'}}>
                            {
                                head.map((cell, index) => {
                                    return (<TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                paddingBottom: headCellStyle.paddingBottom}}>
                                                {cell}    
                                            </TableCell>)
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((cell, ind) => {
                                return (
                                    <TableRow sx={{backgroundColor: 'white'}}>
                                        <TableCell>
                                            {ind}
                                        </TableCell>
                                        <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                                paddingBottom: headCellStyle.paddingBottom}}>
                                            {cell['address']}
                                        </TableCell>
                                        <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                                paddingBottom: headCellStyle.paddingBottom}}>
                                            {cell['purchase_price'] ? cell['purchase_price'] : 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                                paddingBottom: headCellStyle.paddingBottom}}>
                                            {otherInfo.tenants[ind] ? otherInfo.tenants[ind].length : 0}
                                        </TableCell>
                                        <TableCell sx={{paddingTop: rowCellStyle.paddingTop,
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
                                )
                            })
                        }
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