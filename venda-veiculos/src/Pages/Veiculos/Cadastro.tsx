import axios from "axios";
import { useQuery } from "react-query";
import { Car } from "../../types/Car";
import { Container } from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import Loading from "../../components/Loading";

export const CadastroVeiculo = () => {

    const {data, loading} = useQuery<Car[]>('carros', async () => {
        const response = await axios.get(`https://localhost:5501/api/Vehicles/getAll`)
        console.log(response.data);
        return response.data;
    }, { 
        refetchOnWindowFocus: true,
    });

    return(
        <Container>
            <ResponsiveAppBar />
            {loading && <Loading />}
            
        </Container>
    )
};