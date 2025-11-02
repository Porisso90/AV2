// src/context/AppContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { Funcionario } from '../Funcionario';
import { Aeronave } from '../Aeronave';
// NOVO: Importar enums de Teste
import { NivelPermissao, TipoAeronave, TipoPeca, TipoTeste, ResultadoTeste } from '../enums';
import { Peca } from '../Peca';
import { Etapa } from '../Etapa';
import { Teste } from '../Teste'; // NOVO: Importar a classe Teste

// --- 1. Dados Iniciais (Mock) ---
const adminInicial = new Funcionario(
    'f001', 
    'Admin', 
    '123-456', 
    'Rua X', 
    'admin', 
    'admin123', 
    NivelPermissao.ADMINISTRADOR
);

// --- 2. Definição dos Tipos ---
type NovaAeronaveDados = {
    codigo: string;
    modelo: string;
    tipo: TipoAeronave;
    capacidade: number;
    alcance: number;
}

type NovaPecaDados = {
    nome: string;
    tipo: TipoPeca;
    fornecedor: string;
}

type NovaEtapaDados = {
    nome: string;
    prazo: string;
}

// NOVO: Tipo para os dados do formulário de teste
type NovaTesteDados = {
    tipo: TipoTeste;
    resultado: ResultadoTeste | null; // O resultado pode ser nulo (Pendente)
}

interface IAppContext {
    funcionarios: Funcionario[];
    aeronaves: Aeronave[];
    funcionarioLogado: Funcionario | null;
    fazerLogin: (usuario: string, senha: string) => boolean;
    fazerLogout: () => void;
    adicionarAeronave: (dados: NovaAeronaveDados) => { sucesso: boolean; mensagem: string };
    adicionarPeca: (codigoAeronave: string, dadosPeca: NovaPecaDados) => void;
    adicionarEtapa: (codigoAeronave: string, dadosEtapa: NovaEtapaDados) => void;
    
    // NOVO: Função para adicionar teste a uma aeronave
    adicionarTeste: (codigoAeronave: string, dadosTeste: NovaTesteDados) => void;
}

// --- 3. Criação do Contexto ---
const AppContext = createContext<IAppContext | undefined>(undefined);

// --- 4. Criação do "Fornecedor" (Provider) ---
export const AppProvider = ({ children }: { children: ReactNode }) => {
    
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([adminInicial]);
    const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
    const [funcionarioLogado, setFuncionarioLogado] = useState<Funcionario | null>(null);

    const fazerLogin = (usuario: string, senha: string): boolean => {
        const funcionarioEncontrado = funcionarios.find(
            f => f.autenticar(usuario, senha)
        );
        if (funcionarioEncontrado) {
            setFuncionarioLogado(funcionarioEncontrado);
        }
        return !!funcionarioEncontrado;
    };

    const fazerLogout = () => {
        setFuncionarioLogado(null);
    };

    const adicionarAeronave = (dados: NovaAeronaveDados): { sucesso: boolean; mensagem: string } => {
        const codigoExistente = aeronaves.find(a => a.codigo === dados.codigo);
        if (codigoExistente) {
            return { sucesso: false, mensagem: "Erro: Já existe uma aeronave com este código." };
        }
        const novaAeronave = new Aeronave(
            dados.codigo,
            dados.modelo,
            dados.tipo,
            dados.capacidade,
            dados.alcance
        );
        setAeronaves(aeronavesAtuais => [...aeronavesAtuais, novaAeronave]);
        return { sucesso: true, mensagem: "Aeronave cadastrada com sucesso!" };
    };

    const adicionarPeca = (codigoAeronave: string, dadosPeca: NovaPecaDados) => {
        const aeronaveAlvo = aeronaves.find(a => a.codigo === codigoAeronave);
        if (!aeronaveAlvo) return;
        const novaPeca = new Peca(dadosPeca.nome, dadosPeca.tipo, dadosPeca.fornecedor);
        aeronaveAlvo.adicionarPeca(novaPeca);
        setAeronaves([...aeronaves]);
    };

    const adicionarEtapa = (codigoAeronave: string, dadosEtapa: NovaEtapaDados) => {
        const aeronaveAlvo = aeronaves.find(a => a.codigo === codigoAeronave);
        if (!aeronaveAlvo) return;
        const novaEtapa = new Etapa(dadosEtapa.nome, dadosEtapa.prazo);
        aeronaveAlvo.adicionarEtapa(novaEtapa);
        setAeronaves([...aeronaves]);
    };

    // NOVO: Implementação da função de adicionar teste
    const adicionarTeste = (codigoAeronave: string, dadosTeste: NovaTesteDados) => {
        // 1. Encontrar a aeronave
        const aeronaveAlvo = aeronaves.find(a => a.codigo === codigoAeronave);
        if (!aeronaveAlvo) return;

        // 2. Criar o novo teste usando a classe
        const novoTeste = new Teste(dadosTeste.tipo);

        // 3. Registar o resultado (se não for nulo)
        if (dadosTeste.resultado) {
            novoTeste.registrarResultado(dadosTeste.resultado);
        }

        // 4. Chamar o método da classe Aeronave para adicionar
        aeronaveAlvo.adicionarTeste(novoTeste);

        // 5. Atualizar o estado do React
        setAeronaves([...aeronaves]);
    };

    // O valor que será partilhado com todos os componentes
    const value = {
        funcionarios,
        aeronaves,
        funcionarioLogado,
        fazerLogin,
        fazerLogout,
        adicionarAeronave,
        adicionarPeca,
        adicionarEtapa,
        adicionarTeste // NOVO: Expor a função
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// --- 5. Hook de Acesso (sem alteração) ---
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext deve ser usado dentro de um AppProvider');
    }
    return context;
};