const persistSession=true;
const autoRefreshToken=true;
const detectSessionInUrl=false;
const passive=false;

const SUPABASE_URL='https://gvyeooqemajnvfbgnagv.supabase.co';
const SUPABASE_KEY='sb_publishable_moYDSTJplgl9XPCiKR96b_CPt3MJ7z';

const sb=window.supabase?.createClient?.(
  SUPABASE_URL,
  SUPABASE_KEY,
  {auth:{persistSession,autoRefreshToken,detectSessionInUrl}}
)||null;

const KEY='space-mining-v11';
const LEGACY_KEYS=[
  'space-mining-v11','space-mining-v10','space-mining-v9','space-mining-v8',
  'space-mining-v7','space-mining-v6','space-mining-v5','space-mining-v4',
  'space-mining-v3','space-mining-v2'
];

const WORLDS=[
  ['🌑','Astéroïde Nova',0,1],
  ['🔴','Mars',1e6,1.6],
  ['🪐','Saturne',5e7,2.4],
  ['💠','Nébuleuse Azur',5e9,3.5],
  ['🌌','Trou noir',1e12,5],
  ['☀️','Étoile Helios',1e14,7.5],
  ['🌀','Dimension X',1e16,11],
  ['🌊','Océan de Nyx',1e18,16],
  ['💎','Géode Prime',1e21,24],
  ['🧊','Crypte d’Oort',1e24,36],
  ['🧿','Singularité Oméga',1e28,55],
  ['✨','Cœur de l’Univers',1e32,85],
  ['🌠','Vespera',5e35,120],
  ['🟣','Nébuleuse Éclipse',2e39,170],
  ['🌟','Quasar Aether',1e43,240],
  ['🔷','Cristallia',5e46,340],
  ['🌋','Forge Stellaire',2e50,480],
  ['🕳️','Abîme Primordial',1e54,680],
  ['🌌','Galaxie Némésis',5e57,950],
  ['🪐','Titania X',2e61,1300],
  ['⚡','Orage Cosmique',1e65,1800],
  ['🌙','Lune Spectrale',5e68,2500],
  ['💫','Puits de Pulsar',2e72,3500],
  ['☄️','Couronne des Comètes',1e76,5000],
  ['🧬','Matrice Cosmique',5e79,7000],
  ['🔱','Royaume des Titans',2e83,10000],
  ['🧿','Œil de l’Éternité',1e87,14000],
  ['♾️','Nexus Infini',5e90,20000],
  ['🪩','Mégasphère',2e94,28000],
  ['🛸','Frontière Omniverselle',1e98,40000],
  ['🌌','Mer des Univers',5e101,56000],
  ['✨','Trône de la Création',1e105,80000]
];

const BUILDINGS=[
  ['Foreuse laser','🔧'],
  ['Robot mineur','🤖'],
  ['Raffinerie orbitale','🏭'],
  ['Station minière','🛰️'],
  ['Flotte de cargos','🚚'],
  ['Extracteur gravitationnel','🧲'],
  ['Collecteur Dyson','☀️'],
  ['Portail quantique','🌀'],
  ['Forge antimatière','⚛️'],
  ['Anneau de singularité','💫'],
  ['Usine de matière noire','🌑'],
  ['Noyau d’assemblage','🔮']
];

const LATE_BUILDINGS=[
  ['Foreuse à fusion','🔥'],
  ['Mineur de matière noire','🕳️'],
  ['Extracteur stellaire','⭐'],
  ['Raffinerie de quasars','💠'],
  ['Flotte interstellaire','🚀'],
  ['Moissonneur cosmique','🌌'],
  ['Forge gravitationnelle','🧲'],
  ['Constructeur de mégastructure','🏗️'],
  ['Réacteur du néant','⚫'],
  ['Portail multiversel','🌀'],
  ['Usine d’antimatière','⚛️'],
  ['Noyau omnidimensionnel','🔮']
];

const TECH=[
  ['laser','Laser industriel',5e6,'+50% puissance de clic','click',1.5],
  ['ai','IA autonome',2.5e8,'+40% production','auto',1.4],
  ['reactor','Réacteur quantique',2e10,'x1,6 production globale','global',1.6],
  ['logistics','Logistique zéro-g',2e11,'-8% coûts bâtiments','discount',.92],
  ['nano','Nanobots industriels',2e13,'+70% production','auto',1.7],
  ['fusion','Fusion contrôlée',2e15,'x2 production globale','global',2],
  ['drill','Forage abyssal',5e16,'+100% puissance de clic','click',2],
  ['market','Marché galactique',2e18,'+20% revenus','income',1.2],
  ['chrono','Chrono-core',1e20,'hors-ligne jusqu’à 24 h','offline',86400],
  ['antimatter','Réacteur antimatière',5e22,'x2,5 production globale','global',2.5],
  ['dyson','Réseau Dyson',2e25,'+150% production','auto',2.5],
  ['singularity','Moteur de singularité',1e28,'x3 production globale','global',3],
  ['economy','Économie fractale',1e31,'-15% coûts bâtiments','discount',.85],
  ['deep','Forage dimensionnel',5e33,'x4 production globale','global',4],
  ['quantum','Calcul quantique',1e36,'+250% production','auto',3.5],
  ['gravity','Gant gravitationnel',5e38,'x3 clic','click',3],
  ['entropy','Gestion de l’entropie',1e41,'+50% revenus','income',1.5],
  ['time','Maîtrise temporelle',5e43,'hors-ligne 48 h','offline',172800],
  ['void','Conduit du Vide',1e46,'x6 production globale','global',6],
  ['ascension','Architecture d’ascension',5e49,'+50% bonus de prestige','prestige',1.5]
];

const MISSION_BASE=[
  ['first','Premier forage','clics',1,250],
  ['collector','Petit capital','lifetime',1e6,2500],
  ['factory','Première usine','buildings',10,10000],
  ['operator','Opérateur industriel','buildings',100,75000],
  ['millionaire','Millionnaire','lifetime',1e9,500000],
  ['billionaire','Milliardaire','lifetime',1e12,25000000],
  ['prestige1','Premier prestige','prestige',1,100000000],
  ['researcher','Chercheur','tech',5,250000000],
  ['veteran','Vétéran','level',25,500000000],
  ['tycoon','Magnat galactique','lifetime',1e16,5000000000],
  ['legend','Légende','prestige',5,25000000000],
  ['empire','Empire spatial','buildings',1000,100000000000]
];

const PLANET_MISSIONS=WORLDS.slice(1).map((w,i)=>[
  'planet'+(i+1),
  'Maîtrise de '+w[1],
  'planet',
  i+1,
  Math.max(5000,w[2]*0.0002)
]);

const WEEKLY=[
  ['week_click','Frénésie de forage','clicks',2500,1000000],
  ['week_build','Semaine industrielle','buildings',75,5000000],
  ['week_earn','Mineur acharné','run',1e11,25000000],
  ['week_buy','Investisseur','spend',1e12,100000000],
  ['week_world','Explorateur','planet',3,500000000]
];

const DAILY_REWARDS=[
  50000000,
  100000000,
  500000000,
  1000000000
];

const DAILY_POOLS=[
  [
    ['clicks','Mineur régulier',250],
    ['buildings','Petit chantier',20],
    ['spend','Acheteur actif',100000000],
    ['clicks','Forage intensif',350]
  ],
  [
    ['lifetime','Petit jackpot',50000000],
    ['clicks','Forage soutenu',600],
    ['buildings','Constructeur du jour',35],
    ['spend','Investisseur du jour',250000000]
  ],
  [
    ['lifetime','Gros rendement',250000000],
    ['buildings','Expansion industrielle',60],
    ['spend','Gros investisseur',500000000],
    ['clicks','Marathon minier',1000]
  ],
  [
    ['lifetime','Milliard quotidien',1000000000],
    ['spend','Empire industriel',1000000000],
    ['buildings','Cent constructions',100],
    ['clicks','Frénésie cosmique',1800]
  ]
];

const TECH_BY_ID=Object.fromEntries(TECH.map(x=>[x[0],x]));

const EVENTS=[
  ['meteor','Pluie de météorites','☄️','Les météorites enrichissent les chaînes minières.','global',1.35,18],
  ['solar','Éruption solaire','☀️','Les réacteurs reçoivent un surplus d’énergie.','auto',1.5,14],
  ['quantum','Faille quantique','🌀','Une faille accélère temporairement toutes les opérations.','global',1.75,10],
  ['crystal','Averse cristalline','💎','Les cristaux sont plus faciles à extraire.','crystal',4,12],
  ['cargo','Convoi de cargos','🚚','Les coûts logistiques chutent pendant l’arrivée du convoi.','cost',0.75,20],
  ['ai','Surcadence IA','🤖','Les intelligences minières travaillent à plein régime.','auto',1.8,9],
  ['gravity','Anomalie gravitationnelle','🧲','La gravité amplifie la puissance des extracteurs.','auto',1.65,16],
  ['dyson','Pic Dyson','🔆','Les collecteurs captent une vague d’énergie stellaire.','global',1.55,15],
  ['antimatter','Débordement d’antimatière','⚛️','Une réserve d’antimatière booste la production.','global',2,8],
  ['void','Souffle du Vide','🌑','Le Vide accélère les machines les plus avancées.','global',1.9,7],
  ['trade','Marché en folie','📈','Les cours galactiques augmentent les revenus.','income',1.5,22],
  ['jackpot','Veine exceptionnelle','💰','Une poche de minerai rare est découverte.','global',1.45,25],
  ['nano','Essaim de nanobots','🧬','Les nanobots optimisent chaque cycle de production.','auto',1.7,13],
  ['fusion','Pic de fusion','🔥','Les réacteurs à fusion atteignent leur rendement maximal.','global',1.6,11],
  ['chrono','Accélération temporelle','⏱️','Le temps opérationnel est légèrement accéléré.','global',1.4,19],
  ['star','Naissance d’une étoile','🌟','Une nouvelle étoile alimente les colonies proches.','global',1.65,17],
  ['portal','Portail instable','🛸','Un portail ouvre une route commerciale impossible.','income',1.7,10],
  ['storm','Tempête cosmique','⚡','La tempête charge les extracteurs.','click',2,12],
  ['overclock','Overclock général','🚀','Toutes les équipes passent en mode performance.','global',1.5,15],
  ['deep','Veine abyssale','⛏️','Une veine profonde augmente les gains manuels.','click',2.5,10]
];

