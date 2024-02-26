import { useState } from 'react';
import styles from './images.module.css';
import {IconButton} from '@mui/material';
import {Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Images({images, setImages}) {
    const [imageNames, setImageNames] = useState([]);

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function deleteImg(ind) {
        if(ind == 0) {
            imageNames.shift();
            images.splice();
        } else {
            imageNames.splice(ind, ind);
            images.splice(ind, ind);
        }
        setImageNames([...imageNames]);
        setImages([...images]);
    }

    function drop(ev) {
        const file = ev.dataTransfer.files[0];
        const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
        if (allowedFileTypes.includes(file.type)) {
            let url = URL.createObjectURL(file);
            images.push(file);
            setImages(images);
            setImageNames([...imageNames, file.name]);
            ev.preventDefault();
        }
    }


    return (
        <div className={styles.main} onDrop={(ev) => drop(ev)}
                 onDragOver={(ev) => {
                    allowDrop(ev);
                 }}>
            <div className={styles.imageUpload}>
                <div className={styles.imgUploadContainerInfo}>
                    <Typography variant='h5'>Upload Images</Typography>
                </div>
                <div className={styles.fileParentContainer}>
                    <div className={styles.uploadImages}>
                        <CloudUploadIcon 
                            sx={{marginRight: '0.3em'}}/>
                        <Typography variant='subtitle1'>
                            Drag and Drop Files Here
                        </Typography>
                    </div>
                    <div className={styles.uploadedFiles}>
                        {
                            imageNames.map((val, ind) => {
                                return (
                                    <div key = {ind} className={styles.file}>
                                        <Typography variant='subtitle1'>{val}</Typography>
                                        <IconButton onClick={()=>deleteImg(ind)}>
                                            <DeleteIcon sx={{color: 'white'}}/>
                                        </IconButton>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}