import { Base } from "./Base";

export type UsuarioArquivo = Base & {
    id?: string,
    usuarioId: string,
    arquivoId: string,
}