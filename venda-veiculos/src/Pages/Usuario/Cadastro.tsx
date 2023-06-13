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

export const CadastroUsuario = () => {
  const classes = useStyles();

    const handlePossuiConta = () => {
        window.location.href = '/Login';
    }

    const handleCadastrar = () => {
        window.location.href = '/';
    }

  return (
    <div className={classes.container}>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Usuário
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                fullWidth
                required
              />
            </Grid>
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
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePossuiConta}
              >
                Já possuo conta
              </Button>
            </Grid>
            <Grid item xs={12}>
            
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Cadastrar
              </Button>
            </Grid>
           
          </Grid>
        </form>
      </Container>
    </div>
  );
}
