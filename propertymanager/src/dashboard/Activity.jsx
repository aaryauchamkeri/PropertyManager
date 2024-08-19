import { useContext, useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import {Box, Typography, Button, ButtonGroup, Chip, Divider} from '@mui/material';
import { CredInfoCtx } from '../App';
import HistoryIcon from '@mui/icons-material/History';

export default function Activity({activity}) {
    const infoContext = useContext(CredInfoCtx);

    return (
        <div className={styles.activity}>
            <div className={styles.containerLabel}>
                <Typography variant='h5' sx={{
                    fontWeight: 'bold', alignSelf: 'start',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <HistoryIcon sx={{marginRight: '0.5em'}}/> Recent Activity
                </Typography>
            </div>
            <div className={styles.content}>
                {
                    activity.length ? activity.map(elem => {
                        return (
                            <>
                                <Box sx={{
                                    display: 'flex', justifyContent: 'space-between',
                                    overflow: 'hidden', width: '100%'
                                }}>
                                    <Typography variant='subtitle1' sx={{color: 'gray'}}>
                                        {elem.first_name + ' ' + elem.last_name + ' ' + elem.message}
                                    </Typography>
                                    <Typography variant='subtitle1' color='gray'>
                                        {new Date(elem.created).toDateString()}
                                    </Typography>
                                </Box>
                                <Divider/>
                            </>
                        )
                    }) : <Box sx={{
                            width: '100%', height: '100%', display: 'flex',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Typography variant='h5' color='gray' sx={{
                                alignSelf: 'center', position: 'relative',
                                left: '-0.5em', fontStyle: 'italic',
                                textWrap: 'nowrap'
                            }}>
                                No activity
                            </Typography>
                        </Box>
                }
            </div>
        </div>
    )
}