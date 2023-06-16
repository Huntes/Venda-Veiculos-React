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
  onClick: (car: Car) => void;
}

const ActionAreaCard = ({data, onClick }: CardProps) =>{
    const [isHovered, setIsHovered] = React.useState(false)

    const handleClick = () => { 
      onClick(data) 
    }

    console.log(data)

    //Efeitos Hover
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

  return (
    <Card sx={{ maxHeight: 255, width: 250, maxWidth: 345, margin: 2, padding: 0, textDecoration: isHovered ? 'underline' : 'none', title: isHovered ? 'Clique para ver mais detalhes' : ''}} 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data?.fotos?.[0]?.path ?? 'src/assets/images/imageCar.jpg'}
          alt={''}
        />
        <CardContent>
          <Typography sx={{ maxHeight: '35px', overflow: 'auto' }} gutterBottom variant="h5" component="div">
            {`${data?.nome} - ${data?.modelo}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${data?.marca.toString()} - ${data?.ano.toString()} - ${data?.quilometragem.toString()} km`}
          </Typography>
          <Typography variant="body2" sx={{color:"#3374db"}}>
             {`Preço à vista - R$ ${data?.preco.toString()}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;