import styles from './dashboard.module.css';
import {Typography} from '@mui/material'

export default function Dashboard() {
    return (
        <div className = {styles.parent}>
            <Typography variant = 'h5'>hello wolrd</Typography>
        </div>
    ); 
}