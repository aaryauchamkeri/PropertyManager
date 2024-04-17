import { useState } from 'react';
import DrawerListComponent from './DrawerListComponent';
import PeopleIcon from '@mui/icons-material/People';
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
import { Button } from '@mui/material';


export default function Drawer({selected, setSelected, setOpen, userData, accountId, setAccountId}) {
    const [options, setOptions] = useState([]);

    console.log(userData);
    

    return (
        <div className={styles.parent}>
            <div className={styles.close}>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <select value={accountId} 
                        style={
                            {
                                color: 'white',
                                backgroundColor: 'rgb(25, 25, 25)',
                                textOverflow: 'ellipsis',
                                width: '100%'
                            }
                        } 
                        onChange={(e) => {setAccountId(e.target.value)}}
                    >
                        {
                            userData.accounts ? userData.accounts.map((elem) => {
                                return (
                                    <option value={elem.id}>
                                        {elem.name}
                                    </option>
                                )
                            }) : []
                        }
                    </select>
                    {/* <Button sx={{width: '80%', fontSize: '0.7em', alignSelf: 'center', justifySelf: 'center'}}>
                        Exit Workspace
                    </Button> */}
                </div>
            </div>
            <div className={styles.main}>
                <List sx={{padding: '0.5em'}}>
                    <DrawerListComponent selected={selected === 0} setSelected={setSelected}
                            label="Dashboard" link="/" ind={0}
                            icon={<DashboardIcon fontSize='small' sx={{color: 'white'}}/>}/>
                    <DrawerListComponent selected={selected === 1} setSelected={setSelected}
                        label="Properties" link="/properties" ind={1}
                        icon={<HomeIcon fontSize='small' sx={{color: 'white'}}/>}/>
                    <DrawerListComponent selected={selected === 2} setSelected={setSelected}
                        label="Tenants" link="/tenants" ind={2}
                        icon={<PersonIcon fontSize='small' sx={{color: 'white'}}/>}/>
                    <DrawerListComponent selected={selected === 3} setSelected={setSelected}
                        label="Calendar" link = "/calendar" ind={3}
                        icon={<CalendarMonthIcon sx={{color: 'white'}}/>}/>
                    <DrawerListComponent selected={selected === 4} setSelected={setSelected}
                        label="Templates" link="/templates" ind={4}
                        icon={<DescriptionIcon sx={{color: 'white'}}/>}/>
                    <DrawerListComponent selected={selected === 5} setSelected={setSelected}
                        label="Account" link="/account" ind={5}
                        icon={<PeopleIcon sx={{color: 'white'}}/>}/>
                </List>
            </div>
            <div className={styles.account} onClick={() => {setOpen(true)}}>
                <SettingsIcon/>
                <Typography variant="subtitle1">Settings</Typography>
            </div>
        </div>
    )
}



