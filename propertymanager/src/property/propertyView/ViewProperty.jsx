import { useContext, useEffect, useState } from "react";
import style from "./viewProperty.module.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CredInfoCtx } from "../../App";
import {Typography, Divider, Pagination, Chip, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HistoryIcon from '@mui/icons-material/History';

export default function ViewProperty() {
    const navigator = useNavigate();
    const [propertyData, setPropertyData] = useState({});
    const [images, setImages] = useState([]);
    const [notes, setNotes] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [files, setFiles] = useState([]);
    const [activity, setActivity] = useState([]);
    const [photoNumber, setPhotoNumber] = useState(0);
    const infoContext = useContext(CredInfoCtx);
    const id = useLoaderData();

    function paginationChange(event, value) {
        setPhotoNumber(value - 1);
    }

    useEffect(() => {
        fetch(`http://localhost:3000/properties/view?propertyId=${id}`, {
                    method: "GET",
                    headers: { 
                        'Authorization': `Bearer ${infoContext.userData.auth}`,
                        'accountId': 1
                    }
        }).then(res => {
            res.json().then(jsonData => {
                setPropertyData(jsonData);
            }).catch(err => {
                navigator('/properties');
            });
        }).catch(err => {
            navigator('/properties');
        });
        
        fetch(`http://localhost:3000/properties/media?propertyId=${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${infoContext.userData.auth}`,
                        'accountId': 1
                    }
        }).then(res => {
            res.json().then(jsonData => {
                const imageLinks = jsonData.map(element => {
                    const id = element.id;
                    const fileExtension = element.mime.split('/')[1];
                    const fileName = id + '.' + fileExtension;
                    return fileName;
                });
                setImages(imageLinks);
            }).catch(err => {
                navigator('/properties');
            })
        }).catch(err => {
            navigator('/properties');
        });

        fetch(`http://localhost:3000/properties/tasks/${id}`, {
            method: 'GET', 
            headers: {
                'Authorization' : `Bearer ${infoContext.userData.auth}`,
                'accountId': 1
            }
        }).then(res => {
            res.json().then(jsonData => {
                setTasks(jsonData);
            })
        });

        fetch(`http://localhost:3000/properties/notes/${id}`, {
            method: 'GET', 
            headers: {
                'Authorization' : `Bearer ${infoContext.userData.auth}`,
                'accountId': 1
            }
        }).then(res => {
            res.json().then(jsonData => {
                console.log(jsonData);
                setNotes(jsonData);
            })
        });
    }, [])

    return (
        <div className={style.parent}>
            <div className={style.propertyInformationSideBar}>
                <Typography variant='h4' color={'rgb(120, 120, 120)'}
                    fontWeight={100}
                >
                    {propertyData.address}
                </Typography>
                <div className = {style.imageContainer}>
                    <img src = {`http://localhost:3000/media/${images[photoNumber]}`}/>
                    <Pagination count={images.length} sx={{marginTop: '0.5em'}}
                        onChange={paginationChange}
                    />
                </div>
                <div className={style.statusContainer}>
                    <Typography variant="h6">Status: </Typography>
                    <Chip label="Occupied" color="success" variant="filled" />
                </div>
                <div style={{marginTop: '1em'}} className={style.sideBarPropertyInfo}>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Address
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['address']}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Purchase Price
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['purchase_price']}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Currency
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['currency_type']}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Maintenance
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['maintenance_costs']}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Housing Company
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['housing_company_name']}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Housing Company Email
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['housing_company_email']}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Housing Company Phone
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['housing_company_number']}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Janitor Email
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['janitor_email']}
                        </Typography>
                    </div>
                    <Divider></Divider>
                    <div className={style.sideBarItem}>
                        <Typography variant="subtitle2">
                            Janitor Phone
                        </Typography>
                        <Typography variant="subtitle2">
                            {propertyData['janitor_number']}
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={style.informationContainer}>
                <div className={style.filesContainer}>
                    <div className={style.containerLabel}>
                        <Typography variant="h6" sx={{marginRight: '0.5em'}}>
                            Files
                        </Typography>
                        <IconButton>
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    </div>
                    <div className={style.content}>
                        {
                                files.length == 0 ? 
                                <div style={{height: '100%', display: 'flex', alignItems: 'center',
                                            flexDirection: 'column', justifyContent: 'center',
                                            color: 'gray',  backgroundColor: 'rgb(245, 245, 245)',
                                            borderRadius: '0.5em'
                                            }}>
                                    
                                    <Typography variant="h6">No Files</Typography>
                                    <FileCopyIcon fontSize="large"/>
                                    
                                </div> : <span></span>
                        }
                    </div>
                </div>
                <div className={style.activityContainer}>
                    {
                                activity.length == 0 ? 
                                <div style={{height: '100%', display: 'flex', alignItems: 'center',
                                            flexDirection: 'column', justifyContent: 'center',
                                            color: 'gray',  backgroundColor: 'rgb(245, 245, 245)',
                                            borderRadius: '0.5em'
                                            }}>
                                    
                                    <Typography variant="h6">No Recent Activity</Typography>
                                    <HistoryIcon fontSize="large"/>
                                    
                                </div> : <span></span>
                        }
                </div>
                <div className={style.notesContainer}>
                    <div className={style.containerLabel}>
                        <Typography variant="h6" sx={{marginRight: '0.5em'}}>
                            Notes
                        </Typography>
                        <IconButton>
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    </div>
                    <div className={style.content}>
                        {
                            notes.length == 0 ? 
                            <div style={{height: '100%', display: 'flex', alignItems: 'center',
                                         flexDirection: 'column', justifyContent: 'center',
                                         color: 'gray',  backgroundColor: 'rgb(245, 245, 245)',
                                         borderRadius: '0.5em'
                                        }}>
                                
                                <Typography variant="h6">No Notes</Typography>
                                <SpeakerNotesIcon fontSize="large"/>
                                
                            </div> : notes.map(value => {
                                return <></>
                            })
                        }
                    </div>
                </div> 
                <div className={style.tasksContainer}>
                    <div className={style.containerLabel}>
                        <Typography variant="h6" sx={{marginRight: '0.5em'}}>
                            Tasks
                        </Typography>
                        <IconButton>
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    </div>
                    <div className={style.content}>
                        {
                            notes.length == 0 ? 
                            <div style={{height: '100%', display: 'flex', alignItems: 'center',
                                         flexDirection: 'column', justifyContent: 'center',
                                         color: 'gray', backgroundColor: 'rgb(245, 245, 245)',
                                         borderRadius: '0.5em'
                                        }}>
                                
                                <Typography variant="h6">No Tasks</Typography>
                                <AssignmentTurnedInIcon fontSize="large"/>
                            </div> : <span></span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}