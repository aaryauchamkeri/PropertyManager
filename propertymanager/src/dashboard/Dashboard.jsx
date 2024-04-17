import styles from './dashboard.module.css';
import {Box, Typography, Button, ButtonGroup, Chip, Divider} from '@mui/material';
import { CredInfoCtx } from '../App';
import { useContext, useEffect, useState } from 'react';
import TasksWidget from './TasksWidget';
import EventsWidget from './EventsWidget';
import Status from './Status';
import Activity from './Activity';


export default function Dashboard() {
    console.log('hello world');
    const infoContext = useContext(CredInfoCtx);
    const [allEvents, setAllEvents] = useState([]);
    const [tenantTasks, setTenantTasks] = useState([]);
    const [activity, setActivity] = useState([]);
    const [propertyTasks, setPropertyTasks] = useState([]);
    const [totalProperties, setTotalProperties] = useState(0);
    const [activeProperties, setActiveProperties] = useState(0);
    const [totalTenants, setTotalTenants] = useState(0);
    const [activeTenants, setActiveTenants] = useState(0);

    useEffect(() => {
        fetch('https://propertymanager.onrender.com/schedule/view', {
            method: 'GET',
            headers: {
                'accountId': infoContext.accountId,
                'Authorization': `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then((data) => {
            console.log(data);
            data = data.filter((elem) => {
                return elem !== undefined && elem !== null && new Date(elem.date).getTime() > new Date().getTime();
            });
            data.sort(function (a, b) {
                let aDate = new Date(a.date);
                let bDate = new Date(b.date);
                if(aDate.getTime() > bDate.getTime()) return 1;
                return -1;
            });
            console.log(data);
            setAllEvents(data);
        });

        fetch('https://propertymanager.onrender.com/tenants/alltasks', {
            method: 'GET',
            headers: {
                'accountId': infoContext.accountId,
                'Authorization': `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then(data => {
            data = data.filter(data => {
                let currentDate = new Date();
                return new Date(data.deadline).getTime() > currentDate.getTime();
            });
            data.sort((first, second) => {
                if(new Date(first.deadline).getTime() < new Date(second.deadline).getTime()) {
                    return -1;
                }
                return 1;
            });
            setTenantTasks(data);
        });

        fetch('https://propertymanager.onrender.com/activity/all', {
            method: 'GET',
            headers: {
                'accountId': infoContext.accountId,
                'Authorization': `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then(json => {
            setActivity(json);
        });

        fetch('https://propertymanager.onrender.com/properties/alltasks', {
            method: 'GET',
            headers: {
                'accountId': infoContext.accountId,
                'Authorization': `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then(data => {
            data = data.filter(data => {
                let currentDate = new Date();
                return new Date(data.deadline).getTime() > currentDate.getTime();
            });

            data.sort((first, second) => {
                if(new Date(first.deadline).getTime() < new Date(second.deadline).getTime()) {
                    return -1;
                }
                return 1;
            });
            setPropertyTasks(data);
        });

        fetch('https://propertymanager.onrender.com/properties/list', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${infoContext.userData.auth}`,
                'accountId': infoContext.accountId
            }
        }).then(res => res.json()).then(data => {
            setTotalProperties(data.length);
            let newActiveProperties = 0;
            data.forEach(element => {
                if(element.status) {
                    newActiveProperties++;
                }
            });
            setActiveProperties(newActiveProperties);
        }).catch(err => {
            console.log(err);
        });

        fetch('https://propertymanager.onrender.com/tenants/viewAll', {
            method: "GET",
            headers: {
                accountId: infoContext.accountId,
                Authorization: `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then(data => {
            setTotalTenants(data.length);
            let newActiveTenants = 0;
            data.forEach(element => {
                if(element.status) {
                    newActiveTenants++;
                }
            });
            setActiveTenants(newActiveTenants);
        });

    }, []);


    return (
        <div className={styles.parent}>
            <EventsWidget allEvents={allEvents}/>
            <TasksWidget propertyTasks={propertyTasks} tenantTasks={tenantTasks}/>
            <Status totalProperties={totalProperties} activeProperties={activeProperties}
                    totalTenants={totalTenants} activeTenants={activeTenants}
            />
            <Activity activity={activity}/>
        </div>
    ); 
}