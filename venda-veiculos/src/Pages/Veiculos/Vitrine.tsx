import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Car } from "../../types/Car";
import { Container, Stack, Box, Divider } from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import ActionAreaCard from "../../components/Card";
import VeiculoService from "../../services/VeiculoService";
import Swal from "sweetalert2";

export const Vitrine = () => {
  const [data, setData] = useState<Car[] | any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {response, error, loading} = await VeiculoService.GetAll();
        if(response) {
          setData(response as Car[]);
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

    const clickCard = (car: Car) => {
        window.location.href = `/detalhes-veiculo/${car.id}`;
        //history.pushState(car, '', `/detalhes-veiculo/${car.id}`);
        //history.go(0);
    }

    return (
        <Container sx={{ minHeight: "100vh", minWidth: "100vw", padding: "0", backgroundColor: "#fff" }}>
          <ResponsiveAppBar />
          {loading &&(
            <Box mt={4} textAlign="center">
              <Loading/>
            </Box>
          )}
          {error && (
            <Box mt={4} textAlign="center">
              Erro ao carregar os carros. Por favor, tente novamente mais tarde.
            </Box>
          )}
          <Stack
            // spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start" // Alteração aqui para alinhar ao topo
            mt={4}
            sx={{
              flexWrap: "wrap",
               "& > *": { flex: "0 0 calc(18% - 5px)" }, // Componente ocupando 18% da largura da tela, com 5px de margem entre eles
               my: 2,
            }}
          >
            {data?.map((car) => (
              <ActionAreaCard data={car} key={car.id} onClick={clickCard} />
            ))}
          </Stack>
        </Container>
      );
};
