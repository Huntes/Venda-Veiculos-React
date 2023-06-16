import { Base } from "./Base";

export type Arquivo = Base & {
    id?: string,
    nome: string,
    tipo: string,
    path: string,
}