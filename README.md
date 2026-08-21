# ⚽ Futebol Manager

Sistema web completo, responsivo e com visual profissional para **gestão de atletas de futebol/pelada**.

> Projeto 100% front-end: HTML + CSS + JavaScript. Não exige servidor para funcionar.

## Recursos

- 📊 **Dashboard** com visão geral de atletas, presenças, saldo e pendentes.
- 👥 **Cadastro de atletas** com posição (inclui Zagueiro), qualidade e assiduidade.
- ✅ **Presença & pagamentos**
  - Checkboxes lado a lado para **Presente** e **Faltou** – ambos iniciam desmarcados; o administrador deve marcar a opção correta.
  - Ordenação A-Z/Z-A.
  - Status de pagamento: Pago, Pendente, Isento, Mensalista, Multa.
  - Resumo financeiro do jogo em uma linha: Pagos, Multas, Pendentes, Total e Mensalistas.
- ⚽ **Sorteio de times** equilibrado por posição e qualidade.
- 😅 **Rolinho** com ranking e matriz de confrontos.
- 💰 **Financeiro** com lançamentos manuais e cálculo automático de receitas (exclui pendentes e mensalistas).
- 💾 **Persistência** via localStorage, com exportação e importação de backup.

## Layout responsivo

O sistema se adapta a desktop, tablet e celular, com barra lateral colapsável em dispositivos móveis.

## Como usar

1. Cadastre atletas em **Atletas**.
2. Crie um jogo em **Presença & pagamentos**.
3. Marque presença com os checkboxes **Presente** ou **Faltou** (eles se alternam automaticamente).
4. Selecione o status de pagamento e opcionalmente uma multa.
5. Acompanhe o resumo financeiro do jogo em linha única.
6. Realize sorteios, registre rolinhos e controle o caixa geral.

## Tecnologias

- HTML5, CSS3, JavaScript ES6+
- LocalStorage
- Google Fonts

## Licença

Projeto livre para estudo e personalização.
