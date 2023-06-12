import { Arquivo } from "./Arquivo"

export type Car = {
    id?: string,
    nome: string,
    modelo: string,
    marca: string,
    ano: number,
    status: number,
    preco: number,
    quilometragem: string,
    Fotos?: Arquivo[] | null
}