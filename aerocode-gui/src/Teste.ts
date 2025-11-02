// src/Teste.ts
import { TipoTeste, ResultadoTeste } from "./enums";

export class Teste {
    tipo: TipoTeste;
    resultado: ResultadoTeste | null = null; // O resultado começa como nulo

    constructor(tipo: TipoTeste) {
        this.tipo = tipo;
    }

    /**
     * Registra o resultado do teste.
     */
    registrarResultado(resultado: ResultadoTeste): void {
        this.resultado = resultado;
    }
}