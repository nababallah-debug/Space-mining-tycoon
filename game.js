const SUPABASE_URL='https://gvyeooqemajnvfbgnagv.supabase.co';
const SUPABASE_KEY='sb_publishable_moYDSTJplgl9XPCiKR96b_CPt3MJ7z';
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

const KEY='space-mining-v11';

const WORLDS=[
  ['🌍','Terre',1,1],['🌙','Lune',100,2],['🔴','Mars',10000,5],['🪐','Jupiter',1e6,12],
  ['💍','Saturne',1e8,30],['🔵','Uranus',1e10,70],['🌊','Neptune',1e12,160],['☀️','Soleil',1e14,350],
  ['⭐','Proxima',1e16,800],['🕳️','Trou Noir',1e18,1800],['🌌','Nébuleuse',1e20,4000],['💠','Cristallia',1e22,9000],
  ['🧊','Cryon',1e24,20000],['🔥','Ignis',1e26,45000],['⚡','Fulguris',1e28,100000],['🌈','Arcadia',1e30,220000],
  ['🧬','Genesia',1e32,500000],['👁️','Oméga',1e34,1100000],['🌀','Dimension X',1e36,2500000],['♾️','Infini',1e38,5500000],
  ['🌠','Hyperion',1e40,12000000],['🔮','Mystéria',1e42,27000000],['🛸','Extraterra',1e44,60000000],['👽','Xénos',1e46,135000000],
  ['🛰️','Galaxion',1e48,300000000],['🌟','Stellaria',1e50,700000000],['💫','Cosmoria',1e52,1600000000],['🌑','Void',1e54,3600000000],
  ['🧿','Nexus',1e56,8000000000],['🪐','Titania',1e58,18000000000],['🌌','Andromède',1e60,40000000000],['✨','Trône de la Création',1e105,80000]
];

const BUILDINGS=[
  ['⛏️','Foreuse',10,1.00],['🤖','Robot mineur',120,1.22],['🏭','Usine orbitale',1500,1.48],
  ['🛰️','Station minière',18000,1.82],['⚙️','Raffinerie',220000,2.25],['🔬','Laboratoire',3000000,2.78],
  ['🧲','Extracteur magnétique',40000000,3.42],['💎','Mine à cristaux',550000000,4.20],
  ['🌋','Foreuse planétaire',8000000000,5.17],['☢️','Réacteur stellaire',120000000000,6.36],
  ['🌀','Extracteur dimensionnel',2000000000000,7.82],['👑','Forge cosmique',35000000000000,9.62]
];

const LATE_BUILDINGS=[
  ['🪐','Collecteur planétaire',8e14,12],['🌌','Moissonneur galactique',2e16,15],
  ['💫','Convertisseur cosmique',5e17,19],['🧿','Extracteur de vide',1.5e19,24],
  ['🕳️','Forage gravitationnel',5e20,30],['⚛️','Forge quantique',2e22,38],
  ['🔮','Distillateur de réalité',8e23,48],['♾️','Moteur d’infini',3e25,61],
  ['🌠','Réacteur d’éternité',1e27,78],['✨','Créateur d’étoiles',4e28,100],
  ['👁️','Architecte cosmique',2e30,128],['👑','Trône minier',1e32,165]
];

const TECH=[
  ['drill','Forage optimisé',1e4,'click',1.5],['servo','Servomoteurs',2e5,'click',2],['laser','Laser minier',5e6,'click',3],
  ['nanobots','Nanobots',1e8,'auto',2],['fusion','Fusion',3e9,'auto',3],['antimatter','Antimatière',1e11,'auto',5],
  ['warp','Moteur warp',5e12,'global',2],['dyson','Sphère de Dyson',2e14,'global',4],['quantum','Réseau quantique',1e16,'global',8],
  ['singularity','Singularité',5e18,'global',15],['chrono','Chronoflux',2e21,'global',30],['void','Technologie du vide',1e24,'global',60],
  ['reality','Manipulation de réalité',1e27,'global',120],['infinity','Énergie infinie',1e30,'global',250],
  ['ascension','Ascension',1e33,'global',500],['omnipotence','Omnipotence',1e36,'global',1000],
  ['creator','Pouvoir du créateur',1e40,'global',2500],['absolute','Absolu',1e45,'global',7000],
  ['eternal','Éternité',1e50,'global',20000],['origin','Origine',1e60,'global',100000]
];

const MISSION_BASE=[
  ['m1','Premier forage','clicks',100,5000],['m2','Petit industriel','buildings',10,25000],
  ['m3','Milliardaire','earn',1e9,100000],['m4','Explorateur','planet',5,500000],
  ['m5','Empire','buildings',50,2500000],['m6','Trillionnaire','earn',1e12,10000000],
  ['m7','Conquérant','planet',10,50000000],['m8','Magnat','buildings',100,250000000],
  ['m9','Quadrillionnaire','earn',1e15,1000000000],['m10','Maître du cosmos','planet',20,10000000000]
];

