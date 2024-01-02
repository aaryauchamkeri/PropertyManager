import styles from "./login.module.css";
import TextField from "@mui/material/TextField";
import {Button, Typography} from "@mui/material"
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { CredInfoCtx } from "../App";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signInContext = useContext(CredInfoCtx);
  const navigation = useNavigate();

  useEffect(() => {
    console.log(signInContext.signedIn);
    if(signInContext.signedIn) {
      navigation('/');
    }
  });
  
  async function verify() {
    console.log(username + ' ' + password);
    let response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": username, "password": password})
    });
    if(response.status === 200) {
      console.log(await response.json());
      signInContext.setSignedIn(true);
      navigation('/');
    }
  }

  return (
    <div className={styles.parent}>
      <div className={styles.card}>
        <Typography variant = "h4">Sign In</Typography>
        <div className={styles.infoContainer}>
          <TextField id = "outlined-basic" label = "Username" variant="outlined" sx={{margin: '0.5em'}}
            onChange={(e) => {setUsername(e.target.value)}}/>
          <TextField id = "outlined-basic" label = "Password" variant="outlined" sx={{margin: '0.5em'}}
            onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div>
          <Button variant = "text" onClick={verify}>Go!</Button>
        </div>
      </div>
    </div>
  )
}
