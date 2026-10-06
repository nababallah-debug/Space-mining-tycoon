const SUPABASE_URL='https://gvyeooqemajnvfbgnagv.supabase.co';
const SUPABASE_KEY='sb_publishable_moYDSTJplgl9XPCiKR96bQ_CPt3MJ7z';
const sb=window.supabase?.createClient?.(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}})||null;
const KEY='space-mining-v10';
const LEGACY_KEYS=['space-mining-v10','space-mining-v9','space-mining-v8','space-mining-v7','space-mining-v6','space-mining-v5','space-mining-v4','space-mining-v3','space-mining-v2'];

const WORLDS=[
 ['🌑','Astéroïde Nova',0,1],['🔴','Mars',1e6,1.6],['🪐','Saturne',5e7,2.4],['💠','Nébuleuse Azur',5e9,3.5],['🌌','Trou noir',1e12,5],['☀️','Étoile Helios',1e14,7.5],['🌀','Dimension X',1e16,11],['🌊','Océan de Nyx',1e18,16],['💎','Géode Prime',1e21,24],['🧊','Crypte d’Oort',1e24,36],['🧿','Singularité Oméga',1e28,55],['✨','Cœur de l’Univers',1e32,85]
];
const BUILDINGS=[
 ['Foreuse laser','🔧'],['Robot mineur','🤖'],['Raffinerie orbitale','🏭'],['Station minière','🛰️'],['Flotte de cargos','🚚'],['Extracteur gravitationnel','🧲'],['Collecteur Dyson','☀️'],['Portail quantique','🌀'],['Forge antimatière','⚛️'],['Anneau de singularité','💫'],['Usine de matière noire','🌑'],['Noyau d’assemblage','🔮']
];
const TECH=[
 ['laser','Laser industriel',5e6,'+50% puissance de clic','click',1.5],['ai','IA autonome',2.5e8,'+40% production','auto',1.4],['reactor','Réacteur quantique',2e10,'x1,6 production globale','global',1.6],['logistics','Logistique zéro-g',2e11,'-8% coûts bâtiments','discount',.92],['nano','Nanobots industriels',2e13,'+70% production','auto',1.7],['fusion','Fusion contrôlée',2e15,'x2 production globale','global',2],['drill','Forage abyssal',5e16,'+100% puissance de clic','click',2],['market','Marché galactique',2e18,'+20% revenus','income',1.2],['chrono','Chrono-core',1e20,'hors-ligne jusqu’à 24 h','offline',86400],['antimatter','Réacteur antimatière',5e22,'x2,5 production globale','global',2.5],['dyson','Réseau Dyson',2e25,'+150% production','auto',2.5],['singularity','Moteur de singularité',1e28,'x3 production globale','global',3],['economy','Économie fractale',1e31,'-15% coûts bâtiments','discount',.85],['deep','Forage dimensionnel',5e33,'x4 production globale','global',4],['quantum','Calcul quantique',1e36,'+250% production','auto',3.5],['gravity','Gant gravitationnel',5e38,'x3 clic','click',3],['entropy','Gestion de l’entropie',1e41,'+50% revenus','income',1.5],['time','Maîtrise temporelle',5e43,'hors-ligne 48 h','offline',172800],['void','Conduit du Vide',1e46,'x6 production globale','global',6],['ascension','Architecture d’ascension',5e49,'+50% bonus de prestige','prestige',1.5]
];
const MISSION_BASE=[
 ['first','Premier forage','clics',1,1e4],['collector','Petit capital','lifetime',1e6,2e5],['factory','Première usine','buildings',10,5e6],['operator','Opérateur industriel','buildings',100,2e8],['millionaire','Millionnaire','lifetime',1e9,5e8],['billionaire','Milliardaire','lifetime',1e12,2e10],['prestige1','Premier prestige','prestige',1,1e11],['researcher','Chercheur','tech',5,5e11],['veteran','Vétéran','level',25,2e12],['tycoon','Magnat galactique','lifetime',1e16,5e14],['legend','Légende','prestige',5,5e15],['empire','Empire spatial','buildings',1000,1e17]
];
const PLANET_MISSIONS=WORLDS.slice(1).map((w,i)=>['planet'+(i+1),'Maîtrise de '+w[1],'planet',i+1,Math.max(1e7,w[2]*.08)]);
const WEEKLY=[
 ['week_click','Frénésie de forage','clicks',2500,2e9],['week_build','Semaine industrielle','buildings',75,5e9],['week_earn','Mineur acharné','run',1e11,1e10],['week_buy','Investisseur','spend',1e12,5e10],['week_world','Explorateur','planet',3,2e11]
];
const TECH_BY_ID=Object.fromEntries(TECH.map(x=>[x[0],x]));

