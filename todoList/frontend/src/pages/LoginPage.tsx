
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { SERVICE_URL } from "../constants/const";
import { saveLoginInfo } from "../common/auth";


const LoginPage = () => {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "450px",
    width: "400px",
    variant: "outlined",
  };

  const onClickLogin = async () => {
    setErrorMsg("");
    try {
      await login();
      navigate("Layout");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorMsg(e.message);
      } else {
        setErrorMsg("ログインに失敗しました");
      }
    }
  };

  const login = async () => {
    const res = await fetch(SERVICE_URL.BASE_URL + "api/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error ?? "ユーザーIDまたはパスワードが正しくありません");
    }

    const data = await res.json();
    saveLoginInfo(data);
  };


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
                      label="ユーザーID"
                      placeholder="ユーザーID"
                      margin="normal"
                      onChange={(e) => setUserId(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      id="password"
                      type="password"
                      label="パスワード"
                      placeholder="パスワード"
                      margin="normal"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMsg && (
                      <Typography color="error" variant="body2" mt={1}>
                        {errorMsg}
                      </Typography>
                    )}
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