const SHOP_ITEMS=[
  ['prod','Amplificateur industriel','⚙️','+4% production permanente',4,'prod',1.04],
  ['click','Gantelet de forage','⛏️','+5% puissance de clic permanente',6,'click',1.05],
  ['crystal','Scanner cristallin','💎','+0,15 point de chance de cristal',8,'crystalChance',0.0015],
  ['event','Résonateur d’événements','⚡','+5% puissance des événements',10,'eventPower',1.05],
  ['duration','Chronomètre cosmique','⏱️','+8% durée des événements',12,'eventDuration',1.08],
  ['offline','Batterie orbitale','🌙','+5% gains hors-ligne',15,'offline',1.05],
  ['discount','Nanocomptabilité','💠','-1% coût des bâtiments',20,'discount',0.99],
  ['prestige','Catalyseur d’ascension','👑','+2% bonus de prestige',30,'prestige',1.02]
];

let s;

function dayKey(d=new Date()){
  return d.getFullYear()+'-'+
    String(d.getMonth()+1).padStart(2,'0')+'-'+
    String(d.getDate()).padStart(2,'0');
}

function dailySeed(key){
  let h=2166136261;
  for(let i=0;i<key.length;i++){
    h=Math.imul(h^key.charCodeAt(i),16777619);
  }
  return h>>>0;
}

function weekKey(d=new Date()){
  const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
  const day=x.getUTCDay()||7;
  x.setUTCDate(x.getUTCDate()-day+1);
  return x.toISOString().slice(0,10);
}

function fresh(){
  const buildings={};

  WORLDS.forEach((_,w)=>{
    buildingList(w).forEach((_,b)=>{
      buildings[w+'-'+b]=0;
    });
  });

  return{
    money:0,
    runTotal:0,
    lifetimeTotal:0,
    prestige:0,
    prestigeShards:0,
    crystals:0,
    lastCrystalCheckAt:Date.now(),
    buildings,
    research:{},
    missions:{},
    weekly:{
      key:weekKey(),
      claimed:{},
      progress:{}
    },
    daily:{
      key:dayKey(),
      missions:[],
      claimed:{},
      base:{
        clicks:0,
        earned:0,
        buildings:0,
        spend:0
      }
    },
    shopUpgrades:{},
    event:{
      nextAt:0,
      current:null,
      activeUntil:0
    },
    clickLevel:0,
    xp:0,
    level:1,
    nickname:'Mineur',
    lastActiveAt:Date.now(),
    lastOfflineClaimAt:Date.now(),
    combo:0,
    cLICKS:0,
    spent:0,
    offlineLast:0,
    online:false
  };
}

function buildingList(w){
  return w<12?BUILDINGS:LATE_BUILDINGS;
}

function migrateState(z){
  const base=fresh();

  z.buildings=Object.assign({},base.buildings,z.buildings||{});

  WORLDS.forEach((_,w)=>{
    buildingList(w).forEach((__,b)=>{
      const k=w+'-'+b;
      if(!Number.isFinite(Number(z.buildings[k])))z.buildings[k]=0;
    });
  });

  if(!Number.isFinite(Number(z.lastCrystalCheckAt))){
    z.lastCrystalCheckAt=Date.now();
  }

  z.research=z.research||{};
  z.missions=z.missions||{};
  z.weekly=z.weekly||base.weekly;
  z.weekly.claimed=z.weekly.claimed||{};
  z.weekly.progress=z.weekly.progress||{};
  z.shopUpgrades=z.shopUpgrades||{};
  z.event=z.event||base.event;

  z.daily=z.daily||base.daily;
  z.clickLevel=Math.max(0,Number(z.clickLevel)||0);

  if(!Number.isFinite(Number(z.crystals)))z.crystals=0;
  z.crystals=Math.max(0,Number(z.crystals)||0);

  z.nickname=(z.nickname||'Mineur').slice(0,20);
  z.xp=Math.max(0,Number(z.xp)||0);
  z.level=Math.max(1,Number(z.level)||1);
  z.prestige=Math.max(0,Number(z.prestige)||0);
  z.prestigeShards=Math.max(0,Number(z.prestigeShards)||0);

  return z;
}

function load(){
  try{
    let raw=null;

    for(const k of LEGACY_KEYS){
      const v=localStorage.getItem(k);
      if(v){
        raw=JSON.parse(v);
        break;
      }
    }

    const z=Object.assign(fresh(),raw||{});
    const oldTotal=Number(raw?.total||0);

    if(!raw?.lifetimeTotal){
      z.lifetimeTotal=oldTotal||Number(raw?.money||0);
      z.runTotal=z.lifetimeTotal;
    }

    if(!raw?.runTotal){
      z.runTotal=Math.max(z.money||0,z.runTotal||0);
    }

    z.money=Math.max(0,Number(z.money)||0);
    z.lifetimeTotal=Math.max(z.runTotal||0,Number(z.lifetimeTotal)||0);

    z.lastActiveAt=Number(raw?.lastActiveAt||raw?.last||Date.now());
    z.lastOfflineClaimAt=Number(
      raw?.lastOfflineClaimAt||
      z.lastActiveAt||
      Date.now()
    );

    if(!Number.isFinite(z.lastActiveAt)||z.lastActiveAt>Date.now()+60000){
      z.lastActiveAt=Date.now();
    }

    z.weekly=z.weekly||fresh().weekly;
    z.weekly.key=weekKey();

    return migrateState(z);
  }catch(e){
    console.warn('Erreur chargement local:',e);
    return fresh();
  }
}

function save(){
  try{
    localStorage.setItem(KEY,JSON.stringify(s));
  }catch(e){}
}

function fmt(n){
  if(!Number.isFinite(n))return '∞';
  if(Math.abs(n)<1000)return Math.floor(n).toLocaleString('fr-FR');

  const units=['K','M','Md','Bn','T','Qa','Qi','Sx','Sp','Oc','No','Dc','Ud','Dd','Td','Qad','Qid'];
  const i=Math.floor(Math.log10(Math.abs(n))/3);

  return (n/10**(i*3)).toFixed(i>=5?2:1)+' '+(units[i-1]||('e'+(i*3)));
}

function ensureWeekly(){
  if(s.weekly.key!==weekKey()){
    s.weekly={
      key:weekKey(),
      claimed:{},
      progress:{}
    };
    save();
  }
}