const PLANET_MISSIONS=[
  ['p1','Lune colonisée','planet',1,50000],['p2','Mars conquis','planet',2,500000],
  ['p3','Jupiter exploité','planet',3,5000000],['p4','Saturne maîtrisé','planet',4,50000000],
  ['p5','Neptune atteint','planet',7,500000000],['p6','Noyau galactique','planet',15,5000000000]
];

const WEEKLY=[
  ['week_click','Frénésie de forage','clicks',2500,1000000],['week_build','Semaine industrielle','buildings',75,5000000],
  ['week_earn','Mineur acharné','run',1e11,25000000],['week_buy','Investisseur','spend',1e12,100000000],
  ['week_world','Explorateur','planet',3,500000000]
];

const DAILY_REWARDS=[50000000,100000000,500000000,1000000000];

const DAILY_POOLS=[
  [
    ['daily_clicks_250','Mineur régulier','clicks',250],
    ['daily_build_20','Petit chantier','buildings',20],
    ['daily_spend_100m','Acheteur actif','spend',100000000],
    ['daily_clicks_350','Forage intensif','clicks',350]
  ],
  [
    ['daily_earn_50m','Petit jackpot','earn',50000000],
    ['daily_clicks_600','Forage soutenu','clicks',600],
    ['daily_build_35','Constructeur du jour','buildings',35],
    ['daily_spend_250m','Investisseur du jour','spend',250000000]
  ],
  [
    ['daily_earn_250m','Gros rendement','earn',250000000],
    ['daily_build_60','Expansion industrielle','buildings',60],
    ['daily_spend_500m','Gros investisseur','spend',500000000],
    ['daily_clicks_1000','Marathon minier','clicks',1000]
  ],
  [
    ['daily_earn_1b','Milliard quotidien','earn',1000000000],
    ['daily_spend_1b','Empire industriel','spend',1000000000],
    ['daily_build_100','Cent constructions','buildings',100],
    ['daily_clicks_1800','Frénésie cosmique','clicks',1800]
  ]
];

function dayKey(d=new Date()){
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}

function dailySeed(key){
  let h=2166136261;
  for(let i=0;i<key.length;i++)h=Math.imul(h^key.charCodeAt(i),16777619);
  return h>>>0;
}

function ensureDaily(){
  const key=dayKey();
  if(s.daily?.key===key&&Array.isArray(s.daily.missions)&&s.daily.missions.length===4)return;

  const seed=dailySeed(key);
  const missions=DAILY_POOLS.map((pool,i)=>{
    const idx=((seed+i*2654435761)>>>0)%pool.length;
    const m=pool[idx];
    return ['daily'+i,m[1],m[2],m[3],DAILY_REWARDS[i]];
  });

  s.daily={
    key,
    missions,
    claimed:{},
    base:{
      clicks:s.cLICKS,
      earned:s.lifetimeTotal,
      buildings:totalBuildings(),
      spend:s.spent
    }
  };
  save();
}

function dailyValue(m){
  ensureDaily();
  const base=s.daily.base||{};
  switch(m[2]){
    case 'clicks':return Math.max(0,s.cLICKS-(base.clicks||0));
    case 'earn':return Math.max(0,s.lifetimeTotal-(base.earned||0));
    case 'buildings':return Math.max(0,totalBuildings()-(base.buildings||0));
    case 'spend':return Math.max(0,s.spent-(base.spend||0));
    default:return 0;
  }
}

function dailyMissionCard(m){
  const claimed=!!s.daily.claimed[m[0]];
  const v=dailyValue(m),need=m[3],pct=Math.min(100,v/need*100);
  return `<article class="mission-card"><div class="mission-top"><strong>${claimed?'✅':'🎯'} ${m[1]}</strong><span>${fmt(m[4])}</span></div><small>${fmt(v)} / ${fmt(need)}</small><div class="bar"><i style="width:${pct}%"></i></div><button class="buy" data-daily="${m[0]}" ${claimed||v<need?'disabled':''}>${claimed?'RÉCLAMÉ':'RÉCLAMER'}</button></article>`;
}

function claimDaily(id){
  ensureDaily();
  const m=s.daily.missions.find(x=>x[0]===id);
  if(!m||s.daily.claimed[id]||dailyValue(m)<m[3])return;
  s.daily.claimed[id]=true;
  earn(m[4]);
  save();
  toast('📅 Récompense quotidienne +'+fmt(m[4]));
  renderMissions();
  uiHeader();
  syncCloud(true);
}

