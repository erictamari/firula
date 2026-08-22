# ⚽ Futebol Manager

Sistema web completo, responsivo e com visual profissional para **gestão de atletas de futebol/pelada**.

> Projeto 100% front-end: HTML + CSS + JavaScript. Não exige servidor para funcionar. Os dados são armazenados no **localStorage** do navegador, garantindo persistência local.

## Recursos

- 📊 **Dashboard** com visão geral de atletas, presenças, saldo e pendentes.
- 👥 **Cadastro de atletas** com posição (inclui Zagueiro), qualidade e assiduidade.
- ✅ **Presença & pagamentos**
  - Checkboxes lado a lado para **Presente** e **Faltou** – ambos iniciam desmarcados; o administrador deve marcar a opção correta.
  - **Ao marcar "Presente"**, o status é automaticamente alterado para **"Pago"** e, se o campo de valor estiver vazio, ele é preenchido com o valor do jogo.
  - Ordenação A-Z/Z-A.
  - Status de pagamento: **Pago**, **Pendente**, **Isento**, **Mensalista**, **Multa**.
  - O campo **Valor** define o montante financeiro para cada status:
    - **Pago** → soma em **Pagos**
    - **Pendente** → soma em **Pendentes**
    - **Multa** → soma em **Multas**
    - **Mensalista** → soma em **Mensalistas** (se valor > 0)
    - **Isento** → não soma em lugar nenhum
  - Resumo financeiro do jogo em **cards visuais** com valores destacados.
- ⚽ **Sorteio de times** equilibrado por posição e qualidade.
- 😅 **Rolinho** com:
  - Rankings separados: **Quem mais deu** e **Quem mais tomou**.
  - Histórico de confrontos com exclusão.
  - Removida a matriz de confronto direto para simplificar.
- 💰 **Financeiro**
  - Lançamentos manuais de receitas e despesas.
  - A **receita realizada** inclui: Pagos + Multas + Mensalistas + lançamentos manuais de income.
  - Pendentes são exibidos separadamente e **não** entram na receita.
- 💾 **Persistência** via localStorage, com exportação e importação de backup.

## Layout responsivo

O sistema é totalmente responsivo, adaptando-se a desktop, tablet e celular, com barra lateral colapsável em dispositivos móveis. Todos os cards e elementos se reorganizam para oferecer a melhor experiência em qualquer tela.

## Sincronização entre dispositivos

O sistema utiliza **localStorage** do navegador, portanto os dados são salvos apenas no dispositivo e navegador em uso. Para sincronizar entre computador e celular, utilize a funcionalidade **Exportar dados** no computador e **Importar** no celular (ou vice-versa) para transferir o arquivo JSON de backup.

## Como usar

1. Cadastre atletas em **Atletas**.
2. Crie um jogo em **Presença & pagamentos**.
3. Marque presença com os checkboxes **Presente** ou **Faltou** (eles se alternam automaticamente).
4. Ao marcar **Presente**, o status muda para **Pago** e o valor é preenchido.
5. Ajuste o status de pagamento e/ou o valor manualmente, se necessário.
6. Acompanhe o resumo financeiro do jogo em cards visuais.
7. Realize sorteios, registre rolinhos e controle o caixa geral.

## Tecnologias

- HTML5, CSS3, JavaScript ES6+
- LocalStorage
- Google Fonts

## Licença

Projeto livre para estudo e personalização.
