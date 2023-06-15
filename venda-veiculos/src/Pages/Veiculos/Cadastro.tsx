import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
import { Car } from '../../types/Car';
import { Arquivo } from '../../types/Arquivo';
import Loading from '../../components/Loading';
import VeiculoService from '../../services/VeiculoService';
import ArquivoService from '../../services/ArquivoService';
import Swal from 'sweetalert2';
import CarroArquivoService from '../../services/CarroArquivoService';
import { CarroArquivo } from '../../types/CarroArquivo';

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
  const [car, setCar] = useState<Car>({} as Car);
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [carrosArquivos, setCarrosArquivos] = useState<CarroArquivo[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files ?? null;
    if(!file) return;

    for(let i = 0; i < file.length; i++) {
      let arq = {
        nome: file[i].name,
        tipo: file[i].type,
        base64: await ImageConverter.convertImageToBase64(file[i] as File),
      } as Arquivo;

      setArquivos((prevArquivos) => [...prevArquivos, arq]);
      console.log(arquivos)
    }
  };

  const PopulaCarrosArquivos = () => {
    let carrosArquivosAux: CarroArquivo[] = [];

    for(let i = 0; i < arquivos.length; i++) {
      let carArq = {
        IdCarro: car.id ?? '',
        IdArquivo: arquivos[i].id ?? '',
      } as CarroArquivo;

      carrosArquivosAux.push(carArq);
    }
    console.log('chegou aqui');
    setCarrosArquivos(carrosArquivosAux);
    console.log(arquivos);
    console.log(car);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setLoading(true);

    try {
      const {response, error, loading} = await VeiculoService.Insert(car);
      if(response) {
        setCar(response);
      }else if(error) {
        setError(error);
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar os carros. Por favor, tente novamente mais tarde.',
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar arquivo',
        text: error.message,
      });
    } 
  
    
    
    try{
      const {response, error, loading} = await ArquivoService.UploadFiles(arquivos);
      if(response) {
        setArquivos(response);
      }else if(error) {
        setError(error);
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar os carros. Por favor, tente novamente mais tarde.',
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar arquivo',
        text: error.message,
      });
    } 
    
    PopulaCarrosArquivos();



    try{
      const {response, error, loading} = await CarroArquivoService.InsertFiles(carrosArquivos);
      if(response) {
        console.log(response);
      }else if(error) {
        setError(error);
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar os arquivos. Por favor, tente novamente mais tarde.',
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar arquivo',
        text: error.message,
      });
    }

    setLoading(false);

    Swal.fire({
      icon: 'success',
      title: 'Carro salvo com sucesso',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/`;
      } 
    });
  };

  return (
    <div className={classes.container}>
      <Container sx={{ minHeight: "100vh", minWidth: "100vw", padding: "0", backgroundColor: "#fff" }}>
      <ResponsiveAppBar />
      {
        loading == true 
        ?
          <Container sx={{minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center"}}>
          <Loading />
          </Container>
        : 
        <>
          <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}>
          <Image src="../src/assets/ico/VendaVeiculosV1.ico" width={100} height={100} rounded={true} />
          <Typography variant="h4" align="center" gutterBottom>
            Cadastrar Novo Veículo
          </Typography>
          </Stack>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Nome"
                  fullWidth
                  required
                  name="nome"
                  value={car.nome}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Marca"
                  fullWidth
                  required
                  name="marca"
                  value={car.marca}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Modelo"
                  fullWidth
                  required
                  name="modelo"
                  value={car.modelo}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Ano"
                  type="number"
                  fullWidth
                  required
                  name="ano"
                  value={car.ano}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Status"
                  fullWidth
                  required
                  name="status"
                  value={car.status}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Preço"
                  type="number"
                  fullWidth
                  required
                  name="preco"
                  value={car.preco}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Quilometragem"
                  type="number"
                  fullWidth
                  required
                  name="quilometragem"
                  value={car.quilometragem}
                  onChange={handleInputChange}
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
        </>
      }
      </Container>
    </div>
  );
}