function fresh(){
  return {
    money:0,
    runTotal:0,
    lifetimeTotal:0,
    prestige:0,
    prestigeShards:0,
    crystals:0,
    lastCrystalCheckAt:Date.now(),
    buildings:{},
    research:{},
    missions:{},
    weekly:{
      key:'',
      claimed:{},
      base:{
        clicks:0,
        run:0,
        buildings:0,
        spend:0,
        planet:0
      }
    },
    daily:{
      key:dayKey(),
      missions:[],
      claimed:{},
      base:{}
    },
    xp:0,
    level:1,
    nickname:'',
    lastActiveAt:Date.now(),
    lastOfflineClaimAt:Date.now(),
    combo:0,
    cLICKS:0,
    spent:0,
    offlineLast:0,
    online:true
  };
}

let s;

function load(){
  try{
    const raw=localStorage.getItem(KEY);
    if(!raw)return fresh();
    const parsed=JSON.parse(raw);
    return migrateState(parsed);
  }catch(e){
    console.warn('load',e);
    return fresh();
  }
}

function migrateState(z){
  const base=fresh();
  z=z||{};
  Object.keys(base).forEach(k=>{
    if(z[k]===undefined)z[k]=base[k];
  });

  z.buildings=z.buildings||{};
  z.research=z.research||{};
  z.missions=z.missions||{};
  z.weekly=z.weekly||base.weekly;
  z.weekly.claimed=z.weekly.claimed||{};
  z.weekly.base=z.weekly.base||base.weekly.base;
  z.daily=z.daily||base.daily;
  z.daily.claimed=z.daily.claimed||{};
  z.daily.base=z.daily.base||{};
  z.daily.missions=Array.isArray(z.daily.missions)?z.daily.missions:[];

  z.xp=Number(z.xp)||0;
  z.level=Math.max(1,Number(z.level)||1);
  z.nickname=typeof z.nickname==='string'?z.nickname:'';
  z.prestige=Number(z.prestige)||0;
  z.prestigeShards=Number(z.prestigeShards)||0;
  z.crystals=Number(z.crystals)||0;
  z.lastCrystalCheckAt=Number(z.lastCrystalCheckAt)||Date.now();
  z.lastActiveAt=Number(z.lastActiveAt)||Date.now();
  z.lastOfflineClaimAt=Number(z.lastOfflineClaimAt)||Date.now();
  z.cLICKS=Number(z.cLICKS)||0;
  z.spent=Number(z.spent)||0;
  z.runTotal=Number(z.runTotal)||0;
  z.lifetimeTotal=Number(z.lifetimeTotal)||0;
  z.money=Number(z.money)||0;

  return z;
}

function save(){
  try{
    localStorage.setItem(KEY,JSON.stringify(s));
  }catch(e){
    console.warn('save',e);
  }
}

function fmt(n){
  n=Number(n)||0;
  if(!Number.isFinite(n))return '∞';
  const abs=Math.abs(n);
  if(abs<1000)return Math.floor(n).toLocaleString('fr-FR');
  const units=['K','M','Md','T','Qa','Qi','Sx','Sp','Oc','No','Dc'];
  let i=-1,v=n;
  while(Math.abs(v)>=1000&&i<units.length-1){
    v/=1000;
    i++;
  }
  return v.toLocaleString('fr-FR',{maximumFractionDigits:v>=100?0:v>=10?1:2})+(i>=0?' '+units[i]:'');
}

function fmtRate(n){
  return fmt(n)+'/s';
}

function setText(id,v){
  const el=document.getElementById(id);
  if(el)el.textContent=v;
}

function toast(msg){
  const el=document.getElementById('toast');
  if(!el)return;
  el.textContent=msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),2200);
}

function totalBuildings(){
  return Object.values(s.buildings||{}).reduce((a,b)=>a+(Number(b)||0),0);
}

function buildingList(w){
  return w>=20?LATE_BUILDINGS:BUILDINGS;
}

function baseProd(w,b){
  const list=buildingList(w);
  const item=list[b]||list[0];
  return Number(item[2])||0;
}

function buildingName(w,b){
  const item=buildingList(w)[b];
  return item?item[1]:'Bâtiment';
}

function costMult(){
  return 1;
}

function prestigeMult(){
  return Math.pow(1.15,s.prestige||0);
}

function globalMult(){
  let m=1;
  TECH.forEach(t=>{
    const lv=s.research[t[0]]||0;
    if(lv){
      if(t[3]==='global')m*=Math.pow(t[4],lv);
    }
  });
  return m;
}

