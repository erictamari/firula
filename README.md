# ⚽ Futebol Manager

Sistema web completo, responsivo e com visual profissional para **gestão de atletas de futebol/pelada**.

> Projeto 100% front-end: HTML + CSS + JavaScript. Não exige servidor para funcionar.

## Recursos

- 📊 **Dashboard** com visão geral de atletas, presenças, saldo e pendentes.
- 👥 **Cadastro de atletas** com posição (inclui Zagueiro), qualidade e assiduidade.
- ✅ **Presença & pagamentos**
  - Checkboxes lado a lado para **Presente** e **Faltou** – ambos iniciam desmarcados; o administrador deve marcar a opção correta.
  - **Ao marcar "Presente"**, o status é automaticamente alterado para **"Pago"** e, se o campo de valor estiver vazio, ele é preenchido com o valor do jogo.
  - Ordenação A-Z/Z-A.
  - Status de pagamento: **Pago**, **Pendente**, **Isento**, **Mensalista**, **Multa**.
  - O campo **Valor** (multa) define o montante financeiro para cada status:
    - **Pago** → soma em **Pagos**
    - **Pendente** → soma em **Pendentes**
    - **Multa** → soma em **Multas**
    - **Mensalista** → soma em **Mensalistas** (se valor > 0)
    - **Isento** → não soma em lugar nenhum
  - Resumo financeiro do jogo em uma linha: Pagos, Multas, Pendentes, Mensalistas, **Total** (Pagos + Multas + Mensalistas, sem pendentes).
- ⚽ **Sorteio de times** equilibrado por posição e qualidade.
- 😅 **Rolinho** com ranking e matriz de confrontos.
- 💰 **Financeiro**
  - Lançamentos manuais de receitas e despesas.
  - A **receita realizada** inclui: Pagos + Multas + Mensalistas + lançamentos manuais de income.
  - Pendentes são exibidos separadamente e **não** entram na receita.
- 💾 **Persistência** via localStorage, com exportação e importação de backup.

## Layout responsivo

O sistema se adapta a desktop, tablet e celular, com barra lateral colapsável em dispositivos móveis.

## Como usar

1. Cadastre atletas em **Atletas**.
2. Crie um jogo em **Presença & pagamentos**.
3. Marque presença com os checkboxes **Presente** ou **Faltou** (eles se alternam automaticamente).
4. Ao marcar **Presente**, o status muda para **Pago** e o valor é preenchido.
5. Ajuste o status de pagamento e/ou o valor manualmente, se necessário.
6. Acompanhe o resumo financeiro do jogo em linha única.
7. Realize sorteios, registre rolinhos e controle o caixa geral.

## Tecnologias

- HTML5, CSS3, JavaScript ES6+
- LocalStorage
- Google Fonts

## Licença

Projeto livre para estudo e personalização.
