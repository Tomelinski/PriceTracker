import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from "../../../api/Auth";
import RegisterSchema from '../../../schemas/RegisterSchema';
import {  useNavigate } from "react-router-dom";
import { AUTH_ROUTE } from "../../../constants/Constants";

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.status === 200) {
        navigate(AUTH_ROUTE.LOGIN); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                autoComplete="given-name"
                error={!!errors.firstName}
                {...register('firstName')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                autoComplete="family-name"
                error={!!errors.lastName}
                {...register('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                error={!!errors.email}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                error={!!errors.password}
                {...register('password')}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...register('confirmPassword')}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box align="center">
            <Grid item>
              <Typography align="center" mt={2}>
                Already have an account?{" "}
                <Link href={AUTH_ROUTE.LOGIN}>Sign in</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" mt={2}>
                Register an account with{" "}
                <Link href={AUTH_ROUTE.LOGIN_GOOGLE}>Google here</Link>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
