import { useTranslation } from 'react-i18next';
import {Typography, Icon} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function NestedParentDrawerListComponent({icon, label, collapsed, onclick}) {
    const { i18n, t } = useTranslation();
    return (
        <ListItem sx={{margin: '0em 0 0.5em 0', backgroundColor: 'rgb(243, 243, 243)', padding: 0, borderRadius: '0.8em'}}>
            <ListItemButton onClick={onclick} sx={{borderRadius: '0.5em'}}> 
                {icon}
                <ListItemText>
                    <Typography variant="body2" sx={{marginLeft: '0.3em'}}>{label}</Typography>
                </ListItemText>
                {collapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
            </ListItemButton>
        </ListItem>
    )
}