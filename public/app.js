const fallback = [];
let news = [];
let slideIndex = 0;
let tickerIndex = 0;
let sliderTimer;

const esc = v => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const date = n => { const d=new Date(n.created_at||''); return isNaN(d)?'తాజాగా':d.toLocaleDateString('te-IN',{day:'2-digit',month:'short'}); };
const img = n => n.image || '/images/hero-cinema.svg';
const key = n => { const c=(n.category||'').toLowerCase(); if(c.includes('సినిమ')||c.includes('movie')||c.includes('cinema'))return'cinema'; if(c.includes('క్రీడ')||c.includes('sport')||c.includes('cricket'))return'sports'; if(c.includes('తెలంగాణ')||c.includes('telangana'))return'telangana'; if(c.includes('ఆంధ్ర')||c.includes('andhra')||c.includes('ap'))return'andhra'; return'other'; };

function setBg(el,n){el.style.backgroundImage=`url("${img(n)}")`;}
function renderHero(){
  if(!news.length)return;
  const max=Math.max(1,news.length);
  const a=news[slideIndex%max], b=news[(slideIndex+1)%max], c=news[(slideIndex+2)%max], d=news[(slideIndex+3)%max];
  setBg(document.querySelector('#heroMain'),a); setBg(document.querySelector('#heroCenter'),b);
  setBg(document.querySelector('#heroSmall1'),c); setBg(document.querySelector('#heroSmall2'),d);
  heroTitle.textContent=a.title; heroDesc.textContent=a.content||''; heroMeta.textContent=`${a.category||'తాజా వార్త'} • ${date(a)}`;
  centerCat.textContent=b.category||'వార్తలు'; centerMeta.textContent=`• ${date(b)}`; centerTitle.textContent=b.title; centerDesc.textContent=b.content||'';
  small1Cat.textContent=c.category||'వార్తలు'; small1Meta.textContent=`• ${date(c)}`; small1Title.textContent=c.title;
  small2Cat.textContent=d.category||'వార్తలు'; small2Meta.textContent=`• ${date(d)}`; small2Title.textContent=d.title;
  heroDots.innerHTML=Array.from({length:Math.min(5,max)},(_,i)=>`<i class="${i===slideIndex%Math.min(5,max)?'active':''}"></i>`).join('');
}
function nextSlide(step=1){slideIndex=(slideIndex+step+news.length)%news.length;renderHero();}
function renderTicker(){
  const breaking=news.filter(n=>Number(n.breaking)===1); const list=(breaking.length?breaking:news).slice(0,8);
  tickerTrack.innerHTML=list.map(n=>`<div class="ticker-item">${esc(n.title)}</div>`).join('');
  tickerIndex=0;
}
function moveTicker(step=1){
  const count=tickerTrack.children.length||1; tickerIndex=(tickerIndex+step+count)%count;
  tickerTrack.style.transform=`translateX(-${tickerIndex*100}%)`;
}
function renderTrending(){
  trending.innerHTML=news.slice(0,5).map((n,i)=>`<article><b>${i+1}</b><img src="${img(n)}" alt=""><div><h3>${esc(n.title)}</h3><small>• ${date(n)}</small></div></article>`).join('');
}
function renderCategories(){
  const groups={andhra:[],telangana:[],cinema:[],sports:[]}; news.forEach(n=>{const k=key(n); if(groups[k])groups[k].push(n);});
  Object.entries(groups).forEach(([k,arr])=>{
    const list=arr.length?arr:news;
    document.querySelector('#'+k+'List').innerHTML=list.slice(0,5).map(n=>`<article class="list"><img src="${img(n)}" alt=""><div><h3>${esc(n.title)}</h3><small>${date(n)}</small></div></article>`).join('');
  });
}
function renderVideos(){
  videosGrid.innerHTML=news.slice(0,5).map((n,i)=>`<article><div><img src="${img(n)}" alt=""><span>▶</span></div><h3>${esc(n.title)}</h3><small>0${i+1}:2${i}</small></article>`).join('');
}
function renderFeatures(){
  const quick=["అమరావతిలో కీలక ప్రాజెక్టులపై సమీక్ష సమావేశం","తెలంగాణలో కొత్త దశలో అభివృద్ధి పనులు","సినిమా టికెట్ ధరలపై తాజా నిర్ణయం","భారత్-బంగ్లాదేశ్ మధ్య టెస్ట్ సిరీస్‌పై ఆసక్తి","హైదరాబాద్ ట్రాఫిక్ నియంత్రణకు కొత్త చర్యలు"];
  quickUpdates.innerHTML=quick.map((t,i)=>`<div class="quick-row"><span class="time">10:${42-i*7} AM</span><h4>${t}</h4></div>`).join('');
  const live=["అమరావతిలో తాజా ప్రకటన వెలువడింది","తెలంగాణలో కీలక సమావేశం కొనసాగుతోంది","చెన్నై సూపర్ కింగ్స్ మ్యాచ్‌పై తాజా సమాచారం","బాలీవుడ్ కొత్త ప్రాజెక్ట్‌పై అప్‌డేట్"];
  liveUpdates.innerHTML=live.map((t,i)=>`<div class="live-row"><span class="live-dot"></span><span class="time">10:${42-i*8}</span><h4>${t}</h4></div>`).join('');
}
function render(){ news=(news||[]).filter(n=>String(n.status||'Published').toLowerCase()==='published').sort((a,b)=>new Date(b.created_at||0)-new Date(a.created_at||0)); if(!news.length) news=fallback; renderHero(); renderTicker(); renderTrending(); renderCategories(); renderVideos(); renderFeatures(); }
async function load(){
  try{const r=await fetch('/api/news',{cache:'no-store'}); if(!r.ok)throw new Error('API'); const d=await r.json(); news=Array.isArray(d)?d:[];}
  catch(e){news=fallback;}
  render();
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#tickPrev').onclick=()=>moveTicker(-1);
  document.querySelector('#tickNext').onclick=()=>moveTicker(1);
  document.querySelector('#voteBtn').onclick=()=>{const x=document.querySelector('input[name="poll"]:checked'); voteMsg.textContent=x?`మీ ఓటు నమోదు అయింది — ${x.value}`:'ముందుగా ఒక option select చేయండి.';};
  load();
  sliderTimer=setInterval(()=>nextSlide(1),5000);
  setInterval(()=>moveTicker(1),4500);
  setInterval(load,60000);
});
