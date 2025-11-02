// src/Aeronave.ts
import { TipoAeronave } from "./enums";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";
import { Funcionario } from "./Funcionario";

export class Aeronave {
    codigo: string;
    modelo: string;
    tipo: TipoAeronave;
    capacidade: number;
    alcance: number;
    pecas: Peca[] = [];
    etapas: Etapa[] = [];
    testes: Teste[] = [];

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }

    finalizarEtapa(indexDaEtapa: number): { sucesso: boolean; mensagem: string } {
        // Validação se o índice é válido
        if (indexDaEtapa < 0 || indexDaEtapa >= this.etapas.length) {
            return { sucesso: false, mensagem: "Índice de etapa inválido." };
        }

        const etapaAtual = this.etapas[indexDaEtapa]!;
        if (etapaAtual.status === "Concluída") {
            return { sucesso: false, mensagem: "Esta etapa já está concluída." };
        }

        // Se for a primeira etapa (índice 0), pode ser finalizada sem restrições.
        if (indexDaEtapa > 0) {
            const etapaAnterior = this.etapas[indexDaEtapa - 1]!;

            if (etapaAnterior.status !== "Concluída") {
                return { 
                    sucesso: false, 
                    mensagem: `Não é possível finalizar a etapa '${etapaAtual.nome}'. A etapa anterior '${etapaAnterior.nome}' ainda não foi concluída.` 
                };
            }
        }

        // Se todas as validações passaram, finaliza a etapa.
        etapaAtual.finalizarEtapa();
        return { sucesso: true, mensagem: `Etapa '${etapaAtual.nome}' finalizada com sucesso!` };
    }

    adicionarPeca(peca: Peca): void {
        this.pecas.push(peca);
    }

    adicionarEtapa(etapa: Etapa): void {
        this.etapas.push(etapa);
    }

    adicionarTeste(teste: Teste): void {
        this.testes.push(teste);
    }
}