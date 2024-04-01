import {Box, Avatar, Typography} from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { CredInfoCtx } from '../../App';

export default function Note({userId, note, created}) {
    const infoContext = useContext(CredInfoCtx);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        fetch(`http://localhost:30000/users/user?id=${userId}`, {
            method: "GET",
            headers: {
                accountId: infoContext.accountId,
                authorization: `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => {
            res.json().then(jsonData => {
                console.log(jsonData);
                setFirstName(jsonData.first_name);
                setLastName(jsonData.last_name);
            });
        });
    })

    return (
        <Box sx={{width: '100%', minHeight: '2em', padding: '0.5em', display: 'flex',
                  justifyContent: 'space-between', flexDirection: 'column', alignItems: 'start',
                  gap: '0.1em'}}>
            
            <Box sx={{height: '100%', display: 'flex', justifyContent: 'space-between',
                      width: '100%', flexDirection: 'row', alignItems: 'center', gap: '0.75em'}}>
                <Typography variant='subtitle1'>
                    Note By <span style={{fontWeight: 'bold'}}>
                        {firstName + ' ' + lastName}
                    </span>
                </Typography>
                <Typography variant='subtitle2' sx={{color: 'gray'}}>
                    {new Date(created).toDateString()}
                </Typography>
            </Box>
            <Box sx={{borderRadius: '0.5em', border: '1px solid rgb(217, 217, 217)', padding: '0.35em',
                      width: '100%', color: 'gray'}}>
                {note}
            </Box>
        </Box>
    )
}