let s=load();
let currentScreen='mine';
let selectedWorld=Math.max(0,Math.min(WORLDS.length-1,Number(localStorage.getItem('sm-world')||0)));
let comboUntil=0,lastUi=0,lastCloud=0,syncing=false,toastTimer=0;

function fresh(){const buildings={};WORLDS.forEach((_,w)=>BUILDINGS.forEach((_,b)=>buildings[w+'-'+b]=0));return{money:0,runTotal:0,lifetimeTotal:0,prestige:0,prestigeShards:0,buildings,research:{},missions:{},weekly:{key:weekKey(),claimed:{},progress:{}},xp:0,level:1,nickname:'Mineur',lastActiveAt:Date.now(),lastOfflineClaimAt:Date.now(),combo:0,cLICKS:0,spent:0,offlineLast:0,online:false};}
function load(){try{let raw=null;for(const k of LEGACY_KEYS){const v=localStorage.getItem(k);if(v){raw=JSON.parse(v);break;}}const z=Object.assign(fresh(),raw||{});const oldTotal=Number(raw?.total||0);if(!raw?.lifetimeTotal){z.lifetimeTotal=oldTotal||Number(raw?.money||0);z.runTotal=z.lifetimeTotal;}if(!raw?.runTotal)z.runTotal=Math.max(z.money||0,z.runTotal||0);z.money=Math.max(0,Number(z.money)||0);z.lifetimeTotal=Math.max(z.runTotal||0,Number(z.lifetimeTotal)||0);z.buildings=Object.assign(fresh().buildings,raw?.buildings||{});z.research=raw?.research||{};z.missions=raw?.missions||{};z.weekly=raw?.weekly||fresh().weekly;z.weekly.key=weekKey();z.weekly.claimed=z.weekly.claimed||{};z.weekly.progress=z.weekly.progress||{};z.nickname=(z.nickname||'Mineur').slice(0,20);
const now=Date.now();
z.lastActiveAt=Number(raw?.lastActiveAt||raw?.last||now);
z.lastOfflineClaimAt=Number(raw?.lastOfflineClaimAt||z.lastActiveAt||now);
if(!Number.isFinite(z.lastActiveAt)||z.lastActiveAt>now+60000)z.lastActiveAt=now;
return z;}catch(e){console.warn(e);return fresh();}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
function fmt(n){if(!Number.isFinite(n))return '∞';if(Math.abs(n)<1000)return Math.floor(n).toLocaleString('fr-FR');const units=['K','M','Md','Bn','T','Qa','Qi','Sx','Sp','Oc','No','Dc','Ud','Dd','Td','Qad','Qid'];const i=Math.floor(Math.log10(Math.abs(n))/3);return (n/10**(i*3)).toFixed(i>=5?2:1)+' '+(units[i-1]||('e'+i*3));}
function weekKey(d=new Date()){const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=x.getUTCDay()||7;x.setUTCDate(x.getUTCDate()-day+1);return x.toISOString().slice(0,10);}
function ensureWeekly(){const k=weekKey();if(s.weekly.key!==k){s.weekly={key:k,claimed:{},progress:{}};save();}}
function tech(id){return !!s.research[id];}
function globalMult(){let m=1+(.18*s.prestige)*(tech('ascension')?1.5:1);for(const id of ['reactor','fusion','antimatter','singularity','deep','void'])if(tech(id))m*=TECH_BY_ID[id][5];return m;}
function autoMult(){let m=1;for(const id of ['ai','nano','dyson','quantum'])if(tech(id))m*=TECH_BY_ID[id][5];return m;}
function clickMult(){let m=1;if(tech('laser'))m*=1.5;if(tech('drill'))m*=2;if(tech('gravity'))m*=3;return m;}
function incomeMult(){let m=1;if(tech('market'))m*=1.2;if(tech('entropy'))m*=1.5;return m;}
function costMult(){let m=1;if(tech('logistics'))m*=.92;if(tech('economy'))m*=.85;return m;}
function offlineCap(){return tech('time')?172800:tech('chrono')?86400:14400;}
function prestigeMult(){return 1+(.18*s.prestige)*(tech('ascension')?1.5:1);}
function clickPower(){return prestigeMult()*globalMult()*clickMult()*(1+Math.min(.75,s.combo*.03));}
function baseProd(w,b){return (0.7+0.12*w)*Math.pow(2.8,w)*Math.pow(1.85,b);}
function buildingCost(w,b){const n=s.buildings[w+'-'+b]||0;return 500*Math.pow(28,w)*Math.pow(5.5,b)*Math.pow(1.16,n)*costMult();}
function autoRate(){let r=0;WORLDS.forEach((_,w)=>BUILDINGS.forEach((_,b)=>{r+=(s.buildings[w+'-'+b]||0)*baseProd(w,b)*WORLDS[w][3];}));return r*prestigeMult()*globalMult()*autoMult()*incomeMult();}
function levelCheck(){const nl=Math.floor(Math.sqrt(s.xp/80))+1;if(nl>s.level){s.level=nl;toast('🎉 Niveau '+nl);}}
function earn(x){if(!Number.isFinite(x)||x<=0)return;s.money+=x;s.runTotal+=x;s.lifetimeTotal+=x;s.xp+=Math.max(1,Math.floor(Math.log10(Math.max(10,x))+2));levelCheck();}
function spend(x){s.money-=x;s.spent+=x;}
function totalBuildings(){return Object.values(s.buildings).reduce((a,b)=>a+(Number(b)||0),0);}
function planetUnlocked(w){if(w===0)return true;const prev=w-1;return BUILDINGS.every((_,b)=>(s.buildings[prev+'-'+b]||0)>=1);}
function planetLevels(w){return BUILDINGS.reduce((a,_,b)=>a+(s.buildings[w+'-'+b]||0),0);}
function planetDone(w){return planetUnlocked(w)&&BUILDINGS.every((_,b)=>(s.buildings[w+'-'+b]||0)>=10);}
function goalText(){for(let i=1;i<WORLDS.length;i++)if(!planetUnlocked(i))return 'Construire au moins 1 exemplaire de chacun des '+BUILDINGS.length+' bâtiments sur '+WORLDS[i-1][1]+' pour débloquer '+WORLDS[i][1]+'.';return 'Toutes les planètes sont accessibles. Maîtrise-les avec 10 de chaque bâtiment pour préparer le prestige.';}
function missionValue(m){switch(m[2]){case'clics':return s.cLICKS;case'lifetime':return s.lifetimeTotal;case'run':return s.runTotal;case'buildings':return totalBuildings();case'prestige':return s.prestige;case'tech':return Object.keys(s.research).length;case'level':return s.level;case'planet':return m[3]<=WORLDS.length-1&&planetDone(m[3])?m[3]:0;case'spend':return s.spent;default:return 0;}}
function weeklyValue(m){ensureWeekly();switch(m[2]){case'clicks':return s.cLICKS;case'buildings':return totalBuildings();case'run':return s.runTotal;case'spend':return s.spent;case'planet':return WORLDS.slice(0,m[3]+1).filter((_,i)=>planetDone(i)).length;default:return 0;}}
function toast(t){const e=document.getElementById('toast');if(!e)return;e.textContent=t;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),1600);}
function uiHeader(){const unlocked=WORLDS.filter((_,i)=>planetUnlocked(i)).length;setText('total',fmt(s.money));setText('lifetimeTotal',fmt(s.lifetimeTotal));setText('runTotal',fmt(s.runTotal));setText('rate',fmt(autoRate())+'/s');setText('prestige','P'+s.prestige);setText('clickPower','+'+fmt(clickPower()));setText('combo',s.combo);setText('profileName',s.nickname);setText('profileLevel',s.level);setText('profileXp',fmt(s.xp));setText('profileTotal',fmt(s.lifetimeTotal));setText('profileStatus',s.online?'☁️ Classement synchronisé':'📱 Mode local');setText('onlineDot',s.online?'● CLOUD':'● LOCAL');setText('worldProgress',unlocked+'/'+WORLDS.length+' débloquées');setText('researchProgress',Object.keys(s.research).length+'/'+TECH.length);setText('missionProgress',Object.keys(s.missions).length+'/'+(MISSION_BASE.length+PLANET_MISSIONS.length));setText('planetTotal',unlocked+'/'+WORLDS.length);setText('minePlanetName',WORLDS[selectedWorld][1]);setText('currentGoal',goalText());const dot=document.getElementById('onlineDot');if(dot)dot.style.color=s.online?'var(--good)':'var(--warn)';}
function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
function setScreen(name){if(!document.getElementById('screen-'+name))name='mine';currentScreen=name;document.querySelectorAll('.screen').forEach(e=>e.classList.toggle('active',e.id==='screen-'+name));document.querySelectorAll('.bottom-nav button').forEach(e=>e.classList.toggle('active',e.dataset.go===name));if(name==='buildings')renderBuildings();if(name==='planets')renderPlanets();if(name==='research')renderResearch();if(name==='missions')renderMissions();if(name==='rank')renderRank();if(name==='profile')renderProfile();uiHeader();window.scrollTo({top:0,behavior:'auto'});}
function worldStrip(target){return WORLDS.map((w,i)=>`<button class="planet-chip ${i===selectedWorld?'active ':''}${planetUnlocked(i)?'':'locked'}" data-world="${i}"><strong>${w[0]} ${w[1]}</strong><small>${planetUnlocked(i)?'x'+w[3]:'🔒 '+fmt(w[2])}</small></button>`).join('');}
function renderBuildings(){const strip=document.getElementById('buildingWorlds');if(strip)strip.innerHTML=worldStrip();const w=WORLDS[selectedWorld];const detail=document.getElementById('buildingDetail');if(!planetUnlocked(selectedWorld)){detail.innerHTML=`<div class="planet-card locked-card"><div class="big-icon">🔒</div><h3>${w[0]} ${w[1]}</h3><p>Construis au moins 1 exemplaire de chacun des ${BUILDINGS.length} bâtiments sur ${WORLDS[selectedWorld-1]?.[1]||'la planète précédente'} pour ouvrir cette planète.</p></div>`;return;}detail.innerHTML=`<div class="building-balance"><div><small>SOLDE DISPONIBLE</small><strong>${fmt(s.money)}</strong></div><div><small>PRODUCTION</small><strong>${fmt(autoRate())}/s</strong></div></div><div class="building-list">${BUILDINGS.map((x,b)=>{const n=s.buildings[selectedWorld+'-'+b]||0,c=buildingCost(selectedWorld,b),income=baseProd(selectedWorld,b)*WORLDS[selectedWorld][3]*prestigeMult()*globalMult()*autoMult()*incomeMult();return `<article class="building"><div class="building-icon">${x[1]}</div><div class="building-info"><strong>${x[0]}</strong><small>Niv. ${n} · +${fmt(income)}/s</small><em>Prochain: ${fmt(c)}</em></div><button class="buy" data-buy="${b}" ${s.money<c?'disabled':''}>ACHETER</button></article>`;}).join('')}</div>`;}
function renderPlanets(){document.getElementById('planetStrip').innerHTML=worldStrip();const w=WORLDS[selectedWorld],ok=planetUnlocked(selectedWorld),lv=planetLevels(selectedWorld);document.getElementById('planetDetail').innerHTML=ok?`<article class="planet-card"><div class="planet-head"><div><h3>${w[0]} ${w[1]}</h3><p>Multiplicateur x${w[3]} · ${lv}/${BUILDINGS.length*10} niveaux</p></div><span class="badge">${planetDone(selectedWorld)?'COMPLÈTE':'ACTIVE'}</span></div><div class="progress"><i style="width:${Math.min(100,lv/(BUILDINGS.length*10)*100)}%"></i></div><button class="wide secondary" data-go="buildings">🏗️ Ouvrir les bâtiments</button></article>`:`<div class="planet-card locked-card"><div class="big-icon">🔒</div><h3>${w[0]} ${w[1]}</h3><p>🔒 Pour l’ouvrir : 1 de chacun des ${BUILDINGS.length} bâtiments sur ${WORLDS[selectedWorld-1]?.[1]||'la planète précédente'}.</p></div>`;}
function renderResearch(){document.getElementById('researchList').innerHTML=TECH.map((t,i)=>{const owned=tech(t[0]),prev=i?TECH[i-1][0]:null,available=!prev||tech(prev);return `<article class="research-card ${available?'':'locked-tech'}"><div><span>${owned?'✅':available?'🧪':'🔒'}</span><strong>${t[1]}</strong><small>${t[3]}</small></div><button class="buy" data-research="${t[0]}" ${owned||!available||s.money<t[2]?'disabled':''}>${owned?'ACQUISE':available?fmt(t[2]):'VERROUILLÉE'}</button></article>`;}).join('');setText('researchCount',Object.keys(s.research).length+'/'+TECH.length);}
function renderMissions(){ensureWeekly();const base=MISSION_BASE;document.getElementById('missionList').innerHTML=`<div class="mission-section"><h3>📜 Campagne</h3>${base.map(m=>missionCard(m,false)).join('')}</div><div class="mission-section"><h3>🌍 Missions planétaires</h3>${PLANET_MISSIONS.map(m=>missionCard(m,false)).join('')}</div><div class="mission-section"><h3>📅 Quêtes hebdomadaires <small>semaine du ${s.weekly.key}</small></h3>${WEEKLY.map(m=>missionCard(m,true)).join('')}</div><div id="prestigeCard"></div>`;renderPrestige();setText('missionCount',(Object.keys(s.missions).length)+' / '+(MISSION_BASE.length+PLANET_MISSIONS.length));}
function missionCard(m,weekly){const id=m[0],claimed=weekly?s.weekly.claimed[id]:s.missions[id],v=weekly?weeklyValue(m):missionValue(m),need=m[3],pct=Math.min(100,v/need*100);return `<article class="mission-card"><div class="mission-top"><strong>${claimed?'✅':'🎯'} ${m[1]}</strong><span>${fmt(m[4])}</span></div><small>${fmt(v)} / ${fmt(need)}</small><div class="bar"><i style="width:${pct}%"></i></div><button class="buy" data-${weekly?'weekly':'mission'}="${id}" ${claimed||v<need?'disabled':''}>${claimed?'RÉCLAMÉ':'RÉCLAMER'}</button></article>`;}
function prestigeRequirement(){const target=1e14*Math.pow(18,s.prestige);const worlds=WORLDS.reduce((n,_,i)=>n+(planetUnlocked(i)?1:0),0);const allTen=WORLDS.slice(0,worlds).every((_,w)=>BUILDINGS.every((_,b)=>(s.buildings[w+'-'+b]||0)>=10));return{target,worlds,allTen,ok:s.runTotal>=target&&worlds>=1&&allTen};}
function renderPrestige(){const p=prestigeRequirement(),gain=Math.max(1,Math.floor(Math.log10(Math.max(10,s.runTotal/Math.max(1,p.target))))) ;document.getElementById('prestigeCard').innerHTML=`<div class="prestige-card"><div class="mission-top"><strong>👑 Prestige ${s.prestige+1}</strong><span>+${p.gain||gain} jeton${gain>1?'s':''}</span></div><p>Recommence un run avec <strong>10 de chacun des ${BUILDINGS.length} bâtiments sur chacune des ${p.worlds} planète(s) débloquée(s)</strong> et ${fmt(p.target)} de crédits de run. Le prestige conserve tes technologies, ton niveau et tes quêtes.</p><small>${p.allTen?'✅ Tous les bâtiments requis sont au niveau 10.':'🔒 Il faut 10 de chaque bâtiment sur toutes les planètes débloquées.'}</small><small>Bonus permanent actuel : x${prestigeMult().toFixed(2)} production/clic.</small><button class="wide primary" data-prestige="1" ${p.ok?'':'disabled'}>ASCENSIONNER</button></div>`;}
async function renderRank(){const box=document.getElementById('rankList');box.innerHTML='<div class="section-note">☁️ Chargement du classement mondial…</div>';try{const session=await ensureAuth();const {data,error}=await sb.from('leaderboard').select('nickname,total,prestige,level').order('total',{ascending:false}).order('prestige',{ascending:false}).order('level',{ascending:false}).limit(100);if(error)throw error;const mine=s.nickname;document.getElementById('rankMe').textContent='☁️ Score synchronisé · '+mine+' · '+fmt(s.lifetimeTotal);box.innerHTML=data?.length?data.map((r,i)=>`<div class="rank-row"><div class="pos">${i<3?['🥇','🥈','🥉'][i]:i+1}</div><div><strong>${esc(r.nickname)}</strong><small>Niv. ${r.level} · Prestige ${r.prestige}</small></div><b>${fmt(Number(r.total))}</b></div>`).join(''):'<div class="section-note">🏆 Aucun joueur classé pour le moment.</div>';}catch(e){document.getElementById('rankMe').textContent='📱 Classement local';box.innerHTML='<div class="section-note">⚠️ Le cloud est indisponible. Active la connexion invité dans Profil pour publier ton score.</div>';}}
function renderProfile(){document.getElementById('nickname').value=s.nickname;}
function mine(){earn(clickPower());s.cLICKS++;s.combo=Math.min(12,s.combo+1);comboUntil=Date.now()+1700;setText('combo',s.combo);const bar=document.getElementById('comboBar');if(bar)bar.style.width=(s.combo/12*100)+'%';const now=performance.now();if(now-lastUi>120){uiHeader();lastUi=now;}}
function buyBuilding(b){const c=buildingCost(selectedWorld,b);if(!planetUnlocked(selectedWorld))return;if(s.money<c){toast('💸 Il manque '+fmt(c-s.money));return;}spend(c);s.buildings[selectedWorld+'-'+b]=(s.buildings[selectedWorld+'-'+b]||0)+1;s.xp+=20;save();renderBuildings();uiHeader();syncCloud();}
function doResearch(id){const t=TECH_BY_ID[id];if(!t||tech(id))return;const idx=TECH.findIndex(x=>x[0]===id);if(idx>0&&!tech(TECH[idx-1][0])){toast('🔒 Technologie précédente requise');return;}if(s.money<t[2]){toast('💸 Technologie trop chère');return;}spend(t[2]);s.research[id]=true;s.xp+=500;save();toast('🧪 '+t[1]+' activée');renderResearch();uiHeader();syncCloud(true);}
function claimMission(id){const m=MISSION_BASE.concat(PLANET_MISSIONS).find(x=>x[0]===id);if(!m||s.missions[id]||missionValue(m)<m[3])return;s.missions[id]=true;earn(m[4]);save();toast('🎯 Récompense +'+fmt(m[4]));renderMissions();uiHeader();syncCloud(true);}
function claimWeekly(id){ensureWeekly();const m=WEEKLY.find(x=>x[0]===id);if(!m||s.weekly.claimed[id]||weeklyValue(m)<m[3])return;s.weekly.claimed[id]=true;earn(m[4]);save();toast('📅 Quête hebdo +'+fmt(m[4]));renderMissions();uiHeader();syncCloud(true);}
function doPrestige(){const p=prestigeRequirement();if(!p.ok){toast('🔒 Conditions de prestige non remplies');return;}const gain=Math.max(1,Math.floor(Math.log10(Math.max(10,s.runTotal/p.target)))+1);const keep={nickname:s.nickname,prestige:s.prestige+gain,prestigeShards:s.prestigeShards+gain,research:{...s.research},missions:{...s.missions},weekly:{...s.weekly},xp:s.xp,level:s.level,cLICKS:s.cLICKS,lifetimeTotal:s.lifetimeTotal,online:s.online};s=Object.assign(fresh(),keep);save();toast('👑 Prestige réussi : +'+gain);renderAll();syncCloud(true);}
function earnOffline(){const now=Date.now();const previous=Number(s.lastActiveAt||now);const elapsed=Math.max(0,now-previous);const seconds=Math.min(elapsed/1000,offlineCap());s.lastOfflineClaimAt=now;s.lastActiveAt=now;if(seconds<10){save();return 0;}const rate=Math.max(0,Number(autoRate())||0);const bonus=Math.min(rate*seconds*0.75, rate*offlineCap()*0.75);if(Number.isFinite(bonus)&&bonus>0)earn(bonus);s.offlineLast=Number.isFinite(bonus)?bonus:0;save();return Number.isFinite(bonus)?bonus:0;}
async function ensureAuth(){if(!sb)throw new Error('SDK cloud indisponible');const {data,error}=await sb.auth.getSession();if(error)throw error;if(data.session){s.online=true;return data.session;}const r=await sb.auth.signInAnonymously();if(r.error)throw r.error;s.online=true;return r.data.session;}
async function syncCloud(force=false){if(syncing||(!force&&Date.now()-lastCloud<12000)||!sb)return;syncing=true;lastCloud=Date.now();try{await ensureAuth();const {error}=await sb.functions.invoke('game-sync',{body:{nickname:s.nickname,total:s.lifetimeTotal,prestige:s.prestige,level:s.level,xp:s.xp,state:s}});if(error)throw error;s.online=true;}catch(e){s.online=false;}finally{syncing=false;uiHeader();}}
async function loadCloud(){if(!sb)return;try{const session=await ensureAuth();const {data,error}=await sb.from('player_state').select('state').eq('user_id',session.user.id).maybeSingle();if(error)throw error;if(data?.state&&Number(data.state.lifetimeTotal||data.state.total||0)>s.lifetimeTotal){const nick=s.nickname;s=Object.assign(fresh(),data.state);s.nickname=s.nickname||nick;}s.online=true;save();uiHeader();await syncCloud(true);}catch(e){s.online=false;uiHeader();}}
async function saveProfile(){s.nickname=(document.getElementById('nickname').value.trim()||'Mineur').slice(0,20);save();await syncCloud(true);toast(s.online?'☁️ Profil publié':'📱 Profil local');renderProfile();}
async function resetGame(){
  if(!confirm('Réinitialiser toute la progression ? Cette action est irréversible.')) return;

  // 1. Bloquer toute sauvegarde pendant le reset
  syncing = true;

  // 2. Reset cloud Supabase
  if(sb){
    try{
      await ensureAuth();
      const {error} = await sb.functions.invoke('game-sync',{
        body:{action:'reset'}
      });
      if(error) console.warn('Cloud reset:',error);
    }catch(e){
      console.warn('Cloud reset indisponible:',e);
    }
  }

  // 3. Effacer TOUTES les données du jeu sur ce site
  try{
    localStorage.clear();
    sessionStorage.clear();
  }catch(e){
    console.warn('Storage reset:',e);
  }

  // 4. Effacer les caches du jeu
  try{
    if('caches' in window){
      const keys=await caches.keys();
      await Promise.all(keys.map(k=>caches.delete(k)));
    }
  }catch(e){
    console.warn('Cache reset:',e);
  }

  // 5. Recharger complètement le jeu
  location.href=location.pathname+'?newgame='+Date.now();
}
function esc(x){return String(x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}

document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='mineBtn'){e.preventDefault();mine();return;}if(b.dataset.go){e.preventDefault();setScreen(b.dataset.go);return;}if(b.dataset.world){const i=Number(b.dataset.world);if(planetUnlocked(i)){selectedWorld=i;localStorage.setItem('sm-world',String(i));if(currentScreen==='buildings')renderBuildings();else if(currentScreen==='planets')renderPlanets();}else toast('🔒 Planète verrouillée');return;}if(b.dataset.buy!==undefined){buyBuilding(Number(b.dataset.buy));return;}if(b.dataset.research){doResearch(b.dataset.research);return;}if(b.dataset.mission){claimMission(b.dataset.mission);return;}if(b.dataset.weekly){claimWeekly(b.dataset.weekly);return;}if(b.dataset.prestige){doPrestige();return;}if(b.id==='refreshRank'){renderRank();return;}if(b.id==='accountBtn'){setScreen('profile');return;}if(b.id==='saveProfile'){saveProfile();return;}if(b.id==='guestBtn'){ensureAuth().then(()=>{s.online=true;syncCloud(true);toast('☁️ Classement mondial activé');}).catch(()=>toast('⚠️ Active Anonymous Sign-Ins dans Supabase'));return;}if(b.id==='resetBtn'){resetGame();return;}if(b.id==='closeModal'){document.getElementById('modal')?.classList.add('hidden');return;}},{passive:false});

document.addEventListener('pointerup',e=>{if(e.target.closest('#mineBtn')){e.preventDefault();}} ,{passive:false});
setInterval(()=>{if(!document.hidden)s.lastActiveAt=Date.now();ensureWeekly();if(Date.now()>comboUntil&&s.combo){s.combo=0;setText('combo',0);const bar=document.getElementById('comboBar');if(bar)bar.style.width='0%';}earn(autoRate()/4);const now=performance.now();if(now-lastUi>500){uiHeader();if(currentScreen==='buildings')renderBuildings();lastUi=now;}},250);
setInterval(()=>{save();syncCloud();},5000);
window.addEventListener('pagehide',()=>{s.lastActiveAt=Date.now();save();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){s.lastActiveAt=Date.now();save();syncCloud(true);}});
const offlineBonus=earnOffline();
uiHeader();setScreen('mine');if(offlineBonus>0)setTimeout(()=>toast('🌙 Gain hors-ligne : +'+fmt(offlineBonus)),500);loadCloud();
