import { useEffect, useState } from "react";
import axios from "../../../node_modules/axios/index";
import Loading from "../../components/Loading";
import { useFetch } from "../../hooks/useFetch";
import { Car } from "../../types/Car";
import {useQuery} from 'react-query'
import { Container, Stack } from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import ActionAreaCard from "../../components/Card";

export const Vitrine = () => {

    //Faz a requisição para a API
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
