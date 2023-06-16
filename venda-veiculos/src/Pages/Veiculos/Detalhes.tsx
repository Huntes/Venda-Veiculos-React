import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ResponsiveAppBar from '../../components/AppBar';
import { Car } from '../../types/Car' // Importe o tipo Car
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';
import VeiculoService from '../../services/VeiculoService';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 1200,
  },
  cardMedia: {
    height: 300,
  },
  cardContent: {},
  buttonContainer: {
    margin: 5,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
  },
}));



export const DetalhesVeiculo = () => {
  const classes = useStyles();

  const token = localStorage.getItem('token');

  const { id } = useParams();
  const [car, setCar] = useState<Car>();
  const [error, setError] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

  const images = [
    '../src/assets/images/imageCar.jpg',
  ];

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
            title: 'Erro ao carregar carro selecionado, por favor tente novamente',
          });
        }
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar carro',
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    }; 
    fetchData();
  }, []);

  const handleEdit = () => {
    window.location.href = `/editar-veiculo/${id}`;
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Deseja excluir este carro?',
      text: 'Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCar();
      }
    });
  };

  const deleteCar = async () => {
    try {
      await VeiculoService.Delete(id ?? '');
      Swal.fire({
        icon: 'success',
        title: 'Carro excluído com sucesso',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = '/';
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao excluir o carro',
        text: error.message,
      });
    }
  };


  if (loading) {
   return <Container sx={{
              minHeight: "100vh", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center",
              alignContent: "center", 
              alignItems: "center"
          }}>
              <Loading />
          </Container> 
  }

  if(error) {
    return (
      <div>
        <span>Erro ao carregar dados</span>
        <span>{error}</span>
      </div>
    )
  }

  console.log(car)
  return (
    <div className={classes.container}>
      <Container  sx={{ minHeight: "100vh", minWidth: "100vw", padding: "0", backgroundColor: "#fff" }}>
        <ResponsiveAppBar />
        <Typography variant="h4" marginTop="25" align="center" gutterBottom>
          {car?.marca}
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Carousel showThumbs={false} showStatus={false}>
              { car?.fotos != null 
              ?
                car?.fotos?.map((image, index) => (
                  <div key={index}>
                    <img src={image?.path || '../src/assets/images/imageCar.jpg'} alt={`Imagem ${index + 1}`} style={{ maxHeight: '400px', maxWidth: '600px', objectFit: 'fill' }}/>
                  </div>
                )) 
              : 
                images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Imagem ${index + 1}`} />
                  </div>
                ))
              }
            </Carousel>
          </Grid>
          <Grid container maxWidth="lg" justifyContent="center" item>
            <Card className={classes.cardContainer}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                  Nome: {car?.nome}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Marca: {car?.marca}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Modelo: {car?.modelo}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ano: {car?.ano}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {car?.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Preço: {car?.preco}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quilometragem: {car?.quilometragem}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        { token != null 
        ?
        <div className={classes.buttonContainer}>
          <Button variant="contained" size='large' color="primary" onClick={handleEdit}>
            Editar
          </Button>
          <Button variant="contained" size='large' color="secondary" onClick={handleDelete}>
            Deletar
          </Button>
        </div>
        :
        <></>
        }
      </Container>
    </div>
  );
};
