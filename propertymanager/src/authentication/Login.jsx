import styles from "./login.module.css";
import TextField from "@mui/material/TextField";
import {Button, Typography} from "@mui/material"
import { useContext, useEffect, useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import { CredInfoCtx } from "../App";
import getCookie from "../utils/getCookie";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signInContext = useContext(CredInfoCtx);
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if(signInContext.signedIn) {
      console.log(location.state);
      if(location.state) {
        navigation(location.state);
      } else {
        navigation('/');
      }
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
            if(res.status === 200) {
              res.json().then(data => {
                signInContext.setSignedIn(true);
                signInContext.setUserData({...data});
                signInContext.setAccountId(data.accounts[0].id);
                navigation(nextPage);
              })
            }
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
      response.json().then(data => {
        let now = new Date();
        let time = now.getTime();
        let expireTime = time + 1000*36000;
        now.setTime(expireTime);
        document.cookie = `refresh=${data.refresh};expires=${now.toUTCString()};path=/`;
        signInContext.setSignedIn(true);
        signInContext.setUserData({...data});
        signInContext.setAccountId(data.accounts[0].id);
        navigation(nextPage);
      })
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
