import styles from './tenants.module.css';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Button, TextField} from '@mui/material';
import {Outlet} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import DataTable from '../components/table/Table';
import { useRef } from 'react';

export default function Tenants() {
    const location = useLocation();
    const navigator = useNavigate();
    const tableHeads = useRef(['First Name', 'Last Name', 'Rent']);

    // check children paths
    if(location.pathname.endsWith('/add')) {
        return (
            <>
                <Outlet/>
            </>
        )
    }

    function handleAddPropertyClick(e) {
        navigator('/properties/createProperty');
    }

    return (
        <div className={styles.main}>
            <Typography variant='h6' sx={{marginBottom: '0.5em'}}>Tenants</Typography>
            <div className={styles.tableContainer}>
                <div className={styles.utilityContainer}>
                    <TextField id="outlined-basic" label="Search" size="small" fullWidth
                        variant="outlined" sx = {{backgroundColor: 'white', marginRight: '1em'}} />
                    <Button variant="contained" sx={{whiteSpace: 'nowrap'}}
                        onClick={handleAddPropertyClick}>
                        <AddIcon fontSize='small' sx={{marginRight: '3px'}}/>
                        Add Tenant
                    </Button>
                </div>
                <DataTable head={tableHeads.current} rows={[[1, 2]]} buttonHandlers={[() =>{}, () =>{}, () =>{}]}/>
            </div>
        </div>  
    )
}