function autoMult(){
  let m=1;
  TECH.forEach(t=>{
    const lv=s.research[t[0]]||0;
    if(lv&&t[3]==='auto')m*=Math.pow(t[4],lv);
  });
  return m;
}

function clickMult(){
  let m=1;
  TECH.forEach(t=>{
    const lv=s.research[t[0]]||0;
    if(lv&&t[3]==='click')m*=Math.pow(t[4],lv);
  });
  return m;
}

function incomeMult(){
  return 1;
}

function buildingCost(w,b){
  const n=s.buildings[w+'-'+b]||0;
  return (500*Math.pow(28,w)*Math.pow(5.5,b)*Math.pow(1.16,n)*costMult())/5;
}

function autoRate(){
  let r=0;
  WORLDS.forEach((_,w)=>buildingList(w).forEach((_,b)=>{
    r+=(s.buildings[w+'-'+b]||0)*baseProd(w,b)*WORLDS[w][3];
  }));
  return r*prestigeMult()*globalMult()*autoMult()*incomeMult()*3;
}
function clickPower(){
  return clickMult()*prestigeMult()*globalMult()*incomeMult();
}

function earn(n){
  n=Number(n)||0;
  s.money+=n;
  s.runTotal+=n;
  s.lifetimeTotal+=n;
  addXp(Math.max(1,Math.floor(Math.log10(Math.max(1,n))+1)));
}

function spend(n){
  s.spent+=n;
}

function addXp(n){
  s.xp+=Number(n)||0;
  const need=100*Math.pow(1.35,Math.max(0,s.level-1));
  if(s.xp>=need){
    s.xp-=need;
    s.level++;
    toast('⬆️ Niveau '+s.level);
  }
}

function missionValue(m){
  switch(m[2]){
    case 'clicks':return s.cLICKS;
    case 'buildings':return totalBuildings();
    case 'earn':return s.lifetimeTotal;
    case 'planet':return selectedWorld+1;
    case 'run':return s.runTotal;
    case 'spend':return s.spent;
    default:return 0;
  }
}

function weeklyValue(m){
  const b=s.weekly.base||{};
  switch(m[2]){
    case 'clicks':return Math.max(0,s.cLICKS-(b.clicks||0));
    case 'buildings':return Math.max(0,totalBuildings()-(b.buildings||0));
    case 'run':return Math.max(0,s.runTotal-(b.run||0));
    case 'spend':return Math.max(0,s.spent-(b.spend||0));
    case 'planet':return Math.max(0,(selectedWorld+1)-(b.planet||0));
    default:return 0;
  }
}

function weekKey(d=new Date()){
  const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
  const day=x.getUTCDay()||7;
  x.setUTCDate(x.getUTCDate()+4-day);
  const yearStart=new Date(Date.UTC(x.getUTCFullYear(),0,1));
  const week=Math.ceil((((x-yearStart)/86400000)+1)/7);
  return x.getUTCFullYear()+'-W'+String(week).padStart(2,'0');
}

function ensureWeekly(){
  const key=weekKey();
  if(s.weekly?.key===key)return;

  s.weekly={
    key,
    claimed:{},
    base:{
      clicks:s.cLICKS,
      run:s.runTotal,
      buildings:totalBuildings(),
      spend:s.spent,
      planet:selectedWorld+1
    }
  };
  save();
}

function missionCard(m,weekly=false){
  const claimed=!!(weekly?s.weekly.claimed[m[0]]:s.missions[m[0]]);
  const v=weekly?weeklyValue(m):missionValue(m);
  const need=m[3];
  const pct=Math.min(100,v/need*100);

  return `<article class="mission-card"><div class="mission-top"><strong>${claimed?'✅':'🎯'} ${m[1]}</strong><span>${fmt(m[4])}</span></div><small>${fmt(v)} / ${fmt(need)}</small><div class="bar"><i style="width:${pct}%"></i></div><button class="buy" data-${weekly?'weekly':'mission'}="${m[0]}" ${claimed||v<need?'disabled':''}>${claimed?'RÉCLAMÉ':'RÉCLAMER'}</button></article>`;
}

function claimMission(id){
  const m=[...MISSION_BASE,...PLANET_MISSIONS].find(x=>x[0]===id);
  if(!m||s.missions[id]||missionValue(m)<m[3])return;

  s.missions[id]=true;
  earn(m[4]);
  save();
  toast('🎯 Mission +'+fmt(m[4]));
  renderMissions();
  uiHeader();
  syncCloud(true);
}

function claimWeekly(id){
  ensureWeekly();
  const m=WEEKLY.find(x=>x[0]===id);
  if(!m||s.weekly.claimed[id]||weeklyValue(m)<m[3])return;

  s.weekly.claimed[id]=true;
  earn(m[4]);
  save();
  toast('📅 Hebdo +'+fmt(m[4]));
  renderMissions();
  uiHeader();
  syncCloud(true);
}

