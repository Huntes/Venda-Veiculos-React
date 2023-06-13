import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ResponsiveAppBar from '../../components/AppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Faz o formulário ocupar toda a largura disponível
  },
}));

export const CadastroVeiculo = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container maxWidth="xs">
      <ResponsiveAppBar />
        <Typography variant="h4" align="center" gutterBottom>
          Cadastrar Novo Veículo
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
                label="Marca"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Modelo"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ano"
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Preço"
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quilometragem"
                type="number"
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
