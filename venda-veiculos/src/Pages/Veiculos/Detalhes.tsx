import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ResponsiveAppBar from '../../components/AppBar';
import { Car } from '../../types/Car' // Importe o tipo Car
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';
import VeiculoService from '../../services/VeiculoService';

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
  cardContent: {
    
  },
}));



export const DetalhesVeiculo = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [car, setCar] = useState<Car>();
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  const images = [
    '../src/assets/images/imageCar.jpg',
  ];


  VeiculoService.Get(id ?? '').then((response) => {
    console.log(response);
      setCar(response[0]);
    }).catch((error) => {
        console.log(error);
        setError(error);
    }).finally(() => {
        setLoading(false);
    });


  if (loading) {
    return <Loading />; // Renderizar um componente de carregamento enquanto os dados são buscados
  }

  if(error) {
    return (
      <div>
        <span>Erro ao carregar dados</span>
        <span>{error}</span>
      </div>
    )
  }

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
              { car?.Fotos != null 
              ?
                car?.Fotos?.map((image, index) => (
                  <div key={index}>
                    <img src={image.base64 || 'src/assets/images/imageCar.jpg'} alt={`Imagem ${index + 1}`} />
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
      </Container>
    </div>
  );
};
