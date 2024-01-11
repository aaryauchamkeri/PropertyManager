import { createContext, useContext, useEffect, useState } from 'react';
// import Login from './authentication/Login';
import './index.css';
import Drawer from './components/drawer/Drawer';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const CredInfoCtx = createContext();

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [authKey, setAuthKey] = useState();
  const [accounts, setAccounts] = useState();
  const [selected, setSelected] = useState();
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if(!signedIn && location.pathname !== '/login') {
      navigation('/login');
    }
  });

  return (
    <div className="parent">
      {
        location.pathname === '/login' ? null: <Drawer 
          selected = {selected} setSelected = {setSelected}/>
      }
      <div className="content-container">
        <div className="accessibility">

        </div>
        <div className="main-content">
          <CredInfoCtx.Provider value={{signedIn, setSignedIn,
                                        authKey, setAuthKey,
                                        accounts, setAccounts,
                                        username, setUsername,
                                        firstName, setFirstName,
                                        lastName, setLastName,
                                        email, setEmail
                                      }}>
            <Outlet/>
          </CredInfoCtx.Provider>
        </div>
      </div>
    </div>
  )
}

export default App;
export {CredInfoCtx};
