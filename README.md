# Projeto Aerocode - Protótipo GUI/SPA (AV2)

Este projeto é uma interface gráfica (GUI) no formato Single Page Application (SPA) desenvolvida em React e TypeScript. Ele serve como a evolução do sistema de gestão de produção de aeronaves, implementando os requisitos da Atividade de Avaliação 2 (AV2).

O sistema funciona como um "protótipo navegável" [cite: 462] focado inteiramente no front-end. Ele permite a autenticação de usuários, cadastro de aeronaves e o gerenciamento detalhado do processo de produção (peças, etapas e testes) através de uma interface visual interativa.

## Pré-requisitos

Para executar este projeto, é necessário ter instalado na máquina:

* **Node.js** (versão LTS recomendada)
* **npm** (geralmente instalado junto com o Node.js)

## Instalação

Siga os passos abaixo para instalar as dependências do projeto:

1.  Abra um terminal (PowerShell, Command Prompt, etc.) na pasta raiz do projeto (`aerocode-gui`).
2.  Execute o seguinte comando para instalar todas as bibliotecas necessárias (React, React Router, etc.):
    ```bash
    npm install
    ```

## Como Executar o Sistema

Diferente da versão CLI, este projeto é executado através de um servidor de desenvolvimento local (Vite).

1.  **Iniciar a Aplicação:**
    No terminal, na raiz do projeto, execute o seguinte comando:
    ```bash
    npm run dev
    ```
    *(Este comando inicia o servidor de desenvolvimento e observa as alterações nos arquivos em tempo real)*.

2.  **Acessar o Protótipo:**
    Após o comando ser executado, o terminal mostrará um endereço local. Abra o seu navegador e acesse:
    `http://localhost:5173` (ou o endereço indicado no seu terminal).

    A aplicação será carregada no navegador e a tela de login será exibida.

## Credenciais de Acesso

Para testar o sistema com permissões de administrador, utilize as seguintes credenciais padrão (definidas no `AppContext.tsx`):

* **Usuário:** `admin`
* **Senha:** `admin123`

## Estrutura do Projeto

* `src/`: Contém todo o código-fonte em TypeScript (`.tsx`, `.ts`, `.css`).
* `src/components/`: Componentes reutilizáveis (Ex: `Modal.tsx`, `ProtectedRoute.tsx`, formulários de adição).
* `src/context/`: Contém o estado global da aplicação (`AppContext.tsx`).
* `src/layout/`: Estrutura principal da aplicação (Ex: `MainLayout.tsx`).
* `src/pages/`: Componentes que representam as "páginas" da aplicação (Ex: `LoginPage.tsx`, `DashboardPage.tsx`, `AeronaveDetalhesPage.tsx`).
* `src/(classes)/`: Contém as classes de lógica de negócio portadas da AV1 (Ex: `Aeronave.ts`, `Funcionario.ts`, `Etapa.ts`).
