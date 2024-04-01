import {Box, Tooltip} from '@mui/material';


export default function CustomEvent(eventInfo) {
    console.log(eventInfo);
    return (
        <Tooltip title={eventInfo.event.extendedProps.description}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5em', overflow: 'hidden',
                      color: 'white', backgroundColor: '#3495eb', padding: '0 0.5em 0 0.5em',
                      borderRadius: '0.4em', width: '100%'}}>
                <b>{eventInfo.timeText}</b>sdfsd
                <i style={{textOverflow: 'ellipsis'}}>{eventInfo.event.title}</i>
            </Box>
        </Tooltip>
    )
}