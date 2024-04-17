import {Box, Typography, IconButton} from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import styles from './templates.module.css';
import { useContext, useEffect, useState } from 'react';
import { CredInfoCtx } from '../App';
import { getTemplates, uploadTemplate } from './apiCalls';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';


function getFileType(fileName) {
    if(fileName.endsWith('mp4') || fileName.endsWith('mov') || fileName.endsWith('avi')) {
        return <VideocamIcon sx={{color: 'red'}}/>;
    } else if (fileName.endsWith('mp3') || fileName.endsWith('wav')) {
        return <MicOutlinedIcon sx={{color: 'blue'}}/>;
    } else {
        return <ArticleIcon sx={{color: 'gray'}}/>;
    }
}


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
            <Typography variant="h5" sx={{
                marginBottom: '0.5em'
            }}>My Files</Typography>
            <div className={styles.filesContainer}>
                <TableContainer sx={{borderRadius: '1em'}}>
                    <Table>
                        <TableHead sx={{backgroundColor: '#f0f0f0'}}>
                            <TableRow>
                                <TableCell>

                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}> 
                                    File Name
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}> 
                                    File Id
                                </TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}> 
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: 'white'}}>
                            {
                                templates.map(file => {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                {getFileType(file.fileName)}
                                            </TableCell>
                                            <TableCell>
                                                {file.fileName}
                                            </TableCell>
                                            <TableCell>
                                                {file.id}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <OpenInNewIcon
                                                        sx={{color: 'blue'}}
                                                    />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon
                                                        sx={{color: 'red'}}
                                                    />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* {
                    templates.map(template => {
                        return (
                            <div style={{  
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        boxShadow: '2px 2px 2px #e3e3e3',
                                        padding: '1em 1em 1em 0.5em',
                                        backgroundColor: 'rgb(230, 230, 230)',
                                        borderRadius: '0.5em',
                                        marginBottom: '1em'
                            }} onClick={
                                () => {
                                    let fileExt = template.mime.split('/')[1];
                                    let fileName = template.id + '.' + fileExt;
                                    window.open(`http://localhost:3000/media/${fileName}`, "_blank")
                                }
                            }>
                                <div>
                                    <span>
                                        {template.fileName}
                                    </span>
                                </div>
                                <div>
                                    <IconButton onClick={(e) => {e.preventDefault()}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    )
}