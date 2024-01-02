import { useState } from 'react';
import DrawerListComponent from './DrawerListComponent';
import NestedParentDrawerListComponent from './NestedParentDrawerListComponent.jsx';
import PersonIcon from '@mui/icons-material/Person';
import styles from './drawer.module.css';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import {Select, MenuItem, InputLabel} from '@mui/material';


export default function Drawer({selected, setSelected}) {
    const [displayProperties, setDisplayProperties] = useState(true);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };    

    return (
        <div className={styles.parent}>
            <div className={styles.close}>
            </div>
            <div className={styles.main}>
                <List sx={{padding: '0.5em'}}>
                    <DrawerListComponent selected={selected === 0} setSelected={setSelected}
                        label="Dashboard" link="/" ind={0}
                        icon={<DashboardIcon fontSize='small'/>}/>
                    <DrawerListComponent selected={selected === 1} setSelected={setSelected}
                        label="Properties" link="/properties" ind={1}
                        icon={<HomeIcon fontSize='small'/>}/>
                    <DrawerListComponent selected={selected === 2} setSelected={setSelected}
                        label="Tenants" link="/tenants" ind={2}
                        icon={<PersonIcon fontSize='small'/>}/>
                    <DrawerListComponent selected={selected === 3} setSelected={setSelected}
                        label="Calendar" link = "/calendar" ind={3}
                        icon={<CalendarMonthIcon/>}/>
                    <DrawerListComponent selected={selected === 4} setSelected={setSelected}
                        label="Templates" link="/propertyUpload" ind={4}
                        icon={<DescriptionIcon/>}/>
                </List>
            </div>
            <div className={styles.account}>
                <Typography variant="subtitle1">Aarya Chamkeri</Typography>
                <SettingsIcon/>
            </div>
        </div>
    )
}



