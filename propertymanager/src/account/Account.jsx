import { useContext, useEffect, useState } from 'react';
import styles from './account.module.css';
import {IconButton, Typography} from '@mui/material';
import { CredInfoCtx } from '../App';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import { stringToColor } from '../utils/stringColor';

export default function Account() {
    const infoContext = useContext(CredInfoCtx);
    const [users, setUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(function() {
        fetch('https://propertymanager.onrender.com/users/all', {
            method: 'GET',
            headers: {
                accountId: infoContext.accountId,
                Authorization: `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then(json => {
            json.forEach(element => {
                if(element.id === infoContext.userData.id) {
                    if(element.isAdmin) setIsAdmin(true);
                }
            });
            setUsers(json);
        })
    }, []);


    async function deleteUser(id) {
        let verify = confirm('Are you sure you would like to delete this user?');
        if(verify) {
            await fetch(`https://propertymanager.onrender.com0/users/remove?userId=${id}`, {
                headers: {
                    'Authorization': `Bearer ${infoContext.userData.auth}`,
                    'accountId': infoContext.accountId
                }
            });
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.userContainer}>
                {
                    users.map(user => {
                        return (
                            <div className={styles.item}>
                                <div style={{width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'start',
                                            gap: '0.5em',
                                            alignItems: 'center',
                                            boxShadow: '2px 2px 2px #e3e3e3',
                                            padding: '0 0 2em 0',
                                            backgroundColor: 'white'
                                            }}>
                                    <IconButton sx={{alignSelf: 'end'}}
                                        disabled = {user.isAdmin || !isAdmin}
                                        onClick={() => {deleteUser(user.id)}}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                    <Typography variant='h6'
                                        sx={{color: 'gray', fontStyle: 'italic'}}
                                    >
                                            {user.username + (user.isAdmin ? ' (admin)' : '')} 
                                    </Typography>
                                    <Avatar sx={{backgroundColor: 
                                                stringToColor(user.first_name + ' ' + user.last_name),
                                                fontSize: '2em',
                                                height: '2.5em',
                                                width: '2.5em',
                                                aspectRatio: '1/1' 
                                                }}>
                                        {user.first_name.toUpperCase()[0] + user.last_name.toUpperCase()[0]}
                                    </Avatar>
                                    <div style={{width: '100%', padding: '0 2em 0 2em'}}>
                                        <div className={styles.descriptionItem}>
                                            <Typography variant='subtitle2'
                                                sx={{color: 'gray'}}
                                            >
                                                    First Name:
                                            </Typography>
                                            <Typography id={'firstname' + user.id} variant='subtitle1'>
                                                {user.first_name}
                                            </Typography>
                                        </div>
                                        <div className={styles.descriptionItem}>
                                            <Typography variant='subtitle2'
                                                    sx={{color: 'gray'}}
                                                >
                                                        Last Name:
                                                </Typography>
                                            <Typography id={'firstname' + user.id} variant='subtitle1'>
                                                {user.last_name}
                                            </Typography>
                                        </div>
                                        <div className={styles.descriptionItem}
                                            style={{width: '100%'}}
                                        >
                                            <Typography variant='subtitle2'
                                                    sx={{color: 'gray'}}
                                                >
                                                        Email:
                                                </Typography>
                                            <Typography id={'firstname' + user.id} variant='subtitle1'>
                                                {user.email}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}