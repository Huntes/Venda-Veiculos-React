import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importe os estilos do carrossel
import { Carousel } from 'react-responsive-carousel'; // Importe o componente Carousel
import ResponsiveAppBar from '../../components/AppBar';

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

  const images = [
    'src/assets/images/imageCar.jpg',
    'src/assets/images/imageCar.jpg',
    'src/assets/images/imageCar.jpg',
  ];

  return (
    <div className={classes.container}>
      <Container maxWidth="lg">
      <ResponsiveAppBar />
        <Typography variant="h4" marginTop="25" align="center" gutterBottom>
          Chevrolet GM
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Carousel showThumbs={false} showStatus={false}> 
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Imagem ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </Grid>
          <Grid container maxWidth="lg" justifyContent="center" item>
            <Card className={classes.cardContainer}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                  Nome: Nome do Veículo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Marca: Marca do Veículo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Modelo: Modelo do Veículo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Ano: Ano do Veículo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: Status do Veículo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Preço: Preço do Veículo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quilometragem: Quilometragem do Veículo
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

