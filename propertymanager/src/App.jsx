import { createContext, useContext, useEffect, useState } from 'react';
// import Login from './authentication/Login';
import './index.css';
import Drawer from './components/drawer/Drawer';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {Box, Modal, TextField, Button, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsModal from './settings/SettingsModal';

const CredInfoCtx = createContext();

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '50%',
  width: '30%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column'
};

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [accountId, setAccountId] = useState(1);
  const [selected, setSelected] = useState();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if(!signedIn && location.pathname !== '/login') {
      navigation('/login', {state: location.pathname});
    }
  });

  return (
    <>
      <SettingsModal open={settingsModalOpen} setOpen={setSettingsModalOpen}/>
      <div className="parent">
        {
          location.pathname === '/login' ? null: 
          <Drawer 
            selected = {selected} setSelected = {setSelected}
            setOpen = {setSettingsModalOpen} userData = {userData}
            accountId = {accountId} setAccountId = {setAccountId}
          />
        }
        <div className="content-container">
          <div className="main-content">
            <CredInfoCtx.Provider value={{signedIn, setSignedIn,
                                          userData, setUserData,
                                          accountId, setAccountId
                                        }}>
              <Outlet key={accountId}/>
            </CredInfoCtx.Provider>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
export {CredInfoCtx};
