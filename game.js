const KEY="space-mining-v2";
const B=[
{id:"drill",n:"Foreuse laser",i:"⛏️",base:30,g:1.15,r:0.6,d:"Extraction automatique."},
{id:"robot",n:"Robot mineur",i:"🤖",base:180,g:1.17,r:3.5,d:"Travailleur autonome."},
{id:"refinery",n:"Raffinerie orbitale",i:"🏭",base:1100,g:1.20,r:18,d:"Valorise le minerai."},
{id:"station",n:"Station minière",i:"🛰️",base:8000,g:1.23,r:90,d:"Production industrielle."},
{id:"fleet",n:"Flotte de cargos",i:"🚀",base:70000,g:1.26,r:500,d:"Commerce interplanétaire."}];
const WORLDS=[
{id:1,n:"🌑 Astéroïde Nova",need:0,m:1},
{id:2,n:"🔴 Mars",need:250000,m:2.2},
{id:3,n:"🪐 Saturne",need:3000000,m:5},
{id:4,n:"💠 Nébuleuse Azur",need:50000000,m:12},
{id:5,n:"🌌 Trou noir",need:750000000,m:30}];
const MISS=[
{id:"m1",n:"Première fortune",i:"💰",target:1000,reward:500,t:"Gagne 1 000 $"},
{id:"m2",n:"Automatisation",i:"🤖",target:5,reward:1200,t:"Achète 5 robots"},
{id:"m3",n:"Industriel",i:"🏭",target:10,reward:5000,t:"Achète 10 bâtiments"},
{id:"m4",n:"Millionnaire",i:"💎",target:1000000,reward:25000,t:"Gagne 1 M$"},
{id:"m5",n:"Explorateur",i:"🪐",target:3,reward:50000,t:"Atteins le monde 3"}];
const RESEARCH=[
{id:"laser",n:"Laser de précision",i:"🔴",cost:3000,d:"+50% puissance manuelle"},
{id:"ai",n:"IA minière",i:"🧠",cost:20000,d:"+100% production automatique"},
{id:"quantum",n:"Réacteur quantique",i:"⚛️",cost:150000,d:"+250% revenus globaux"}];

let S={money:150,ore:0,total:0,xp:0,sector:1,world:1,prestige:0,last:Date.now(),daily:"",buildings:{},research:{},missions:{}};
B.forEach(x=>S.buildings[x.id]=0);RESEARCH.forEach(x=>S.research[x.id]=false);MISS.forEach(x=>S.missions[x.id]=false);

