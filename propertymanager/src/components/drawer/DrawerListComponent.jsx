import { useTranslation } from 'react-i18next';
import {Typography, Icon} from '@mui/material';
import {Link} from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';

export default function DrawerListComponent({icon, label, link, ind, selected, setSelected}) {
    const { i18n, t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        if(location.pathname.startsWith(link)) {
            setSelected(ind);
        }
    })

    return (
        <Link to = {link} disabled style={{textDecoration: 'none', color: 'black'}}>
            <ListItem sx={{margin: '0em 0 0.5em 0', backgroundColor: 'white' /*'rgb(243, 243, 243)'*/, padding: 0, borderRadius: '0.8em'}}>
                <ListItemButton selected = {selected} onClick={setSelected} sx={{borderRadius: '0.5em'}}> 
                    {icon}
                    <ListItemText>
                        <Typography variant="body2" sx={{marginLeft: '0.3em'}}>{label}</Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </Link>
    )
}