# ⚽ Futebol Manager

Sistema web completo, responsivo e com visual profissional para **gestão de atletas de futebol/pelada**.

> Projeto 100% front-end: HTML + CSS + JavaScript. Não exige servidor para funcionar.

## Recursos

- 📊 **Dashboard**
  - Total de atletas ativos
  - Presenças registradas
  - Saldo financeiro (realizado)
  - Pendente a receber
  - Próximo jogo
  - Ranking de rolinhos
  - Ranking de mais presentes
  - Ranking de menos presentes (baixa frequência)
  - Lista de atletas mensalistas
  - Resumo financeiro com pendentes

- 👥 **Cadastro de atletas**
  - Nome
  - Posição: Goleiro, Zagueiro, Lateral, Volante, Meio-campo, Atacante
  - Nota de qualidade de 1 a 10
  - Indicador de assiduidade
  - Busca e filtros

- ✅ **Presença & pagamentos**
  - Cadastro, edição e exclusão de jogos
  - Data, horário e local
  - Valor por atleta
  - Presença individual (checkbox Presente + botão Faltou)
  - Status de pagamento: **Pago**, **Pendente**, **Isento**, **Mensalista**, **Multa**
  - Registro de multa (valor)
  - Ao selecionar **Pago**, o campo multa é preenchido automaticamente com o valor do jogo (se estiver zerado)
  - Botões para ordenar atletas A-Z e Z-A
  - Caixa do jogo com:
    - Valor total pago
    - Valor total de multas
    - Valor pendente
    - Total geral (sem pendente)

- ⚽ **Sorteio de times**
  - Escolha de atletas por time
  - Escolha da quantidade de times
  - Opção para utilizar somente atletas presentes
  - Critérios:
    - Equilíbrio máximo
    - Priorizar qualidade
    - Priorizar posições
  - Distribuição considerando posição e nota
  - Média e pontuação total de cada equipe

- 😅 **Rolinho**
  - Registra quem deu o rolinho
  - Registra quem tomou
  - Data do lance
  - Ranking de quem mais aplicou
  - Ranking de quem mais tomou
  - Matriz de confronto direto
  - Histórico com exclusão de registros

- 💰 **Financeiro**
  - Receitas e despesas (lançamentos manuais)
  - Categorias: Jogo, Locação, Churrasco, Material esportivo, Multa, Mensalidade, Outro
  - Saldo realizado
  - Pendente a receber (calculado automaticamente a partir dos jogos)
  - Filtros por tipo e categoria
  - A receita total **não inclui** valores pendentes

- 💾 **Dados**
  - Persistência automática via `localStorage`
  - Exportação de backup em JSON
  - Importação de backup em JSON

## Estrutura

```text
futebol-manager/
├── index.html
├── style.css
├── app.js
└── README.md
