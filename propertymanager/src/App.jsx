import { createContext, useContext, useEffect, useState } from 'react';
// import Login from './authentication/Login';
import './index.css';
import Drawer from './components/drawer/Drawer';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const CredInfoCtx = createContext();

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [selected, setSelected] = useState();
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if(1 === 1) {
      
    } else if(!signedIn && location.pathname !== '/login') {
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
          <CredInfoCtx.Provider value={{signedIn, setSignedIn}}>
            <Outlet/>
          </CredInfoCtx.Provider>
        </div>
      </div>
    </div>
  )
}

export default App;
export {CredInfoCtx};