function renderMissions(){
  ensureDaily();
  ensureWeekly();

  const list=document.getElementById('missionList');
  if(!list)return;

  list.innerHTML=`<div class="mission-section"><h3>📅 Quêtes quotidiennes <small>du ${s.daily.key}</small></h3>${s.daily.missions.map(dailyMissionCard).join('')}</div>
  <div class="mission-section"><h3>📜 Campagne</h3>${MISSION_BASE.map(m=>missionCard(m,false)).join('')}</div>
  <div class="mission-section"><h3>🌍 Missions planétaires</h3>${PLANET_MISSIONS.map(m=>missionCard(m,false)).join('')}</div>
  <div class="mission-section"><h3>📅 Quêtes hebdomadaires <small>semaine du ${s.weekly.key}</small></h3>${WEEKLY.map(m=>missionCard(m,true)).join('')}</div><div id="prestigeCard"></div>`;

  renderPrestige();
  setText('missionCount',Object.keys(s.missions).length+' / '+(MISSION_BASE.length+PLANET_MISSIONS.length));
}

function renderPrestige(){
  const el=document.getElementById('prestigeCard');
  if(!el)return;

  const gain=Math.floor(Math.sqrt(Math.max(0,s.runTotal)/1e12));
  el.innerHTML=`<article class="prestige-card"><h3>♻️ Prestige</h3><p>Réinitialise cette partie pour gagner des fragments.</p><strong>Gain actuel : +${fmt(gain)} ✨</strong><button class="buy" data-prestige="1" ${gain<1?'disabled':''}>PRESTIGE</button></article>`;
}

function researchCost(t){
  const lv=s.research[t[0]]||0;
  return t[1]*Math.pow(5,lv);
}

function buyResearch(id){
  const t=TECH.find(x=>x[0]===id);
  if(!t)return;

  const c=researchCost(t);
  if(s.money<c){
    toast('💰 Fonds insuffisants');
    return;
  }

  s.money-=c;
  spend(c);
  s.research[id]=(s.research[id]||0)+1;
  save();
  toast('🔬 '+t[1]+' amélioré');
  renderResearch();
  uiHeader();
  syncCloud(true);
}

function renderResearch(){
  const el=document.getElementById('researchList');
  if(!el)return;

  el.innerHTML=TECH.map(t=>{
    const lv=s.research[t[0]]||0;
    const c=researchCost(t);
    return `<article class="tech-card"><div><strong>${t[1]}</strong><small>Niveau ${lv}</small></div><button class="buy" data-research="${t[0]}" ${s.money<c?'disabled':''}>${fmt(c)}</button></article>`;
  }).join('');
}

function worldUnlocked(w){
  if(w===0)return true;
  return s.lifetimeTotal>=WORLDS[w][2];
}

function renderWorlds(){
  const el=document.getElementById('worldList');
  if(!el)return;

  el.innerHTML=WORLDS.map((w,i)=>{
    const unlocked=worldUnlocked(i);
    const active=i===selectedWorld;
    return `<button class="world ${active?'active':''}" data-world="${i}" ${unlocked?'':'disabled'}><span>${w[0]}</span><strong>${w[1]}</strong><small>${unlocked?'x'+w[3]:fmt(w[2])}</small></button>`;
  }).join('');
}

function renderBuildings(){
  const el=document.getElementById('buildingList');
  if(!el)return;

  const list=buildingList(selectedWorld);
  el.innerHTML=list.map((b,i)=>{
    const key=selectedWorld+'-'+i;
    const n=s.buildings[key]||0;
    const c=buildingCost(selectedWorld,i);
    return `<article class="building-card"><div class="building-icon">${b[0]}</div><div class="building-info"><strong>${b[1]}</strong><small>Niveau ${n} · +${fmtRate(baseProd(selectedWorld,i)*b[3])}</small></div><button class="buy" data-buy="${i}" ${s.money<c?'disabled':''}>${fmt(c)}</button></article>`;
  }).join('');
}

function uiHeader(){
  setText('money',fmt(s.money));
  setText('rate',fmtRate(autoRate()));
  setText('clickPower',fmt(clickPower()));
  setText('level',s.level);
  setText('xp',fmt(s.xp));
  setText('nickname',s.nickname||'Mineur');
  setText('prestige',fmt(s.prestige));
  setText('crystals',fmt(s.crystals));

  const btn=document.getElementById('mineButton');
  if(btn)btn.textContent='⛏️ +'+fmt(clickPower());
}

function renderAll(){
  uiHeader();
  renderWorlds();
  renderBuildings();
  renderResearch();
  renderMissions();
}

