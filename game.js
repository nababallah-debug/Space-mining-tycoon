```javascript
const SUPABASE_URL='https://gvyeooqemajnvfbgnagv.supabase.co';
const SUPABASE_KEY='sb_publishable_moYDSTJplgl9XPCiKR96b_CPt3MJ7z';
const GAME_VERSION='1.0.14';

const sb=window.supabase?.createClient?.(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth:{
      persistSession:true,
      autoRefreshToken:true,
      detectSessionInUrl:false
    }
  }
)||null;

const KEY='space-mining-v13';

const LEGACY_KEYS=[
  'space-mining-v13',
  'space-mining-v12',
  'space-mining-v11',
  'space-mining-v10',
  'space-mining-v9',
  'space-mining-v8',
  'space-mining-v7',
  'space-mining-v6',
  'space-mining-v5',
  'space-mining-v4',
  'space-mining-v3',
  'space-mining-v2'
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

const TECH_BY_ID=Object.fromEntries(
  TECH.map(x=>[x[0],x])
);

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
let selectedWorld=0;
let currentScreen='mine';
let comboUntil=0;
let lastUi=0;
let lastCloud=0;
let syncing=false;
let resetting=false;
let toastTimer=0;

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
    shopUpgrades:{},
    event:{
      current:null,
      activeUntil:0,
      nextAt:0
    },
    buildings,
    research:{},
    missions:{},
    weekly:{
      key:weekKey(),
      claimed:{},
      progress:{}
    },
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

      if(!Number.isFinite(Number(z.buildings[k]))){
        z.buildings[k]=0;
      }
    });
  });

  z.research=z.research||{};
  z.missions=z.missions||{};

  z.weekly=z.weekly||base.weekly;
  z.weekly.claimed=z.weekly.claimed||{};
  z.weekly.progress=z.weekly.progress||{};

  z.shopUpgrades=z.shopUpgrades||{};

  z.event=z.event||{
    current:null,
    activeUntil:0,
    nextAt:0
  };

  z.event.current=z.event.current||null;
  z.event.activeUntil=Number(z.event.activeUntil)||0;
  z.event.nextAt=Number(z.event.nextAt)||0;

  if(!Number.isFinite(Number(z.crystals))){
    z.crystals=0;
  }

  z.crystals=Math.max(0,Number(z.crystals)||0);

  if(!Number.isFinite(Number(z.lastCrystalCheckAt))){
    z.lastCrystalCheckAt=Date.now();
  }

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

    z.lifetimeTotal=Math.max(
      z.runTotal||0,
      Number(z.lifetimeTotal)||0
    );

    z.lastActiveAt=Number(
      raw?.lastActiveAt||
      raw?.last||
      Date.now()
    );

    z.lastOfflineClaimAt=Number(
      raw?.lastOfflineClaimAt||
      z.lastActiveAt||
      Date.now()
    );

    if(
      !Number.isFinite(z.lastActiveAt)||
      z.lastActiveAt>Date.now()+60000
    ){
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

  if(Math.abs(n)<1000){
    return Math.floor(n).toLocaleString('fr-FR');
  }

  const units=[
    'K','M','Md','Bn','T','Qa','Qi','Sx','Sp','Oc',
    'No','Dc','Ud','Dd','Td','Qad','Qid'
  ];

  const i=Math.floor(
    Math.log10(Math.abs(n))/3
  );

  return (
    n/10**(i*3)
  ).toFixed(i>=5?2:1)+' '+(
    units[i-1]||('e'+i*3)
  );
}

function weekKey(d=new Date()){
  const x=new Date(
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    )
  );

  const day=x.getUTCDay()||7;

  x.setUTCDate(
    x.getUTCDate()-day+1
  );

  return x.toISOString().slice(0,10);
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

function tech(id){
  return !!s.research[id];
}

function shopLevel(id){
  return Math.max(
    0,
    Number(s.shopUpgrades?.[id])||0
  );
}

function shopMult(id,base){
  return Math.pow(
    base,
    shopLevel(id)
  );
}

function globalMult(){
  let m=
    1+
    (.18*s.prestige)*
    (tech('ascension')?1.5:1);

  for(
    const id of[
      'reactor',
      'fusion',
      'antimatter',
      'singularity',
      'deep',
      'void'
    ]
  ){
    if(tech(id)){
      m*=TECH_BY_ID[id][5];
    }
  }

  return (
    m*
    shopMult('prod',1.04)*
    eventMultiplier('global')
  );
}

function autoMult(){
  let m=1;

  for(
    const id of[
      'ai',
      'nano',
      'dyson',
      'quantum'
    ]
  ){
    if(tech(id)){
      m*=TECH_BY_ID[id][5];
    }
  }

  return m;
}

function clickMult(){
  let m=1;

  if(tech('laser'))m*=1.5;
  if(tech('drill'))m*=2;
  if(tech('gravity'))m*=3;

  return (
    m*
    shopMult('click',1.05)*
    eventMultiplier('click')
  );
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

  return (
    m*
    shopMult('discount',.99)*
    eventMultiplier('cost')
  );
}

function offlineCap(){
  if(tech('time'))return 172800;
  if(tech('chrono'))return 86400;

  return 14400;
}

function prestigeMult(){
  return (
    1+
    (.18*s.prestige)*
    (tech('ascension')?1.5:1)
  )*
  shopMult('prestige',1.02);
}

function clickPower(){
  return (
    prestigeMult()*
    globalMult()*
    clickMult()*
    (1+Math.min(.75,s.combo*.03))
  );
}

function baseProd(w,b){
  const earlyBoost=Math.max(
    1,
    2-b*.08
  );

  const lateBoost=
    w>=12?
    Math.pow(1.16,w-11):
    1;

  return (
    10*
    (1.1+.18*w)*
    3.2**w*
    2.0**b*
    earlyBoost*
    lateBoost
  );
}

function buildingCost(w,b){
  const n=
    s.buildings[w+'-'+b]||0;

  return (
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

  return (
    r*
    prestigeMult()*
    globalMult()*
    autoMult()*
    incomeMult()
  );
}

function levelCheck(){
  const nl=
    Math.floor(
      Math.sqrt(s.xp/80)
    )+1;

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
    Math.floor(
      Math.log10(
        Math.max(10,x)
      )+2
    )
  );

  levelCheck();
}

function spend(x){
  s.money-=x;
  s.spent+=x;
}

function totalBuildings(){
  return Object.values(
    s.buildings
  ).reduce(
    (a,b)=>a+(Number(b)||0),
    0
  );
}

function planetUnlocked(w){
  if(w===0)return true;

  const prev=w-1;

  return buildingList(prev).every(
    (_,b)=>
      (s.buildings[prev+'-'+b]||0)>=1
  );
}

function planetLevels(w){
  return buildingList(w).reduce(
    (a,_,b)=>
      a+(s.buildings[w+'-'+b]||0),
    0
  );
}

function planetDone(w){
  return (
    planetUnlocked(w)&&
    buildingList(w).every(
      (_,b)=>
        (s.buildings[w+'-'+b]||0)>=10
    )
  );
}

function goalText(){
  for(
    let i=1;
    i<WORLDS.length;
    i++
  ){
    if(!planetUnlocked(i)){
      return (
        'Construire au moins 1 exemplaire de chacun des '+
        buildingList(i-1).length+
        ' bâtiments sur '+
        WORLDS[i-1][1]+
        ' pour débloquer '+
        WORLDS[i][1]+'.'
      );
    }
  }

  return 'Toutes les planètes sont accessibles. Maîtrise-les avec 10 de chaque bâtiment pour préparer le prestige.';
}

function missionValue(m){
  switch(m[2]){
    case 'clics':
      return s.cLICKS;

    case 'lifetime':
      return s.lifetimeTotal;

    case 'run':
      return s.runTotal;

    case 'buildings':
      return totalBuildings();

    case 'prestige':
      return s.prestige;

    case 'tech':
      return Object.keys(s.research).length;

    case 'level':
      return s.level;

    case 'planet':
      return (
        m[3]<=WORLDS.length-1&&
        planetDone(m[3])
      )?m[3]:0;

    case 'spend':
      return s.spent;

    default:
      return 0;
  }
}

function weeklyValue(m){
  ensureWeekly();

  switch(m[2]){
    case 'clicks':
      return s.cLICKS;

    case 'buildings':
      return totalBuildings();

    case 'run':
      return s.runTotal;

    case 'spend':
      return s.spent;

    case 'planet':
      return WORLDS
        .slice(0,m[3]+1)
        .filter((_,i)=>planetDone(i))
        .length;

    default:
      return 0;
  }
}

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

function uiHeader(){
  const unlocked=
    WORLDS.filter(
      (_,i)=>planetUnlocked(i)
    ).length;

  setText('total',fmt(s.money));
  setText('lifetimeTotal',fmt(s.lifetimeTotal));
  setText('runTotal',fmt(s.runTotal));
  setText('rate',fmt(autoRate())+'/s');
  setText('prestige','P'+s.prestige);
  setText('crystals',fmt(s.crystals||0));
  setText('shopCrystals',fmt(s.crystals||0));
  setText('clickPower','+'+fmt(clickPower()));
  setText('combo',s.combo);
  setText('profileName',s.nickname);
  setText('profileLevel',s.level);
  setText('profileXp',fmt(s.xp));
  setText('profileTotal',fmt(s.lifetimeTotal));
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
    unlocked+'/'+WORLDS.length+' débloquées'
  );
  setText(
    'researchProgress',
    Object.keys(s.research).length+'/'+TECH.length
  );
  setText(
    'missionProgress',
    Object.keys(s.missions).length+'/'+
    (MISSION_BASE.length+PLANET_MISSIONS.length)
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
    ev?.[2]||'Aucun événement'
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

  const dot=document.getElementById('onlineDot');

  if(dot){
    dot.style.color=
      s.online?
      'var(--good)':
      'var(--warn)';
  }
}

function formatDuration(ms){
  const sec=Math.ceil(ms/1000);

  if(sec<60)return sec+'s';

  const min=Math.floor(sec/60);

  return min+'m '+
    String(sec%60).padStart(2,'0')+
    's';
}

function setScreen(name){
  if(!document.getElementById('screen-'+name)){
    name='mine';
  }

  currentScreen=name;

  document.querySelectorAll('.screen').forEach(e=>
    e.classList.toggle(
      'active',
      e.id==='screen-'+name
    )
  );

  document.querySelectorAll('.bottom-nav button').forEach(e=>
    e.classList.toggle(
      'active',
      e.dataset.go===name
    )
  );

  if(name==='buildings')renderBuildings();
  if(name==='planets')renderPlanets();
  if(name==='research')renderResearch();
  if(name==='missions')renderMissions();
  if(name==='rank')renderRank();
  if(name==='profile')renderProfile();
  if(name==='shop')renderShop();

  uiHeader();

  window.scrollTo({
    top:0,
    behavior:'auto'
  });
}

function worldStrip(){
  return WORLDS.map((w,i)=>`
    <button
      class="planet-chip ${
        i===selectedWorld?'active ':''
      }${
        planetUnlocked(i)?'':'locked'
      }"
      data-world="${i}"
    >
      <strong>${w[0]} ${w[1]}</strong>
      <small>
        ${
          planetUnlocked(i)?
          'x'+w[3]:
          '🔒 '+fmt(w[2])
        }
      </small>
    </button>
  `).join('');
}

function renderBuildings(){
  const strip=
    document.getElementById('buildingWorlds');

  if(strip){
    strip.innerHTML=worldStrip();
  }

  const w=WORLDS[selectedWorld];

  const detail=
    document.getElementById('buildingDetail');

  if(!detail)return;

  if(!planetUnlocked(selectedWorld)){
    detail.innerHTML=`
      <div class="planet-card locked-card">
        <div class="big-icon">🔒</div>
        <h3>${w[0]} ${w[1]}</h3>
        <p>
          Construis au moins 1 exemplaire
          de chacun des ${
            buildingList(selectedWorld-1)?.length||12
          }
          bâtiments sur ${
            WORLDS[selectedWorld-1]?.[1]||
            'la planète précédente'
          }
          pour ouvrir cette planète.
        </p>
      </div>
    `;
    return;
  }

  const list=buildingList(selectedWorld);

  detail.innerHTML=`
    <div class="building-balance">
      <div>
        <small>SOLDE DISPONIBLE</small>
        <strong>${fmt(s.money)}</strong>
      </div>
      <div>
        <small>PRODUCTION</small>
        <strong>${fmt(autoRate())}/s</strong>
      </div>
    </div>

    <div class="building-list">
      ${
        list.map((x,b)=>{
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
            <article class="building">
              <div class="building-icon">
                ${x[1]}
              </div>

              <div class="building-info">
                <strong>${x[0]}</strong>

                <small>
                  Niv. ${n} · +${fmt(income)}/s
                </small>

                <em>
                  Prochain: ${fmt(c)}
                </em>
              </div>

              <button
                class="buy"
                data-buy="${b}"
                ${
                  s.money<c?
                  'disabled':
                  ''
                }
              >
                <span
                  style="
                    display:block;
                    color:#fff!important;
                    visibility:visible!important;
                    opacity:1!important;
                    font-size:14px;
                    font-weight:800;
                  "
                >
                  ACHETER
                </span>
              </button>
            </article>
          `;
        }).join('')
      }
    </div>
  `;
}

/* =========================================================
   PLANÈTES
   ========================================================= */

function renderPlanets(){
  const strip=
    document.getElementById('planetStrip');

  const detail=
    document.getElementById('planetDetail');

  if(!strip||!detail)return;

  strip.innerHTML=worldStrip();

  const w=WORLDS[selectedWorld];
  const ok=planetUnlocked(selectedWorld);
  const lv=planetLevels(selectedWorld);
  const count=buildingList(selectedWorld).length;

  detail.innerHTML=ok?`
    <article class="planet-card">
      <div class="planet-head">
        <div>
          <h3>${w[0]} ${w[1]}</h3>

          <p>
            Multiplicateur x${w[3]}
            · ${lv}/${count*10} niveaux
          </p>
        </div>

        <span class="badge">
          ${
            planetDone(selectedWorld)?
            'COMPLÈTE':
            'ACTIVE'
          }
        </span>
      </div>

      <div class="progress">
        <i style="
          width:${
            Math.min(
              100,
              lv/(count*10)*100
            )
          }%
        "></i>
      </div>

      <button
        class="wide secondary"
        data-go="buildings"
      >
        🏗️ Ouvrir les bâtiments
      </button>
    </article>
  `:`
    <div class="planet-card locked-card">
      <div class="big-icon">🔒</div>

      <h3>${w[0]} ${w[1]}</h3>

      <p>
        🔒 Pour l’ouvrir :
        1 de chacun des ${
          buildingList(selectedWorld-1)?.length||12
        }
        bâtiments sur ${
          WORLDS[selectedWorld-1]?.[1]||
          'la planète précédente'
        }.
      </p>
    </div>
  `;
}

/* =========================================================
   TECHNOLOGIES
   ========================================================= */

function renderResearch(){
  const list=
    document.getElementById('researchList');

  if(!list)return;

  list.innerHTML=
    TECH.map((t,i)=>{
      const owned=tech(t[0]);

      const prev=
        i?
        TECH[i-1][0]:
        null;

      const available=
        !prev||
        tech(prev);

      const canBuy=
        !owned&&
        available&&
        s.money>=t[2];

      const label=
        owned?
        'ACQUISE':
        available?
        fmt(t[2]):
        'VERROUILLÉE';

      return`
        <article class="
          research-card
          ${
            available?
            '':
            'locked-tech'
          }
        ">
          <div>
            <span>
              ${
                owned?
                '✅':
                available?
                '🧪':
                '🔒'
              }
            </span>

            <strong>${t[1]}</strong>

            <small>${t[3]}</small>
          </div>

          <button
            class="buy"
            data-research="${t[0]}"
            ${
              owned||
              !available||
              !canBuy?
              'disabled':
              ''
            }
            style="
              color:#fff!important;
              visibility:visible!important;
              opacity:${
                owned||
                !available?
                '.45':
                '1'
              }!important;
              display:flex!important;
              align-items:center;
              justify-content:center;
              min-height:44px;
              font-size:14px;
              font-weight:800;
              text-align:center;
              line-height:1.2;
            "
          >
            <span
              style="
                display:block!important;
                color:#fff!important;
                visibility:visible!important;
                opacity:1!important;
                font-size:14px;
                font-weight:800;
              "
            >
              ${label}
            </span>
          </button>
        </article>
      `;
    }).join('');

  setText(
    'researchCount',
    Object.keys(s.research).length+
    '/'+
    TECH.length
  );
}

/* =========================================================
   MISSIONS
   ========================================================= */

function renderMissions(){
  ensureWeekly();

  const list=
    document.getElementById('missionList');

  if(!list)return;

  list.innerHTML=`
    <div class="mission-section">
      <h3>📜 Campagne</h3>

      ${
        MISSION_BASE
          .map(m=>missionCard(m,false))
          .join('')
      }
    </div>

    <div class="mission-section">
      <h3>🌍 Missions planétaires</h3>

      ${
        PLANET_MISSIONS
          .map(m=>missionCard(m,false))
          .join('')
      }
    </div>

    <div class="mission-section">
      <h3>
        📅 Quêtes hebdomadaires

        <small>
          semaine du ${s.weekly.key}
        </small>
      </h3>

      ${
        WEEKLY
          .map(m=>missionCard(m,true))
          .join('')
      }
    </div>

    <div id="prestigeCard"></div>
  `;

  renderPrestige();

  setText(
    'missionCount',
    Object.keys(s.missions).length+
    ' / '+
    (
      MISSION_BASE.length+
      PLANET_MISSIONS.length
    )
  );
}

function missionCard(m,weekly){
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

  const label=
    claimed?
    'RÉCLAMÉ':
    'RÉCLAMER';

  const dataAttr=
    weekly?
    'data-weekly':
    'data-mission';

  const disabled=
    claimed||v<need;

  return`
    <article class="mission-card">

      <div class="mission-top">
        <strong>
          ${
            claimed?
            '✅':
            '🎯'
          }
          ${m[1]}
        </strong>

        <span>
          ${fmt(m[4])}
        </span>
      </div>

      <small>
        ${fmt(v)} / ${fmt(need)}
      </small>

      <div class="bar">
        <i style="
          width:${pct}%
        "></i>
      </div>

      <button
        class="buy"
        ${dataAttr}="${id}"
        ${
          disabled?
          'disabled':
          ''
        }
        style="
          color:#fff!important;
          visibility:visible!important;
          opacity:${
            disabled?
            '.45':
            '1'
          }!important;
          display:flex!important;
          align-items:center;
          justify-content:center;
          min-height:44px;
          font-size:14px;
          font-weight:800;
          text-align:center;
          line-height:1.2;
        "
      >
        <span
          style="
            display:block!important;
            color:#fff!important;
            visibility:visible!important;
            opacity:1!important;
            font-size:14px;
            font-weight:800;
          "
        >
          ${label}
        </span>
      </button>

    </article>
  `;
}

/* =========================================================
   ÉVÉNEMENTS
   ========================================================= */

function activeEvent(){
  if(!s.event?.current)return null;

  if(Date.now()>=s.event.activeUntil){
    s.event.current=null;
    s.event.activeUntil=0;
    return null;
  }

  return EVENTS.find(
    e=>e[0]===s.event.current
  )||null;
}

function eventMultiplier(type){
  const ev=activeEvent();

  if(!ev)return 1;

  if(
    ev[4]===type||
    ev[4]==='global'||
    type==='all'&&ev[4]==='global'
  ){
    let m=ev[5];

    m*=shopMult(
      'event',
      1.05
    );

    return m;
  }

  return 1;
}

function eventDurationMultiplier(){
  return shopMult(
    'duration',
    1.08
  );
}

function startEvent(){
  if(activeEvent())return;

  const ev=
    EVENTS[
      Math.floor(
        Math.random()*EVENTS.length
      )
    ];

  s.event.current=ev[0];

  s.event.activeUntil=
    Date.now()+
    ev[6]*
    60000*
    eventDurationMultiplier();

  s.event.nextAt=
    Date.now()+
    (
      5+
      Math.random()*10
    )*
    60000;

  toast(
    ev[2]+' '+ev[1]
  );

  save();
}

function eventLoop(){
  const now=Date.now();

  if(activeEvent())return;

  if(
    !s.event.nextAt||
    now>=s.event.nextAt
  ){
    startEvent();
  }
}

/* =========================================================
   CRISTAUX
   ========================================================= */

function crystalChance(){
  let chance=.01;

  chance+=
    shopLevel('crystal')*
    .0015;

  const ev=activeEvent();

  if(ev&&ev[4]==='crystal'){
    chance*=ev[5];
  }

  return chance;
}

function crystalTick(){
  const now=Date.now();

  const elapsed=
    now-
    (
      Number(s.lastCrystalCheckAt)||
      now
    );

  if(elapsed<1000)return;

  const rolls=
    Math.min(
      60,
      Math.floor(elapsed/1000)
    );

  for(let i=0;i<rolls;i++){
    if(Math.random()<crystalChance()){
      s.crystals++;
    }
  }

  s.lastCrystalCheckAt=now;
}

/* =========================================================
   ACTIONS
   ========================================================= */

function mine(){
  const now=Date.now();

  if(now<=comboUntil){
    s.combo=Math.min(
      25,
      s.combo+1
    );
  }else{
    s.combo=1;
  }

  comboUntil=now+1800;

  const amount=clickPower();

  earn(amount);

  s.cLICKS++;

  crystalTick();

  if(Math.random()<crystalChance()){
    s.crystals++;
  }

  save();

  renderMine();

  if(
    currentScreen!=='mine'
  ){
    uiHeader();
  }
}

function buyBuilding(w,b){
  if(!planetUnlocked(w))return;

  const cost=
    buildingCost(w,b);

  if(s.money<cost)return;

  spend(cost);

  const key=w+'-'+b;

  s.buildings[key]=
    (s.buildings[key]||0)+1;

  save();

  renderBuildings();
  renderPlanets();
  renderMissions();
  uiHeader();
}

function doResearch(id){
  const t=TECH_BY_ID[id];

  if(!t)return;

  if(tech(id))return;

  const i=
    TECH.findIndex(
      x=>x[0]===id
    );

  const prev=
    i?
    TECH[i-1][0]:
    null;

  if(prev&&!tech(prev)){
    toast('🔒 Technologie précédente requise');
    return;
  }

  if(s.money<t[2]){
    toast('💰 Fonds insuffisants');
    return;
  }

  spend(t[2]);

  s.research[id]=true;

  save();

  renderResearch();
  renderMissions();
  uiHeader();

  toast('🧪 '+t[1]+' acquise');
}

function claimMission(id){
  const m=
    [...MISSION_BASE,...PLANET_MISSIONS]
      .find(x=>x[0]===id);

  if(!m)return;

  if(s.missions[id])return;

  if(missionValue(m)<m[3])return;

  s.missions[id]=true;

  earn(m[4]);

  save();

  renderMissions();
  uiHeader();

  toast(
    '🎯 Mission terminée : '+m[1]
  );
}

function claimWeekly(id){
  ensureWeekly();

  const m=
    WEEKLY.find(
      x=>x[0]===id
    );

  if(!m)return;

  if(s.weekly.claimed[id])return;

  if(weeklyValue(m)<m[3])return;

  s.weekly.claimed[id]=true;

  earn(m[4]);

  save();

  renderMissions();
  uiHeader();

  toast(
    '📅 Quête hebdomadaire terminée'
  );
}

/* =========================================================
   BOUTIQUE
   ========================================================= */

function shopCost(id){
  const item=
    SHOP_ITEMS.find(
      x=>x[0]===id
    );

  if(!item)return Infinity;

  const lvl=shopLevel(id);

  return (
    item[4]*
    Math.pow(1.9,lvl)
  );
}

function buyShop(id){
  const item=
    SHOP_ITEMS.find(
      x=>x[0]===id
    );

  if(!item)return;

  const cost=shopCost(id);

  if(s.crystals<cost){
    toast('💎 Cristaux insuffisants');
    return;
  }

  s.crystals-=cost;

  s.shopUpgrades[id]=
    shopLevel(id)+1;

  save();

  renderShop();
  uiHeader();

  toast(
    '🛒 '+item[1]+' amélioré'
  );
}

/* =========================================================
   PRESTIGE
   ========================================================= */

function prestigeRequirement(){
  return (
    1e12*
    Math.pow(
      8,
      s.prestige
    )
  );
}

function canPrestige(){
  return (
    s.lifetimeTotal>=
    prestigeRequirement()
  );
}

function doPrestige(){
  if(!canPrestige()){
    toast(
      '👑 Objectif : '+
      fmt(prestigeRequirement())
    );
    return;
  }

  const gained=
    Math.max(
      1,
      Math.floor(
        Math.sqrt(
          s.lifetimeTotal/
          prestigeRequirement()
        )
      )
    );

  s.prestige+=gained;
  s.prestigeShards+=gained;

  s.money=0;
  s.runTotal=0;

  Object.keys(
    s.buildings
  ).forEach(
    k=>s.buildings[k]=0
  );

  s.research={};
  s.lastOfflineClaimAt=Date.now();

  save();

  renderAll();
  uiHeader();

  toast(
    '👑 Prestige +'+gained
  );
}

function renderPrestige(){
  const e=
    document.getElementById(
      'prestigeCard'
    );

  if(!e)return;

  const req=
    prestigeRequirement();

  e.innerHTML=`
    <article class="prestige-card">
      <h3>👑 Prestige</h3>

      <p>
        Réinitialise ta progression
        actuelle pour gagner un bonus
        permanent de production.
      </p>

      <div class="prestige-stats">
        <span>
          Prestige actuel
          <strong>${s.prestige}</strong>
        </span>

        <span>
          Objectif
          <strong>${fmt(req)}</strong>
        </span>

        <span>
          Bonus
          <strong>
            +${Math.round(
              (
                prestigeMult()-1
              )*100
            )}%
          </strong>
        </span>
      </div>

      <button
        class="wide danger"
        id="prestigeBtn"
        ${
          canPrestige()?
          '':
          'disabled'
        }
      >
        👑 PRESTIGE
      </button>
    </article>
  `;
}

/* =========================================================
   SHOP / RANK / PROFIL
   ========================================================= */

function renderShop(){
  const list=
    document.getElementById(
      'shopList'
    );

  if(!list)return;

  list.innerHTML=
    SHOP_ITEMS.map(item=>{
      const id=item[0];
      const lvl=shopLevel(id);
      const cost=shopCost(id);

      return`
        <article class="shop-card">

          <div class="shop-icon">
            ${item[2]}
          </div>

          <strong>
            ${item[1]}
          </strong>

          <small>
            ${item[3]}
          </small>

          <span>
            Niveau ${lvl}
          </span>

          <button
            class="buy"
            data-shop="${id}"
            ${
              s.crystals<cost?
              'disabled':
              ''
            }
          >
            <span
              style="
                display:block;
                color:#fff!important;
                visibility:visible!important;
                opacity:1!important;
                font-weight:800;
              "
            >
              ${fmt(cost)} 💎
            </span>
          </button>

        </article>
      `;
    }).join('');
}

function renderRank(){
  const list=
    document.getElementById(
      'rankList'
    );

  if(!list)return;

  list.innerHTML=`
    <div class="rank-empty">
      ☁️ Classement mondial
      <br>
      <small>
        Synchronisation avec le cloud…
      </small>
    </div>
  `;
}

function renderProfile(){
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
}

/* =========================================================
   MINE
   ========================================================= */

function renderMine(){
  uiHeader();

  const e=
    document.getElementById(
      'mineButton'
    );

  if(e){
    e.innerHTML=`
      <span
        style="
          display:block;
          font-size:42px;
          line-height:1;
        "
      >
        ⛏️
      </span>

      <strong
        style="
          display:block;
          margin-top:8px;
          color:#fff;
        "
      >
        EXTRAIRE
      </strong>

      <small
        style="
          display:block;
          color:#fff;
          opacity:.8;
          margin-top:4px;
        "
      >
        +${fmt(clickPower())}
      </small>
    `;
  }
}

/* =========================================================
   RENDU GLOBAL
   ========================================================= */

function renderAll(){
  renderMine();
  renderBuildings();
  renderPlanets();
  renderResearch();
  renderMissions();
  renderShop();
  renderRank();
  renderProfile();

  uiHeader();
}

/* =========================================================
   OFFLINE
   ========================================================= */

function applyOffline(){
  const now=Date.now();

  const last=
    Number(s.lastOfflineClaimAt)||
    now;

  let elapsed=
    Math.max(
      0,
      now-last
    );

  elapsed=
    Math.min(
      elapsed,
      offlineCap()*1000
    );

  if(elapsed<5000){
    s.lastOfflineClaimAt=now;
    return;
  }

  const seconds=
    elapsed/1000;

  const offlineBonus=
    shopMult(
      'offline',
      1.05
    );

  const amount=
    autoRate()*
    seconds*
    .5*
    offlineBonus;

  if(amount>0){
    earn(amount);

    s.offlineLast=amount;

    toast(
      '🌙 Hors-ligne : +'+
      fmt(amount)
    );
  }

  s.lastOfflineClaimAt=now;
}

/* =========================================================
   CLOUD
   ========================================================= */

async function ensureAuth(){
  if(!sb)return null;

  try{
    const{
      data:{
        session
      }={}
    }=
      await sb.auth.getSession();

    if(session?.user){
      return session.user;
    }

    const{
      data,
      error
    }=
      await sb.auth.signInAnonymously();

    if(error){
      console.warn(
        'Auth Supabase:',
        error
      );
      return null;
    }

    return data?.user||null;

  }catch(e){
    console.warn(
      'Auth cloud:',
      e
    );

    return null;
  }
}

async function syncCloud(){
  if(
    !sb||
    syncing||
    resetting
  ){
    return;
  }

  syncing=true;

  try{
    const user=
      await ensureAuth();

    if(!user){
      s.online=false;
      return;
    }

    const payload={
      user_id:user.id,
      game_version:GAME_VERSION,
      nickname:s.nickname,
      lifetime_total:s.lifetimeTotal,
      prestige:s.prestige,
      level:s.level,
      crystals:s.crystals,
      state:s
    };

    const response=
      await fetch(
        SUPABASE_URL+
        '/functions/v1/game-sync',
        {
          method:'POST',
          headers:{
            'Content-Type':
              'application/json',
            apikey:
              SUPABASE_KEY,
            Authorization:
              'Bearer '+
              (
                (
                  await sb.auth.getSession()
                ).data.session?.access_token||
                SUPABASE_KEY
              )
          },
          body:
            JSON.stringify(payload)
        }
      );

    if(response.ok){
      s.online=true;
      lastCloud=Date.now();
    }else{
      s.online=false;
    }

  }catch(e){
    console.warn(
      'Cloud sync:',
      e
    );

    s.online=false;

  }finally{
    syncing=false;
    save();
  }
}

async function loadCloud(){
  if(!sb)return;

  try{
    const user=
      await ensureAuth();

    if(!user)return;

    const response=
      await fetch(
        SUPABASE_URL+
        '/functions/v1/game-sync',
        {
          method:'POST',
          headers:{
            'Content-Type':
              'application/json',
            apikey:
              SUPABASE_KEY,
            Authorization:
              'Bearer '+
              (
                (
                  await sb.auth.getSession()
                ).data.session?.access_token||
                SUPABASE_KEY
              )
          },
          body:JSON.stringify({
            action:'load',
            user_id:user.id,
            game_version:GAME_VERSION
          })
        }
      );

    if(!response.ok)return;

    const data=
      await response.json();

    const cloudState=
      data?.state||
      data?.data?.state;

    if(!cloudState)return;

    const cloud=
      migrateState(
        Object.assign(
          fresh(),
          cloudState
        )
      );

    if(
      Number(cloud.lifetimeTotal||0)>
      Number(s.lifetimeTotal||0)
    ){
      s=cloud;
      save();
      renderAll();

      toast(
        '☁️ Sauvegarde cloud chargée'
      );
    }

    s.online=true;

  }catch(e){
    console.warn(
      'Cloud load:',
      e
    );

    s.online=false;
  }
}

/* =========================================================
   RESET
   ========================================================= */

async function resetGame(){
  if(resetting)return;

  const ok=
    confirm(
      '⚠️ Réinitialiser complètement la partie ?'
    );

  if(!ok)return;

  resetting=true;

  try{
    localStorage.clear();

    if(
      'caches' in window
    ){
      const keys=
        await caches.keys();

      await Promise.all(
        keys.map(
          k=>caches.delete(k)
        )
      );
    }

  }catch(e){}

  location.href=
    location.pathname+
    '?newgame='+
    Date.now();
}

/* =========================================================
   CLICS
   ========================================================= */

document.addEventListener(
  'click',
  e=>{
    const nav=
      e.target.closest(
        '[data-go]'
      );

    if(nav){
      e.preventDefault();

      setScreen(
        nav.dataset.go
      );

      return;
    }

    const world=
      e.target.closest(
        '[data-world]'
      );

    if(world){
      selectedWorld=
        Number(
          world.dataset.world
        );

      renderBuildings();
      renderPlanets();
      uiHeader();

      return;
    }

    const buy=
      e.target.closest(
        '[data-buy]'
      );

    if(buy){
      buyBuilding(
        selectedWorld,
        Number(
          buy.dataset.buy
        )
      );

      return;
    }

    const research=
      e.target.closest(
        '[data-research]'
      );

    if(research){
      doResearch(
        research.dataset.research
      );

      return;
    }

    const mission=
      e.target.closest(
        '[data-mission]'
      );

    if(mission){
      claimMission(
        mission.dataset.mission
      );

      return;
    }

    const weekly=
      e.target.closest(
        '[data-weekly]'
      );

    if(weekly){
      claimWeekly(
        weekly.dataset.weekly
      );

      return;
    }

    const shop=
      e.target.closest(
        '[data-shop]'
      );

    if(shop){
      buyShop(
        shop.dataset.shop
      );

      return;
    }

    if(
      e.target.closest(
        '#prestigeBtn'
      )
    ){
      doPrestige();
      return;
    }
if(
  e.target.closest(
    '#mineBtn'
  )
){
  mine();
  return;
}

    if(
      e.target.closest(
        '#resetBtn'
      )
    ){
      resetGame();
      return;
    }
  }
);

/* =========================================================
   BOUCLE PRINCIPALE
   ========================================================= */

function gameLoop(){
  const now=Date.now();

  eventLoop();
  crystalTick();

  if(now-lastUi>=250){
    lastUi=now;

    const rate=
      autoRate();

    earn(
      rate*.25
    );

    if(
      currentScreen==='mine'
    ){
      renderMine();
    }else{
      uiHeader();
    }

    if(
      currentScreen==='buildings'
    ){
      renderBuildings();
    }

    if(
      currentScreen==='missions'
    ){
      renderMissions();
    }
  }

  if(
    now-lastCloud>=30000
  ){
    lastCloud=now;
    syncCloud();
  }

  s.lastActiveAt=now;
}

async function init(){
  s=load();

  applyOffline();

  renderAll();

  await loadCloud();

  renderAll();

  eventLoop();

  setInterval(
    gameLoop,
    250
  );

  document.addEventListener(
    'visibilitychange',
    ()=>{
      if(
        !document.hidden
      ){
        const now=Date.now();

        const elapsed=
          now-
          (
            Number(s.lastActiveAt)||
            now
          );

        if(elapsed>5000){
          applyOffline();
          renderAll();
        }

        s.lastActiveAt=now;
        s.lastOfflineClaimAt=now;

        save();
      }
    }
  );

  window.addEventListener(
    'beforeunload',
    ()=>{
      s.lastActiveAt=Date.now();
      s.lastOfflineClaimAt=Date.now();
      save();
    }
  );
}

init();
```

**Important :** dans ton `index.html`, change aussi :

```html
<script src="game.js?v=13"></script>
```

en :

```html
<script src="game.js?v=14"></script>
```

Cela force Safari à récupérer le nouveau JavaScript au lieu de garder l'ancien en cache.

Si **RÉCLAMER** ou les prix Tech sont encore invisibles après ça, le prochain élément à corriger sera **`update-v12.css`**, car ton `style.css` actuel n'est normalement plus censé masquer ces textes.
