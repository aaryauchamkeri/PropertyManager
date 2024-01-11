import styles from './properties.module.css';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Button, TextField} from '@mui/material';
import {Outlet} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import { useRef } from 'react';
import DataTable from '../components/table/Table';

export default function Properties() {
    const tableHeads = useRef(['No', 'Address', 'Purchase Price', 'Tenants', 'Status', 'Actions']);
    const location = useLocation();
    const navigator = useNavigate();

    async function getProperties() {
        // fetch('http://localhost:3000/')
    }

    // check children paths
    if(location.pathname.endsWith('/add')) {
        return (
            <>
                <Outlet/>
            </>
        )
    }

    function handleAddPropertyClick(e) {
        navigator('/properties/add');
    }

    function rand() {}

    return (
        <div className={styles.main}>
            <Typography variant='h6' sx={{marginBottom: '0.5em'}}>Properties</Typography>
            <div className={styles.tableContainer}>
                <div className={styles.utilityContainer}>
                    <TextField id="outlined-basic" label="Search" size="small" fullWidth
                        variant="outlined" sx = {{backgroundColor: 'white', marginRight: '1em'}} />
                    <Button variant="contained" sx={{whiteSpace: 'nowrap'}}
                        onClick={handleAddPropertyClick}>
                        <AddIcon fontSize='small' sx={{marginRight: '3px'}}/>
                        Add Property
                    </Button>
                </div>
                <DataTable head={tableHeads.current} rows={[[1, 2, 3, 0, <span className={styles.occupiedLabelStyle}>Occupied</span>]]} buttonHandlers={[rand, rand, rand]}/>
            </div>
        </div>  
    )
}