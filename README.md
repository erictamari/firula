# ⚽ Futebol Manager

Sistema web completo, responsivo e com visual profissional para **gestão de atletas de futebol/pelada**.

> Projeto 100% front-end: HTML + CSS + JavaScript. Não exige servidor para funcionar.

## Recursos

- 📊 **Dashboard**
  - Total de atletas ativos
  - Presenças registradas
  - Saldo financeiro
  - Pendências de pagamento
  - Próximo jogo
  - Ranking de rolinhos
  - Ranking de assiduidade

- 👥 **Cadastro de atletas**
  - Nome
  - Goleiro
  - Lateral
  - Volante
  - Meio-campo
  - Atacante
  - Nota de qualidade de 1 a 10
  - Indicador de assiduidade
  - Busca e filtros

- ✅ **Presença & pagamentos**
  - Cadastro de jogos
  - Data, horário e local
  - Valor por atleta
  - Presença individual
  - Pago / pendente / isento
  - Registro de multa
  - Resumo financeiro da partida

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
  - Receitas
  - Despesas
  - Jogos
  - Locação
  - Churrasco
  - Material esportivo
  - Multas
  - Outros
  - Saldo
  - Filtros por tipo e categoria

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
```

## Como executar

### Opção 1 — abrir diretamente

Baixe/clique em `index.html` e abra no navegador.

### Opção 2 — GitHub Pages

1. Crie um repositório no GitHub.
2. Envie:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
3. Vá em **Settings → Pages**.
4. Em *Build and deployment*, escolha **Deploy from a branch**.
5. Selecione `main` e `/root`.
6. Salve.
7. O GitHub fornecerá o endereço público do sistema.

## Como usar

### 1. Cadastre os atletas

Abra **Atletas → Novo atleta**.

Informe nome, posição e qualidade de 1 a 10.

A nota é usada pelo algoritmo de sorteio.

### 2. Cadastre o jogo

Abra **Presença & pagamentos → Registrar jogo**.

Informe:

- data
- horário
- local
- valor por atleta

Depois marque quem compareceu e a situação financeira.

### 3. Sorteie os times

Abra **Sorteio de times**.

Defina:

- atletas por time
- número de times
- critério de equilíbrio
- somente presentes ou elenco inteiro

O sistema tenta distribuir as notas e posições para reduzir a diferença entre as equipes.

### 4. Registre rolinhos

Abra **Rolinho → Registrar rolinho**.

Selecione:

- quem deu
- quem tomou
- data

O sistema monta automaticamente o ranking e a matriz de confrontos.

### 5. Controle o caixa

Em **Financeiro**, lance receitas e despesas.

Exemplos:

**Receitas**
- Pagamento do jogo
- Multa

**Despesas**
- Locação
- Churrasco
- Material esportivo

## Algoritmo do sorteio

O sorteio não é simplesmente aleatório.

Ele utiliza uma distribuição gulosa baseada em:

1. nota de qualidade;
2. posição;
3. quantidade de atletas por equipe;
4. soma das notas já atribuídas a cada equipe.

O objetivo é evitar, por exemplo, que todos os atletas nota 9/10 caiam no mesmo time.

Para um sistema competitivo/profissional, o algoritmo pode posteriormente receber regras adicionais, como:

- quantidade mínima/máxima de goleiros;
- limite de atacantes por time;
- duplas que não podem ficar juntas;
- duplas que devem ficar juntas;
- histórico de equipes anteriores;
- balanceamento por posições específicas;
- pesos diferentes para qualidade e assiduidade.

## Armazenamento

Este projeto utiliza:

```js
localStorage
```

Portanto, os dados ficam armazenados **no navegador e no dispositivo em que o sistema foi utilizado**.

O botão **Exportar dados** gera um backup `.json`.

O botão **Importar** permite restaurar esse backup.

### Importante

Este projeto não possui banco de dados, autenticação ou sincronização entre dispositivos.

Para uma versão multiusuário real, recomenda-se evoluir para:

- Supabase
- Firebase
- PostgreSQL + API
- autenticação de usuários
- banco de dados online
- controle de permissões
- logs de alterações

## Tecnologias

- HTML5
- CSS3
- JavaScript ES6+
- LocalStorage
- Google Fonts

## Personalização

As principais cores estão no início do `style.css`:

```css
:root {
  --bg:#07100d;
  --green:#48e58b;
  --green2:#20b968;
}
```

Altere essas variáveis para adaptar o sistema às cores do seu time.

## Licença

Projeto livre para estudo, personalização e utilização em projetos próprios.
