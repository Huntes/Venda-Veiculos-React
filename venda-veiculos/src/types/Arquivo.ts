import { Base } from "./Base";

export type Arquivo = Base & {
    id?: string,
    nome: string,
    tipo: string,
    base64: string,
}