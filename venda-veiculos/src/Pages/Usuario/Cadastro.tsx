import React, { ChangeEvent, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Usuario } from '../../types/Usuario';
import UsuarioService from '../../services/UsuarioService';
import Swal from 'sweetalert2';

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

export const CadastroUsuario = () => {
  const classes = useStyles();

  const [user, setUser] = useState<Usuario>({} as Usuario);

  const handlePossuiConta = () => {
    window.location.href = '/Login';
  };

  const handleLoja = () => {
    window.location.href = '/';
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {

    if (!user.nome || !user.email || !user.senha) {
      Swal.fire({
        icon: 'error',
        title: 'Preencha todos os campos.',
      });
      return;
    }

    try {
      const response = await UsuarioService.Create(user);
      console.log('Usuário cadastrado:', response);
        Swal.fire({
          icon: 'success',
          title: 'Usuario salvo com sucesso',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/Login`;
          } 
        });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar usuário',
        text: error.message,
        confirmButtonText: 'Ok',
      });
    }
  };

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
                name="nome"
                fullWidth
                required
                value={user.nome}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                fullWidth
                required
                value={user.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Senha"
                type="password"
                name="senha"
                fullWidth
                required
                value={user.senha}
                onChange={handleInputChange}
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
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleSubmit}
              >
                Cadastrar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleLoja}
              >
                Loja
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};
