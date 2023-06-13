import { useEffect, useState } from "react";
import axios from "../../../node_modules/axios/index";
import Loading from "../../components/Loading";
import { useFetch } from "../../hooks/useFetch";
import { Car } from "../../types/Car";
import {useQuery} from 'react-query'
import { Container, Stack } from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import ActionAreaCard from "../../components/Card";
import VeiculoService from '../../services/VeiculoService'

export const Vitrine = () => {

    const [data, setData] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //Faz a requisição para a API
    VeiculoService.GetAll().then((response) => {
        console.log(response);
        setData(response[0]);
    }).catch((error) => {
        console.log(error);
        setError(error);
    }).finally(() => {
        setLoading(false);
    });

    return(
        <Container>
            <ResponsiveAppBar />
            {loading && <Loading />}
            <Stack spacing={2} direction="row" sx={{flexWrap: 'wrap', justifyContent: 'center'}}>
                {
                    data?.map((car) => (
                        <ActionAreaCard data={car}/>
                    ))
                }
            </Stack>
        </Container>
    )
}
