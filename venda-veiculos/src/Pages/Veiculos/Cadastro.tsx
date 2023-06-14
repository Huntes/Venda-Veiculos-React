import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Stack
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ResponsiveAppBar from '../../components/AppBar';
import { Image } from 'react-bootstrap';
import ImageConverter from '../../utils/imageConverter'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80vw', // Faz o formulário ocupar toda a largura disponível
    margin: 'auto',
  },
  fileInput: {
    display: 'none', // Esconde o input de arquivo
  },
  uploadButton: {
    marginTop: 2,
  },
}));

export const CadastroVeiculo = () => {
  const classes = useStyles();

  const [selectedImage, setSelectedImage] = useState<File>();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files ?? null;
    if(!file) return;
    file.item(0) && setSelectedImage(file.item(0) as File);
    console.log(ImageConverter.convertImageToBase64(file.item(0) as File));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para enviar o formulário
  };

  return (
    <div className={classes.container}>
      <Container sx={{ minHeight: "100vh", minWidth: "100vw", padding: "0", backgroundColor: "#fff" }}>
      <ResponsiveAppBar />
      <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}>
        <Image src="../src/assets/ico/VendaVeiculosV1.ico" width={100} height={100} rounded={true} />
        <Typography variant="h4" align="center" gutterBottom>
          Cadastrar Novo Veículo
        </Typography>
        </Stack>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nome"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Marca"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Modelo"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <TextField
                label="Preço"
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Quilometragem"
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                className={classes.fileInput}
                id="upload-image"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.uploadButton}
                >
                  Upload de Imagem
                </Button>
              </label>
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
