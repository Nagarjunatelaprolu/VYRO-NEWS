const fallback = [
  {id:1,category:"సినిమా",title:"పాన్ ఇండియా రేంజ్‌లో కొత్త సినిమా.. అఫీషియల్ అనౌన్స్‌మెంట్ విడుదల",content:"కొత్త ప్రాజెక్ట్‌పై మేకర్స్ కీలక అప్‌డేట్ ఇచ్చారు. పూర్తి వివరాలు త్వరలో వెల్లడించనున్నారు.",image_url:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",breaking:1,featured:1,status:"Published",created_at:new Date().toISOString()},
  {id:2,category:"ఆంధ్రప్రదేశ్",title:"విశాఖలో కొత్త అభివృద్ధి ప్రాజెక్టులకు వేగం",content:"ప్రాంతీయ మౌలిక వసతులపై అధికారుల సమీక్ష జరిగింది.",image_url:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date(Date.now()-600000).toISOString()},
  {id:3,category:"తెలంగాణ",title:"హైదరాబాద్‌లో కీలక ప్రాజెక్టులపై కొత్త ప్రకటన",content:"నగర అభివృద్ధికి సంబంధించిన పనులపై అధికారులు వివరాలు వెల్లడించారు.",image_url:"https://images.unsplash.com/photo-1576485375217-d6a95e34d043?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date(Date.now()-1200000).toISOString()},
  {id:4,category:"భారతదేశం",title:"దేశవ్యాప్తంగా టెక్నాలజీ రంగంలో కొత్త అవకాశాలు",content:"కొత్త పెట్టుబడులు, స్టార్టప్‌లపై నిపుణులు ఆశావహంగా ఉన్నారు.",image_url:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date(Date.now()-1800000).toISOString()},
  {id:5,category:"స్పోర్ట్స్",title:"భారత్ జట్టు తదుపరి సిరీస్‌పై ఆసక్తి పెరుగుతోంది",content:"క్రీడాభిమానులు తాజా షెడ్యూల్ కోసం ఎదురుచూస్తున్నారు.",image_url:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date(Date.now()-2400000).toISOString()},
  {id:6,category:"సినిమా",title:"కొత్త మూవీ నుంచి ఫస్ట్ లుక్ విడుదల",content:"ఫస్ట్ లుక్ సోషల్ మీడియాలో వైరల్ అవుతోంది.",image_url:"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date(Date.now()-3000000).toISOString()},
  {id:7,category:"ఆంధ్రప్రదేశ్",title:"విద్యా రంగంలో కొత్త నిర్ణయం",content:"విద్యార్థులకు ఉపయోగపడే పలు మార్పులను అధికారులు ప్రకటించారు.",image_url:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date(Date.now()-3600000).toISOString()},
  {id:8,category:"బిజినెస్",title:"మార్కెట్లలో కీలక కదలికలు.. పెట్టుబడిదారుల దృష్టి",content:"వ్యాపార రంగంలో తాజా పరిణామాలు ఆసక్తిని పెంచుతున్నాయి.",image_url:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date(Date.now()-4200000).toISOString()}
];

let news = [];
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const img = x => x.image_url || x.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80";
const time = x => new Date(x.created_at || Date.now()).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});

async function loadNews(){
  try{
    const r=await fetch("/api/news");
    const data=await r.json();
    news=Array.isArray(data)&&data.length?data:fallback;
  }catch(e){news=fallback}
  render();
}

function render(){
  const pub=news.filter(x=>x.status==="Published").sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
  if(!pub.length)return;

  const hero=pub.find(x=>x.featured)||pub[0];
  $("#heroCard").style.backgroundImage=`url("${img(hero)}")`;
  $("#heroCard").innerHTML=`<div class="hero-overlay"><span class="badge">TOP STORY</span><h1>${esc(hero.title)}</h1><p>${esc(hero.content)}</p><a class="read" href="/news.html?id=${hero.id}">READ MORE →</a></div>`;

  $("#sideNews").innerHTML=pub.slice(1,5).map(x=>`<article class="side-item" onclick="location.href='/news.html?id=${x.id}'"><img src="${img(x)}"><div><span class="tag">${esc(x.category)}</span><h3>${esc(x.title)}</h3></div></article>`).join("");

  $("#latestList").innerHTML=pub.slice(0,6).map(x=>`<a class="latest-item" href="/news.html?id=${x.id}"><time>${time(x)}</time><b>${esc(x.title)}</b><img src="${img(x)}"></a>`).join("");

  $("#ticker").textContent=pub.filter(x=>x.breaking).slice(0,5).map(x=>x.title).join("  •  ") || pub.slice(0,5).map(x=>x.title).join("  •  ");

  $("#trending").innerHTML=pub.slice(0,6).map((x,i)=>`<a class="trend" href="/news.html?id=${x.id}"><span class="trend-num">${String(i+1).padStart(2,"0")}</span><img src="${img(x)}"><b>${esc(x.title)}</b></a>`).join("");

  const cats=[["ఆంధ్రప్రదేశ్","#andhraList"],["తెలంగాణ","#telanganaList"],["భారతదేశం","#bharatList"],["సినిమా","#cinemaList"],["స్పోర్ట్స్","#sportsList"]];
  cats.forEach(([cat,sel])=>{
    const arr=pub.filter(x=>x.category===cat).slice(0,3);
    const use=arr.length?arr:pub.slice(0,3);
    $(sel).innerHTML=use.map(x=>`<a class="cat-item" href="/news.html?id=${x.id}"><img src="${img(x)}"><b>${esc(x.title)}</b></a>`).join("");
  });

  $("#videoRow").innerHTML=pub.slice(0,5).map(x=>`<a class="video" href="/news.html?id=${x.id}"><div class="play"><img src="${img(x)}"></div><b>${esc(x.title)}</b></a>`).join("");
}
loadNews();
setInterval(loadNews,60000);
