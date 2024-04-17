import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";



export default function AccountSelectBuffer() {
    
    return (
        <Box sx={{height: '100%', width: '100'}}>
            <Outlet/>
        </Box>
    )
}