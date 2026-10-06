/* Space Mining Tycoon V3
   IMPORTANT: V3 migrates the V2 save instead of replacing it.
   Old key: space-mining-v2
   New key: space-mining-v3
*/
(() => {
  "use strict";

  const SAVE_KEY = "space-mining-v3";
  const OLD_KEY = "space-mining-v2";
  const MAX_OFFLINE = 12 * 3600 * 1000;

  const worlds = [
    {id:1, name:"🌑 Astéroïde Nova", need:0, mult:1},
    {id:2, name:"🔴 Mars", need:250000, mult:2.2},
    {id:3, name:"🪐 Saturne", need:3000000, mult:5},
    {id:4, name:"💠 Nébuleuse Azur", need:50000000, mult:12},
    {id:5, name:"🌌 Trou noir", need:750000000, mult:30},
    {id:6, name:"☀️ Étoile Helios", need:15000000000, mult:75},
    {id:7, name:"🌀 Dimension X", need:500000000000, mult:250}
  ];

  const buildings = [
    {id:"laser", name:"Foreuse laser", icon:"🔦", base:30, growth:1.15, rate:.6, desc:"Une foreuse automatique fiable."},
    {id:"robot", name:"Robot mineur", icon:"🤖", base:180, growth:1.17, rate:3.5, desc:"Travaille sans pause."},
    {id:"refinery", name:"Raffinerie orbitale", icon:"🏭", base:1100, growth:1.20, rate:18, desc:"Transforme le minerai brut en crédits."},
    {id:"station", name:"Station minière", icon:"🛰️", base:8000, growth:1.23, rate:90, desc:"Une véritable usine spatiale."},
    {id:"cargo", name:"Flotte de cargos", icon:"🚛", base:70000, growth:1.26, rate:500, desc:"Transporte les ressources entre mondes."},
    {id:"extractor", name:"Extracteur gravitationnel", icon:"🕳️", base:800000, growth:1.28, rate:3200, desc:"Extrait l'énergie des géantes gazeuses."},
    {id:"dyson", name:"Collecteur Dyson", icon:"☀️", base:12000000, growth:1.31, rate:22000, desc:"Une mégastructure qui récolte l'énergie stellaire."},
    {id:"quantum", name:"Portail quantique", icon:"🌀", base:250000000, growth:1.34, rate:150000, desc:"Produit des crédits depuis une dimension parallèle."}
  ];

  const research = [
    {id:"precision", name:"Laser de précision", cost:3000, desc:"+50% aux frappes manuelles", effect:s=>s.manualMult+=.5},
    {id:"ai", name:"IA minière", cost:20000, desc:"+100% à la production automatique", effect:s=>s.autoMult+=1},
    {id:"reactor", name:"Réacteur quantique", cost:150000, desc:"+250% à toute la production", effect:s=>s.globalMult+=2.5},
    {id:"logistics", name:"Logistique interplanétaire", cost:2500000, desc:"-12% sur le coût des bâtiments", effect:s=>s.costDiscount+=.12},
    {id:"nanobots", name:"Nanobots industriels", cost:50000000, desc:"+300% production automatique", effect:s=>s.autoMult+=3},
    {id:"singularity", name:"Moteur de singularité", cost:1000000000, desc:"+1000% global", effect:s=>s.globalMult+=10}
  ];

  const tech = [
    {id:"overdrive", name:"⚡ Surrégime", cost:100000, desc:"Pendant 30 s, production x5.", kind:"boost"},
    {id:"deep", name:"⛏️ Forage profond", cost:1000000, desc:"+1% de production par bâtiment possédé.", kind:"stack"},
    {id:"trade", name:"📦 Marché galactique", cost:10000000, desc:"Débloque les contrats commerciaux.", kind:"trade"},
    {id:"chronos", name:"⏱️ Chrono-core", cost:500000000, desc:"Double le plafond de gains hors ligne à 24 h.", kind:"offline"}
  ];

  const missions = [
    {id:"m1", title:"Premiers crédits", desc:"Produire 1 000 crédits au total", target:1000, type:"total", reward:500},
    {id:"m2", title:"Petite équipe", desc:"Posséder 5 robots mineurs", target:5, type:"building:robot", reward:1200},
    {id:"m3", title:"Industrialisation", desc:"Posséder 10 bâtiments", target:10, type:"buildings", reward:5000},
    {id:"m4", title:"Millionnaire", desc:"Produire 1 000 000 crédits au total", target:1000000, type:"total", reward:25000},
    {id:"m5", title:"Cap sur Saturne", desc:"Atteindre Saturne", target:3, type:"world", reward:50000},
    {id:"m6", title:"Empire stellaire", desc:"Produire 1 milliard de crédits", target:1000000000, type:"total", reward:5000000},
    {id:"m7", title:"Flotte commerciale", desc:"Posséder 10 cargos", target:10, type:"building:cargo", reward:1000000}
  ];

  const achievements = [
    ["million","💰 Millionnaire","Produire 1 000 000 au total"],
    ["billion","💎 Milliardaire","Produire 1 000 000 000 au total"],
    ["fleet","🚀 Amiral","Posséder 50 bâtiments"],
    ["world5","🌌 Explorateur","Atteindre le Trou noir"],
    ["world7","🌀 Transcendant","Atteindre Dimension X"],
    ["prestige10","👑 Dynastie","Effectuer 10 prestiges"],
    ["collector","🏭 Industriel","Posséder 100 bâtiments"]
  ];

  const contracts = [
    {id:"c1", req:100000, reward:145000, duration:120000},
    {id:"c2", req:2500000, reward:3900000, duration:300000},
    {id:"c3", req:50000000, reward:85000000, duration:600000},
    {id:"c4", req:1000000000, reward:1800000000, duration:900000}
  ];

  function defaultState(){
    return {
      version:3, money:0, total:0, xp:0, level:1, prestige:0, world:1,
      buildings:{laser:0,robot:0,refinery:0,station:0,cargo:0,extractor:0,dyson:0,quantum:0},
      research:{}, tech:{}, missions:{}, achievements:{},
      manualMult:1, autoMult:1, globalMult:1, costDiscount:0,
      dailyDate:null, dailyClaimed:false, lastSave:Date.now(),
      boostUntil:0, boostMult:1, offlineCap:12*3600*1000,
      contract:null, contractsDone:0, clicks:0, migratedFromV2:false
    };
  }

  function migrate(old){
    const s = defaultState();
    if(!old || typeof old !== "object") return s;
    const copy = ["money","total","xp","level","prestige","world","manualMult","autoMult","globalMult","costDiscount","dailyDate","dailyClaimed","lastSave","boostUntil","boostMult","offlineCap","contract","contractsDone","clicks"];
    copy.forEach(k => { if(old[k] !== undefined) s[k]=old[k]; });
    if(old.buildings) Object.keys(s.buildings).forEach(k => { if(old.buildings[k] != null) s.buildings[k]=old.buildings[k]; });
    if(old.research) s.research={...old.research};
    if(old.missions) s.missions={...old.missions};
    if(old.achievements) s.achievements={...old.achievements};
    // V2 research IDs
    if(old.research && old.research.precision) s.research.precision=true;
    if(old.research && old.research.ai) s.research.ai=true;
    if(old.research && old.research.reactor) s.research.reactor=true;
    s.migratedFromV2=true;
    return s;
  }

  function load(){
    try{
      const v3=JSON.parse(localStorage.getItem(SAVE_KEY)||"null");
      if(v3) return {...defaultState(),...v3};
      const v2=JSON.parse(localStorage.getItem(OLD_KEY)||"null");
      if(v2){
        const migrated=migrate(v2);
        localStorage.setItem(SAVE_KEY,JSON.stringify(migrated));
        return migrated;
      }
    }catch(e){ console.warn(e); }
    return defaultState();
  }

  let state=load();
  let pendingOffline=0;

  const $=id=>document.getElementById(id);
  const fmt=n=>{
    if(!Number.isFinite(n)) return "0";
    const a=Math.abs(n);
    if(a<1000) return Math.floor(n).toLocaleString("fr-FR");
    const units=["k","M","Md","T","Qa","Qi"];
    let i=-1,x=n;
    while(Math.abs(x)>=1000 && i<units.length-1){x/=1000;i++}
    return x.toFixed(x<10?2:x<100?1:0).replace(".",",")+units[i];
  };
  const toast=msg=>{
    const el=$("toast"); el.textContent=msg; el.classList.add("show");
    clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove("show"),2200);
  };
  const save=()=>{state.lastSave=Date.now(); localStorage.setItem(SAVE_KEY,JSON.stringify(state));};

  function xpNeed(){return Math.floor(100*Math.pow(1.28,state.level-1));}
  function addXP(x){
    state.xp+=x;
    while(state.xp>=xpNeed()){state.xp-=xpNeed();state.level++;}
  }
  function worldMult(){return worlds.find(w=>w.id===state.world)?.mult||1;}
  function buildingCount(){return Object.values(state.buildings).reduce((a,b)=>a+b,0);}
  function baseAuto(){
    return buildings.reduce((sum,b)=>sum+(state.buildings[b.id]||0)*b.rate,0);
  }
  function autoRate(){
    let r=baseAuto()*worldMult()*state.autoMult*state.globalMult;
    if(state.tech.deep) r*=1+buildingCount()*.01;
    if(Date.now()<state.boostUntil) r*=state.boostMult;
    return r;
  }
  function manualValue(){return 10*worldMult()*state.manualMult*state.globalMult*(Date.now()<state.boostUntil?state.boostMult:1);}
  function buildingCost(b){
    const n=state.buildings[b.id]||0;
    return Math.ceil(b.base*Math.pow(b.growth,n)*(1-state.costDiscount));
  }
  function addMoney(x){state.money+=x;state.total+=x;addXP(Math.max(1,Math.floor(x/100)));}

  function buyBuilding(id){
    const b=buildings.find(x=>x.id===id), c=buildingCost(b);
    if(state.money<c){toast("Pas assez de crédits");return}
    state.money-=c;state.buildings[id]=(state.buildings[id]||0)+1;save();render();
  }
  function researchBuy(id){
    const r=research.find(x=>x.id===id);
    if(state.research[id]) return;
    if(state.money<r.cost){toast("Pas assez de crédits");return}
    state.money-=r.cost;state.research[id]=true;r.effect(state);save();render();toast("Recherche terminée 🧪");
  }
  function techBuy(id){
    const t=tech.find(x=>x.id===id);
    if(state.tech[id]) return;
    if(state.money<t.cost){toast("Pas assez de crédits");return}
    state.money-=t.cost;state.tech[id]=true;
    if(t.kind==="offline") state.offlineCap=24*3600*1000;
    save();render();toast("Technologie débloquée 🔬");
  }
  function unlockWorld(id){
    const w=worlds.find(x=>x.id===id);
    if(state.world>=id) return;
    if(state.total<w.need){toast("Pas encore assez d'exploitation");return}
    state.world=id;save();render();toast(`Nouveau monde : ${w.name}`);
  }
  function prestige(){
    const need=1000000*Math.pow(4,state.prestige);
    if(state.total<need){toast(`Prestige à ${fmt(need)} total`);return}
    state.prestige++;
    state.money=0;state.total=0;state.xp=0;state.level=1;state.world=1;
    Object.keys(state.buildings).forEach(k=>state.buildings[k]=0);
    state.boostUntil=0;
    save();render();toast(`Prestige ${state.prestige} ! Bonus permanent +${state.prestige*15}%`);
  }
  function effectiveGlobal(){return state.globalMult*(1+state.prestige*.15);}
  function claimDaily(){
    const d=new Date().toISOString().slice(0,10);
    if(state.dailyDate===d){toast("Bonus déjà récupéré aujourd'hui");return}
    const reward=Math.max(500,state.total*.02);
    state.dailyDate=d;state.dailyClaimed=true;addMoney(reward);save();render();toast(`+${fmt(reward)} 🎁`);
  }
  function claimMission(id){
    if(state.missions[id]) return;
    const m=missions.find(x=>x.id===id);
    const v=missionValue(m);
    if(v<m.target){toast("Mission pas encore terminée");return}
    state.missions[id]=true;addMoney(m.reward);save();render();toast(`Mission terminée : +${fmt(m.reward)}`);
  }
  function missionValue(m){
    if(m.type==="total") return state.total;
    if(m.type==="world") return state.world;
    if(m.type==="buildings") return buildingCount();
    if(m.type.startsWith("building:")) return state.buildings[m.type.split(":")[1]]||0;
    return 0;
  }
  function achievementValue(id){
    if(id==="million") return state.total>=1e6;
    if(id==="billion") return state.total>=1e9;
    if(id==="fleet") return buildingCount()>=50;
    if(id==="world5") return state.world>=5;
    if(id==="world7") return state.world>=7;
    if(id==="prestige10") return state.prestige>=10;
    if(id==="collector") return buildingCount()>=100;
    return false;
  }
  function checkAchievements(){
    achievements.forEach(a=>{
      if(!state.achievements[a[0]] && achievementValue(a[0])){
        state.achievements[a[0]]=true;addMoney(Math.max(1000,state.total*.005));toast(`Succès : ${a[1]} 🏆`);
      }
    });
  }
  function startContract(id){
    const c=contracts.find(x=>x.id===id);
    if(!state.tech.trade){toast("Débloque Marché galactique");return}
    if(state.contract){toast("Un contrat est déjà en cours");return}
    if(state.money<c.req){toast("Capital insuffisant");return}
    state.money-=c.req;
    state.contract={id:c.id,ends:Date.now()+c.duration,reward:c.reward};
    save();render();
  }
  function collectContract(){
    if(!state.contract || Date.now()<state.contract.ends){toast("Contrat en cours");return}
    addMoney(state.contract.reward);state.contract=null;state.contractsDone++;save();render();toast("Contrat livré 📦");
  }
  function activateBoost(){
    if(!state.tech.overdrive){toast("Débloque Surrégime");return}
    if(Date.now()<state.boostUntil){toast("Surrégime déjà actif");return}
    state.boostUntil=Date.now()+30000;state.boostMult=5;save();render();toast("Production x5 pendant 30 s ⚡");
  }

  function render(){
    state.globalMult=state.research.reactor?3.5:1;
    state.autoMult=(state.research.ai?2:1)+(state.research.nanobots?3:0);
    state.manualMult=(state.research.precision?1.5:1);
    state.costDiscount=state.research.logistics?.12:0;
    // Preserve any advanced values by recalculating from research, not from old save.
    const r=autoRate();
    $("money").textContent=`${fmt(state.money)} ⛏️`;
    $("rate").textContent=`+${fmt(r)}/s`;
    $("worldName").textContent=worlds[state.world-1].name;
    $("xp").textContent=`Niveau ${state.level} • ${fmt(state.xp)} / ${fmt(xpNeed())} XP`;
    const next=worlds[state.world]||worlds[worlds.length-1];
    const pct=next?Math.min(100,state.total/next.need*100):100;
    $("worldProgress").style.width=`${pct}%`;

    $("buildings").innerHTML=buildings.map(b=>{
      const c=buildingCost(b), n=state.buildings[b.id]||0;
      return `<div class="item">
        <div class="itemTop"><div><div class="itemName">${b.icon} ${b.name} <span class="muted">x${n}</span></div><div class="desc">${b.desc} • +${fmt(b.rate)}/s chacun</div></div><div class="cost">${fmt(c)} ⛏️</div></div>
        <button class="buy ${state.money>=c?"ready":""}" data-buy="${b.id}" ${state.money<c?"disabled":""}>Acheter</button>
      </div>`;
    }).join("");

    $("worlds").innerHTML=worlds.map(w=>{
      const unlocked=state.world>=w.id, can=state.total>=w.need;
      return `<div class="item ${!unlocked&&!can?"locked":""}">
        <div class="itemTop"><div><div class="itemName">${w.name}</div><div class="desc">Multiplicateur de monde ×${w.mult}</div></div><div>${unlocked?"✅":fmt(w.need)+" ⛏️"}</div></div>
        ${unlocked?`<button class="buy" disabled>Monde actuel / débloqué</button>`:`<button class="buy ${can?"ready":""}" data-world="${w.id}" ${can?"":"disabled"}>Débloquer</button>`}
      </div>`;
    }).join("");

    $("research").innerHTML=research.map(x=>{
      const done=!!state.research[x.id];
      return `<div class="item"><div class="itemTop"><div><div class="itemName">🧪 ${x.name}</div><div class="desc">${x.desc}</div></div><div>${done?"✅":fmt(x.cost)+" ⛏️"}</div></div>
      <button class="buy ${!done&&state.money>=x.cost?"ready":""}" data-research="${x.id}" ${done||state.money<x.cost?"disabled":""}>${done?"Terminé":"Rechercher"}</button></div>`;
    }).join("");

    $("tech").innerHTML=tech.map(x=>{
      const done=!!state.tech[x.id];
      return `<div class="item"><div class="itemTop"><div><div class="itemName">${x.name}</div><div class="desc">${x.desc}</div></div><div>${done?"✅":fmt(x.cost)+" ⛏️"}</div></div>
      <button class="buy ${!done&&state.money>=x.cost?"ready":""}" data-tech="${x.id}" ${done||state.money<x.cost?"disabled":""}>${done?"Débloqué":"Débloquer"}</button>
      ${x.kind==="boost"&&done?`<button class="buy" data-boost>⚡ Activer le surrégime</button>`:""}</div>`;
    }).join("");

    $("missions").innerHTML=missions.map(m=>{
      const v=missionValue(m), done=!!state.missions[m.id];
      return `<div class="item"><div class="itemTop"><div><div class="itemName">🎯 ${m.title}</div><div class="desc">${m.desc}</div></div><div>+${fmt(m.reward)}</div></div><div class="bar"><div style="width:${Math.min(100,v/m.target*100)}%"></div></div><div class="desc">${fmt(v)} / ${fmt(m.target)}</div><button class="buy ${!done&&v>=m.target?"ready":""}" data-mission="${m.id}" ${done||v<m.target?"disabled":""}>${done?"✓ Récompense récupérée":"Récupérer"}</button></div>`;
    }).join("");

    $("achievements").innerHTML=achievements.map(a=>{
      const done=!!state.achievements[a[0]]||achievementValue(a[0]);
      return `<div class="item"><div class="itemName">${a[1]} ${done?"<span class='check'>✓</span>":""}</div><div class="desc">${a[2]}</div></div>`;
    }).join("");

    const contract=state.contract;
    $("contracts").innerHTML=contracts.map(c=>{
      if(!state.tech.trade) return `<div class="item locked"><div class="itemName">🔒 ${c.req>=1e9?"Contrat interdimensionnel":"Contrat commercial"}</div><div class="desc">Débloque « Marché galactique » pour accéder aux contrats.</div></div>`;
      const active=contract?.id===c.id;
      const ready=active && Date.now()>=contract.ends;
      return `<div class="item"><div class="itemTop"><div><div class="itemName">📦 Contrat ${fmt(c.req)}</div><div class="desc">Investis ${fmt(c.req)} → récupère ${fmt(c.reward)}</div></div></div>
      <button class="buy ${(!contract&&state.money>=c.req)||ready?"ready":""}" data-contract="${c.id}" ${active||contract||state.money<c.req?"disabled":""}>${active?(ready?"Livrer":"En cours…"):"Lancer"}</button>
      ${ready?`<button class="buy ready" data-contract-collect>📦 Livrer maintenant</button>`:""}</div>`;
    }).join("");

    const need=1000000*Math.pow(4,state.prestige);
    $("stats").innerHTML=`<div class="statGrid">
      <div class="stat"><b>${fmt(state.total)}</b><span>Total produit</span></div>
      <div class="stat"><b>${state.prestige}</b><span>Prestiges</span></div>
      <div class="stat"><b>${buildingCount()}</b><span>Bâtiments</span></div>
      <div class="stat"><b>${state.world}/7</b><span>Mondes</span></div>
      <div class="stat"><b>+${Math.round(state.prestige*15)}%</b><span>Bonus prestige</span></div>
      <div class="stat"><b>${state.contractsDone}</b><span>Contrats livrés</span></div>
    </div>`;
    $("prestige").innerHTML=`<div class="itemName">👑 Prestige</div><div class="desc">Réinitialise crédits, bâtiments, monde et XP, mais conserve recherches/technologies et donne un bonus permanent de +15% par prestige.</div><div class="desc">Objectif actuel : <b>${fmt(need)}</b> crédits produits.</div><button class="buy ${state.total>=need?"ready":""}" id="prestigeBtn" ${state.total<need?"disabled":""}>Effectuer le prestige</button>`;
    const d=new Date().toISOString().slice(0,10), claimed=state.dailyDate===d;
    $("daily").innerHTML=`<div class="itemName">🎁 Bonus quotidien</div><div class="desc">Récompense : ${fmt(Math.max(500,state.total*.02))} ⛏️</div><button class="buy ${!claimed?"ready":""}" id="dailyBtn" ${claimed?"disabled":""}>${claimed?"Déjà récupéré aujourd'hui":"Récupérer le bonus"}</button>`;

    bind();
  }

  function bind(){
    document.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>buyBuilding(b.dataset.buy));
    document.querySelectorAll("[data-world]").forEach(b=>b.onclick=()=>unlockWorld(+b.dataset.world));
    document.querySelectorAll("[data-research]").forEach(b=>b.onclick=()=>researchBuy(b.dataset.research));
    document.querySelectorAll("[data-tech]").forEach(b=>b.onclick=()=>techBuy(b.dataset.tech));
    document.querySelectorAll("[data-mission]").forEach(b=>b.onclick=()=>claimMission(b.dataset.mission));
    document.querySelectorAll("[data-contract]").forEach(b=>b.onclick=()=>startContract(b.dataset.contract));
    document.querySelectorAll("[data-boost]").forEach(b=>b.onclick=activateBoost);
    document.querySelectorAll("[data-contract-collect]").forEach(b=>b.onclick=collectContract);
    $("prestigeBtn")?.addEventListener("click",prestige);
    $("dailyBtn")?.addEventListener("click",claimDaily);
  }

  $("mineBtn").addEventListener("click",()=>{
    const gain=manualValue();addMoney(gain);state.clicks++;save();render();
  });

  document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".tabPanel").forEach(x=>x.classList.remove("active"));
    t.classList.add("active");$("tab-"+t.dataset.tab).classList.add("active");
  }));

  $("settingsBtn").onclick=()=>$("settings").classList.remove("hidden");
  $("closeSettings").onclick=()=>$("settings").classList.add("hidden");

  $("exportBtn").onclick=()=>{
    save();
    const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="space-tycoon-save.json";a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),500);
  };

  $("importInput").onchange=async e=>{
    const f=e.target.files[0]; if(!f)return;
    try{
      const imported=JSON.parse(await f.text());
      if(!imported || typeof imported.money!=="number") throw new Error();
      state={...defaultState(),...imported,version:3};save();render();toast("Sauvegarde importée 💾");
    }catch{toast("Fichier de sauvegarde invalide");}
    e.target.value="";
  };

  $("resetBtn").onclick=()=>{
    if(confirm("Réinitialiser complètement la partie ? Cette action efface la sauvegarde locale V3.")){
      localStorage.removeItem(SAVE_KEY);localStorage.removeItem(OLD_KEY);location.reload();
    }
  };

  function applyOffline(){
    const now=Date.now(), last=state.lastSave||now, elapsed=Math.max(0,now-last);
    const cap=state.tech?.chronos?24*3600*1000:state.offlineCap;
    const time=Math.min(elapsed,cap);
    if(time<60000)return;
    pendingOffline=autoRate()*time/1000;
    $("offlineText").textContent=`Tu as été absent environ ${Math.floor(time/3600000)} h ${Math.floor(time%3600000/60000)} min. Production récupérable : +${fmt(pendingOffline)} ⛏️.`;
    $("offlineCard").classList.remove("hidden");
    $("offlineClaim").onclick=()=>{
      addMoney(pendingOffline);pendingOffline=0;$("offlineCard").classList.add("hidden");save();render();toast("Gains hors ligne récupérés 🌙");
    };
  }

  setInterval(()=>{
    const dt=0.25;
    addMoney(autoRate()*dt);
    checkAchievements();
    state.lastSave=Date.now();
    if(Math.random()<.15) save();
    render();
  },250);

  // Initial render and migration notice.
  render();
  applyOffline();
  if(state.migratedFromV2){
    toast("V2 conservée : sauvegarde migrée vers V3 ✅");
    state.migratedFromV2=false;save();
  }
})();
