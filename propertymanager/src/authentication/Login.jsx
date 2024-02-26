import styles from "./login.module.css";
import TextField from "@mui/material/TextField";
import {Button, Typography} from "@mui/material"
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { CredInfoCtx } from "../App";
import getCookie from "../utils/getCookie";

export default function Login({nextPage = '/'}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signInContext = useContext(CredInfoCtx);
  const navigation = useNavigate();

  useEffect(() => {
    if(signInContext.signedIn) {
      navigation(nextPage);
    }
  });

  useEffect(() => {
    if(!signInContext.signedIn) {
      let refreshTkn = getCookie('refresh');
      if(refreshTkn) {
          let response = fetch('http://localhost:3000/token/refresh?' + new URLSearchParams(
            {
              refreshToken: refreshTkn
            }
          ), {
            method: 'get'
          });
          response.then(async (res) => {
            let data = await res.json();
            signInContext.setSignedIn(true);
            signInContext.setUserData({...data});
            navigation(nextPage);
          }).catch(err => {
            console.log(err);
          })
      }
    }
  }, [])
  
  async function verify() {
    let response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": username, "password": password})
    });
    if(response.status === 200) {
      let data = await response.json();
      document.cookie = `refresh=${data.refresh}`;
      signInContext.setSignedIn(true);
      signInContext.setUserData({...data});
      navigation(nextPage);
    }
  }

  return (
    <div className={styles.parent}>
      <div className={styles.card}>
        <Typography variant = "h4">Sign In</Typography>
        <div className={styles.infoContainer}>
          <TextField label = "Username" variant="outlined" sx={{margin: '0.5em'}}
            onChange={(e) => {setUsername(e.target.value)}}/>
          <TextField label = "Password" variant="outlined" type="password"
            sx={{margin: '0.5em'}} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div>
          <Button variant = "text" onClick={verify}>Go!</Button>
        </div>
      </div>
    </div>
  )
}
