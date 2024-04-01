import { useContext, useEffect, useState } from "react";
import style from "./viewProperty.module.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CredInfoCtx } from "../../App";
import {Typography, Divider, Pagination, Chip, IconButton, Modal, Box} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HistoryIcon from '@mui/icons-material/History';
import Note from "./Note";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import NoteModal from "./NoteModal";
import FileModal from "./FileModal";

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


export default function ViewProperty() {
    const navigator = useNavigate();
    const [propertyData, setPropertyData] = useState({});
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
        fetch(`http://localhost:3000/properties/view?propertyId=${id}`, {
                    method: "GET",
                    headers: { 
                        'Authorization': `Bearer ${infoContext.userData.auth}`,
                        'accountId': infoContext.accountId
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
                        'accountId': infoContext.accountId
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
                'accountId': infoContext.accountId
            }
        }).then(res => {
            res.json().then(jsonData => {
                jsonData.sort((first, second) => {
                    if(new Date(first.deadline).getTime() < new Date(second.deadline).getTime()) {
                        return -1;
                    }
                    return 1;
                });
                setTasks(jsonData);
                console.log(jsonData);
            })
        });

        fetch(`http://localhost:3000/properties/files?propertyId=${id}`, {
            method: 'GET', 
            headers: {
                'Authorization' : `Bearer ${infoContext.userData.auth}`,
                'accountId': infoContext.accountId
            }
        }).then(res => {
            res.json().then(jsonData => {
                console.log(jsonData);
                setFiles(jsonData);
            })
        });

        fetch(`http://localhost:3000/properties/notes/${id}`, {
            method: 'GET', 
            headers: {
                'Authorization' : `Bearer ${infoContext.userData.auth}`,
                'accountId': infoContext.accountId
            }
        }).then(res => {
            res.json().then(jsonData => {
                console.log(jsonData);
                setNotes(jsonData);
            })
        });

        fetch(`http://localhost:3000/activity/property?propertyId=${id}`, {
            method: 'GET',
            headers: {
                'accountId': infoContext.accountId,
                'Authorization': `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then(json => {
            json.reverse();
            setActivity(json);
        }).catch(err => {
            console.log(err);
        });

    }, []);

    const markTaskDone = async (taskId) => {
        if(confirm('Are you sure you would like to mark this task as done?')) {
            try {
                await fetch(`http://localhost:3000/properties/completeTask?taskId=${taskId}`, {
                    method: 'GET',
                    headers: {
                        'accountId': infoContext.accountId,
                        'Authorization': `Bearer ${infoContext.userData.auth}`
                    }
                });
            } catch (err) {
    
            }
        }
    }

    return (
        <>
            <FileModal open={fileModalOpen} setOpen={setFileModalOpen} propertyId={id}/>
            <TaskModal open={taskModalOpen} setOpen={setTaskModalOpen} propertyId={id}/>
            <NoteModal open={noteModalOpen} setOpen={setNoteModalOpen} propertyId={id}/>
            <div className={style.parent}>
                <div className={style.propertyInformationSideBar}>
                    <Typography variant='h4' color={'rgb(120, 120, 120)'}
                        fontWeight={100}
                    >
                        {propertyData.address}
                    </Typography>
                    <div className = {style.imageContainer}>
                        <img src = {`http://localhost:3000/media/${images[photoNumber]}`}/>
                    </div>
                    <Pagination count={images.length} sx={{marginTop: '0.5em'}}
                        onChange={paginationChange}
                    />
                    <div className={style.statusContainer}>
                        <Typography variant="h6" fontWeight="bold"
                                    sx={{color: 'gray', textDecoration: 'underline'}}
                        > 
                            Details: 
                        </Typography>
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
                            <IconButton onClick={() => {setFileModalOpen(true)}}>
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
                                    </div> : files.map(file => {
                                                return (
                                                    <>
                                                        <Link onClick={
                                                            () => {
                                                                let fileExt = file.mime.split('/')[1];
                                                                let fileName = file.id + '.' + fileExt;
                                                                window.open(`http://localhost:3000/media/${fileName}`, "_blank")
                                                            }}
                                                        >
                                                            <Box sx={{width: '100%', display: 'flex',
                                                                    flexDirection: 'row', justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    ":hover" :{bgcolor:'#fafafa'}
                                                            }}>
                                                                <Typography variant="subtitle1"
                                                                    sx={{overflow: 'hidden',
                                                                        textWrap: 'nowrap'
                                                                        }}
                                                                >
                                                                    {file.fileName}
                                                                </Typography>
                                                            </Box>
                                                            <Divider/>
                                                        </Link>
                                                    </>
                                                ) 
                                            })
                            }
                        </div>
                    </div>
                    <div className={style.activityContainer}>
                        <div className={style.containerLabel}>
                            <HistoryIcon sx={{marginRight: '0.5em'}}/>
                            <Typography variant="h6" sx={{marginRight: '0.5em'}}>
                                Activity
                            </Typography>
                        </div>
                        <div className={style.content}>
                            {
                                activity.length == 0 ? 
                                <div style={{height: '100%', display: 'flex', alignItems: 'center',
                                            flexDirection: 'column', justifyContent: 'center',
                                            color: 'gray',  backgroundColor: 'rgb(245, 245, 245)',
                                            borderRadius: '0.5em'
                                            }}>
                                    
                                    <Typography variant="h6">No Recent Activity</Typography>
                                    <HistoryIcon fontSize="large"/>
                                    
                                </div> : activity.map(elem => {
                                            return (
                                                <Box sx={{
                                                    width: '100%', borderBottom: 'solid 1px gray',
                                                    paddingLeft: '0.5em', display: 'flex', flexDirection: 'column'
                                                }}> 
                                                    <Box sx={{
                                                        display: 'flex', justifyContent: 'space-between',
                                                        overflowX: 'hidden'
                                                    }}>
                                                        <Typography variant='subtitle1' sx={{color: 'gray'}}>
                                                            {elem.first_name + ' ' + elem.last_name + ' ' + elem.message}
                                                        </Typography>
                                                        <Typography variant='subtitle1' color='gray'>
                                                            {new Date(elem.created).toDateString()}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            )
                                        })   
                            }
                        </div>
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
                                </div> : <TaskTable tasks={tasks} complete={markTaskDone}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}