/* Futebol Manager — aplicação 100% front-end com localStorage */
(() => {
  "use strict";

  const STORAGE_KEY = "futebol-manager-v1";
  const POSITIONS = ["Goleiro", "Lateral", "Volante", "Meio-campo", "Atacante"];
  const CATEGORIES = ["Jogo", "Locação", "Churrasco", "Material esportivo", "Multa", "Outro"];

  const seed = {
    athletes: [
      {id:"a1",name:"Bruno",position:"Goleiro",quality:8,present:0,active:true},
      {id:"a2",name:"Carlos",position:"Lateral",quality:7,present:0,active:true},
      {id:"a3",name:"Diego",position:"Lateral",quality:8,present:0,active:true},
      {id:"a4",name:"Eduardo",position:"Volante",quality:9,present:0,active:true},
      {id:"a5",name:"Felipe",position:"Volante",quality:7,present:0,active:true},
      {id:"a6",name:"Gabriel",position:"Meio-campo",quality:10,present:0,active:true},
      {id:"a7",name:"Henrique",position:"Meio-campo",quality:8,present:0,active:true},
      {id:"a8",name:"Igor",position:"Atacante",quality:9,present:0,active:true},
      {id:"a9",name:"João",position:"Atacante",quality:7,present:0,active:true},
      {id:"a10",name:"Lucas",position:"Meio-campo",quality:8,present:0,active:true}
    ],
    games: [
      {id:"g1",date:todayISO(),time:"20:00",location:"Arena Futebol",fee:20,attendance:{}}
    ],
    rolinhos: [],
    finance: []
  };

  let state = load();
  let currentPage = "dashboard";
  let selectedGameId = state.games[0]?.id || null;

  const $ = (s,root=document) => root.querySelector(s);
  const $$ = (s,root=document) => [...root.querySelectorAll(s)];
  const money = n => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number(n)||0);
  const dateBR = iso => iso ? new Date(iso+"T12:00:00").toLocaleDateString("pt-BR") : "—";
  const todayISO = () => new Date().toISOString().slice(0,10);
  const uid = prefix => prefix + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  function load(){
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved ? {...seed,...saved,athletes:saved.athletes||[],games:saved.games||[],rolinhos:saved.rolinhos||[],finance:saved.finance||[]} : structuredClone(seed);
    } catch { return structuredClone(seed); }
  }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function athlete(id){ return state.athletes.find(a=>a.id===id); }
  function activeAthletes(){ return state.athletes.filter(a=>a.active !== false); }
  function showToast(message,type="success"){const t=document.createElement("div");t.className=`toast ${type}`;t.textContent=message;$("#toastContainer").appendChild(t);setTimeout(()=>t.remove(),3000)}

  function navigate(page){
    currentPage=page;
    $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
    $$(".page").forEach(p=>p.classList.toggle("active",p.id===`page-${page}`));
    const titles={dashboard:"Dashboard",atletas:"Atletas",presenca:"Presença & pagamentos",sorteio:"Sorteio de times",rolinho:"Rolinho",financeiro:"Financeiro"};
    $("#pageTitle").textContent=titles[page]||"Dashboard";
    $("#sidebar").classList.remove("open");
    renderPage(page);
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function renderPage(page){
    if(page==="dashboard") renderDashboard();
    if(page==="atletas") renderAthletes();
    if(page==="presenca") renderPresence();
    if(page==="sorteio") renderTeams();
    if(page==="rolinho") renderRolinho();
    if(page==="financeiro") renderFinance();
  }

  function renderDashboard(){
    const total=activeAthletes().length;
    const todayGame=state.games.find(g=>g.date===todayISO());
    const next=[...state.games].filter(g=>g.date>=todayISO()).sort((a,b)=>a.date.localeCompare(b.date))[0];
    const totalPresence=activeAthletes().reduce((s,a)=>s+a.present,0);
    const avg=total?Math.round(totalPresence/total):0;
    const income=state.finance.filter(x=>x.type==="income").reduce((s,x)=>s+Number(x.amount),0);
    const expense=state.finance.filter(x=>x.type==="expense").reduce((s,x)=>s+Number(x.amount),0);
    const pending=state.games.reduce((sum,g)=>sum+Object.values(g.attendance||{}).filter(x=>x?.status==="pending").length,0);
    $("#dashboardStats").innerHTML=`
      ${statCard("ATLETAS ATIVOS",total,"elenco cadastrado")}
      ${statCard("PRESENÇAS REGISTRADAS",totalPresence,`${avg} por atleta em média`)}
      ${statCard("CAIXA",money(income-expense),income-expense>=0?"saldo positivo":"saldo negativo",income-expense>=0?"positive":"negative")}
      ${statCard("PENDÊNCIAS",pending,"pagamentos/multas",pending?"warning":"positive")}
    `;
    $("#nextGameTitle").textContent=next?`${dateBR(next.date)} · ${next.time}`:"Nenhum jogo agendado";
    $("#nextGameBox").innerHTML=next?`<strong>${escapeHTML(next.location)}</strong><span>Valor do jogo: ${money(next.fee)}</span><br><button class="btn btn-secondary" style="margin-top:12px" data-page-target="presenca">Abrir presença</button>`:`<div class="empty-icon">⚽</div><strong>Cadastre o próximo jogo</strong><span>Organize a presença e o caixa da partida.</span>`;
    renderRolinhoRanking("#rolinhoRanking",5);
    renderAttendanceRanking("#attendanceRanking",5);
    $("#financeSummary").innerHTML=`<div class="leader-row"><div>↗</div><div><strong>Receitas</strong><div class="bar"><i style="width:${Math.min(100,income?100:0)}%"></i></div></div><b class="positive">${money(income)}</b></div>
      <div class="leader-row"><div>↘</div><div><strong>Despesas</strong></div><b class="negative">${money(expense)}</b></div>
      <div class="leader-row"><div>Σ</div><div><strong>Saldo</strong></div><b>${money(income-expense)}</b></div>`;
  }
  function statCard(label,value,hint="",cls=""){return `<div class="stat"><div class="label">${label}</div><div class="value ${cls}">${value}</div><div class="hint">${hint}</div></div>`}

  function renderAthletes(){
    const q=($("#athleteSearch")?.value||"").toLowerCase();
    const pos=$("#positionFilter")?.value||"";
    const min=Number($("#qualityFilter")?.value||0);
    const list=activeAthletes().filter(a=>(a.name||"").toLowerCase().includes(q)&&(!pos||a.position===pos)&&a.quality>=min);
    $("#athletesTable").innerHTML=list.length?list.map(a=>{
      const games=state.games.filter(g=>g.attendance?.[a.id]?.present).length;
      const pct=state.games.length?Math.round(games/state.games.length*100):0;
      return `<tr><td><div class="athlete-cell"><div class="mini-avatar">${initials(a.name)}</div><strong>${escapeHTML(a.name)}</strong></div></td>
      <td class="position">${a.position}</td><td><span class="rating">${a.quality}/10</span></td><td>${games}</td><td>${pct}%</td>
      <td><span class="pill ${pct>=70?"green":pct>=40?"yellow":"red"}">${pct>=70?"Assíduo":pct>=40?"Regular":"Baixa"}</span></td>
      <td><div class="row-actions"><button class="small-btn edit-athlete" data-id="${a.id}">Editar</button><button class="small-btn delete-athlete" data-id="${a.id}">×</button></div></td></tr>`;
    }).join(""):`<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">♟</div><strong>Nenhum atleta encontrado.</strong>Cadastre ou ajuste os filtros.</div></td></tr>`;
  }
  function initials(name){return (name||"?").split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase()}

  function renderPresence(){
    const select=$("#gameSelect");
    select.innerHTML=state.games.length?state.games.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(g=>`<option value="${g.id}" ${g.id===selectedGameId?"selected":""}>${dateBR(g.date)} · ${escapeHTML(g.location)}</option>`).join(""):`<option>Nenhum jogo</option>`;
    const game=state.games.find(g=>g.id===selectedGameId)||state.games[0];
    if(!game){$("#presenceList").innerHTML=`<div class="empty-state">Cadastre um jogo para começar.</div>`;$("#gameMeta").innerHTML="";return}
    selectedGameId=game.id;
    $("#gameMeta").innerHTML=`<div class="game-meta"><strong>${escapeHTML(game.time)}</strong> · ${escapeHTML(game.location)} · ${money(game.fee)} por atleta</div>`;
    $("#presenceList").innerHTML=activeAthletes().map(a=>{
      const rec=game.attendance?.[a.id]||{present:false,status:"pending",fine:0};
      return `<div class="presence-row"><div class="presence-player"><div class="mini-avatar">${initials(a.name)}</div><div><strong>${escapeHTML(a.name)}</strong><div class="player-pos">${a.position} · ${a.quality}/10</div></div></div>
      <label class="switch"><input type="checkbox" class="presence-check" data-id="${a.id}" ${rec.present?"checked":""}> Presente</label>
      <select class="input pay-select payment-status" data-id="${a.id}"><option value="paid" ${rec.status==="paid"?"selected":""}>Pago</option><option value="pending" ${rec.status==="pending"?"selected":""}>Pendente</option><option value="exempt" ${rec.status==="exempt"?"selected":""}>Isento</option></select>
      <input class="input pay-select fine-input" type="number" min="0" step=".01" data-id="${a.id}" value="${rec.fine||0}" title="Multa"></div>`;
    }).join("");
    renderGamePaymentSummary(game);
  }
  function renderGamePaymentSummary(game){
    const rows=activeAthletes().map(a=>game.attendance?.[a.id]).filter(Boolean);
    const paid=rows.filter(x=>x.status==="paid").length;
    const pending=rows.filter(x=>x.status==="pending").length;
    const fines=rows.reduce((s,x)=>s+Number(x.fine||0),0);
    $("#gamePaymentSummary").innerHTML=`<div class="stats-grid" style="grid-template-columns:1fr 1fr"><div class="stat"><div class="label">Pagos</div><div class="value positive">${paid}</div></div><div class="stat"><div class="label">Pendentes</div><div class="value ${pending?"warning":"positive"}">${pending}</div></div></div>
    <div class="leader-row"><div>R$</div><div><strong>Multas registradas</strong></div><b>${money(fines)}</b></div>`;
  }

  function drawTeams(){
    const per=Math.max(2,Number($("#playersPerTeam").value)||5);
    const count=Math.max(2,Number($("#teamCount").value)||2);
    let players=activeAthletes().slice();
    if($("#onlyPresent").checked){
      const game=state.games.find(g=>g.id===selectedGameId)||state.games.find(g=>g.date===todayISO())||state.games[0];
      if(game) players=players.filter(a=>game.attendance?.[a.id]?.present);
    }
    const required=per*count;
    const warning=players.length<required?`Há ${players.length} atletas disponíveis, mas são necessários ${required}. O sistema sorteará com os atletas disponíveis.`:"";
    const teams=Array.from({length:count},()=>[]);
    // Algoritmo guloso: embaralha pequenas diferenças, depois distribui
    // atletas por posição e qualidade para reduzir desequilíbrios.
    const mode=$("#drawMode").value;
    const posWeight={Goleiro:0,Lateral:1,Volante:2,"Meio-campo":3,Atacante:4};
    players.sort((a,b)=>mode==="quality"?b.quality-a.quality:Math.random()-.5);
    if(mode!=="quality") players.sort((a,b)=>posWeight[a.position]-posWeight[b.position] || b.quality-a.quality);
    players.forEach((p,i)=>{
      const ordered=teams.map((t,idx)=>({t,idx,sum:t.reduce((s,x)=>s+x.quality,0),pos:t.filter(x=>x.position===p.position).length})).sort((x,y)=>{
        if(mode==="position") return x.pos-y.pos || x.sum-y.sum;
        return x.sum-y.sum || x.t.length-y.t.length;
      });
      ordered[0].t.push(p);
    });
    $("#drawWarnings").innerHTML=warning?`<div class="warning-box">⚠ ${warning}</div>`:"";
    $("#teamsResult").innerHTML=teams.map((team,i)=>{
      const total=team.reduce((s,p)=>s+p.quality,0),avg=team.length?(total/team.length).toFixed(1):"0.0";
      return `<article class="team-card"><div class="team-head"><h3>TIME ${String.fromCharCode(65+i)}</h3><span class="team-total">${avg} média</span></div>${team.map(p=>`<div class="team-player"><div><strong>${escapeHTML(p.name)}</strong><div class="player-pos">${p.position}</div></div><b>${p.quality}</b></div>`).join("")}<div class="draw-note">Nota total: ${total} · ${team.length} atleta(s)</div></article>`;
    }).join("");
    showToast("Times sorteados com equilíbrio de posições e qualidade.");
  }
  function renderTeams(){
    if(!$("#teamsResult").children.length) $("#teamsResult").innerHTML=`<div class="card empty-state" style="grid-column:1/-1"><div class="empty-icon">⚽</div><strong>Pronto para o sorteio?</strong>Configure os times e clique em “Sortear times”.</div>`;
  }

  function rolinhoCounts(){
    const given={},taken={};
    state.rolinhos.forEach(r=>{given[r.giver]=(given[r.giver]||0)+1;taken[r.taker]=(taken[r.taker]||0)+1});
    return {given,taken};
  }
  function renderRolinho(){
    const {given,taken}=rolinhoCounts();
    const total=state.rolinhos.length;
    const victim=[...Object.entries(taken)].sort((a,b)=>b[1]-a[1])[0];
    const king=[...Object.entries(given)].sort((a,b)=>b[1]-a[1])[0];
    $("#rolinhoStats").innerHTML=`${statCard("TOTAL DE ROLINHOS",total,"registrados")}
      ${statCard("MAIOR ROLINHO",king?`${king[1]}`:"0",king?athlete(king[0])?.name:"—","positive")}
      ${statCard("MAIS TOMOU",victim?`${victim[1]}`:"0",victim?athlete(victim[0])?.name:"—","warning")}
      ${statCard("CONFRONTOS",new Set(state.rolinhos.map(r=>`${r.giver}-${r.taker}`)).size,"pares diferentes")}`;
    $("#nutmegTable").innerHTML=state.rolinhos.length?state.rolinhos.slice().reverse().map(r=>`<tr><td><strong>${escapeHTML(athlete(r.giver)?.name||"Excluído")}</strong></td><td>${escapeHTML(athlete(r.taker)?.name||"Excluído")}</td><td>${dateBR(r.date)}</td><td><button class="small-btn delete-rolinho" data-id="${r.id}">×</button></td></tr>`).join(""):`<tr><td colspan="4"><div class="empty-state">Nenhum rolinho registrado ainda.</div></td></tr>`;
    renderRolinhoRanking("#nutmegLeaderboard",8,true);
    renderNutmegMatrix();
  }
  function renderRolinhoRanking(target,limit=5,given=true){
    const el=typeof target==="string"?$(target):target;
    if(!el)return;
    const {given:gc,taken:tc}=rolinhoCounts(), counts=given?gc:tc;
    const data=Object.entries(counts).map(([id,n])=>({id,n,name:athlete(id)?.name||"Excluído"})).sort((a,b)=>b.n-a.n).slice(0,limit);
    const max=data[0]?.n||1;
    el.innerHTML=data.length?data.map((x,i)=>`<div class="leader-row"><div class="rank">${i+1}</div><div><strong>${escapeHTML(x.name)}</strong><div class="bar"><i style="width:${x.n/max*100}%"></i></div></div><b>${x.n}</b></div>`).join(""):`<div class="empty-state">Ainda não há registros.</div>`;
  }
  function renderNutmegMatrix(){
    const ids=activeAthletes().map(a=>a.id);
    const map={};state.rolinhos.forEach(r=>map[`${r.giver}-${r.taker}`]=(map[`${r.giver}-${r.taker}`]||0)+1);
    $("#nutmegMatrix").innerHTML=ids.length?`<table class="matrix"><thead><tr><th>De \ Para</th>${ids.map(id=>`<th>${escapeHTML(athlete(id).name.split(" ")[0])}</th>`).join("")}</tr></thead><tbody>${ids.map(g=>`<tr><th>${escapeHTML(athlete(g).name.split(" ")[0])}</th>${ids.map(t=>`<td class="heat">${g===t?"—":(map[`${g}-${t}`]||0)}</td>`).join("")}</tr>`).join("")}</tbody></table>`:`<div class="empty-state">Cadastre atletas para visualizar o confronto direto.</div>`;
  }

  function renderFinance(){
    const income=state.finance.filter(x=>x.type==="income").reduce((s,x)=>s+Number(x.amount),0);
    const expense=state.finance.filter(x=>x.type==="expense").reduce((s,x)=>s+Number(x.amount),0);
    const month=new Date().toISOString().slice(0,7);
    const monthIncome=state.finance.filter(x=>x.date?.startsWith(month)&&x.type==="income").reduce((s,x)=>s+Number(x.amount),0);
    $("#financeStats").innerHTML=`${statCard("RECEITAS",money(income),"total","positive")}${statCard("DESPESAS",money(expense),"total","negative")}${statCard("SALDO",money(income-expense),"receitas − despesas",income-expense>=0?"positive":"negative")}${statCard("MÊS ATUAL",money(monthIncome),"receitas do mês","positive")}`;
    const type=$("#financeTypeFilter")?.value||"",cat=$("#financeCategoryFilter")?.value||"";
    const list=state.finance.filter(x=>(!type||x.type===type)&&(!cat||x.category===cat)).slice().sort((a,b)=>b.date.localeCompare(a.date));
    $("#financeTable").innerHTML=list.length?list.map(x=>`<tr><td><strong>${escapeHTML(x.description)}</strong></td><td>${escapeHTML(x.category)}</td><td>${dateBR(x.date)}</td><td><span class="pill ${x.type==="income"?"green":"red"}">${x.type==="income"?"Receita":"Despesa"}</span></td><td class="${x.type==="income"?"finance-positive":"finance-negative"}">${x.type==="income"?"+":"−"} ${money(x.amount)}</td><td><button class="small-btn delete-finance" data-id="${x.id}">×</button></td></tr>`).join(""):`<tr><td colspan="6"><div class="empty-state">Nenhum lançamento encontrado.</div></td></tr>`;
  }

  function openModal(html){$("#modal").innerHTML=html;$("#modalBackdrop").classList.add("show")}
  function closeModal(){$("#modalBackdrop").classList.remove("show");$("#modal").innerHTML=""}

  function athleteModal(id=null){
    const a=id?athlete(id):null;
    openModal(`<h3>${a?"Editar atleta":"Novo atleta"}</h3><p class="modal-sub">Informe os dados usados no cadastro e no sorteio.</p>
      <form id="athleteForm"><div class="form-grid">
      <div class="field full"><label>Nome completo</label><input class="input" name="name" required value="${escapeHTML(a?.name||"")}"></div>
      <div class="field"><label>Posição</label><select class="input" name="position">${POSITIONS.map(p=>`<option ${a?.position===p?"selected":""}>${p}</option>`).join("")}</select></div>
      <div class="field"><label>Qualidade (1 a 10)</label><input class="input" type="number" min="1" max="10" name="quality" required value="${a?.quality||7}"></div>
      </div><div class="modal-actions"><button type="button" class="btn btn-secondary close-modal">Cancelar</button><button class="btn btn-primary">Salvar atleta</button></div></form>`);
    $("#athleteForm").onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const data={name:fd.get("name").trim(),position:fd.get("position"),quality:Math.max(1,Math.min(10,Number(fd.get("quality"))))};if(a)Object.assign(a,data);else state.athletes.push({id:uid("a"),...data,present:0,active:true});save();closeModal();renderAthletes();renderDashboard();showToast(a?"Atleta atualizado.":"Atleta cadastrado.")};
  }
  function gameModal(){
    openModal(`<h3>Registrar jogo</h3><p class="modal-sub">Cadastre data, horário, local e valor cobrado de cada atleta.</p><form id="gameForm"><div class="form-grid">
      <div class="field"><label>Data</label><input class="input" type="date" name="date" required value="${todayISO()}"></div>
      <div class="field"><label>Horário</label><input class="input" type="time" name="time" required value="20:00"></div>
      <div class="field full"><label>Local</label><input class="input" name="location" required placeholder="Ex.: Arena Futebol"></div>
      <div class="field"><label>Valor por atleta</label><input class="input" type="number" min="0" step=".01" name="fee" value="20"></div>
      </div><div class="modal-actions"><button type="button" class="btn btn-secondary close-modal">Cancelar</button><button class="btn btn-primary">Criar jogo</button></div></form>`);
    $("#gameForm").onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const g={id:uid("g"),date:fd.get("date"),time:fd.get("time"),location:fd.get("location").trim(),fee:Number(fd.get("fee"))||0,attendance:{}};state.games.push(g);selectedGameId=g.id;save();closeModal();navigate("presenca");showToast("Jogo registrado.")};
  }
  function rolinhoModal(){
    openModal(`<h3>Registrar rolinho</h3><p class="modal-sub">Escolha quem aplicou e quem tomou o drible.</p><form id="rolinhoForm"><div class="form-grid">
      <div class="field"><label>Quem deu o rolinho</label><select class="input" name="giver" required>${activeAthletes().map(a=>`<option value="${a.id}">${escapeHTML(a.name)} · ${a.position}</option>`).join("")}</select></div>
      <div class="field"><label>Quem tomou</label><select class="input" name="taker" required>${activeAthletes().map(a=>`<option value="${a.id}">${escapeHTML(a.name)} · ${a.position}</option>`).join("")}</select></div>
      <div class="field"><label>Data</label><input class="input" type="date" name="date" value="${todayISO()}"></div>
      </div><div class="modal-actions"><button type="button" class="btn btn-secondary close-modal">Cancelar</button><button class="btn btn-primary">⚽ Registrar rolinho</button></div></form>`);
    $("#rolinhoForm").onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);if(fd.get("giver")===fd.get("taker"))return showToast("Quem deu e quem tomou precisam ser atletas diferentes.","error");state.rolinhos.push({id:uid("r"),giver:fd.get("giver"),taker:fd.get("taker"),date:fd.get("date")});save();closeModal();renderRolinho();renderDashboard();showToast("Rolinho registrado! 😅")};
  }
  function financeModal(){
    openModal(`<h3>Novo lançamento</h3><p class="modal-sub">Registre receitas de jogos/multas e despesas da equipe.</p><form id="financeForm"><div class="form-grid">
      <div class="field full"><label>Descrição</label><input class="input" name="description" required placeholder="Ex.: Aluguel do campo"></div>
      <div class="field"><label>Tipo</label><select class="input" name="type"><option value="income">Receita</option><option value="expense">Despesa</option></select></div>
      <div class="field"><label>Categoria</label><select class="input" name="category">${CATEGORIES.map(c=>`<option>${c}</option>`).join("")}</select></div>
      <div class="field"><label>Valor</label><input class="input" type="number" min="0" step=".01" name="amount" required></div>
      <div class="field"><label>Data</label><input class="input" type="date" name="date" value="${todayISO()}"></div>
      <div class="field full"><label>Observação</label><input class="input" name="note" placeholder="Opcional"></div>
      </div><div class="modal-actions"><button type="button" class="btn btn-secondary close-modal">Cancelar</button><button class="btn btn-primary">Salvar lançamento</button></div></form>`);
    $("#financeForm").onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);state.finance.push({id:uid("f"),description:fd.get("description").trim(),type:fd.get("type"),category:fd.get("category"),amount:Number(fd.get("amount"))||0,date:fd.get("date"),note:fd.get("note").trim()});save();closeModal();renderFinance();renderDashboard();showToast("Lançamento salvo.")};
  }

  document.addEventListener("click",e=>{
    const nav=e.target.closest(".nav-item");if(nav)return navigate(nav.dataset.page);
    const target=e.target.closest("[data-page-target]");if(target)return navigate(target.dataset.pageTarget);
    if(e.target.id==="mobileMenu")$("#sidebar").classList.toggle("open");
    if(e.target.id==="newAthleteBtn")athleteModal();
    if(e.target.id==="newGameBtn")gameModal();
    if(e.target.id==="newNutmegBtn")rolinhoModal();
    if(e.target.id==="newTransactionBtn")financeModal();
    if(e.target.id==="drawBtn")drawTeams();
    if(e.target.id==="markAllPresent"){const g=state.games.find(x=>x.id===selectedGameId);if(g){g.attendance=g.attendance||{};activeAthletes().forEach(a=>{g.attendance[a.id]={...(g.attendance[a.id]||{}),present:true,status:g.attendance[a.id]?.status||"pending",fine:g.attendance[a.id]?.fine||0}});save();renderPresence();showToast("Todos marcados como presentes.")}}
    const edit=e.target.closest(".edit-athlete");if(edit)athleteModal(edit.dataset.id);
    const del=e.target.closest(".delete-athlete");if(del&&confirm("Excluir este atleta? O histórico de jogos e rolinhos será preservado.")){const a=athlete(del.dataset.id);if(a)a.active=false;save();renderAthletes();renderDashboard();showToast("Atleta removido do elenco.")}
    const dr=e.target.closest(".delete-rolinho");if(dr&&confirm("Excluir este registro?")){state.rolinhos=state.rolinhos.filter(x=>x.id!==dr.dataset.id);save();renderRolinho();renderDashboard();showToast("Rolinho removido.")}
    const df=e.target.closest(".delete-finance");if(df&&confirm("Excluir este lançamento?")){state.finance=state.finance.filter(x=>x.id!==df.dataset.id);save();renderFinance();renderDashboard();showToast("Lançamento removido.")}
    if(e.target.closest(".close-modal"))closeModal();
  });

  document.addEventListener("change",e=>{
    if(e.target.id==="gameSelect"){selectedGameId=e.target.value;renderPresence()}
    if(e.target.matches(".presence-check,.payment-status,.fine-input")){
      const g=state.games.find(x=>x.id===selectedGameId);if(!g)return;
      const id=e.target.dataset.id;g.attendance=g.attendance||{};const rec=g.attendance[id]||{present:false,status:"pending",fine:0};
      if(e.target.matches(".presence-check"))rec.present=e.target.checked;
      if(e.target.matches(".payment-status"))rec.status=e.target.value;
      if(e.target.matches(".fine-input"))rec.fine=Number(e.target.value)||0;
      g.attendance[id]=rec;save();renderGamePaymentSummary(g);
    }
    if(e.target.id==="athleteSearch"||e.target.id==="positionFilter"||e.target.id==="qualityFilter")renderAthletes();
    if(e.target.id==="financeTypeFilter"||e.target.id==="financeCategoryFilter")renderFinance();
  });
  ["athleteSearch","positionFilter","qualityFilter"].forEach(id=>$("#"+id)?.addEventListener("input",renderAthletes));

  $("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});
  $("#exportBtn").addEventListener("click",()=>{
    const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=`futebol-manager-backup-${todayISO()}.json`;a.click();URL.revokeObjectURL(url);showToast("Backup exportado.");
  });
  $("#importInput").addEventListener("change",e=>{
    const file=e.target.files[0];if(!file)return;const reader=new FileReader();
    reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!data.athletes||!data.games)throw new Error();state=data;selectedGameId=state.games[0]?.id||null;save();renderPage(currentPage);showToast("Dados importados com sucesso.")}catch{showToast("Arquivo inválido.","error")}e.target.value=""};reader.readAsText(file);
  });

  renderDashboard();
})();