function setScreen(screen){
  currentScreen=screen;
  document.querySelectorAll('[data-screen]').forEach(el=>{
    el.classList.toggle('active',el.dataset.screen===screen);
  });

  document.querySelectorAll('.screen').forEach(el=>{
    el.classList.toggle('active',el.id===screen+'Screen');
  });

  if(screen==='mine'){
    renderWorlds();
    renderBuildings();
  }
  if(screen==='research')renderResearch();
  if(screen==='missions')renderMissions();
  if(screen==='shop')renderShop();
  if(screen==='leaderboard')renderLeaderboard();
}

function selectWorld(w){
  w=Number(w);
  if(!Number.isInteger(w)||w<0||w>=WORLDS.length)return;
  if(!worldUnlocked(w)){
    toast('🔒 Monde verrouillé');
    return;
  }

  selectedWorld=w;
  localStorage.setItem('sm-world',String(w));
  renderWorlds();
  renderBuildings();
}

function buyBuilding(b){
  b=Number(b);
  const c=buildingCost(selectedWorld,b);

  if(s.money<c){
    toast('💰 Fonds insuffisants');
    return;
  }

  s.money-=c;
  spend(c);

  const key=selectedWorld+'-'+b;
  s.buildings[key]=(s.buildings[key]||0)+1;

  save();
  renderBuildings();
  uiHeader();
  renderMissions();
}

function mine(){
  const gain=clickPower();
  earn(gain);
  s.cLICKS++;
  s.combo=Math.min(100,(s.combo||0)+1);
  comboUntil=Date.now()+1800;

  const btn=document.getElementById('mineButton');
  if(btn){
    btn.classList.remove('pop');
    void btn.offsetWidth;
    btn.classList.add('pop');
  }

  save();
  uiHeader();
}
function doPrestige(){
  const gain=Math.floor(Math.sqrt(Math.max(0,s.runTotal)/1e12));
  if(gain<1){
    toast('❌ Pas assez de richesse pour le prestige');
    return;
  }

  if(!confirm('Faire un prestige et gagner '+fmt(gain)+' fragments ?'))return;

  const keep={
    nickname:s.nickname,
    prestige:(s.prestige||0)+1,
    prestigeShards:(s.prestigeShards||0)+gain,
    research:{...s.research},
    missions:{...s.missions},
    weekly:{
      ...s.weekly,
      claimed:{...s.weekly.claimed},
      base:{...s.weekly.base}
    },
    daily:{
      ...s.daily,
      claimed:{...s.daily.claimed},
      missions:s.daily.missions?[...s.daily.missions]:[],
      base:{...s.daily.base}
    },
    shopUpgrades:s.shopUpgrades||{},
    crystals:s.crystals||0,
    xp:s.xp||0,
    level:s.level||1,
    cLICKS:s.cLICKS||0,
    lifetimeTotal:s.lifetimeTotal||0,
    online:true
  };

  s=fresh();
  Object.assign(s,keep);

  save();
  toast('♻️ Prestige réussi ! +'+fmt(gain)+' ✨');
  renderAll();
  syncCloud(true);
}

function shopItems(){
  return [
    ['offline','🌙 Stockage offline','1000000',1],
    ['combo','🔥 Combo amélioré','5000000',2],
    ['click','⛏️ Puissance de forage','25000000',3]
  ];
}

function shopCost(item){
  const lv=(s.shopUpgrades?.[item[0]]||0);
  return Number(item[2])*Math.pow(10,lv);
}

function shopMult(item){
  const lv=(s.shopUpgrades?.[item[0]]||0);
  return Math.pow(item[3],lv);
}

function renderShop(){
  const el=document.getElementById('shopList');
  if(!el)return;

  el.innerHTML=shopItems().map(item=>{
    const lv=s.shopUpgrades?.[item[0]]||0;
    const c=shopCost(item);
    return `<article class="shop-card"><strong>${item[1]}</strong><small>Niveau ${lv}</small><button class="buy" data-shop="${item[0]}" ${s.money<c?'disabled':''}>${fmt(c)}</button></article>`;
  }).join('');
}

function buyShop(id){
  const item=shopItems().find(x=>x[0]===id);
  if(!item)return;

  const c=shopCost(item);
  if(s.money<c){
    toast('💰 Fonds insuffisants');
    return;
  }

  s.money-=c;
  spend(c);
  s.shopUpgrades=s.shopUpgrades||{};
  s.shopUpgrades[id]=(s.shopUpgrades[id]||0)+1;

  save();
  renderShop();
  uiHeader();
  syncCloud(true);
}

