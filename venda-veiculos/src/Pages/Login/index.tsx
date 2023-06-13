import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';


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

export const Login = () => {
  const classes = useStyles();

  const handleLogin = () => {
    // Lógica de autenticação aqui...

    window.location.href = '/';
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
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Senha"
                type="password"
                fullWidth
                required
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



