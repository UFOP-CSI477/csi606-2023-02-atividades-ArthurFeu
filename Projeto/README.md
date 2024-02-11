# Para Executar

Entre na pasta ./Projetos no seu Terminal
Execute o comando
npm run dev

Pronto! O Aplicativo React será inicializado junto do banco de dados feito utilizando Prisma.

# **CSI606-2023-02 - Proposta de Trabalho Final**

## _Aluno: Arthur Mendonça Feu_

---

### 1. Objetivo:

fornecer aos usuários uma ferramenta intuitiva para gerenciar lembretes e eventos através de uma interface amigável.

### 2.1. Calendário:

Exibição do mês atual com destaque na data atual.
Possibilidade de navegação entre meses.
Marcação visual de dias com lembretes.

### 2.2. Lembretes:

Adição de lembretes com opção de data no texto.
Exibição de lembretes ativos.
Marcação de lembretes como concluídos.
Alternância entre lembretes ativos e concluídos.
Inserção automática de lembretes com data no calendário

### 3. Interface de Usuário (UI):

### 3.1 Página Inicial:

Visão geral do calendário do mês atual.
Destaque na data atual.
Ícones ou indicadores visuais para dias com lembretes.

### 3.2 Página de Lembretes:

Listagem de lembretes ativos.
Possibilidade de marcar lembretes como concluídos.
Alternância entre lembretes ativos e concluídos.
Adição de novos lembretes.

### 3.3 Página de Calendário:

Visão mensal do calendário com destaque na data selecionada.
Exibição de lembretes para a data selecionada.

### 4. Persistência de Dados:

Para testes iniciais dados serão salvos apenas por execução do código.

Futuramente: Utilização de um banco de dados para armazenar informações de usuários, lembretes, checklist e datas associadas.

### 5. Considerações Finais:

O sistema busca oferecer uma experiência integrada, permitindo aos usuários gerenciar eficientemente seus lembretes e eventos por meio de um calendário intuitivo e uma lista de tarefas/checklist associada.

# **CSI606-2023-02 - Remoto - Trabalho Final - Resultados**

## _Aluno: Arthur Mendonça Feu_

---

### Resumo

Este trabalho foi feito buscando satisfazer uma necessidade pessoal de um sistema para executar um calendário juntamente a um software de lembretes. Eu utilizo no meu dia-a-dia o aplicativo de Lembretes do iOS e o mesmo não é integrado ao meu calendário, o que é uma pena. À partir deste problema, desenvolvi um sistema capaz de realizar as duas tarefas.

### 1. Funcionalidades implementadas

# Sistema de perfis (usuários)

Para separar lembretes em diferentes pessoas (ou a mesma pessoa, mas lembretes pessoais, acadêmicos e de trabalho por exemplo)

# Lembretes

Para inserir tarefas com datas e um perfil em questão

# Calendário

Para visualizar os lembretes por perfil de usuário e data

### 2. Funcionalidades previstas e não implementadas

Não foi possível adicionar ícones ou indicadores visuais para dias com lembretes. Por me faltar familiaridade com bibliotecas de calendário não consegui implementar a funcionalidade.

Optei por também não implementar uma tela inicial.

### 3. Outras funcionalidades implementadas

Perfis de usuário, para alternar entre diferentes pessoas ou contas pessoais

### 4. Principais desafios e dificuldades

... CSS
TAN TAN TAN

A famosa piada do desenvolvedor que faz o back-end em minutos e gasta horas para centralizar uma div. Utilizei o chatGPT para me ajudar nesta tarefa.

### 5. Instruções para instalação e execução

Após baixar todo o diretório 'Projeto', entre na pasta e execute o comando
npm run dev

O comando irá executar o banco de dados e o react.
