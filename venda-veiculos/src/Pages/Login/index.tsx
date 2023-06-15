import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Usuario } from '../../types/Usuario';
import LoginService from '../../services/LoginService';
import { Login } from '../../types/Login';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#e1f5fe',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Faz o formulário ocupar toda a largura disponível
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const [login, setLogin] = useState<Login>({} as Login);
  const [error, setError] = useState<any>(null);

  const handleLogin = async () => {
    try{
      const {response, error, loading} = await LoginService.Login(login);
      if(response) {
        localStorage.setItem('token', response);
        window.location.href = '/';
      }else if(error) {
        setError(error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao tentar realizar login.',
          text: error,
        });
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Erro ao tentar realizar login.',
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao realizar login',
        text: error.message,
      });
    } 
  };

  const handleCriarConta = () => {
    window.location.href = '/CadastroUsuario';
  }

  return (
    <div className={classes.container}>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                name="login"
                onChange={(e) => setLogin({...login, login: e.target.value ?? ''})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Senha"
                type="password"
                fullWidth
                required
                name="password"
                onChange={(e) => setLogin({...login, password: e.target.value ?? ''})}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
              >
                Entrar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleCriarConta}
              >
                Criar conta
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}



