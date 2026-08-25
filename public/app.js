const fallback = [
 {id:1,title:"పాన్ ఇండియా రేంజ్‌లో భారీ సినిమా.. అఫీషియల్ అనౌన్స్‌మెంట్ విడుదల",category:"సినిమా",content:"సినిమా ఇండస్ట్రీలో మరో క్రేజీ ప్రాజెక్ట్‌పై అధికారిక ప్రకటన వచ్చింది.",image_url:"https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",breaking:1,featured:1,status:"Published",created_at:new Date().toISOString()},
 {id:2,title:"ఏపీ అసెంబ్లీ సమావేశాలు ప్రారంభం.. కీలక అంశాలపై చర్చ",category:"ఆంధ్రప్రదేశ్",content:"ముఖ్యమైన అంశాలపై సభలో చర్చ కొనసాగుతోంది.",image_url:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date().toISOString()},
 {id:3,title:"తెలంగాణలో రైతు సమస్యలపై ప్రభుత్వం కీలక నిర్ణయం",category:"తెలంగాణ",content:"రైతులకు సంబంధించిన పలు అంశాలపై ప్రభుత్వం చర్యలు చేపట్టింది.",image_url:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date().toISOString()},
 {id:4,title:"బంగారం ధరల్లో మరోసారి మార్పులు.. మార్కెట్‌లో తాజా పరిస్థితి",category:"బిజినెస్",content:"దేశీయ మార్కెట్‌లో బంగారం ధరలపై కొత్త అప్‌డేట్ వచ్చింది.",image_url:"https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date().toISOString()},
 {id:5,title:"IPL 2026: జట్టు వ్యూహాల్లో భారీ మార్పులు",category:"స్పోర్ట్స్",content:"టోర్నమెంట్‌కు ముందు జట్లు వ్యూహాలను మార్చుకుంటున్నాయి.",image_url:"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date().toISOString()},
 {id:6,title:"దేశవ్యాప్తంగా టెక్నాలజీ రంగంలో కొత్త అవకాశాలు",category:"బిజినెస్",content:"టెక్ రంగంలో కొత్త పెట్టుబడులు, అవకాశాలపై నిపుణుల అంచనాలు.",image_url:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date().toISOString()},
 {id:7,title:"హైదరాబాద్‌లో కొత్త ప్రాజెక్టులకు వేగం",category:"తెలంగాణ",content:"నగర అభివృద్ధికి సంబంధించి పలు ప్రాజెక్టులు ముందుకు సాగుతున్నాయి.",image_url:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date().toISOString()},
 {id:8,title:"కొత్త వెబ్ సిరీస్‌పై భారీ అంచనాలు",category:"సినిమా",content:"ప్రేక్షకులను ఆకట్టుకునేలా కొత్త కంటెంట్ సిద్ధమవుతోంది.",image_url:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80",status:"Published",created_at:new Date().toISOString()}
];

const videos = [
 ["అడ్వెంచర్ ట్రావెల్‌కు కొత్త డెస్టినేషన్.. వీడియో వైరల్","https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80","02:45"],
 ["హైదరాబాద్‌లో భారీ ఈవెంట్.. ప్రత్యేక దృశ్యాలు","https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80","02:53"],
 ["ఏపీ అసెంబ్లీ సమావేశాల హైలైట్స్","https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=500&q=80","01:12"],
 ["పందెం భారత్ ట్రైన్‌కు కొత్త స్టాప్‌లు","https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=500&q=80","02:29"],
 ["బంగారం ధరలు ఎందుకు పెరుగుతున్నాయి?","https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=500&q=80","01:45"]
];

function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function imageOf(n){return n.image_url || n.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=700&q=80";}
function timeText(){return "ఇప్పుడే";}

async function loadNews(){
  try{
    const r=await fetch("/api/news",{cache:"no-store"});
    if(!r.ok) throw new Error();
    const data=await r.json();
    return Array.isArray(data)&&data.length?data:fallback;
  }catch(e){return fallback;}
}

function render(news){
  const hero=news[0], side=news.slice(1,5), trend=news.slice(0,5);
  document.getElementById("heroImage").src=imageOf(hero);
  document.getElementById("heroTitle").textContent=hero.title;
  document.getElementById("heroCategory").textContent=hero.category;
  document.getElementById("heroTime").textContent=timeText();
  document.getElementById("heroExcerpt").textContent=hero.content||"తాజా వార్తల పూర్తి వివరాలు VYRO NEWSలో తెలుసుకోండి.";

  document.getElementById("ticker").textContent=(news.filter(x=>x.breaking).slice(0,4).map(x=>x.title).join("  •  ")||news.slice(0,4).map(x=>x.title).join("  •  "));

  document.getElementById("sideStories").innerHTML=side.map(x=>`
    <article class="side-story">
      <img src="${imageOf(x)}" alt="">
      <div class="copy"><span class="cat">${esc(x.category)}</span><small> • ${timeText()}</small><h3>${esc(x.title)}</h3></div>
    </article>`).join("");

  document.getElementById("trendRow").innerHTML=trend.map((x,i)=>`
    <article class="trend-card"><div><span class="num">${i+1}</span><img src="${imageOf(x)}" alt=""></div><div><h3>${esc(x.title)}</h3><small>● ${i+1} గంట క్రితం</small></div></article>`).join("");

  const groups=["ఆంధ్రప్రదేశ్","తెలంగాణ","సినిమా","స్పోర్ట్స్"];
  document.getElementById("categoryGrid").innerHTML=groups.map(g=>{
    const items=news.filter(x=>x.category===g).slice(0,4);
    const use=items.length?items:news.slice(0,4);
    return `<section class="category-box" id="${g==="ఆంధ్రప్రదేశ్"?"andhra":g==="తెలంగాణ"?"telangana":g==="సినిమా"?"cinema":"sports"}"><h3>${g}</h3>${use.map(x=>`
      <article class="cat-item"><img src="${imageOf(x)}" alt=""><div><h4>${esc(x.title)}</h4><small>● ${timeText()}</small></div></article>`).join("")}</section>`;
  }).join("");

  document.getElementById("shortTrack").innerHTML=news.slice(0,5).map(x=>`
    <article class="short-card"><img src="${imageOf(x)}" alt=""><div><h4>${esc(x.title)}</h4><small>● 60 SEC</small></div></article>`).join("");
}

function renderVideos(){
  document.getElementById("videoGrid").innerHTML=videos.map(v=>`
    <article class="video-card"><img src="${v[1]}" alt=""><span class="play">▶</span><span class="duration">${v[2]}</span><h3>${v[0]}</h3></article>`).join("");
}

(async()=>{const news=await loadNews();render(news);renderVideos();})();

const quickUpdates = [
  ["10:42 AM","తెలుగు రాష్ట్రాల్లో తాజా పరిణామాలపై కీలక ప్రకటన"],
  ["10:35 AM","సినిమా ఇండస్ట్రీలో కొత్త ప్రాజెక్ట్‌పై అధికారిక అప్‌డేట్"],
  ["10:21 AM","హైదరాబాద్‌లో అభివృద్ధి పనులకు వేగం"],
  ["10:08 AM","స్పోర్ట్స్‌లో నేటి ముఖ్యమైన వార్త ఇదే"]
];
const liveUpdates = [
  ["10:42","తాజా వార్తలకు సంబంధించిన మరిన్ని వివరాలు అందుతున్నాయి"],
  ["10:35","కీలక సమావేశం కొనసాగుతోంది.. అధికారులు ప్రకటనకు సిద్ధం"],
  ["10:21","వైరల్ అవుతున్న అంశంపై అధికారిక స్పందన"],
  ["10:08","మ్యాచ్‌కు ముందు జట్లలో కీలక మార్పులు"]
];

function renderCleanFeatures(){
  const q=document.getElementById("quickUpdates");
  const l=document.getElementById("liveUpdates");
  if(q) q.innerHTML=quickUpdates.map(x=>`<div class="quick-item"><span class="quick-time">${x[0]}</span><h4>${x[1]}</h4></div>`).join("");
  if(l) l.innerHTML=liveUpdates.map(x=>`<div class="live-item"><span class="live-dot"></span><span class="live-time">${x[0]}</span><h4>${x[1]}</h4></div>`).join("");
  const btn=document.getElementById("pollBtn"), result=document.getElementById("pollResult");
  if(btn) btn.onclick=()=>{
    const selected=document.querySelector('input[name="vyroPoll"]:checked');
    result.textContent=selected ? `మీ ఓటు నమోదు అయింది — ${selected.value}` : "ముందుగా ఒక option select చేయండి.";
  };
}
renderCleanFeatures();
