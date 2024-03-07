import { useContext, useEffect, useState } from "react";
import style from "./viewTenant.module.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CredInfoCtx } from "../../App";
import {Typography, Divider, Pagination, Chip, IconButton, Modal, Box} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HistoryIcon from '@mui/icons-material/History';
import Note from "./Note";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import NoteModal from "./NoteModal";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  backgroundColor: 'white',
  border: '2px solid #000',
  display: 'flex',
  flexDirection: 'column'
};


export default function ViewTenant() {
    const navigator = useNavigate();
    const [tenantData, setTenantData] = useState({});
    const [images, setImages] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [noteModalOpen, setNoteModalOpen] = useState(false);
    const [fileModalOpen, setFileModalOpen] = useState(false);
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
        fetch(`http://localhost:3000/tenants/view?tenantId=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${infoContext.userData.auth}`,
                'accountId': 1
            }
        }).then(res => res.json()).then((data) => {
            setTenantData(data)
            console.log(data);
        })

        fetch(`http://localhost:3000/tenants/tasks/${id}`, {
            method: 'GET', 
            headers: {
                'Authorization' : `Bearer ${infoContext.userData.auth}`,
                'accountId': 1
            }
        }).then(res => {
            res.json().then(jsonData => {
                setTasks(jsonData);
                console.log(jsonData);
            })
        });

        fetch(`http://localhost:3000/tenants/notes/${id}`, {
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
        <>
            <TaskModal open={taskModalOpen} setOpen={setTaskModalOpen} tenantId={id}/>
            <NoteModal open={noteModalOpen} setOpen={setNoteModalOpen} tenantId={id}/>
            <div className={style.parent}>
                <div className={style.propertyInformationSideBar}>
                    <Typography variant='h4' color={'rgb(120, 120, 120)'}
                        fontWeight={100}
                    >
                        {tenantData.first_name}
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
                                First Name
                            </Typography>
                            <Typography variant="subtitle2">
                                {tenantData['first_name']}
                            </Typography>
                        </div>
                        <Divider></Divider>
                        <div className={style.sideBarItem}>
                            <Typography variant="subtitle2">
                                Last Name
                            </Typography>
                            <Typography variant="subtitle2">
                                {tenantData['last_name']}
                            </Typography>
                        </div>
                        <Divider></Divider>
                        <div className={style.sideBarItem}>
                            <Typography variant="subtitle2">
                                Email
                            </Typography>
                            <Typography variant="subtitle2">
                                {tenantData['email']}
                            </Typography>
                        </div>
                        <Divider></Divider>
                        <div className={style.sideBarItem}>
                            <Typography variant="subtitle2">
                                Phone number
                            </Typography>
                            <Typography variant="subtitle2">
                                {tenantData['phone_number']}
                            </Typography>
                        </div>
                        <Divider></Divider>
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
                            <IconButton onClick={() => {setNoteModalOpen(true)}}>
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
                                    return <Note userId={value.userId} note={value.note} 
                                                created={value.created}/>
                                })
                            }
                        </div>
                    </div> 
                    <div className={style.tasksContainer}>
                        <div className={style.containerLabel}>
                            <Typography variant="h6" sx={{marginRight: '0.5em'}}>
                                Tasks
                            </Typography>
                            <IconButton onClick={() => {setTaskModalOpen(true)}}>
                                <AddIcon fontSize="small"/>
                            </IconButton>
                        </div>
                        <div className={style.content}>
                            {
                                tasks.length == 0 ? 
                                <div style={{height: '100%', display: 'flex', alignItems: 'center',
                                            flexDirection: 'column', justifyContent: 'center',
                                            color: 'gray', backgroundColor: 'rgb(245, 245, 245)',
                                            borderRadius: '0.5em'
                                            }}>
                                    
                                    <Typography variant="h6">No Tasks</Typography>
                                    <AssignmentTurnedInIcon fontSize="large"/>
                                </div> : <TaskTable tasks={tasks}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}