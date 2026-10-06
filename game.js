const V4_KEY="space-mining-v4", V3_KEY="space-mining-v3", V2_KEY="space-mining-v2";
const now=()=>Date.now();
const fmt=n=>{
  n=Math.max(0,n);
  if(n<1000) return Math.floor(n).toLocaleString("fr-FR");
  const u=["k","M","Md","T","Qa","Qi","Sx","Sp","Oc","No"];
  let i=-1;
  while(n>=1000&&i<u.length-1){n/=1000;i++}
  return (n>=100?Math.floor(n):n>=10?n.toFixed(1):n.toFixed(2))+u[i];
};
const fresh=()=>{
  const buildings={};
  const worlds=[...WORLD_DEFS];
  worlds.forEach(w=>w.buildings.forEach(id=>buildings[id]=0));
  return {
    version:4,money:250,total:0,xp:0,level:1,prestige:0,world:0,
    buildings,research:{},tech:{},missions:{},achievements:{},
    nickname:"Capitaine",lastSave:now(),daily:"",combo:0,comboAt:0,
    boosts:0,contracts:{}, completedWorlds:0
  };
};

const WORLD_DEFS=[
 {id:0,name:"Astéroïde Nova",icon:"🌑",need:0,mult:1, prestigeNeed:0, buildings:[
  ["nova_drill","Foreuse lunaire",25,0.35],["nova_bot","Robot de forage",180,2.2],["nova_crusher","Broyeur stellaire",950,10],["nova_refinery","Mini-raffinerie",5500,42],["nova_hub","Centre Nova",30000,180]
 ]},
 {id:1,name:"Mars",icon:"🔴",need:300000,mult:2.5, buildings:[
  ["mars_solar","Mine solaire martienne",85000,500],["mars_dome","Dôme extracteur",500000,2600],["mars_titan","Titan minier",3000000,15000],["mars_factory","Usine de régolithe",18000000,80000],["mars_core","Forage du noyau",120000000,420000]
 ]},
 {id:2,name:"Saturne",icon:"🪐",need:7000000,mult:6, buildings:[
  ["sat_ring","Collecteur d'anneaux",700000,2200000/100],["sat_harvester","Moissonneur de glace",4500000,180000],["sat_station","Station orbitale",28000000,900000],["sat_magnet","Extracteur magnétique",170000000,4500000],["sat_gate","Port industriel",1200000000,22000000]
 ]},
 {id:3,name:"Nébuleuse Azur",icon:"💠",need:120000000,mult:15, buildings:[
  ["neb_gas","Extracteur de gaz",9000000,800000],["neb_crystal","Mine de cristaux",60000000,4500000],["neb_star","Forge stellaire",400000000,24000000],["neb_cloud","Récolteur de matière",2500000000,130000000],["neb_core","Cœur de nébuleuse",18000000000,700000000]
 ]},
 {id:4,name:"Trou Noir",icon:"🌌",need:2500000000,mult:40, buildings:[
  ["bh_orbit","Mine orbitale",150000000,5000000],["bh_lens","Lentille gravitationnelle",1000000000,30000000],["bh_eater","Extracteur d'accrétion",8000000000,180000000],["bh_engine","Moteur de singularité",60000000000,1100000000],["bh_eye","Œil du vide",500000000000,6000000000]
 ]},
 {id:5,name:"Étoile Helios",icon:"☀️",need:80000000000,mult:90, buildings:[
  ["hel_plasma","Collecteur plasma",5000000000,400000000],["hel_solar","Dyson solaire",35000000000,2500000000],["hel_forge","Forge d'étoile",250000000000,15000000000],["hel_ring","Anneau d'Helios",2000000000000,90000000000],["hel_heart","Cœur solaire",18000000000000,500000000000]
 ]},
 {id:6,name:"Dimension X",icon:"🌀",need:3000000000000,mult:300, buildings:[
  ["x_rift","Mineur de faille",120000000000,8000000000],["x_phase","Extracteur de phase",900000000000,60000000000],["x_reality","Usine de réalité",7000000000000,400000000000],["x_time","Forgeron temporel",55000000000000,3000000000000],["x_omega","Moteur Omega",500000000000000,18000000000000]
 ]}
];

