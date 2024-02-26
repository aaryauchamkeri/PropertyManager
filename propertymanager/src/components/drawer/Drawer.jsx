import { useState } from 'react';
import DrawerListComponent from './DrawerListComponent';
// import NestedParentDrawerListComponent from './NestedParentDrawerListComponent.jsx';
import PersonIcon from '@mui/icons-material/Person';
import styles from './drawer.module.css';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import List from '@mui/material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import {Select, MenuItem, InputLabel, FormControl} from '@mui/material';


export default function Drawer({selected, setSelected}) {
    const [displayProperties, setDisplayProperties] = useState(true);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };    

    return (
        <div className={styles.parent}>
            <div className={styles.close}>
                <FormControl sx={{width: '100%', color: 'white'}} size='small'>
                    {/* <InputLabel id='workSpace'>Workspace</InputLabel> */}
                    <Select
                        // labelId='workSpace'
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        defaultValue='hello world'
                        value={'hello world'}
                        label={'age'}
                        sx={{color: 'white', borderColor: 'red',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            },
                             "& .MuiSvgIcon-root": {color: "white"}
                            }}
                    >
                        <MenuItem
                            value = 'hello world'
                            // sx={{color: 'white'}}
                        >
                            Ten
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={styles.main}>
                <List sx={{padding: '0.5em'}}>
                    {/* <NestedParentDrawerListComponent label="Hello"/>
                    <div style={{paddingLeft: '0.7em'}}>
                        

                    </div> */}
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
                    <DrawerListComponent selected={selected === 5} setSelected={setSelected}
                        label="Log" link="/log" ind={5}
                        icon={<HistoryIcon/>}/>
                </List>
            </div>
            <div className={styles.account}>
                <Typography variant="subtitle1">Aarya Chamkeri</Typography>
                <SettingsIcon/>
            </div>
        </div>
    )
}