function earnOffline(){
  const now=Date.now();
  const last=Number(s.lastOfflineClaimAt)||now;
  const elapsed=Math.max(0,Math.min(7*24*3600*1000,now-last));
  if(elapsed<10000)return 0;

  const rate=autoRate();
  const bonus=rate*(elapsed/1000)*0.75;

  s.lastOfflineClaimAt=now;
  s.lastActiveAt=now;

  if(bonus>0){
    earn(bonus);
    s.offlineLast=bonus;
    save();
    setTimeout(()=>toast('🌙 Revenus hors ligne +'+fmt(bonus)),500);
  }

  return bonus;
}

function crystalAutoFarm(){
  const now=Date.now();
  const last=Number(s.lastCrystalCheckAt)||now;
  const elapsed=Math.max(0,now-last);
  const gain=Math.floor(elapsed/3600000);

  if(gain>0){
    s.crystals+=gain;
    s.lastCrystalCheckAt=now;
    save();
  }

  return gain;
}

function scheduleEvent(){
  s.event=s.event||{};
  s.event.nextAt=Date.now()+3600000;
  s.event.type=['rush','crystal','discount'][Math.floor(Math.random()*3)];
  save();
}

function checkEvents(){
  if(!s.event?.nextAt){
    scheduleEvent();
    return;
  }

  if(Date.now()<s.event.nextAt)return;

  const type=s.event.type;
  if(type==='rush')toast('⚡ Événement : production accélérée !');
  if(type==='crystal')toast('💎 Événement : cristaux bonus !');
  if(type==='discount')toast('🏷️ Événement : réductions !');

  scheduleEvent();
}

async function syncCloud(force=false){
  if(syncing)return;
  if(!force&&Date.now()-lastCloud<15000)return;

  syncing=true;
  lastCloud=Date.now();

  try{
    const {data:{user}}=await sb.auth.getUser();

    if(!user){
      syncing=false;
      return;
    }

    await sb.from('game_saves').upsert({
      user_id:user.id,
      save_key:KEY,
      save_data:s,
      updated_at:new Date().toISOString()
    },{
      onConflict:'user_id,save_key'
    });
  }catch(e){
    console.warn('syncCloud',e);
  }

  syncing=false;
}

async function loadCloud(){
  try{
    let {data:{user}}=await sb.auth.getUser();

    if(!user){
      const res=await sb.auth.signInAnonymously();
      user=res.data?.user||null;
    }

    if(!user)return;

    const {data,error}=await sb.from('game_saves')
      .select('save_data')
      .eq('user_id',user.id)
      .eq('save_key',KEY)
      .maybeSingle();

    if(error){
      console.warn('loadCloud query',error);
      return;
    }

    if(data?.save_data){
      const cloud=migrateState(data.save_data);

      if((cloud.lifetimeTotal||0)>(s.lifetimeTotal||0)){
        s=cloud;
        save();
        renderAll();
        toast('☁️ Sauvegarde cloud chargée');
      }
    }
  }catch(e){
    console.warn('loadCloud',e);
  }
}

async function submitLeaderboard(){
  try{
    const {data:{user}}=await sb.auth.getUser();
    if(!user){
      toast('☁️ Connexion cloud indisponible');
      return;
    }

    await sb.from('leaderboard').upsert({
      user_id:user.id,
      nickname:s.nickname||'Mineur',
      score:s.lifetimeTotal||0,
      prestige:s.prestige||0,
      level:s.level||1,
      updated_at:new Date().toISOString()
    },{
      onConflict:'user_id'
    });

    toast('🏆 Score envoyé');
    renderLeaderboard();
  }catch(e){
    console.warn('leaderboard',e);
    toast('❌ Impossible d’envoyer le score');
  }
}

async function renderLeaderboard(){
  const el=document.getElementById('leaderboardList');
  if(!el)return;

  el.innerHTML='<p>Chargement...</p>';

  try{
    const {data,error}=await sb.from('leaderboard')
      .select('nickname,score,prestige,level')
      .order('score',{ascending:false})
      .limit(50);

    if(error)throw error;

    el.innerHTML=(data||[]).map((x,i)=>
      `<article class="rank-card"><span>#${i+1}</span><strong>${x.nickname||'Mineur'}</strong><small>${fmt(x.score)} · Prestige ${x.prestige||0} · Nv. ${x.level||1}</small></article>`
    ).join('')||'<p>Aucun score.</p>';
  }catch(e){
    console.warn('renderLeaderboard',e);
    el.innerHTML='<p>Classement indisponible.</p>';
  }
}

function updateNickname(){
  const input=document.getElementById('nicknameInput');
  if(!input)return;

  const name=input.value.trim().slice(0,24);
  if(!name)return;

  s.nickname=name;
  save();
  uiHeader();
  syncCloud(true);
  toast('👤 Pseudo enregistré');
}

