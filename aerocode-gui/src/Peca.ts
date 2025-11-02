import { TipoPeca, StatusPeca } from "./enums";

export class Peca {
    nome: string;
    tipo: TipoPeca;
    fornecedor: string;
    status: StatusPeca;

    constructor(nome: string, tipo: TipoPeca, fornecedor: string) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = StatusPeca.EM_PRODUCAO; // Toda nova peça começa em produção
    }

    /**
     * Atualiza o status da peça.
     */
    atualizarStatus(novoStatus: StatusPeca): void {
        this.status = novoStatus;
        // console.log removido
    }
}