const RESEARCH=[
 ["click1","Laser de précision",3000,"+50% clic"],
 ["auto1","IA minière",25000,"+100% production auto"],
 ["global1","Réacteur quantique",250000,"x3 production"],
 ["discount","Logistique interplanétaire",2500000,"-10% prix bâtiments"],
 ["auto2","Nanobots industriels",50000000,"+300% production auto"],
 ["global2","Moteur de singularité",1000000000,"x11 production"],
 ["click2","Gant gravitationnel",5000000000,"+250% clic"],
 ["offline","Chrono-core",20000000000,"hors-ligne jusqu'à 24h"]
];

const TECH=[
 ["overdrive","⚡ Surrégime",1000000,"x5 pendant 30s"],
 ["deep","⛏️ Forage profond",50000000,"+1% par bâtiment"],
 ["market","📦 Marché galactique",500000000,"contrats"],
 ["combo","🔥 Maîtrise du combo",2500000000,"combo jusqu'à x5"]
];

const MISSIONS=[
 ["m1","Atteindre 10 000 total",10000,5000,s=>s.total>=10000],
 ["m2","Posséder 10 bâtiments",10,25000,s=>Object.values(s.buildings).reduce((a,b)=>a+b,0)>=10],
 ["m3","Atteindre Mars",1,50000,s=>s.world>=1],
 ["m4","Atteindre 1 Md total",1000000000,2500000,s=>s.total>=1000000000],
 ["m5","Finir 4 planètes",4,10000000,s=>s.completedWorlds>=4],
 ["m6","Atteindre Dimension X",6,1000000000,s=>s.world>=6]
];

function migrate(){
 let raw=localStorage.getItem(V4_KEY);
 if(raw) return JSON.parse(raw);
 let old=localStorage.getItem(V3_KEY)||localStorage.getItem(V2_KEY);
 if(!old) return fresh();
 try{
  const o=JSON.parse(old), s=fresh();
  Object.assign(s,o);
  s.version=4;
  s.buildings=s.buildings||{};
  s.research=s.research||{};
  s.tech=s.tech||{};
  s.missions=s.missions||{};
  s.achievements=s.achievements||{};
  // Map legacy building ids where possible; old buildings stay useful.
  const ids=Object.values(WORLD_DEFS).flatMap(w=>w.buildings.map(b=>b[0]));
  ids.forEach(id=>{if(s.buildings[id]==null)s.buildings[id]=0});
  s.lastSave=now();
  localStorage.setItem(V4_KEY,JSON.stringify(s));
  return s;
 }catch(e){return fresh()}
}
let state=migrate();