function ensureDaily(){
  const key=dayKey();

  if(
    s.daily?.key===key &&
    Array.isArray(s.daily.missions) &&
    s.daily.missions.length===4
  ){
    return;
  }

  const seed=dailySeed(key);

  const missions=DAILY_POOLS.map((pool,i)=>{
    const idx=((seed+i*2654435761)>>>0)%pool.length;
    const m=pool[idx];

    return[
      'daily'+i,
      m[1],
      m[0],
      m[2],
      DAILY_REWARDS[i]
    ];
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

function tech(id){
  return !!s.research[id];
}

function shopLevel(id){
  return Math.max(0,Number(s.shopUpgrades?.[id])||0);
}

function shopMult(id,base){
  return Math.pow(base,shopLevel(id));
}
function globalMult(){
  let m=1+(0.18*s.prestige)*(tech('ascension')?1.5:1);

  for(const id of[
    'reactor',
    'fusion',
    'antimatter',
    'singularity',
    'deep',
    'void'
  ]){
    if(tech(id))m*=TECH_BY_ID[id][5];
  }

  return m*
    shopMult('prod',1.04)*
    eventMultiplier('global');
}

function autoMult(){
  let m=1;

  for(const id of['ai','nano','dyson','quantum']){
    if(tech(id))m*=TECH_BY_ID[id][5];
  }

  return m;
}

function clickMult(){
  let m=1;

  if(tech('laser'))m*=1.5;
  if(tech('drill'))m*=2;
  if(tech('gravity'))m*=3;

  return m*
    shopMult('click',1.05)*
    eventMultiplier('click');
}

function incomeMult(){
  let m=1;

  if(tech('market'))m*=1.2;
  if(tech('entropy'))m*=1.5;

  return m*eventMultiplier('income');
}

function costMult(){
  let m=1;

  if(tech('logistics'))m*=.92;
  if(tech('economy'))m*=.85;

  return m*
    shopMult('discount',.99)*
    eventMultiplier('cost');
}

function offlineCap(){
  if(tech('time'))return 172800;
  if(tech('chrono'))return 86400;
  return 14400;
}

function prestigeMult(){
  return(
    1+(0.18*s.prestige)*(tech('ascension')?1.5:1)
  )*shopMult('prestige',1.02);
}

function clickUpgradeMultiplier(){
  return Math.pow(1.25,s.clickLevel||0);
}

function clickUpgradeCost(){
  return Math.ceil(
    250*
    Math.pow(2.35,s.clickLevel||0)*
    Math.pow(1.08,s.prestige)
  );
}

function clickPower(){
  return(
    prestigeMult()*
    globalMult()*
    clickMult()*
    clickUpgradeMultiplier()*
    (1+Math.min(.75,s.combo*0.03))
  );
}

function baseProd(w,b){
  const earlyBoost=Math.max(1,2-b*.08);
  const lateBoost=w>=12?Math.pow(1.16,w-11):1;

  return 100*
    (1.1+0.18*w)*
    Math.pow(3.2,w)*
    Math.pow(2.0,b)*
    earlyBoost*
    lateBoost;
}

function buildingCost(w,b){
  const n=s.buildings[w+'-'+b]||0;

  return(
    500*
    Math.pow(28,w)*
    Math.pow(5.5,b)*
    Math.pow(1.16,n)*
    costMult()
  )/5;
}

function autoRate(){
  let r=0;

  WORLDS.forEach((_,w)=>{
    buildingList(w).forEach((_,b)=>{
      r+=
        (s.buildings[w+'-'+b]||0)*
        baseProd(w,b)*
        WORLDS[w][3];
    });
  });

  return r*
    prestigeMult()*
    globalMult()*
    autoMult()*
    incomeMult()*
    3;
}

function levelCheck(){
  const nl=Math.floor(Math.sqrt(s.xp/80))+1;

  if(nl>s.level){
    s.level=nl;
    toast('🎉 Niveau '+nl);
  }
}

function earn(x){
  if(!Number.isFinite(x)||x<=0)return;

  s.money+=x;
  s.runTotal+=x;
  s.lifetimeTotal+=x;
  s.xp+=Math.max(
    1,
    Math.floor(Math.log10(Math.max(10,x))+2)
  );

  levelCheck();
}

function spend(x){
  s.money-=x;
  s.spent+=x;
}

function totalBuildings(){
  return Object.values(s.buildings)
    .reduce((a,b)=>a+(Number(b)||0),0);
}

function planetUnlocked(w){
  if(w===0)return true;

  const prev=w-1;

  return buildingList(prev).every(
    (_,b)=>(s.buildings[prev+'-'+b]||0)>=1
  );
}

function planetLevels(w){
  return buildingList(w).reduce(
    (a,_,b)=>a+(s.buildings[w+'-'+b]||0),
    0
  );
}

function planetDone(w){
  return planetUnlocked(w)&&
    buildingList(w).every(
      (_,b)=>(s.buildings[w+'-'+b]||0)>=10
    );
}

function goalText(){
  for(let i=1;i<WORLDS.length;i++){
    if(!planetUnlocked(i)){
      return(
        'Construire au moins 1 exemplaire de chacun des '+
        buildingList(i-1).length+
        ' bâtiments sur '+
        WORLDS[i-1][1]+
        ' pour débloquer '+
        WORLDS[i][1]+'.'
      );
    }
  }

  return(
    'Toutes les planètes sont accessibles. '+
    'Maîtrise-les avec 10 de chaque bâtiment pour préparer le prestige.'
  );
}

function missionValue(m){
  switch(m[2]){
    case 'clics':return s.cLICKS;
    case 'lifetime':return s.lifetimeTotal;
    case 'run':return s.runTotal;
    case 'buildings':return totalBuildings();
    case 'prestige':return s.prestige;
    case 'tech':return Object.keys(s.research).length;
    case 'level':return s.level;
    case 'planet':
      return m[3]<=WORLDS.length-1&&planetDone(m[3])?m[3]:0;
    case 'spend':return s.spent;
    default:return 0;
  }
}

function weeklyValue(m){
  ensureWeekly();

  switch(m[2]){
    case 'clicks':return s.cLICKS;
    case 'buildings':return totalBuildings();
    case 'run':return s.runTotal;
    case 'spend':return s.spent;
    case 'planet':
      return WORLDS
        .slice(0,m[3]+1)
        .filter((_,i)=>planetDone(i))
        .length;
    default:return 0;
  }
}

function dailyValue(m){
  ensureDaily();

  const base=s.daily.base||{};

  switch(m[2]){
    case 'clicks':
      return Math.max(
        0,
        s.cLICKS-(base.clicks||0)
      );

    case 'lifetime':
      return Math.max(
        0,
        s.lifetimeTotal-(base.earned||0)
      );

    case 'buildings':
      return Math.max(
        0,
        totalBuildings()-(base.buildings||0)
      );

    case 'spend':
      return Math.max(
        0,
        s.spent-(base.spend||0)
      );

    default:return 0;
  }
}

let selectedWorld=0;
let currentScreen='mine';
let comboUntil=0;
let lastUi=0;
let lastCloud=0;
let syncing=false;
let resetting=false;
let toastTimer=0;

function toast(t){
  const e=document.getElementById('toast');

  if(!e)return;

  e.textContent=t;
  e.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer=setTimeout(
    ()=>e.classList.remove('show'),
    2200
  );
}

function setText(id,v){
  const e=document.getElementById(id);
  if(e)e.textContent=v;
}

function formatDuration(ms){
  const sec=Math.ceil(ms/1000);

  if(sec<60)return sec+'s';

  const min=Math.floor(sec/60);

  return(
    min+'m '+
    String(sec%60).padStart(2,'0')+
    's'
  );
}

function activeEvent(){
  const e=s.event?.current;

  if(
    !e||
    Date.now()>=Number(s.event.activeUntil||0)
  ){
    return null;
  }

  return EVENTS.find(x=>x[0]===e)||null;
}

function eventMultiplier(kind){
  const e=activeEvent();

  if(!e)return 1;

  if(
    e[4]===kind||
    e[4]==='global'&&
    (kind==='all'||kind==='global')
  ){
    return(
      1+
      (e[5]-1)*
      (1+0.05*shopLevel('event'))
    );
  }

  return 1;
}

function crystalChance(){
  return Math.min(
    .08,
    .008+
    shopLevel('crystal')*.0015+
    (activeEvent()?.[4]==='crystal'?.024:0)
  );
}

function eventDurationMs(minutes){
  return minutes*
    60000*
    Math.pow(1.08,shopLevel('duration'));
}

function scheduleEvent(from=Date.now()){
  const gap=(20+Math.random()*100)*60000;

  s.event.nextAt=from+gap;
  s.event.current=null;
  s.event.activeUntil=0;
}

function checkEvents(){
  const now=Date.now();

  if(!s.event?.nextAt){
    scheduleEvent(now);
    return;
  }

  if(activeEvent())return;

  if(now>=s.event.nextAt){
    const e=EVENTS[
      Math.floor(Math.random()*EVENTS.length)
    ];

    s.event.current=e[0];
    s.event.activeUntil=
      now+eventDurationMs(e[6]);

    toast(e[2]+' '+e[1]+' !');
    save();
  }

  if(
    s.event.current&&
    now>=s.event.activeUntil
  ){
    s.event.current=null;
  }
}

function crystalAutoFarm(){
  const now=Date.now();
  const previous=Number(
    s.lastCrystalCheckAt||now
  );

  const minutes=Math.floor(
    Math.max(0,now-previous)/60000
  );

  if(minutes<=0)return 0;

  const rolls=Math.min(minutes,1440);
  let found=0;

  for(let i=0;i<rolls;i++){
    if(Math.random()<crystalChance()){
      s.crystals++;
      found++;
    }
  }

  s.lastCrystalCheckAt=
    previous+rolls*60000;

  if(found>0){
    save();

    toast(
      '💎 '+
      found+
      ' cristal'+
      (found>1?'s':'')+
      ' trouvé'+
      (found>1?'s':'')+
      ' automatiquement !'
    );
  }

  return found;
}
function mine(){
  const gain=clickPower();

  earn(gain);
  s.cLICKS++;
  s.combo=Math.min(12,s.combo+1);
  comboUntil=Date.now()+1700;

  setText('combo',s.combo);
  setText('lastClickGain','+'+fmt(gain));
  setText('clickGainBig','+'+fmt(gain));

  const bar=document.getElementById('comboBar');

  if(bar){
    bar.style.width=
      (s.combo/12*100)+'%';
  }

  if(performance.now()-lastUi>100){
    uiHeader();
    lastUi=performance.now();
  }
}

function upgradeClick(){
  const cost=clickUpgradeCost();

  if(s.money<cost){
    toast(
      '💸 Il manque '+
      fmt(cost-s.money)
    );
    return;
  }

  spend(cost);
  s.clickLevel++;
  s.xp+=100;

  save();

  toast(
    '⛏️ Clic niveau '+
    s.clickLevel+
    ' · +'+
    fmt(clickPower())
  );

  renderModern();
  syncCloud(true);
}

function buyBuilding(b){
  const list=buildingList(selectedWorld);
  const c=buildingCost(selectedWorld,b);

  if(!planetUnlocked(selectedWorld))return;

  if(s.money<c){
    toast(
      '💸 Il manque '+
      fmt(c-s.money)
    );
    return;
  }

  spend(c);

  const key=
    selectedWorld+'-'+b;

  s.buildings[key]=
    (s.buildings[key]||0)+1;

  s.xp+=20;

  save();
  renderBuildings();
  uiHeader();
  syncCloud();
}

function doResearch(id){
  const t=TECH_BY_ID[id];

  if(!t||tech(id))return;

  const idx=
    TECH.findIndex(x=>x[0]===id);

  if(
    idx>0&&
    !tech(TECH[idx-1][0])
  ){
    toast(
      '🔒 Technologie précédente requise'
    );
    return;
  }

  if(s.money<t[2]){
    toast(
      '💸 Technologie trop chère'
    );
    return;
  }

  spend(t[2]);
  s.research[id]=true;
  s.xp+=500;

  save();

  toast(
    '🧪 '+t[1]+' activée'
  );

  renderResearch();
  uiHeader();
  syncCloud(true);
}

function claimMission(id){
  const m=
    MISSION_BASE
      .concat(PLANET_MISSIONS)
      .find(x=>x[0]===id);

  if(
    !m||
    s.missions[id]||
    missionValue(m)<m[3]
  )return;

  s.missions[id]=true;
  earn(m[4]);

  save();

  toast(
    '🎯 Récompense +'+
    fmt(m[4])
  );

  renderMissions();
  uiHeader();
  syncCloud(true);
}

function claimWeekly(id){
  ensureWeekly();

  const m=
    WEEKLY.find(x=>x[0]===id);

  if(
    !m||
    s.weekly.claimed[id]||
    weeklyValue(m)<m[3]
  )return;

  s.weekly.claimed[id]=true;

  earn(m[4]);

  save();

  toast(
    '📅 Quête hebdo +'+
    fmt(m[4])
  );

  renderMissions();
  uiHeader();
  syncCloud(true);
}

function claimDaily(id){
  ensureDaily();

  const m=
    s.daily.missions.find(x=>x[0]===id);

  if(
    !m||
    s.daily.claimed[id]||
    dailyValue(m)<m[3]
  )return;

  s.daily.claimed[id]=true;

  earn(m[4]);

  save();

  toast(
    '📅 Récompense quotidienne +'+
    fmt(m[4])
  );

  renderMissions();
  uiHeader();
  syncCloud(true);
}

function prestigeRequirement(){
  const target=
    1e14*
    Math.pow(18,s.prestige);

  const worlds=
    WORLDS.reduce(
      (n,_,i)=>
        n+(planetUnlocked(i)?1:0),
      0
    );

  const allTen=
    WORLDS
      .slice(0,worlds)
      .every((_,w)=>
        buildingList(w).every(
          (_,b)=>
            (s.buildings[w+'-'+b]||0)>=10
        )
      );

  return{
    target,
    worlds,
    allTen,
    ok:
      s.runTotal>=target&&
      worlds>=1&&
      allTen
  };
}

function doPrestige(){
  const p=prestigeRequirement();

  if(!p.ok){
    toast(
      '🔒 Conditions de prestige non remplies'
    );
    return;
  }

  const gain=Math.max(
    1,
    Math.floor(
      Math.log10(
        Math.max(
          10,
          s.runTotal/p.target
        )
      )
    )+1
  );

  const keep={
    nickname:s.nickname,
    prestige:s.prestige+gain,
    prestigeShards:s.prestigeShards+gain,
    research:{...s.research},
    missions:{...s.missions},
    weekly:{...s.weekly},
    daily:{...s.daily},
    shopUpgrades:{...s.shopUpgrades},
    crystals:s.crystals,
    xp:s.xp,
    level:s.level,
    cLICKS:s.cLICKS,
    lifetimeTotal:s.lifetimeTotal,
    online:s.online,
    clickLevel:s.clickLevel
  };

  s=Object.assign(
    fresh(),
    keep
  );

  save();

  toast(
    '👑 Prestige réussi : +'+gain
  );

  renderModern();
  syncCloud(true);
}

function earnOffline(){
  const now=Date.now();

  const previous=
    Number(s.lastActiveAt||now);

  const elapsed=
    Math.max(
      0,
      now-previous
    );

  const seconds=
    Math.min(
      elapsed/1000,
      offlineCap()
    );

  s.lastOfflineClaimAt=now;
  s.lastActiveAt=now;

  if(seconds<10){
    save();
    return 0;
  }

  const rate=
    Math.max(
      0,
      Number(autoRate())||0
    );

  const bonus=
    rate*
    seconds*
    .75*
    shopMult('offline',1.05);

  if(
    Number.isFinite(bonus)&&
    bonus>0
  ){
    earn(bonus);
  }

  s.offlineLast=
    Number.isFinite(bonus)?
    bonus:
    0;

  save();

  return Number.isFinite(bonus)?
    bonus:
    0;
}

async function ensureAuth(){
  if(!sb){
    throw new Error(
      'SDK cloud indisponible'
    );
  }

  const{
    data,
    error
  }=await sb.auth.getSession();

  if(error)throw error;

  if(data.session){
    s.online=true;
    return data.session;
  }

  const r=
    await sb.auth.signInAnonymously();

  if(r.error)throw r.error;

  s.online=true;

  return r.data.session;
}

async function syncCloud(force=false){
  if(
    resetting||
    syncing||
    (!force&&
      Date.now()-lastCloud<12000)||
    !sb
  )return;

  syncing=true;
  lastCloud=Date.now();

  try{
    await ensureAuth();

    if(resetting)return;

    const{
      error
    }=await sb.functions.invoke(
      'game-sync',
      {
        body:{
          nickname:s.nickname,
          total:s.lifetimeTotal,
          prestige:s.prestige,
          level:s.level,
          xp:s.xp,
          state:s
        }
      }
    );

    if(error)throw error;

    s.online=true;
  }catch(e){
    console.warn(
      'Cloud sync:',
      e
    );

    s.online=false;
  }finally{
    syncing=false;

    if(!resetting){
      uiHeader();
    }
  }
}

async function loadCloud(){
  if(!sb||resetting)return;

  try{
    const session=
      await ensureAuth();

    if(resetting)return;

    const{
      data,
      error
    }=await sb
      .from('player_state')
      .select('state')
      .eq(
        'user_id',
        session.user.id
      )
      .maybeSingle();

    if(error)throw error;

    if(
      !resetting&&
      data?.state&&
      Number(
        data.state.lifetimeTotal||
        data.state.total||
        0
      )>
      s.lifetimeTotal
    ){
      const nick=s.nickname;

      s=Object.assign(
        fresh(),
        data.state
      );

      s.nickname=
        s.nickname||
        nick;

      s=migrateState(s);
    }

    if(resetting)return;

    s.online=true;

    save();

    renderModern();
    await syncCloud(true);
  }catch(e){
    s.online=false;
    uiHeader();
  }
}

async function saveProfile(){
  const input=
    document.getElementById('nickname');

  if(input){
    s.nickname=
      (
        input.value.trim()||
        'Mineur'
      ).slice(0,20);
  }

  save();

  await syncCloud(true);

  toast(
    s.online?
      '☁️ Profil publié':
      '📱 Profil local'
  );

  renderProfile();
}

async function resetGame(){
  if(resetting)return;

  const confirmed=
    confirm(
      'Réinitialiser toute la progression ? Cette action est irréversible.'
    );

  if(!confirmed)return;

  resetting=true;

  try{
    let attempts=0;

    while(
      syncing&&
      attempts<100
    ){
      await new Promise(
        resolve=>
          setTimeout(resolve,100)
      );

      attempts++;
    }

    if(sb){
      try{
        const session=
          await sb.auth.getSession();

        if(
          session?.data?.session
        ){
          await sb.functions.invoke(
            'game-sync',
            {
              body:{
                action:'reset'
              }
            }
          );
        }
      }catch(e){
        console.warn(
          'Reset Supabase:',
          e
        );
      }
    }

    try{
      LEGACY_KEYS.forEach(
        k=>localStorage.removeItem(k)
      );

      localStorage.removeItem(
        'sm-world'
      );

      localStorage.clear();
      sessionStorage.clear();
    }catch(e){}

    try{
      if('caches'in window){
        await Promise.all(
          (
            await caches.keys()
          ).map(
            k=>caches.delete(k)
          )
        );
      }
    }catch(e){}

    s=fresh();
    selectedWorld=0;
    currentScreen='mine';

    sessionStorage.setItem(
      'sm-reset-complete',
      '1'
    );

    window.location.replace(
      location.pathname+
      '?newgame='+
      Date.now()
    );
  }catch(e){
    console.error(
      'RESET ERROR:',
      e
    );

    resetting=false;

    alert(
      'Impossible de réinitialiser la partie.'
    );
  }
}

function esc(x){
  return String(x).replace(
    /[&<>"']/g,
    m=>({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#39;'
    }[m])
  );
}

async function renderRank(){
  const box=
    document.getElementById('rankList');

  if(!box)return;

  box.innerHTML=
    '<div class="section-note">☁️ Chargement du classement mondial…</div>';

  try{
    await ensureAuth();

    const{
      data,
      error
    }=await sb
      .from('leaderboard')
      .select(
        'nickname,total,prestige,level'
      )
      .order(
        'total',
        {ascending:false}
      )
      .order(
        'prestige',
        {ascending:false}
      )
      .order(
        'level',
        {ascending:false}
      )
      .limit(100);

    if(error)throw error;

    setText(
      'rankMe',
      '☁️ Score synchronisé · '+
      s.nickname+
      ' · '+
      fmt(s.lifetimeTotal)
    );

    box.innerHTML=
      data?.length?
      data.map(
        (r,i)=>`
          <div class="rank-row">
            <div class="pos">
              ${
                i<3?
                ['🥇','🥈','🥉'][i]:
                i+1
              }
            </div>
            <div>
              <strong>${esc(r.nickname)}</strong>
              <small>
                Niv. ${r.level} · Prestige ${r.prestige}
              </small>
            </div>
            <b>${fmt(Number(r.total))}</b>
          </div>
        `
      ).join(''):
      '<div class="section-note">🏆 Aucun joueur classé pour le moment.</div>';
  }catch(e){
    setText(
      'rankMe',
      '📱 Classement local'
    );

    box.innerHTML=
      '<div class="section-note">⚠️ Le cloud est indisponible.</div>';
  }
}

function shopCost(id){
  const x=
    SHOP_ITEMS.find(
      v=>v[0]===id
    );

  if(!x)return Infinity;

  return Math.ceil(
    x[4]*
    Math.pow(
      1.9,
      shopLevel(id)
    )
  );
}

function buyShop(id){
  const x=
    SHOP_ITEMS.find(
      v=>v[0]===id
    );

  const cost=shopCost(id);

  if(!x||s.crystals<cost)return;

  s.crystals-=cost;
  s.shopUpgrades[id]=
    shopLevel(id)+1;

  save();

  toast(
    '💎 '+
    x[1]+
    ' niveau '+
    s.shopUpgrades[id]
  );

  renderShop();
  uiHeader();
  syncCloud();
}
function uiHeader(){
  const unlocked=
    WORLDS.filter(
      (_,i)=>planetUnlocked(i)
    ).length;

  setText(
    'total',
    fmt(s.money)
  );

  setText(
    'lifetimeTotal',
    fmt(s.lifetimeTotal)
  );

  setText(
    'runTotal',
    fmt(s.runTotal)
  );

  setText(
    'rate',
    fmt(autoRate())+'/s'
  );

  setText(
    'prestige',
    'P'+s.prestige
  );

  setText(
    'clickPower',
    '+'+fmt(clickPower())
  );

  setText(
    'lastClickGain',
    '+'+fmt(clickPower())
  );

  setText(
    'clickGainBig',
    '+'+fmt(clickPower())
  );

  setText(
    'clickLevel',
    'Niveau '+s.clickLevel
  );

  setText(
    'clickUpgradeCost',
    fmt(clickUpgradeCost())
  );

  setText(
    'combo',
    s.combo
  );

  setText(
    'crystals',
    fmt(s.crystals)
  );

  setText(
    'profileName',
    s.nickname
  );

  setText(
    'profileLevel',
    s.level
  );

  setText(
    'profileXp',
    fmt(s.xp)
  );

  setText(
    'profileTotal',
    fmt(s.lifetimeTotal)
  );

  setText(
    'profileStatus',
    s.online?
      '☁️ Classement synchronisé':
      '📱 Mode local'
  );

  setText(
    'onlineDot',
    s.online?
      '● CLOUD':
      '● LOCAL'
  );

  setText(
    'worldProgress',
    unlocked+'/'+WORLDS.length+
    ' débloquées'
  );

  setText(
    'researchProgress',
    Object.keys(s.research).length+
    '/'+TECH.length
  );

  setText(
    'missionProgress',
    Object.keys(s.missions).length+
    '/'+
    (
      MISSION_BASE.length+
      PLANET_MISSIONS.length
    )
  );

  setText(
    'planetTotal',
    unlocked+'/'+WORLDS.length
  );

  setText(
    'minePlanetName',
    WORLDS[selectedWorld][1]
  );

  setText(
    'currentGoal',
    goalText()
  );

  const ev=activeEvent();

  setText(
    'eventTitle',
    ev?.[2]||
    'Aucun événement'
  );

  setText(
    'eventText',
    ev?.[3]||
    'Le prochain événement apparaîtra aléatoirement.'
  );

  setText(
    'eventTimer',
    ev?
      formatDuration(
        Math.max(
          0,
          s.event.activeUntil-Date.now()
        )
      ):
      '—'
  );

  const dot=
    document.getElementById(
      'onlineDot'
    );

  if(dot){
    dot.style.color=
      s.online?
      'var(--good)':
      'var(--warn)';
  }
}

function missionCard(m,weekly=false){
  const id=m[0];

  const claimed=
    weekly?
    s.weekly.claimed[id]:
    s.missions[id];

  const v=
    weekly?
    weeklyValue(m):
    missionValue(m);

  const need=m[3];

  const pct=
    Math.min(
      100,
      v/need*100
    );

  return`
    <article class="card mission-card">
      <div class="mission-top">
        <strong>
          ${claimed?'✅':'🎯'} ${esc(m[1])}
        </strong>
        <span>${fmt(m[4])}</span>
      </div>

      <small>
        ${fmt(v)} / ${fmt(need)}
      </small>

      <div class="progress">
        <i style="width:${pct}%"></i>
      </div>

      <button
        class="action"
        data-${
          weekly?'weekly':'mission'
        }="${id}"
        ${claimed||v<need?'disabled':''}
      >
        ${claimed?'RÉCLAMÉ':'RÉCLAMER'}
      </button>
    </article>
  `;
}

function dailyMissionCard(m){
  const claimed=
    !!s.daily.claimed[m[0]];

  const v=dailyValue(m);
  const need=m[3];

  const pct=
    Math.min(
      100,
      v/need*100
    );

  return`
    <article class="card mission-card daily-card">
      <div class="mission-top">
        <strong>
          ${claimed?'✅':'📅'} ${esc(m[1])}
        </strong>
        <span>${fmt(m[4])}</span>
      </div>

      <small>
        ${fmt(v)} / ${fmt(need)}
      </small>

      <div class="progress">
        <i style="width:${pct}%"></i>
      </div>

      <button
        class="action"
        data-daily="${m[0]}"
        ${claimed||v<need?'disabled':''}
      >
        ${claimed?'RÉCLAMÉ':'RÉCLAMER'}
      </button>
    </article>
  `;
}

function renderBuildings(){
  const detail=
    document.getElementById(
      'buildingDetail'
    );

  if(!detail)return;

  const w=WORLDS[selectedWorld];

  if(!planetUnlocked(selectedWorld)){
    detail.innerHTML=`
      <div class="card locked-card">
        <div class="big-icon">🔒</div>
        <h2>${w[0]} ${w[1]}</h2>
        <p>
          Construis 1 exemplaire de chaque
          bâtiment sur la planète précédente.
        </p>
      </div>
    `;

    return;
  }

  const list=
    buildingList(selectedWorld);

  detail.innerHTML=`
    <div class="stats-grid">
      <div class="stat">
        <small>SOLDE</small>
        <strong>${fmt(s.money)}</strong>
      </div>

      <div class="stat">
        <small>PRODUCTION</small>
        <strong>${fmt(autoRate())}/s</strong>
      </div>

      <div class="stat">
        <small>PLANÈTE</small>
        <strong>x${w[3]}</strong>
      </div>
    </div>

    <div class="building-list">
      ${
        list.map(
          (x,b)=>{
            const n=
              s.buildings[
                selectedWorld+'-'+b
              ]||0;

            const c=
              buildingCost(
                selectedWorld,
                b
              );

            const income=
              baseProd(
                selectedWorld,
                b
              )*
              w[3]*
              prestigeMult()*
              globalMult()*
              autoMult()*
              incomeMult()*
              eventMultiplier('all');

            return`
              <article class="card building">
                <div class="building-icon">
                  ${x[1]}
                </div>

                <div class="building-info">
                  <strong>${esc(x[0])}</strong>

                  <small>
                    Niveau ${n}
                  </small>

                  <small>
                    +${fmt(income)}/s
                  </small>

                  <em>
                    ${fmt(c)}
                  </em>
                </div>

                <button
                  class="action"
                  data-buy="${b}"
                  ${s.money<c?'disabled':''}
                >
                  ACHETER
                </button>
              </article>
            `;
          }
        ).join('')
      }
    </div>
  `;
}

function renderPlanets(){
  const detail=
    document.getElementById(
      'planetDetail'
    );

  if(!detail)return;

  detail.innerHTML=`
    <div class="galaxy-map">
      ${
        WORLDS.map(
          (w,i)=>{
            const unlocked=
              planetUnlocked(i);

            const done=
              planetDone(i);

            return`
              <button
                class="planet-node
                ${unlocked?'unlocked':'locked'}
                ${done?'completed':''}
                ${i===selectedWorld?'selected':''}"
                data-world="${i}"
              >
                <span>${w[0]}</span>
                <strong>${i+1}</strong>
                <small>
                  ${esc(w[1])}
                </small>
                <em>
                  ${
                    unlocked?
                    'x'+w[3]:
                    '🔒'
                  }
                </em>
              </button>
            `;
          }
        ).join('')
      }
    </div>

    <div class="card planet-detail-card">
      <div class="planet-title">
        <span>
          ${WORLDS[selectedWorld][0]}
        </span>

        <div>
          <h2>
            ${esc(WORLDS[selectedWorld][1])}
          </h2>

          <small>
            Multiplicateur x${WORLDS[selectedWorld][3]}
          </small>
        </div>
      </div>

      ${
        planetUnlocked(selectedWorld)?
        `
          <div class="stats-grid">
            <div class="stat">
              <small>BÂTIMENTS</small>
              <strong>
                ${planetLevels(selectedWorld)}
              </strong>
            </div>

            <div class="stat">
              <small>OBJECTIF</small>
              <strong>10 / bâtiment</strong>
            </div>
          </div>

          <button
            class="action wide"
            data-go="buildings"
          >
            🏗️ GÉRER LA PLANÈTE
          </button>
        `:
        `
          <p>
            🔒 Construis au moins 1 de chaque
            bâtiment sur la planète précédente.
          </p>
        `
      }
    </div>
  `;
}

function renderResearch(){
  const list=
    document.getElementById(
      'researchList'
    );

  if(!list)return;

  list.innerHTML=
    TECH.map(
      (t,i)=>{
        const owned=tech(t[0]);
        const prev=
          i?
          TECH[i-1][0]:
          null;

        const available=
          !prev||
          tech(prev);

        return`
          <article class="card tech-card
            ${owned?'owned':''}
            ${available?'':'locked-tech'}"
          >
            <div class="tech-number">
              ${i+1}
            </div>

            <div class="tech-content">
              <strong>
                ${owned?'✅ ':'🧪 '}
                ${esc(t[1])}
              </strong>

              <small>
                ${esc(t[3])}
              </small>

              ${
                prev?
                `<em>
                  Requis : ${esc(
                    TECH_BY_ID[prev][1]
                  )}
                </em>`:
                '<em>Premier niveau</em>'
              }
            </div>

            <button
              class="action"
              data-research="${t[0]}"
              ${
                owned||
                !available||
                s.money<t[2]?
                'disabled':
                ''
              }
            >
              ${
                owned?
                'ACQUISE':
                available?
                fmt(t[2]):
                '🔒'
              }
            </button>
          </article>
        `;
      }
    ).join('');

  setText(
    'researchCount',
    Object.keys(s.research).length+
    '/'+TECH.length
  );
}

function renderMissions(){
  ensureWeekly();
  ensureDaily();

  const list=
    document.getElementById(
      'missionList'
    );

  if(!list)return;

  list.innerHTML=`
    <section>
      <div class="section-title">
        <span>📅</span>
        <div>
          <h2>Missions quotidiennes</h2>
          <small>
            Renouvellement automatique chaque jour
          </small>
        </div>
      </div>

      <div class="mission-grid">
        ${
          s.daily.missions
            .map(dailyMissionCard)
            .join('')
        }
      </div>
    </section>

    <section>
      <div class="section-title">
        <span>📜</span>
        <div>
          <h2>Campagne</h2>
          <small>
            Progression permanente
          </small>
        </div>
      </div>

      <div class="mission-grid">
        ${
          MISSION_BASE
            .map(
              m=>missionCard(m,false)
            )
            .join('')
        }
      </div>
    </section>

    <section>
      <div class="section-title">
        <span>🌍</span>
        <div>
          <h2>Missions planétaires</h2>
          <small>
            Maîtrise progressivement la galaxie
          </small>
        </div>
      </div>

      <div class="mission-grid">
        ${
          PLANET_MISSIONS
            .map(
              m=>missionCard(m,false)
            )
            .join('')
        }
      </div>
    </section>

    <section>
      <div class="section-title">
        <span>📆</span>
        <div>
          <h2>Quêtes hebdomadaires</h2>
          <small>
            Semaine du ${s.weekly.key}
          </small>
        </div>
      </div>

      <div class="mission-grid">
        ${
          WEEKLY
            .map(
              m=>missionCard(m,true)
            )
            .join('')
        }
      </div>
    </section>

    <div id="prestigeCard"></div>
  `;

  renderPrestige();
}

function renderPrestige(){
  const box=
    document.getElementById(
      'prestigeCard'
    );

  if(!box)return;

  const p=
    prestigeRequirement();

  const gain=Math.max(
    1,
    Math.floor(
      Math.log10(
        Math.max(
          10,
          s.runTotal/
          Math.max(1,p.target)
        )
      )
    )
  );

  box.innerHTML=`
    <div class="card prestige-card">
      <div class="section-title">
        <span>👑</span>
        <div>
          <h2>
            Prestige ${s.prestige+1}
          </h2>
          <small>
            Gain prévu : +${gain} jeton${gain>1?'s':''}
          </small>
        </div>
      </div>

      <p>
        Recommence un run avec 10 de chaque
        bâtiment sur les ${p.worlds}
        planète(s) débloquée(s).
      </p>

      <div class="requirement">
        ${
          p.allTen?
          '✅ Bâtiments requis':
          '🔒 Tous les bâtiments doivent être niveau 10'
        }
      </div>

      <div class="requirement">
        Run :
        <strong>
          ${fmt(s.runTotal)}
        </strong>
        /
        ${fmt(p.target)}
      </div>

      <button
        class="action primary wide"
        data-prestige="1"
        ${p.ok?'':'disabled'}
      >
        👑 ASCENSIONNER
      </button>
    </div>
  `;
}

function renderShop(){
  const list=
    document.getElementById(
      'shopList'
    );

  if(!list)return;

  list.innerHTML=
    SHOP_ITEMS.map(
      x=>{
        const lv=
          shopLevel(x[0]);

        const cost=
          shopCost(x[0]);

        return`
          <article class="card shop-card">
            <div class="shop-icon">
              ${x[2]}
            </div>

            <div class="shop-content">
              <strong>
                ${esc(x[1])}
              </strong>

              <small>
                ${esc(x[3])}
              </small>

              <em>
                Niveau ${lv}
              </em>
            </div>

            <button
              class="action"
              data-shop="${x[0]}"
              ${s.crystals<cost?'disabled':''}
            >
              ${fmt(cost)} 💎
            </button>
          </article>
        `;
      }
    ).join('');

  setText(
    'shopCrystals',
    fmt(s.crystals)
  );
}

function renderProfile(){
  const input=
    document.getElementById(
      'nickname'
    );

  if(input){
    input.value=s.nickname;
  }

  setText(
    'profileName',
    s.nickname
  );

  setText(
    'profileLevel',
    s.level
  );

  setText(
    'profileXp',
    fmt(s.xp)
  );
}
function setScreen(name){
  const valid=[
    'mine',
    'buildings',
    'planets',
    'research',
    'missions',
    'shop',
    'rank',
    'profile'
  ];

  if(!valid.includes(name)){
    name='mine';
  }

  currentScreen=name;

  document.querySelectorAll(
    '[data-screen]'
  ).forEach(
    e=>{
      e.classList.toggle(
        'active',
        e.dataset.screen===name
      );
    }
  );

  document.querySelectorAll(
    '[data-go]'
  ).forEach(
    e=>{
      if(
        e.closest('.bottom-nav')||
        e.closest('.top-tabs')
      ){
        e.classList.toggle(
          'active',
          e.dataset.go===name
        );
      }
    }
  );

  if(name==='buildings')renderBuildings();
  if(name==='planets')renderPlanets();
  if(name==='research')renderResearch();
  if(name==='missions')renderMissions();
  if(name==='shop')renderShop();
  if(name==='rank')renderRank();
  if(name==='profile')renderProfile();

  uiHeader();

  window.scrollTo({
    top:0,
    behavior:'auto'
  });
}

function renderMine(){
  const event=activeEvent();

  return`
    <div class="hero">
      <div>
        <small>PLANÈTE ACTUELLE</small>
        <h1>
          ${WORLDS[selectedWorld][0]}
          ${esc(WORLDS[selectedWorld][1])}
        </h1>
      </div>

      <div class="hero-money">
        <small>CRÉDITS</small>
        <strong id="total">
          ${fmt(s.money)}
        </strong>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat">
        <small>PRODUCTION</small>
        <strong id="rate">
          ${fmt(autoRate())}/s
        </strong>
      </div>

      <div class="stat">
        <small>PAR CLIC</small>
        <strong id="clickPower">
          +${fmt(clickPower())}
        </strong>
      </div>

      <div class="stat">
        <small>PRESTIGE</small>
        <strong>
          P${s.prestige}
        </strong>
      </div>
    </div>

    <div class="mine-panel">
      <div class="click-gain">
        <small>GAIN PAR CLIC MANUEL</small>
        <strong id="clickGainBig">
          +${fmt(clickPower())}
        </strong>
      </div>

      <button
        id="mineBtn"
        class="mine-button"
      >
        ⛏️ MINER
      </button>

      <div class="combo-wrap">
        <div>
          <span>
            Combo
          </span>
          <b id="combo">
            ${s.combo}
          </b>
        </div>

        <div class="combo-bar">
          <i
            id="comboBar"
            style="width:${s.combo/12*100}%"
          ></i>
        </div>
      </div>

      <div class="click-upgrade">
        <div>
          <small id="clickLevel">
            Niveau ${s.clickLevel}
          </small>

          <strong>
            Amélioration du forage
          </strong>

          <span>
            +25% par niveau
          </span>
        </div>

        <button
          class="action primary"
          data-upgrade-click="1"
          ${
            s.money<clickUpgradeCost()?
            'disabled':
            ''
          }
        >
          ⬆️
          <span id="clickUpgradeCost">
            ${fmt(clickUpgradeCost())}
          </span>
        </button>
      </div>
    </div>

    <div class="card event-card">
      <div class="event-icon">
        ${event?.[2]||'🌌'}
      </div>

      <div>
        <strong id="eventTitle">
          ${event?.[1]||'Aucun événement'}
        </strong>

        <p id="eventText">
          ${
            event?.[3]||
            'Le prochain événement apparaîtra aléatoirement.'
          }
        </p>

        <small id="eventTimer">
          ${
            event?
            formatDuration(
              Math.max(
                0,
                s.event.activeUntil-Date.now()
              )
            ):
            '—'
          }
        </small>
      </div>
    </div>

    <div class="card goal-card">
      <small>OBJECTIF GALACTIQUE</small>
      <p id="currentGoal">
        ${goalText()}
      </p>
    </div>
  `;
}

function modernHTML(){
  return`
    <div id="sm-modern-app">

      <header class="app-header">
        <div class="brand">
          <span>🚀</span>
          <div>
            <strong>SPACE MINING</strong>
            <small>TYCOON</small>
          </div>
        </div>

        <div class="cloud-status">
          <span id="onlineDot">
            ${s.online?'● CLOUD':'● LOCAL'}
          </span>
        </div>
      </header>

      <main class="app-main">

        <section
          data-screen="mine"
          class="screen active"
        >
          ${renderMine()}
        </section>

        <section
          data-screen="buildings"
          class="screen"
        >
          <div class="page-head">
            <div>
              <small>INDUSTRIE</small>
              <h1>🏭 Bâtiments</h1>
            </div>
          </div>

          <div id="buildingDetail"></div>
        </section>

        <section
          data-screen="planets"
          class="screen"
        >
          <div class="page-head">
            <div>
              <small>EXPLORATION</small>
              <h1>🌌 Carte galactique</h1>
            </div>
          </div>

          <div id="planetDetail"></div>
        </section>

        <section
          data-screen="research"
          class="screen"
        >
          <div class="page-head">
            <div>
              <small>SCIENCE</small>
              <h1>🧬 Arbre technologique</h1>
            </div>

            <strong id="researchCount">
              0/${TECH.length}
            </strong>
          </div>

          <div class="tech-tree">
            <div id="researchList"></div>
          </div>
        </section>

        <section
          data-screen="missions"
          class="screen"
        >
          <div class="page-head">
            <div>
              <small>OBJECTIFS</small>
              <h1>🎯 Missions</h1>
            </div>
          </div>

          <div id="missionList"></div>
        </section>

        <section
          data-screen="shop"
          class="screen"
        >
          <div class="page-head">
            <div>
              <small>CRISTAUX</small>
              <h1>💎 Boutique</h1>
            </div>

            <strong id="shopCrystals">
              ${fmt(s.crystals)}
            </strong>
          </div>

          <div id="shopList"></div>
        </section>

        <section
          data-screen="rank"
          class="screen"
        >
          <div class="page-head">
            <div>
              <small>GALAXIE</small>
              <h1>🏆 Classement</h1>
            </div>

            <button
              id="refreshRank"
              class="mini-action"
            >
              ↻
            </button>
          </div>

          <div
            id="rankMe"
            class="card"
          >
            Classement local
          </div>

          <div
            id="rankList"
            class="rank-list"
          ></div>
        </section>

        <section
          data-screen="profile"
          class="screen"
        >
          <div class="page-head">
            <div>
              <small>COMPTE</small>
              <h1>👤 Profil</h1>
            </div>
          </div>

          <div class="card profile-card">
            <label>
              Nom du mineur
              <input
                id="nickname"
                maxlength="20"
                value="${esc(s.nickname)}"
              >
            </label>

            <button
              id="saveProfile"
              class="action primary wide"
            >
              ☁️ ENREGISTRER
            </button>

            <button
              id="guestBtn"
              class="action wide"
            >
              ☁️ ACTIVER LE CLASSEMENT
            </button>

            <div class="stats-grid">
              <div class="stat">
                <small>NIVEAU</small>
                <strong>${s.level}</strong>
              </div>

              <div class="stat">
                <small>PRESTIGE</small>
                <strong>${s.prestige}</strong>
              </div>

              <div class="stat">
                <small>TOTAL</small>
                <strong>${fmt(s.lifetimeTotal)}</strong>
              </div>
            </div>

            <button
              id="resetBtn"
              class="danger wide"
            >
              🗑️ RÉINITIALISER LA PARTIE
            </button>
          </div>
        </section>

      </main>

      <nav class="bottom-nav">
        <button data-go="mine" class="active">
          <span>⛏️</span>
          <small>Mine</small>
        </button>

        <button data-go="buildings">
          <span>🏭</span>
          <small>Usines</small>
        </button>

        <button data-go="planets">
          <span>🌌</span>
          <small>Planètes</small>
        </button>

        <button data-go="research">
          <span>🧬</span>
          <small>Tech</small>
        </button>

        <button data-go="missions">
          <span>🎯</span>
          <small>Missions</small>
        </button>

        <button data-go="shop">
          <span>💎</span>
          <small>Boutique</small>
        </button>

        <button data-go="rank">
          <span>🏆</span>
          <small>Rang</small>
        </button>

        <button data-go="profile">
          <span>👤</span>
          <small>Profil</small>
        </button>
      </nav>

      <div
        id="toast"
        class="toast"
      ></div>

    </div>
  `;
}

function injectModernCSS(){
  if(document.getElementById('sm-modern-style'))return;

  const style=
    document.createElement('style');

  style.id='sm-modern-style';

  style.textContent=`
    :root{
      --bg:#070b14;
      --panel:#101827;
      --panel2:#151f31;
      --line:#24324a;
      --text:#f4f7ff;
      --muted:#8996ad;
      --accent:#61a8ff;
      --accent2:#9b7cff;
      --good:#4ee59a;
      --warn:#ffcb66;
      --danger:#ff6577;
    }

    *{
      box-sizing:border-box;
      -webkit-tap-highlight-color:transparent;
    }

    body{
      margin:0;
      background:
        radial-gradient(
          circle at top,
          #17233c 0,
          var(--bg) 48%
        );
      color:var(--text);
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Display",
        "Segoe UI",
        sans-serif;
    }

    #sm-modern-app{
      position:relative;
      z-index:999999;
      min-height:100vh;
      padding-bottom:90px;
      background:
        linear-gradient(
          180deg,
          rgba(7,11,20,.97),
          rgba(7,11,20,.99)
        );
    }

    .app-header{
      position:sticky;
      top:0;
      z-index:50;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:
        max(12px,env(safe-area-inset-top))
        16px 12px;
      background:rgba(7,11,20,.9);
      backdrop-filter:blur(18px);
      border-bottom:1px solid var(--line);
    }

    .brand{
      display:flex;
      align-items:center;
      gap:10px;
    }

    .brand>span{
      font-size:29px;
    }

    .brand strong,
    .brand small{
      display:block;
    }

    .brand strong{
      font-size:15px;
      letter-spacing:1.5px;
    }

    .brand small{
      color:var(--muted);
      font-size:9px;
      letter-spacing:3px;
    }

    .cloud-status{
      font-size:10px;
      color:var(--good);
      font-weight:800;
    }

    .app-main{
      width:min(100%,900px);
      margin:auto;
      padding:14px 12px 30px;
    }

    .screen{
      display:none;
    }

    .screen.active{
      display:block;
      animation:fadeIn .18s ease;
    }

    @keyframes fadeIn{
      from{
        opacity:0;
        transform:translateY(5px);
      }
      to{
        opacity:1;
        transform:none;
      }
    }

    .hero{
      display:flex;
      align-items:flex-end;
      justify-content:space-between;
      gap:12px;
      padding:10px 2px 18px;
    }

    .hero small,
    .page-head small,
    .stat small,
    .click-gain small{
      color:var(--muted);
      font-size:10px;
      font-weight:800;
      letter-spacing:1px;
    }

    h1{
      margin:4px 0 0;
      font-size:25px;
      line-height:1.1;
    }

    h2{
      margin:0;
      font-size:18px;
    }

    p{
      color:#aeb9ca;
      line-height:1.5;
    }

    .hero-money{
      text-align:right;
    }

    .hero-money strong{
      display:block;
      margin-top:3px;
      font-size:22px;
    }

    .stats-grid{
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:8px;
      margin-bottom:12px;
    }

    .stat{
      min-width:0;
      background:var(--panel);
      border:1px solid var(--line);
      border-radius:15px;
      padding:12px;
    }

    .stat strong{
      display:block;
      margin-top:5px;
      font-size:16px;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    .mine-panel{
      padding:18px 14px;
      border:1px solid var(--line);
      border-radius:22px;
      background:
        radial-gradient(
          circle at 50% 0,
          #213657,
          var(--panel) 48%
        );
      box-shadow:
        0 18px 60px rgba(0,0,0,.3);
    }

    .click-gain{
      text-align:center;
    }

    .click-gain strong{
      display:block;
      margin:6px 0 15px;
      font-size:29px;
    }

    .mine-button{
      display:block;
      width:min(100%,360px);
      margin:auto;
      min-height:88px;
      border:0;
      border-radius:24px;
      background:
        linear-gradient(
          135deg,
          #4d8fff,
          #8b6cff
        );
      color:#fff;
      font-size:22px;
      font-weight:900;
      box-shadow:
        0 14px 35px rgba(75,130,255,.28);
    }

    .mine-button:active{
      transform:scale(.97);
    }

    .combo-wrap{
      margin-top:17px;
    }

    .combo-wrap>div:first-child{
      display:flex;
      justify-content:space-between;
      color:var(--muted);
      font-size:12px;
    }

    .combo-bar,
    .progress{
      height:7px;
      margin-top:7px;
      overflow:hidden;
      border-radius:99px;
      background:#202b3d;
    }

    .combo-bar i,
    .progress i{
      display:block;
      height:100%;
      border-radius:inherit;
      background:
        linear-gradient(
          90deg,
          var(--accent),
          var(--accent2)
        );
    }

    .click-upgrade{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      margin-top:17px;
      padding:13px;
      border-radius:16px;
      background:rgba(255,255,255,.035);
      border:1px solid var(--line);
    }

    .click-upgrade small,
    .click-upgrade strong,
    .click-upgrade span{
      display:block;
    }

    .click-upgrade small{
      color:var(--accent);
      font-weight:800;
    }

    .click-upgrade strong{
      margin:2px 0;
    }

    .click-upgrade span{
      color:var(--muted);
      font-size:11px;
    }

    .action,
    .mini-action,
    .danger{
      border:1px solid var(--line);
      border-radius:12px;
      padding:11px 13px;
      background:#182337;
      color:var(--text);
      font-weight:800;
      font-size:12px;
    }

    .action.primary{
      border:0;
      background:
        linear-gradient(
          135deg,
          var(--accent),
          var(--accent2)
        );
    }

    .action.wide,
    .danger.wide{
      width:100%;
      margin-top:12px;
    }

    button:disabled{
      opacity:.4;
    }

    .event-card,
    .goal-card{
      display:flex;
      gap:12px;
      margin-top:12px;
      padding:15px;
      border-radius:17px;
      border:1px solid var(--line);
      background:var(--panel);
    }

    .event-icon{
      font-size:30px;
    }

    .event-card p{
      margin:5px 0;
      font-size:12px;
    }

    .goal-card{
      display:block;
    }

    .goal-card p{
      margin-bottom:0;
    }

    .page-head{
      display:flex;
      align-items:flex-end;
      justify-content:space-between;
      gap:12px;
      margin:10px 2px 16px;
    }

    .card{
      margin-bottom:10px;
      padding:14px;
      border:1px solid var(--line);
      border-radius:17px;
      background:var(--panel);
    }

    .building{
      display:flex;
      align-items:center;
      gap:12px;
    }

    .building-icon,
    .shop-icon{
      display:grid;
      place-items:center;
      width:46px;
      height:46px;
      flex:0 0 46px;
      border-radius:14px;
      background:var(--panel2);
      font-size:25px;
    }

    .building-info,
    .shop-content{
      min-width:0;
      flex:1;
    }

    .building-info strong,
    .building-info small,
    .building-info em,
    .shop-content strong,
    .shop-content small,
    .shop-content em{
      display:block;
    }

    .building-info small,
    .shop-content small{
      margin-top:3px;
      color:var(--muted);
      font-size:11px;
    }

    .building-info em,
    .shop-content em{
      margin-top:5px;
      color:var(--warn);
      font-size:11px;
      font-style:normal;
    }

    .galaxy-map{
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:8px;
      padding:3px 0 14px;
    }

    .planet-node{
      position:relative;
      min-height:112px;
      padding:9px 5px;
      border:1px solid var(--line);
      border-radius:17px;
      background:var(--panel);
      color:var(--text);
    }

    .planet-node span{
      display:block;
      font-size:26px;
    }

    .planet-node strong{
      display:block;
      margin-top:4px;
      color:var(--accent);
    }

    .planet-node small{
      display:block;
      margin-top:3px;
      color:var(--muted);
      font-size:9px;
      line-height:1.2;
    }

    .planet-node em{
      display:block;
      margin-top:5px;
      color:var(--warn);
      font-style:normal;
      font-size:10px;
    }

    .planet-node.selected{
      border-color:var(--accent);
      box-shadow:
        0 0 0 2px rgba(97,168,255,.15);
    }

    .planet-node.completed{
      border-color:var(--good);
    }

    .planet-node.locked{
      opacity:.38;
    }

    .planet-title{
      display:flex;
      gap:13px;
      align-items:center;
    }

    .planet-title>span{
      font-size:42px;
    }

    .tech-card{
      display:flex;
      align-items:center;
      gap:10px;
      position:relative;
    }

    .tech-number{
      display:grid;
      place-items:center;
      width:34px;
      height:34px;
      flex:0 0 34px;
      border-radius:50%;
      background:#1c2a42;
      color:var(--accent);
      font-weight:900;
    }

    .tech-content{
      min-width:0;
      flex:1;
    }

    .tech-content strong,
    .tech-content small,
    .tech-content em{
      display:block;
    }

    .tech-content small{
      margin-top:4px;
      color:#aeb9ca;
      font-size:11px;
    }

    .tech-content em{
      margin-top:4px;
      color:var(--muted);
      font-size:9px;
      font-style:normal;
    }

    .tech-card.owned{
      border-color:var(--good);
    }

    .locked-tech{
      opacity:.55;
    }

    .section-title{
      display:flex;
      align-items:center;
      gap:10px;
      margin:20px 2px 10px;
    }

    .section-title>span{
      font-size:25px;
    }

    .section-title small{
      display:block;
      color:var(--muted);
      margin-top:2px;
    }

    .mission-grid{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:9px;
    }

    .mission-card{
      margin:0;
    }

    .mission-top{
      display:flex;
      justify-content:space-between;
      gap:8px;
    }

    .mission-top strong{
      font-size:12px;
    }

    .mission-top span{
      white-space:nowrap;
      color:var(--good);
      font-size:11px;
      font-weight:900;
    }

    .mission-card>small{
      display:block;
      margin-top:8px;
      color:var(--muted);
    }

    .daily-card{
      border-color:#354c75;
    }

    .rank-row{
      display:grid;
      grid-template-columns:40px 1fr auto;
      align-items:center;
      gap:10px;
      padding:13px;
      margin-bottom:7px;
      border:1px solid var(--line);
      border-radius:14px;
      background:var(--panel);
    }

    .pos{
      font-weight:900;
      text-align:center;
    }

    .rank-row strong,
    .rank-row small{
      display:block;
    }

    .rank-row small{
      margin-top:3px;
      color:var(--muted);
      font-size:10px;
    }

    .profile-card label{
      display:block;
      color:var(--muted);
      font-size:12px;
      font-weight:700;
    }

    .profile-card input{
      width:100%;
      margin-top:7px;
      padding:13px;
      border:1px solid var(--line);
      border-radius:12px;
      background:#0b1220;
      color:var(--text);
      outline:none;
      font-size:15px;
    }

    .danger{
      margin-top:20px!important;
      background:rgba(255,101,119,.1);
      color:var(--danger);
      border-color:rgba(255,101,119,.3);
    }

    .bottom-nav{
      position:fixed;
      left:0;
      right:0;
      bottom:0;
      z-index:100;
      display:flex;
      overflow-x:auto;
      gap:2px;
      padding:
        7px 4px
        max(7px,env(safe-area-inset-bottom));
      background:rgba(9,14,24,.96);
      backdrop-filter:blur(20px);
      border-top:1px solid var(--line);
    }

    .bottom-nav button{
      min-width:74px;
      flex:1;
      border:0;
      background:none;
      color:#6f7d93;
      padding:5px 2px;
    }

    .bottom-nav button.active{
      color:var(--accent);
    }

    .bottom-nav span,
    .bottom-nav small{
      display:block;
    }

    .bottom-nav span{
      font-size:18px;
    }

    .bottom-nav small{
      margin-top:2px;
      font-size:9px;
      font-weight:800;
    }

    .toast{
      position:fixed;
      left:50%;
      bottom:92px;
      z-index:1000;
      max-width:calc(100% - 30px);
      transform:
        translate(-50%,20px);
      opacity:0;
      pointer-events:none;
      padding:12px 16px;
      border-radius:14px;
      background:#1d2a40;
      border:1px solid #354866;
      box-shadow:0 10px 35px rgba(0,0,0,.4);
      transition:.2s ease;
      font-size:12px;
      font-weight:800;
      text-align:center;
    }

    .toast.show{
      transform:translate(-50%,0);
      opacity:1;
    }

    .section-note{
      padding:15px;
      color:var(--muted);
      text-align:center;
    }

    @media(max-width:600px){
      .mission-grid{
        grid-template-columns:1fr;
      }

      .galaxy-map{
        grid-template-columns:repeat(3,1fr);
      }

      .bottom-nav button{
        min-width:62px;
      }

      .bottom-nav small{
        font-size:8px;
      }
    }

    @media(min-width:700px){
      .mission-grid{
        grid-template-columns:repeat(2,1fr);
      }

      .galaxy-map{
        grid-template-columns:repeat(5,1fr);
      }
    }
  `;

  document.head.appendChild(style);
}

function renderModern(){
  const old=
    document.getElementById(
      'sm-modern-app'
    );

  if(!old){
    document.body.insertAdjacentHTML(
      'afterbegin',
      modernHTML()
    );
  }

  injectModernCSS();

  uiHeader();

  if(currentScreen==='buildings'){
    renderBuildings();
  }

  if(currentScreen==='planets'){
    renderPlanets();
  }

  if(currentScreen==='research'){
    renderResearch();
  }

  if(currentScreen==='missions'){
    renderMissions();
  }

  if(currentScreen==='shop'){
    renderShop();
  }

  if(currentScreen==='rank'){
    renderRank();
  }

  if(currentScreen==='profile'){
    renderProfile();
  }

  document.querySelectorAll(
    '[data-screen]'
  ).forEach(
    e=>{
      e.classList.toggle(
        'active',
        e.dataset.screen===currentScreen
      );
    }
  );

  document.querySelectorAll(
    '.bottom-nav button'
  ).forEach(
    e=>{
      e.classList.toggle(
        'active',
        e.dataset.go===currentScreen
      );
    }
  );
}

document.addEventListener(
  'click',
  e=>{
    const b=
      e.target.closest('button');

    if(!b)return;

    if(
      b.dataset.go
    ){
      e.preventDefault();

      setScreen(
        b.dataset.go
      );

      return;
    }

    if(
      b.id==='mineBtn'
    ){
      e.preventDefault();
      mine();
      return;
    }

    if(
      b.dataset.upgradeClick
    ){
      e.preventDefault();
      upgradeClick();
      return;
    }

    if(
      b.dataset.world!==undefined
    ){
      const i=
        Number(b.dataset.world);

      if(
        planetUnlocked(i)
      ){
        selectedWorld=i;

        localStorage.setItem(
          'sm-world',
          String(i)
        );

        if(
          currentScreen==='buildings'
        ){
          renderBuildings();
        }

        if(
          currentScreen==='planets'
        ){
          renderPlanets();
        }

        uiHeader();
      }else{
        toast(
          '🔒 Planète verrouillée'
        );
      }

      return;
    }

    if(
      b.dataset.buy!==undefined
    ){
      buyBuilding(
        Number(b.dataset.buy)
      );
      return;
    }

    if(
      b.dataset.research
    ){
      doResearch(
        b.dataset.research
      );
      return;
    }

    if(
      b.dataset.mission
    ){
      claimMission(
        b.dataset.mission
      );
      return;
    }

    if(
      b.dataset.weekly
    ){
      claimWeekly(
        b.dataset.weekly
      );
      return;
    }

    if(
      b.dataset.daily
    ){
      claimDaily(
        b.dataset.daily
      );
      return;
    }

    if(
      b.dataset.prestige
    ){
      doPrestige();
      return;
    }

    if(
      b.dataset.shop
    ){
      buyShop(
        b.dataset.shop
      );
      return;
    }

    if(
      b.id==='refreshRank'
    ){
      renderRank();
      return;
    }

    if(
      b.id==='saveProfile'
    ){
      saveProfile();
      return;
    }

    if(
      b.id==='guestBtn'
    ){
      ensureAuth()
        .then(()=>{
          s.online=true;
          syncCloud(true);

          toast(
            '☁️ Classement mondial activé'
          );
        })
        .catch(()=>{
          toast(
            '⚠️ Active Anonymous Sign-Ins dans Supabase'
          );
        });

      return;
    }

    if(
      b.id==='resetBtn'
    ){
      resetGame();
      return;
    }
  },
  {passive}
);

document.addEventListener(
  'pointerup',
  e=>{
    if(
      e.target.closest('#mineBtn')
    ){
      e.preventDefault();
    }
  },
  {passive}
);

setInterval(
  ()=>{
    if(!s)return;

    checkEvents();
    ensureWeekly();
    ensureDaily();
    crystalAutoFarm();

    if(
      Date.now()>comboUntil&&
      s.combo
    ){
      s.combo=0;

      setText(
        'combo',
        0
      );

      const bar=
        document.getElementById(
          'comboBar'
        );

      if(bar){
        bar.style.width='0%';
      }
    }

    earn(
      autoRate()/4
    );

    if(!document.hidden){
      s.lastActiveAt=
        Date.now();
    }

    if(
      performance.now()-lastUi>500
    ){
      uiHeader();

      if(
        currentScreen==='buildings'
      ){
        renderBuildings();
      }

      if(
        currentScreen==='planets'
      ){
        renderPlanets();
      }

      if(
        currentScreen==='shop'
      ){
        renderShop();
      }

      lastUi=
        performance.now();
    }
  },
  250
);

setInterval(
  ()=>{
    if(!resetting){
      save();
      syncCloud();
    }
  },
  5000
);

window.addEventListener(
  'pagehide',
  ()=>{
    if(resetting)return;

    s.lastActiveAt=
      Date.now();

    save();
  }
);

document.addEventListener(
  'visibilitychange',
  ()=>{
    if(
      document.hidden&&
      !resetting
    ){
      s.lastActiveAt=
        Date.now();

      save();
      syncCloud(true);
    }else if(!document.hidden){
      crystalAutoFarm();
      checkEvents();
      uiHeader();
    }
  }
);

try{
  selectedWorld=
    Math.max(
      0,
      Math.min(
        WORLDS.length-1,
        Number(
          localStorage.getItem(
            'sm-world'
          )||0
        )
      )
    );
}catch(e){
  selectedWorld=0;
}

s=load();

ensureWeekly();
ensureDaily();

const crystalBonus=
  crystalAutoFarm();

const offlineBonus=
  earnOffline();

if(!s.event.nextAt){
  scheduleEvent();
}

checkEvents();

let skipCloud=false;

try{
  skipCloud=
    sessionStorage.getItem(
      'sm-reset-complete'
    )==='1';

  if(skipCloud){
    sessionStorage.removeItem(
      'sm-reset-complete'
    );
  }
}catch(e){}

renderModern();

if(offlineBonus>0){
  setTimeout(
    ()=>{
      toast(
        '🌙 Gain hors-ligne : +'+
        fmt(offlineBonus)
      );
    },
    500
  );
}

if(!skipCloud){
  loadCloud();
}
