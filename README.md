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
  - Presença individual (checkbox Presente + botão Faltou bem visível)
  - Status de pagamento: **Pago**, **Pendente**, **Isento**, **Mensalista**, **Multa**
  - Registro de multa (valor)
  - Ao selecionar **Pago**, o campo multa é preenchido automaticamente com o valor do jogo (se estiver zerado)
  - Botões para ordenar atletas A-Z e Z-A
  - Caixa do jogo com:
    - Valor total pago (apenas status Pago)
    - Valor total de multas (soma de todas as multas)
    - Valor pendente (status Pendente)
    - Contagem de mensalistas
    - Total geral (Pago + Multas, sem pendente)
  - Mensalistas **não** são contabilizados como receita do jogo (já pagaram mensalidade)

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
  - A receita total **não inclui** valores pendentes nem mensalistas

- 💾 **Dados**
  - Persistência automática via `localStorage`
  - Exportação de backup em JSON
  - Importação de backup em JSON

## Como usar

### 1. Cadastre os atletas

Abra **Atletas → Novo atleta**.

Informe nome, posição e qualidade.

### 2. Cadastre o jogo

Abra **Presença & pagamentos → Registrar jogo**.

### 3. Marque presença e pagamentos

- Marque **Presente** para cada atleta.
- Use o botão **❌ Faltou** (visível e estilizado em vermelho) para marcar ausência.
- Selecione o status de pagamento.
- Acompanhe o resumo do caixa.

### 4. Sorteie os times

Abra **Sorteio de times** e configure.

### 5. Registre rolinhos

Abra **Rolinho → Registrar rolinho**.

### 6. Controle o caixa

Em **Financeiro**, lance receitas e despesas.

## Tecnologias

- HTML5
- CSS3
- JavaScript ES6+
- LocalStorage
- Google Fonts

## Licença

Projeto livre para estudo e personalização.
