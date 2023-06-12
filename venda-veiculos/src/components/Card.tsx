import * as React from 'react';
import Card from  '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Car } from '../types/Car';
import {Arquivo} from '../types/Arquivo';

export interface CardProps {
  data: Car;
}

const ActionAreaCard = ({data}: CardProps) =>{
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={''}
          alt={''}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${data?.nome} - ${data?.modelo}`}
          </Typography>
          <Typography variant="body2" color="#3374db">
             {`Preço à vista - R$ ${data?.preco.toString()}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;