function save(){state.lastSave=now();localStorage.setItem(V4_KEY,JSON.stringify(state))}
function toast(t){const e=document.getElementById("toast");e.textContent=t;e.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>e.classList.remove("show"),2300)}
function world(){return WORLD_DEFS[state.world]}
function researched(id){return !!state.research[id]}
function tech(id){return !!state.tech[id]}
function discount(){return researched("discount")?.9:1}
function prestigeMult(){return 1+state.prestige*.18}
function globalMult(){return (researched("global1")?3:1)*(researched("global2")?11:1)*prestigeMult()}
function autoMult(){return (researched("auto1")?2:1)*(researched("auto2")?4:1)}
function clickMult(){return (researched("click1")?1.5:1)*(researched("click2")?3.5:1)}
function deepMult(){return tech("deep")?(1+Object.values(state.buildings).reduce((a,b)=>a+b,0)*.01):1}
function comboMult(){if(!tech("combo")||state.combo<2)return 1;return Math.min(5,1+state.combo*.35)}
function autoRate(){
 let total=0;
 for(const w of WORLD_DEFS) for(const b of w.buildings){
  const qty=state.buildings[b[0]]||0;
  total+=qty*b[3]*w.mult;
 }
 return total*autoMult()*globalMult()*deepMult()*comboMult()*(state.boosts>now()?5:1);
}
function clickValue(){return 10*world().mult*clickMult()*globalMult()*(state.boosts>now()?5:1)*comboMult()}
function buildingCost(b){
 const owned=state.buildings[b[0]]||0;
 // Exponential, with world-specific pressure. Costs get brutal late-game.
 return Math.floor(b[2]*Math.pow(1.17,owned)*discount());
}
function canWorld(i){return state.total>=WORLD_DEFS[i].need || state.completedWorlds>i}
function worldCompleted(i){
 const w=WORLD_DEFS[i];
 return w.buildings.every(b=>(state.buildings[b[0]]||0)>=10);
}
function buyBuilding(id){
 let found=null,w=null;
 for(const ww of WORLD_DEFS){const b=ww.buildings.find(x=>x[0]===id);if(b){found=b;w=ww;break}}
 if(!found||state.world<w.id)return;
 const c=buildingCost(found);
 if(state.money<c){toast("💸 Fonds insuffisants");return}
 state.money-=c;state.buildings[id]=(state.buildings[id]||0)+1;gainXP(4);save();render()
}
function gain(amount){
 state.money+=amount;state.total+=amount;gainXP(Math.max(1,Math.floor(amount/500)));
}
function mine(){
 const t=now();
 if(t-state.comboAt<1800)state.combo=Math.min(20,state.combo+1);else state.combo=1;
 state.comboAt=t;
 const v=clickValue();gain(v);save();render();
}
function gainXP(x){
 state.xp+=x;
 while(state.xp>=xpNeed()){state.xp-=xpNeed();state.level++}
}
function xpNeed(){return Math.floor(100*Math.pow(1.18,state.level-1))}
function unlockWorld(i){
 const w=WORLD_DEFS[i];
 if(i!==state.world+1 && i>state.world)return;
 if(state.total<w.need){toast("🔒 Il faut "+fmt(w.need)+" total");return}
 state.world=i;save();toast(w.icon+" "+w.name+" débloquée !");render()
}
function buyResearch(id){
 const r=RESEARCH.find(x=>x[0]===id); if(!r||researched(id))return;
 if(state.money<r[2]){toast("🔬 Pas assez de crédits");return}
 state.money-=r[2];state.research[id]=true;save();toast("🔬 Recherche terminée");render()
}
function buyTech(id){
 const r=TECH.find(x=>x[0]===id);if(!r||tech(id))return;
 if(state.money<r[2]){toast("🧪 Technologie trop chère");return}
 state.money-=r[2];state.tech[id]=true;save();toast("⚡ Technologie activée");render()
}
function contract(){
 if(!tech("market"))return;
 const list=[[100000,145000],[5000000,8000000],[250000000,450000000],[10000000000,19000000000]];
 const available=list.find(([cost])=>state.total>=cost&&!state.contracts[cost]);
 if(!available){toast("📦 Aucun contrat disponible");return}
 const [cost,reward]=available;
 state.contracts[cost]=true;state.money+=reward;state.total+=reward;save();toast("📦 Contrat livré +"+fmt(reward));render()
}
function missions(){
 for(const m of MISSIONS){
  if(!state.missions[m[0]]&&m[4](state)){state.missions[m[0]]=true;state.money+=m[3];state.total+=m[3];toast("🎯 Mission : +"+fmt(m[3]));}
 }
}
function updateCompleted(){state.completedWorlds=0;for(let i=0;i<WORLD_DEFS.length;i++)if(worldCompleted(i))state.completedWorlds++}
function prestige(){
 updateCompleted();
 if(state.completedWorlds<WORLD_DEFS.length){toast("🔒 Termine les 7 planètes (10 exemplaires de chaque bâtiment)");return}
 const need=5e12*Math.pow(8,state.prestige);
 if(state.total<need){toast("⭐ Prestige requis : "+fmt(need)+" total");return}
 state.prestige++;state.money=500;state.total=0;state.xp=0;state.level=1;state.world=0;state.completedWorlds=0;
 for(const w of WORLD_DEFS)for(const b of w.buildings)state.buildings[b[0]]=0;
 save();toast("⭐ PRESTIGE ! Bonus permanent +18%");render()
}
function daily(){
 const d=new Date().toISOString().slice(0,10);
 if(state.daily===d){toast("🎁 Bonus déjà récupéré");return}
 const reward=Math.max(500,Math.floor(autoRate()*60));
 state.daily=d;gain(reward);save();toast("🎁 Bonus : +"+fmt(reward));render()
}
function offline(){
 const elapsed=Math.min(now()-state.lastSave,(tech("offline")?24:12)*3600000);
 if(elapsed<10000)return;
 const earned=autoRate()*(elapsed/1000)*.75;
 if(earned>0){state.money+=earned;state.total+=earned;toast("🌙 Hors-ligne : +"+fmt(earned))}
}
function render(){
 missions();updateCompleted();
 document.getElementById("money").textContent=fmt(state.money);
 document.getElementById("total").textContent=fmt(state.total)+" total";
 document.getElementById("rate").textContent=fmt(autoRate())+"/s";
 document.getElementById("clickGain").textContent="+"+fmt(clickValue())+" / clic";
 document.getElementById("combo").textContent=state.combo>1?"x"+comboMult().toFixed(1):"0";
 document.getElementById("boost").textContent=state.boosts>now()?Math.ceil((state.boosts-now())/1000)+"s":"—";
 document.getElementById("contract").textContent=tech("market")?"Disponible":"🔒";
 document.getElementById("level").textContent=state.level;
 document.getElementById("xpText").textContent=fmt(state.xp)+" / "+fmt(xpNeed())+" XP";
 document.getElementById("xpbar").style.width=Math.min(100,state.xp/xpNeed()*100)+"%";
 document.getElementById("prestige").textContent=state.prestige;
 document.getElementById("worldProgress").textContent=(state.world+1)+"/"+WORLD_DEFS.length;
 document.getElementById("buildingCount").textContent=Object.values(state.buildings).reduce((a,b)=>a+b,0);
 document.getElementById("profileLine").textContent="Capitaine • "+state.nickname;
 document.getElementById("worldLabel").textContent=world().icon+" "+world().name.toUpperCase();
 renderWorlds();renderBuildings();renderResearch();renderMissions();renderPrestige();renderLeaderboard()
}
function renderWorlds(){
 const el=document.getElementById("worlds");el.innerHTML="";
 WORLD_DEFS.forEach((w,i)=>{
  const unlocked=canWorld(i), active=i===state.world, complete=worldCompleted(i);
  const div=document.createElement("div");div.className="world "+(active?"current ":"")+(unlocked?"":"locked");
  div.innerHTML=`<div><div class="item-title">${w.icon} ${w.name} ${complete?"✅":""}</div><div class="item-sub">${i===0?"Départ":"Total requis : "+fmt(w.need)} • x${w.mult}</div></div>
  <button class="buy" ${(!unlocked||active)?"disabled":""}>${active?"Active":unlocked?"Visiter":"🔒"}</button>`;
  div.querySelector("button").onclick=()=>unlockWorld(i);el.appendChild(div)
 })
}
function renderBuildings(){
 const el=document.getElementById("buildings");el.innerHTML="";
 const w=world();
 w.buildings.forEach(b=>{
  const q=state.buildings[b[0]]||0,c=buildingCost(b);
  const div=document.createElement("div");div.className="building";
  div.innerHTML=`<div class="item-row"><div><div class="item-title">${b[1]}</div><div class="item-sub">Niv. ${q} • +${fmt(b[3]*w.mult*autoMult()*globalMult()*deepMult())}/s par unité</div></div><button class="buy" ${state.money<c?"disabled":""}>Acheter<br><span class="cost">${fmt(c)}</span></button></div><div class="item-sub">Coût suivant ×1,17 • production de la planète ×${w.mult}</div>`;
  div.querySelector("button").onclick=()=>buyBuilding(b[0]);el.appendChild(div)
 })
}
function renderResearch(){
 const el=document.getElementById("research");el.innerHTML="";
 RESEARCH.forEach(r=>{
  const done=researched(r[0]);const div=document.createElement("div");div.className="research";
  div.innerHTML=`<div class="item-row"><div><div class="item-title">${done?"✅ ":""}${r[1]}</div><div class="item-sub">${r[3]}</div></div><button class="buy" ${done||state.money<r[2]?"disabled":""}>${done?"OK":fmt(r[2])}</button></div>`;
  div.querySelector("button").onclick=()=>buyResearch(r[0]);el.appendChild(div)
 });
 TECH.forEach(r=>{
  const done=tech(r[0]);const div=document.createElement("div");div.className="research";
  div.innerHTML=`<div class="item-row"><div><div class="item-title">${done?"✅ ":""}${r[1]}</div><div class="item-sub">${r[3]}</div></div><button class="buy" ${done||state.money<r[2]?"disabled":""}>${done?"OK":fmt(r[2])}</button></div>`;
  div.querySelector("button").onclick=()=>buyTech(r[0]);el.appendChild(div)
 });
 if(tech("overdrive")){const d=document.createElement("div");d.className="research";d.innerHTML=`<div class="item-row"><div><div class="item-title">⚡ Surrégime</div><div class="item-sub">Boost ×5 pendant 30 secondes.</div></div><button class="buy">ACTIVER</button></div>`;d.querySelector("button").onclick=()=>{if(state.boosts>now()){toast("⚡ Déjà actif");return}state.boosts=now()+30000;save();render()};el.appendChild(d)}
 if(tech("market")){const d=document.createElement("div");d.className="research";d.innerHTML=`<div class="item-row"><div><div class="item-title">📦 Marché galactique</div><div class="item-sub">Livrer un contrat pour gagner une grosse prime.</div></div><button class="buy">LIVRER</button></div>`;d.querySelector("button").onclick=contract;el.appendChild(d)}
}
function renderMissions(){
 const el=document.getElementById("missions");el.innerHTML="";
 MISSIONS.forEach(m=>{
  const done=state.missions[m[0]], ok=m[4](state);
  const d=document.createElement("div");d.className="mission";d.innerHTML=`<div class="item-title">${done?"✅":"🎯"} ${m[1]}</div><div class="item-sub">Récompense : ${fmt(m[3])}</div><div class="progress"><i style="width:${done?100:ok?100:0}%"></i></div>`;
  el.appendChild(d)
 })
}
function renderPrestige(){
 const el=document.getElementById("prestigeBox");
 const need=5e12*Math.pow(8,state.prestige);
 const ready=state.completedWorlds===WORLD_DEFS.length&&state.total>=need;
 el.innerHTML=`<div class="item-title">Prestige ${state.prestige+1}</div>
 <div class="item-sub">Condition 1 : terminer les <b>7 planètes</b> avec au moins 10 exemplaires de chaque bâtiment (${state.completedWorlds}/7).<br>Condition 2 : atteindre ${fmt(need)} de total.</div>
 <button class="buy" style="width:100%;margin-top:10px" ${ready?"":"disabled"}>⭐ PRESTIGE +18% permanent</button>`;
 el.querySelector("button").onclick=prestige;
}
function localBoard(){
 const raw=JSON.parse(localStorage.getItem("space-tycoon-local-board")||"[]");
 const me={name:state.nickname,total:Math.floor(state.total),prestige:state.prestige,level:state.level};
 const arr=[...raw.filter(x=>x.name!==state.nickname),me].sort((a,b)=>b.total-a.total).slice(0,10);
 localStorage.setItem("space-tycoon-local-board",JSON.stringify(arr));return arr
}
function renderLeaderboard(){
 const arr=localBoard(),el=document.getElementById("leaderboard");el.innerHTML="";
 arr.forEach((x,i)=>{const d=document.createElement("div");d.className="world";d.innerHTML=`<div><div class="item-title">${i+1}. ${i===0?"👑 ":""}${x.name}</div><div class="item-sub">Niv. ${x.level} • ⭐ ${x.prestige}</div></div><b>${fmt(x.total)}</b>`;el.appendChild(d)});
 const me=arr.findIndex(x=>x.name===state.nickname);document.getElementById("rank").textContent=me>=0?"#"+(me+1):"—"
}
const mineBtn=document.getElementById("mineBtn");
mineBtn.addEventListener("pointerdown",(e)=>{
  e.preventDefault();
  if(e.pointerType==="mouse" && e.button!==0)return;
  mine();
});
mineBtn.addEventListener("click",(e)=>e.preventDefault());
mineBtn.addEventListener("dblclick",(e)=>e.preventDefault());
mineBtn.addEventListener("contextmenu",(e)=>e.preventDefault());
document.getElementById("dailyBtn").onclick=daily;
document.getElementById("saveProfile").onclick=()=>{const v=document.getElementById("nicknameInput").value.trim().replace(/[<>]/g,"").slice(0,18);if(v){state.nickname=v;save();toast("👤 Profil enregistré");closeModals();render()}};
document.getElementById("exportBtn").onclick=()=>{
 const blob=new Blob([JSON.stringify(state)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="space-tycoon-v4-save.json";a.click();URL.revokeObjectURL(url)
};
document.getElementById("importBtn").onclick=()=>{
 const input=document.createElement("input");input.type="file";input.accept=".json,application/json";input.onchange=()=>{const f=input.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x||!x.buildings)throw 0;state=x;state.version=4;save();toast("📥 Sauvegarde importée");render()}catch(e){toast("❌ Fichier invalide")}};r.readAsText(f)};input.click()
};
document.getElementById("resetBtn").onclick=()=>{if(confirm("Réinitialiser complètement le jeu ?")){localStorage.removeItem(V4_KEY);localStorage.removeItem(V3_KEY);localStorage.removeItem(V2_KEY);location.reload()}};
document.querySelectorAll("[data-modal]").forEach(b=>b.onclick=()=>{document.getElementById(b.dataset.modal).classList.remove("hidden");document.getElementById("nicknameInput").value=state.nickname;document.getElementById("profileStats").textContent=`Total : ${fmt(state.total)} • Niveau : ${state.level} • Prestige : ${state.prestige}`});
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeModals);
function closeModals(){document.querySelectorAll(".modal").forEach(m=>m.classList.add("hidden"))}
document.querySelectorAll("[data-scroll]").forEach(b=>b.onclick=()=>{const id=b.dataset.scroll;window.scrollTo({top:id==="top"?0:document.getElementById(id).offsetTop-80,behavior:"smooth"})});
offline();render();save();
setInterval(()=>{const r=autoRate()/10;gain(r);render()},100);
setInterval(()=>{save();render()},5000);
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{});

// iPhone anti-zoom protection for rapid mining taps.
["gesturestart","gesturechange","gestureend"].forEach(type=>{
  document.addEventListener(type,(e)=>{
    if(e.target && e.target.closest && e.target.closest("#mineBtn")) e.preventDefault();
  },{passive:false});
});
