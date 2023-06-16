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
import Swal from 'sweetalert2';
import { CarroArquivo } from '../../types/CarroArquivo';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import ArquivoService from '../../services/ArquivoService';

const token = localStorage.getItem('token');

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

export const EditVeiculo = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [car, setCar] = useState<Car>({} as Car);
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [carrosArquivos, setCarrosArquivos] = useState<CarroArquivo[]>([]);

  if(!token) {
    window.location.href = '/Login';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {response, error, loading} = await VeiculoService.Get(id ?? '');
        if(response) {
          setCar(response as Car);
        }else if(error) {
          setError(error);
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar os carros, por favor tente novamente',
          });
        }
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao enviar arquivo',
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    }; 
    fetchData();
  }, []);

  const handleRemoveImage = (index: number) => {
    setCar((prevCar) => ({
      ...prevCar,
      fotos: prevCar.fotos?.filter((_, i) => i !== index) || []
    }));
  };
  

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files ?? null;
    if (!file) return;
  
    for (let i = 0; i < file.length; i++) {
      const convertedImage = await ImageConverter.convertImageToBase64(file[i] as File);
      const newFoto = {
        nome: file[i].name ?? `Foto ${i + 1}`,
        tipo: file[i].type ?? 'image/jpeg',
        path: convertedImage,
      } as Arquivo;
      setCar((prevCar) => ({
        ...prevCar,
        fotos: [...(prevCar.fotos || []), newFoto],
      }));
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

  const handleSubmit = async () => {
    
    setLoading(true);

    car.fotos?.forEach((foto) => {
      foto.nome = foto.nome ?? 'Foto';
      foto.tipo = foto.tipo ?? 'image/jpeg';
    });

    try {
      const {response, error, loading} = await VeiculoService.Update(id ?? '', car);
      if(response) {
        console.log(response)
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
        title: 'Erro ao editar carro',
        text: error.message,
      });
    } 

    let arquivoCarro = {
      idCarro: id ?? '',
      arquivos: car.fotos ?? [],
    }

    try{
      const {response, error, loading} = await ArquivoService.UploadFilesCar(arquivoCarro);
      if(response) {
          
      }else if(error) {
        setError(error);
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Erro ao atualizar arquivos de foto do carro. Por favor, tente novamente mais tarde.',
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar arquivos de foto do carro',
        text: error.message,
      });
    } 

    setLoading(false);

    Swal.fire({
      icon: 'success',
      title: 'Carro atualizado com sucesso',
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
            Editar Veículo
          </Typography>
          </Stack>
          <form className={classes.form}>
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
              <Grid item xs={12} maxHeight={250} maxWidth={250}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {car.fotos && car.fotos.length > 0 ? (
                    <Carousel showThumbs={false} width={'550px'}>
                      {car.fotos.map((foto, index) => (
                        <div key={index} style={{ height: '250px', position: 'relative', maxWidth: '550px' }}>
                          <img
                            src={foto.path ?? '../src/assets/images/imageCar.jpg'}
                            alt={`Foto ${index + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <Button
                            variant="contained"
                            onClick={() => handleRemoveImage(index)}
                            style={{
                              position: 'absolute',
                              bottom: '10px',
                              right: '10px',
                              zIndex: 1,
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                      ))}
                    </Carousel>
                  ) : (
                    <Typography variant="body2">
                      <img style={{height: '250px', width: '550px', objectFit: 'cover'}} title='Sem fotos adicionadas' src='../src/assets/images/imageCar.jpg' />
                    </Typography>
                  )}
                </div>
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
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={(e) => handleSubmit()}
                >
                  Atualizar
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
