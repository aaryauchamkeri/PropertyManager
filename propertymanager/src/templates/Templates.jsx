import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {Box, Typography} from '@mui/material';
import styles from './templates.module.css';
import { useContext, useEffect, useState } from 'react';
import { CredInfoCtx } from '../App';
import { getTemplates, uploadTemplate } from './apiCalls';
import { Link } from 'react-router-dom';

export default function Templates() {
    const infoContext = useContext(CredInfoCtx);
    const [templates, setTemplates] = useState([]);

    useEffect(function() {
        (async () => {
            let responseTemplates = await getTemplates(infoContext.accountId, infoContext.userData.auth);
            console.log(responseTemplates);
            setTemplates(responseTemplates);
        })()
    }, [])

    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drop(ev) {
        const file = ev.dataTransfer.files[0];
        let url = URL.createObjectURL(file);
        ev.preventDefault();
        uploadTemplate(file, infoContext.accountId, infoContext.userData.auth).then(res => {
            getTemplates(infoContext.accountId, infoContext.userData.auth).then(res => {
                setTemplates(res);
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <div className={styles.main} onDrop={(ev) => drop(ev)}
            onDragOver={(ev) => {
                allowDrop(ev);
            }}>
            <div className={styles.userContainer}>
                {
                    templates.map(template => {
                        return (
                            <Link onClick={
                                () => {
                                    let fileExt = template.mime.split('/')[1];
                                    let fileName = template.id + '.' + fileExt;
                                    window.open(`http://localhost:3000/media/${fileName}`, "_blank")
                                }}
                            >
                                <div className={styles.item}>
                                    <Box style={{width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'end',
                                                gap: '25%',
                                                alignItems: 'center',
                                                boxShadow: '2px 2px 2px #e3e3e3',
                                                padding: '0 0 2em 0',
                                                backgroundColor: 'white'
                                    }}>
                                        <InsertDriveFileIcon sx={
                                            {
                                                aspectRatio: '1/1',
                                                fontSize: '4em'
                                            }
                                        }/>
                                        <Typography variant='subtitle2' sx={
                                            {
                                                color: 'gray',
                                                overflow: 'hidden',
                                                width: '100%',
                                                textOverflow: 'ellipsis'
                                            }
                                        }>
                                            {template.fileName}
                                        </Typography>
                                    </Box>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}