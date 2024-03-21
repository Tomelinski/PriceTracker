import React, { useContext, useState } from "react";
import {
  TextField, Button, Grid, Typography, Box,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { URL } from "../../api/Config";
import { loginUser, getGoogleUser } from "../../api/Auth";
import AuthContext from "../../context/authContext";
import { AUTH_ROUTE } from "../../constants/Constants";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = useContext(AuthContext);

  const loginGoogle = async () => {
    const response = await getGoogleUser().catch((err) => {
      console.log("An Error has occurred while authenticating:", err);
    });

    if (response) {
      auth.login(response, response.id);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({ email, password });
      auth.login({ email, password }, token);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToGoogle = async () => {
    let timer;
    const googleLoginURL = URL + AUTH_ROUTE.LOGIN_GOOGLE;
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500, height=600",
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          loginGoogle();

          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <Box mt={3}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack spacing={2} component="div">
              <TextField
                fullWidth
                required
                label="email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </Stack>
          </form>
          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={redirectToGoogle}
            >
              Login with Google
            </Button>
          </Box>
          <Box mt={2} align="center">
            <p>
              Don&apos;t have an account?
              {' '}
              <a href={AUTH_ROUTE.REGISTER}>Register here</a>
            </p>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
