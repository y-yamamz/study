
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


const LoginPage = () => {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "450px",
    width: "400px",
    variant: "outlined",
  };

  interface UserForm{
    id:string;
    name:String;
    password:string;
  }

  const onClickLogin = async () => {
    try{
      const re:string = await sendUser();
      if(re === "OK"){
        navigate("Layout");
      }
    }catch(e){
      console.log("エラー")
    }
    
  };
  

  const sendUser = async ():Promise<string>  => {
    var result:string = "";
     console.log(result);

      const data: UserForm = {
        id:userId,
        name:"dd",
        password:password,
      }

      const res = await fetch("http://localhost:8080/backend/api/userLogin", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
      } );

      result = await res.text();

      return result;
  }


  return (
    <>
      <div >
        <Header/>
        <Box 
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={0}
            >
              <Card style={cardStyle}>
                <CardHeader title="ログインページ" />
                <CardContent>
                  <div>
                    <TextField
                      fullWidth
                      id="username"
                      type="email"
                      label="Username"
                      placeholder="Username"
                      margin="normal"
                      onChange={(e) => setUserId(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="Password"
                      margin="normal"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={onClickLogin}
                  >
                    Login
                  </Button>
                </CardActions>
              </Card>
            </Box>

        </div>
    </>
    )
}

export default LoginPage