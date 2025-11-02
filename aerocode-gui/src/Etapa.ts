// src/Etapa.ts
import { StatusEtapa } from "./enums";
import { Funcionario } from "./Funcionario";

export class Etapa {
    nome: string;
    prazo: string;
    status: StatusEtapa;
    // Armazenamos apenas os IDs para facilitar a persistência
    responsaveisIds: string[] = [];

    constructor(nome: string, prazo: string) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = StatusEtapa.PENDENTE;
    }

    iniciarEtapa(): void {
        this.status = StatusEtapa.EM_ANDAMENTO;
    }

    finalizarEtapa(): void {
        this.status = StatusEtapa.CONCLUIDA;
    }

    /**
     * Adiciona o ID de um funcionário como responsável pela etapa, evitando duplicatas.
     */
    associarFuncionario(funcionario: Funcionario): void {
        if (!this.responsaveisIds.includes(funcionario.id)) {
            this.responsaveisIds.push(funcionario.id);
        }
    }
}