function resetGame(){
  if(!confirm('⚠️ Réinitialiser complètement la partie ?'))return;

  resetting=true;
  localStorage.removeItem(KEY);
  localStorage.removeItem('sm-world');
  location.reload();
}

function showOffline(){
  if(s.offlineLast>0){
    toast('🌙 Derniers revenus offline : +'+fmt(s.offlineLast));
  }else{
    toast('🌙 Aucun revenu offline');
  }
}

function handleClick(e){
  const b=e.target.closest('button');
  if(!b)return;

  if(b.dataset.screen){
    setScreen(b.dataset.screen);
    return;
  }

  if(b.dataset.world!==undefined){
    selectWorld(b.dataset.world);
    return;
  }

  if(b.dataset.buy!==undefined){
    buyBuilding(b.dataset.buy);
    return;
  }

  if(b.dataset.research){
    buyResearch(b.dataset.research);
    return;
  }

  if(b.dataset.mission){
    claimMission(b.dataset.mission);
    return;
  }

  if(b.dataset.weekly){
    claimWeekly(b.dataset.weekly);
    return;
  }

  if(b.dataset.daily){
    claimDaily(b.dataset.daily);
    return;
  }

  if(b.dataset.prestige){
    doPrestige();
    return;
  }

  if(b.dataset.shop){
    buyShop(b.dataset.shop);
    return;
  }

  if(b.id==='mineButton'){
    mine();
    return;
  }

  if(b.id==='saveButton'){
    save();
    syncCloud(true);
    toast('💾 Sauvegarde effectuée');
    return;
  }

  if(b.id==='cloudButton'){
    syncCloud(true);
    toast('☁️ Synchronisation...');
    return;
  }

  if(b.id==='leaderboardButton'){
    submitLeaderboard();
    return;
  }

  if(b.id==='offlineButton'){
    showOffline();
    return;
  }

  if(b.id==='resetButton'){
    resetGame();
    return;
  }

  if(b.id==='nicknameButton'){
    updateNickname();
    return;
  }
}

document.addEventListener('click',handleClick);
function setupUI(){
  const input=document.getElementById('nicknameInput');
  if(input)input.value=s.nickname||'';

  const offline=document.getElementById('offlineBonus');
  if(offline&&s.offlineLast>0){
    offline.textContent='🌙 Dernier offline : +'+fmt(s.offlineLast);
  }

  renderAll();
}

setInterval(()=>{
  const now=Date.now();

  ensureDaily();
  ensureWeekly();
  checkEvents();
  crystalAutoFarm();

  if(comboUntil&&now>comboUntil){
    s.combo=0;
    comboUntil=0;
  }

  const elapsed=Math.min(1,Math.max(0,(now-(s.lastActiveAt||now))/1000));

  if(elapsed>0&&elapsed<2){
    const rate=autoRate();
    if(rate>0)earn(rate*elapsed);
  }

  s.lastActiveAt=now;

  if(now-lastUi>500){
    lastUi=now;
    uiHeader();

    if(currentScreen==='mine')renderBuildings();
    if(currentScreen==='missions')renderMissions();
    if(currentScreen==='research')renderResearch();
    if(currentScreen==='shop')renderShop();
  }

  if(now-lastCloud>30000){
    syncCloud(false);
  }

  save();
},250);

window.addEventListener('beforeunload',()=>{
  s.lastActiveAt=Date.now();
  save();
});

document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'){
    const bonus=earnOffline();
    if(bonus>0){
      renderAll();
    }
  }else{
    s.lastActiveAt=Date.now();
    save();
  }
});

async function initAuth(){
  try{
    let {data:{user}}=await sb.auth.getUser();

    if(!user){
      const res=await sb.auth.signInAnonymously();
      user=res.data?.user||null;
    }

    if(user){
      console.log('Cloud user ready');
    }
  }catch(e){
    console.warn('auth',e);
  }
}

let selectedWorld=Math.max(0,Math.min(WORLDS.length-1,Number(localStorage.getItem('sm-world')||0)));
let currentScreen='mine',comboUntil=0,lastUi=0,lastCloud=0,syncing=false,resetting=false,toastTimer=0;

s=load();

ensureDaily();

const crystalBonus=crystalAutoFarm();
const offlineBonus=earnOffline();

if(!s.event?.nextAt)scheduleEvent();

checkEvents();
uiHeader();
setScreen('mine');

if(s.offlineLast>0){
  setTimeout(()=>{
    if(s.offlineLast>0){
      toast('🌙 Revenus offline +'+fmt(s.offlineLast));
    }
  },800);
}

setupUI();
initAuth().then(()=>loadCloud());

console.log('Space Mining Tycoon loaded',KEY);