const $=x=>document.getElementById(x);
const fmt=n=>{if(!isFinite(n))return"0";let u=["","K","M","B","T","Qa","Qi"],k=0;while(Math.abs(n)>=1000&&k<u.length-1){n/=1000;k++}return (n>=100?n.toFixed(0):n>=10?n.toFixed(1):n.toFixed(2)).replace(/\.00$/,"")+" "+u[k]};
function load(){try{let x=JSON.parse(localStorage.getItem(KEY));if(x){S={...S,...x,buildings:{...S.buildings,...x.buildings},research:{...S.research,...x.research},missions:{...S.missions,...x.missions}}}}catch{}let off=Math.min(Math.max((Date.now()-S.last)/1000,0),12*3600),g=income()*off;S.money+=g;S.total+=g;S.ore+=g;S.last=Date.now();check()}
function save(){$("save").textContent="✓ Sauvegardé";S.last=Date.now();localStorage.setItem(KEY,JSON.stringify(S))}
function mult(){return (S.research.laser?1.5:1)*(S.research.ai?2:1)*(S.research.quantum?3.5:1)*(WORLDS[S.world-1]?.m||1)*(1+S.prestige*.15)}
function income(){return B.reduce((a,b)=>a+S.buildings[b.id]*b.r,0)*mult()}
function tapPower(){return Math.round((1+S.prestige)*((S.research.laser?1.5:1)))}
function cost(b){return b.base*Math.pow(b.g,S.buildings[b.id])}
function totalBuildings(){return Object.values(S.buildings).reduce((a,b)=>a+b,0)}
function render(){
$("money").textContent=fmt(S.money)+" $";$("income").textContent="+"+fmt(income())+" $/s";$("ore").textContent=fmt(S.ore);$("bots").textContent=S.buildings.robot;$("xp").textContent=fmt(S.xp);$("sector").textContent=S.sector;$("tap").textContent=tapPower();
renderBuild();renderMissions();renderWorlds();renderPrestige();dailyRender();
}
function renderBuild(){
$("build").innerHTML=B.map(b=>{let c=cost(b),l=S.buildings[b.id];return `<div class="item"><div class="ico">${b.i}</div><div><h3>${b.n}</h3><p>${b.d} <b>+${fmt(b.r)}/s</b></p><div class="lvl">Niveau ${l}</div></div><div class="right"><span class="price">${fmt(c)} $</span><button class="buy" data-b="${b.id}" ${S.money<c?"disabled":""}>ACHETER</button></div></div>`}).join("");
document.querySelectorAll("[data-b]").forEach(x=>x.onclick=()=>buy(x.dataset.b))
}
function renderMissions(){
const vals={m1:S.total,m2:S.buildings.robot,m3:totalBuildings(),m4:S.total,m5:S.world};
$("missions").innerHTML=MISS.map(m=>{let v=Math.min(vals[m.id],m.target),done=S.missions[m.id],p=v/m.target*100;return `<div class="mission"><div class="micon">${m.i}</div><div><h3>${m.n}</h3><p>${m.t} • récompense ${fmt(m.reward)} $</p><div class="bar"><i style="width:${p}%"></i></div></div><button class="claim" ${done||v<m.target?"disabled":""} data-m="${m.id}">${done?"✓":v>=m.target?"PRENDRE":" "+fmt(v)+"/"+fmt(m.target)}</button></div>`}).join("");
document.querySelectorAll("[data-m]").forEach(x=>x.onclick=()=>claimMission(x.dataset.m))
}
function renderWorlds(){
$("worlds").innerHTML=WORLDS.map(w=>{let ok=S.total>=w.need||w.id<=S.world;return `<div class="world ${ok?"":"locked"}"><h3>${w.n} ${w.id===S.world?"• ACTUEL":""}</h3><p>Multiplicateur de production ×${w.m}. ${w.need? "Débloqué à "+fmt(w.need)+" $ cumulés.":"Ton point de départ."}</p><button class="go" data-w="${w.id}" ${!ok?"disabled":""}>${w.id===S.world?"EXPLOITÉ":"VOYAGER"}</button></div>`}).join("");
document.querySelectorAll("[data-w]").forEach(x=>x.onclick=()=>{S.world=+x.dataset.w;save();render()})
}
function renderPrestige(){
let need=1000000*Math.pow(4,S.prestige),stars=Math.floor(S.total/need);
$("prestige").innerHTML=`<div class="prestigeBox"><div class="star">✨</div><h2>Renaissance galactique</h2><p>Réinitialise tes bâtiments et ta fortune pour obtenir un bonus permanent de <b>+15%</b> par prestige.</p><div class="bigBonus">+${S.prestige*15}% permanent</div><p>Objectif actuel : ${fmt(need)} $ cumulés</p><button id="prestigeBtn" class="wide" ${S.total<need?"disabled":""}>RENAÎTRE • +1 PRESTIGE</button></div>`
const p=$("prestigeBtn");if(p)p.onclick=()=>{if(S.total<need)return;S.prestige++;S.money=250;S.total=0;S.ore=0;S.world=1;S.buildings=Object.fromEntries(B.map(b=>[b.id,0]));save();render()}
}
function buy(id){let b=B.find(x=>x.id===id),c=cost(b);if(S.money<c)return;S.money-=c;S.buildings[id]++;S.xp+=5;save();render()}
function claimMission(id){let m=MISS.find(x=>x.id===id);if(S.missions[id])return;S.missions[id]=true;S.money+=m.reward;S.xp+=50;save();render()}
function dailyRender(){let today=new Date().toISOString().slice(0,10),ready=S.daily!==today;$("dailyText").textContent=ready?"Prêt à réclamer":"Reviens demain";$("dailyBtn").disabled=!ready}
$("dailyBtn").onclick=()=>{let today=new Date().toISOString().slice(0,10);if(S.daily===today)return;S.daily=today;let reward=Math.max(500,Math.round(S.total*.02));S.money+=reward;S.xp+=100;alert("🎁 Bonus quotidien : +"+fmt(reward)+" $");save();render()}
$("mine").onclick=()=>{let a=tapPower();S.money+=a;S.ore+=a;S.total+=a;S.xp++;let f=document.createElement("span");f.className="float";f.textContent="+"+a+" minerai";f.style.left=(38+Math.random()*24)+"%";f.style.top="47%";$("floaters").appendChild(f);setTimeout(()=>f.remove(),850);check();render()}
function check(){/* missions evaluated on render */}
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");document.querySelectorAll(".page").forEach(x=>x.classList.add("hidden"));$(t.dataset.page).classList.remove("hidden")})
$("settings").onclick=()=>$("modal").classList.remove("hidden");$("close").onclick=()=>$("modal").classList.add("hidden");
$("export").onclick=()=>{let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"}));a.download="space-tycoon-v2-save.json";a.click()}
$("import").onclick=()=>$("file").click();$("file").onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{let x=JSON.parse(r.result);if(x.money===undefined)throw 0;S={...S,...x};save();render();alert("Sauvegarde importée !")}catch{alert("Sauvegarde invalide.")}};r.readAsText(f)}
$("reset").onclick=()=>{if(confirm("Supprimer toute la progression ?")){localStorage.removeItem(KEY);location.reload()}}
let last=Date.now();function loop(){let n=Date.now(),dt=Math.min((n-last)/1000,2);last=n;let g=income()*dt;S.money+=g;S.total+=g;S.ore+=g;render();requestAnimationFrame(loop)}
document.addEventListener("visibilitychange",()=>{if(document.hidden)save();else{load();render()}});load();render();setInterval(save,5000);requestAnimationFrame(loop);
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
