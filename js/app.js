/* Bedah PC — page logic (no 3D). Every block runs only if its section exists on the page. */
const PARTS = window.PARTS, BUILDS = window.BUILDS, LAYERS = window.LAYERS;
const PHOTOS = window.PHOTOS || {};
const byId = Object.fromEntries(PARTS.map((p,i)=>[p.id,{...p,num:i+1}]));
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const EN = document.documentElement.lang==='en';
const t = (id,en) => EN?en:id;
const BASE = window.BASE||'';

if(document.getElementById('sheet')){
/* ---------- spec sheet ---------- */
const sheet = document.getElementById('sheet');
let current = 'cpu';
function renderSheet(id){
  const p = byId[id]; const ph = PHOTOS[id];
  const idx = PARTS.findIndex(x=>x.id===id);
  const prev = PARTS[(idx-1+PARTS.length)%PARTS.length], next = PARTS[(idx+1)%PARTS.length];
  sheet.innerHTML = `
    <div class="sheet-head"><div class="sheet-num">${String(p.num).padStart(2,'0')}</div><h2>${esc(p.name)}</h2><div class="alias">${esc(p.alias)}</div></div>
    ${ph ? `<figure class="photo"><span class="badge">${t("FOTO ASLI","REAL PHOTO")}</span><img src="${BASE+ph.src}" alt="${esc(ph.alt)}" loading="lazy" onerror="this.closest('figure').hidden=true"><figcaption>${esc(ph.caption)} · <a href="${ph.page}" target="_blank" rel="noopener">${esc(ph.author)}, ${esc(ph.license)}</a></figcaption></figure>`:''}
    <div class="sheet-body">
      <div class="sec"><h3>${t("Apa ini","What it is")}</h3><p>${esc(p.what)}</p><p class="analogy">${esc(p.analogy)}</p></div>
      ${p.deep?`<div class="sec"><h3>${t("Penjelasan lengkap","In depth")}</h3>${p.deep.map(x=>`<p>${esc(x)}</p>`).join("")}</div>`:""}
      <div class="where"><b>${t("Letak","Location")}</b><span>${esc(p.where)}</span></div>
      <div class="sec"><h3>${t("Cara membaca spesifikasinya","How to read the specs")}</h3><dl class="specs">${p.specs.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}</dl>${p.names?`<p style="margin-top:12px;font-size:14px">${esc(p.names)}</p>`:''}</div>
      <div class="vs">
        <div class="up"><h4>↑ ${t("Kalau lebih besar","If you go bigger")}</h4><ul>${p.more.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="no"><h4>${t("Kenapa tidak perlu yang terbesar","Why you don't need the biggest")}</h4><ul>${p.less.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
      <div class="sec"><h3>${t("Kisaran harga di Indonesia","Price range in Indonesia")}</h3><div class="tblwrap"><table class="tiers"><thead><tr><th>${t("Kelas","Tier")}</th><th>${t("Contoh","Example")}</th><th>${t("Harga","Price")}</th></tr></thead><tbody>
        ${p.tiers.map(([a,b,c])=>`<tr><td class="lvl">${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}
      </tbody></table></div></div>
      ${p.note?`<div class="note"><b>${t("Catatan 2026.","2026 note.")}</b> ${esc(p.note)}</div>`:''}
      ${(p.extra||[]).map(x=>`<div class="extra"><h4>${esc(x.h)}</h4><ul>${x.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}
      <div class="sec"><h3>Tips</h3><ul class="tips">${p.tips.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="sec"><h3>${t("Lihat barangnya","See the real thing")}</h3><div class="shop">
        <a href="https://www.tokopedia.com/search?q=${encodeURIComponent(p.q)}" target="_blank" rel="noopener">${t("Cari di Tokopedia","Search Tokopedia")} ↗</a>
        <a href="https://shopee.co.id/search?keyword=${encodeURIComponent(p.q)}" target="_blank" rel="noopener">${t("Cari di Shopee","Search Shopee")} ↗</a>
        <a href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent(p.q)}" target="_blank" rel="noopener">${t("Foto di Google","Google Images")} ↗</a>
      </div></div>
    </div>
    <div class="pager"><button class="btn" type="button" data-go="${prev.id}">← ${esc(prev.name)}</button><button class="btn primary" type="button" data-go="${next.id}">${esc(next.name)} →</button></div>`;
  sheet.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>select(b.dataset.go,true));
  if(window.__glossLink) window.__glossLink(sheet);
}
function select(id, scrollSheet){
  current = id; renderSheet(id);
  document.querySelectorAll('.lbl').forEach(l=>l.classList.toggle('on', l.dataset.id===id));
  if (window.__pc) window.__pc.focus(id);
  if (scrollSheet && innerWidth <= 960) sheet.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
  else if (scrollSheet && sheet.getBoundingClientRect().top < 0) sheet.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
}
window.__select = select; window.__getCurrent=()=>current;
{const h=location.hash.slice(1); if(byId[h]) current=h;}
renderSheet(current);

}
if(document.getElementById('buildTabs')){
/* ---------- builds ---------- */
const tabs = document.getElementById('buildTabs'), buildEl = document.getElementById('build');
function renderBuild(id){
  const b = BUILDS.find(x=>x.id===id);
  tabs.querySelectorAll('button').forEach(t=>t.setAttribute('aria-selected', t.dataset.id===id));
  buildEl.innerHTML = `<div class="build-sum"><div class="mono" style="font-size:12px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase">${t("Total perkiraan","Estimated total")}</div><div class="total">${b.total}<small>${t("tanpa monitor, keyboard, mouse, Windows","excluding monitor, keyboard, mouse, Windows")}</small></div><p>${esc(b.desc)}</p></div>
  <div class="tblwrap"><table><tbody>${b.rows.map(([pid,spec,price])=>`<tr><td>${esc(byId[pid].name)}</td><td><a data-part="${pid}">${esc(spec)}</a></td><td>${esc(price)}</td></tr>`).join('')}</tbody></table></div>`;
  buildEl.querySelectorAll('[data-part]').forEach(a=>{a.tabIndex=0;a.onclick=()=>{location.href='index.html#'+a.dataset.part};a.onkeydown=e=>{if(e.key==='Enter')a.click()}});
}
BUILDS.forEach(b=>{const t=document.createElement('button');t.type='button';t.role='tab';t.dataset.id=b.id;t.textContent=b.name;t.onclick=()=>renderBuild(b.id);tabs.appendChild(t)});
renderBuild('kantor');

}
if(document.getElementById('layers')){
/* ---------- software layers ---------- */
const layersEl = document.getElementById('layers'), ld = document.getElementById('layerDetail');
function renderLayer(id){
  const l = LAYERS.find(x=>x.id===id);
  layersEl.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed', b.dataset.id===id));
  ld.innerHTML = `<div class="eyebrow" style="margin-bottom:6px">${esc(l.short)}</div><h3>${esc(l.name)}</h3><p>${esc(l.body)}</p><p class="ex">${esc(l.ex)}</p>`;
}
LAYERS.forEach(l=>{const b=document.createElement('button');b.type='button';b.className='layer';b.dataset.id=l.id;b.innerHTML=`<b>${esc(l.name)}</b><span>${esc(l.short)}</span>`;b.onclick=()=>renderLayer(l.id);layersEl.appendChild(b)});
const hw=document.createElement('div');hw.className='layer hw';hw.innerHTML='<b>Hardware</b><span>'+t('CPU, RAM, GPU, SSD, motherboard, semua yang ada di halaman Bedah 3D','CPU, RAM, GPU, SSD, motherboard: everything on the 3D Teardown page')+'</span>';layersEl.appendChild(hw);
renderLayer('os');

}
if(document.getElementById('psuForm')){
/* ---------- PSU calculator ---------- */
{
  const $=id=>document.getElementById(id);
  const cpuS=$('pCpu'), gpuS=$('pGpu');
  window.CPUS.forEach(([n,w],i)=>cpuS.add(new Option(`${n} · ${w} W`,i)));
  window.GPUS.forEach(([n,w],i)=>gpuS.add(new Option(w?`${n} · ${w} W`:n,i)));
  cpuS.value=2; gpuS.value=4;
  const COL={cpu:'#D7262D',gpu:'#2B7BD6',mobo:'#5A6B7A',ram:'#9A7BC9',sto:'#C99A2E',cool:'#3E8FB0'};
  function calc(){
    const [cn,cw]=window.CPUS[+cpuS.value], [gn,gw,grec]=window.GPUS[+gpuS.value];
    const ram=+$('pRam').value*5, sto=(+$('pNvme').value)*7+(+$('pHdd').value)*8;
    const cool=(+$('pFan').value)*3+(+$('pAio').value)*6+(+$('pRgb').value)*15;
    const mobo=50;
    const items=[['CPU',cw,COL.cpu],['GPU',gw,COL.gpu],['Motherboard',mobo,COL.mobo],['RAM',ram,COL.ram],[t('Penyimpanan','Storage'),sto,COL.sto],[t('Kipas, pompa, RGB','Fans, pump, RGB'),cool,COL.cool]].filter(x=>x[1]>0);
    const total=items.reduce((a,x)=>a+x[1],0);
    const byLoad=Math.ceil(total/0.7/50)*50;
    const rec=Math.max(450,byLoad,grec);
    $('psuRec').innerHTML=`${rec}<small>W</small>`;
    $('psuLoad').textContent=t(`Perkiraan pemakaian maksimal ${total} W · beban PSU ±${Math.round(total/rec*100)}%`,`Estimated peak draw ${total} W · PSU load ±${Math.round(total/rec*100)}%`);
    $('wbar').innerHTML=items.map(([n,w,c])=>`<span title="${n} ${w} W" style="width:${w/total*100}%;background:${c}"></span>`).join('');
    $('wlegend').innerHTML=items.map(([n,w,c])=>`<div><i style="background:${c}"></i>${n}<b>${w} W · ${Math.round(w/total*100)}%</b></div>`).join('');
    const reason = grec && grec>=byLoad ? t(`Angka ini mengikuti saran resmi NVIDIA untuk ${gn} (${grec} W), yang sudah memperhitungkan lonjakan daya sesaat GPU.`,`This follows NVIDIA's official recommendation for the ${gn} (${grec} W), which already accounts for the GPU's brief power spikes.`) : t(`Angka ini menjaga PSU bekerja di sekitar 70% kapasitasnya saat beban penuh. Di rentang ini PSU paling efisien, sejuk, dan senyap.`,`This keeps the PSU at around 70% of its capacity under full load, where it runs most efficiently, coolest, and quietest.`);
    const ramPct = Math.round(ram/total*100);
    $('psuWhy').innerHTML=t(`<p>${reason}</p><p>RAM-mu hanya memakai ±${ram} W (${ramPct}% dari total). Menambah RAM dari 16 GB ke 64 GB hampir tidak mengubah kebutuhan PSU. Yang menentukan adalah GPU dan CPU.</p><p>Pilih PSU bersertifikat minimal 80+ Bronze untuk kantor, dan 80+ Gold untuk PC dengan kartu grafis.</p>`,`<p>${reason}</p><p>Your RAM only uses about ${ram} W (${ramPct}% of the total). Going from 16 GB to 64 GB of RAM barely changes the PSU you need. The GPU and CPU are what decide it.</p><p>Pick a PSU certified at least 80+ Bronze for office PCs, and 80+ Gold for PCs with a graphics card.</p>`);
  }
  $('psuForm').addEventListener('input',calc); calc();
}

}
if(document.getElementById('lat')){
/* ---------- latency ladder ---------- */
{
  const rows=EN?[["Register / L1",1,"1 ns","1 second"],["L2 cache",4,"4 ns","4 seconds"],["L3 cache",12,"12 ns","12 seconds"],["RAM",100,"100 ns","1.7 minutes"],["NVMe SSD",5e4,"50 µs","14 hours"],["SATA SSD",1e5,"100 µs","28 hours"],["HDD",5e6,"5 ms","58 days"]]:[["Register / L1",1,"1 ns","1 detik"],["Cache L2",4,"4 ns","4 detik"],["Cache L3",12,"12 ns","12 detik"],["RAM",100,"100 ns","1,7 menit"],["SSD NVMe",5e4,"50 µs","14 jam"],["SSD SATA",1e5,"100 µs","28 jam"],["HDD",5e6,"5 ms","58 hari"]];
  const max=Math.log10(5e6)+0.3;
  document.getElementById('lat').innerHTML=rows.map(([n,v,t,h])=>`<div class="r"><b>${n}</b><div class="bar"><span style="width:${Math.max(3,(Math.log10(v)+0.3)/max*100)}%"></span></div><em>${t} → ${h}</em></div>`).join('');
}

}
if(document.getElementById('game')){
/* ---------- GPU demo ---------- */
{
  const PRE=[
    {id:'old',name:t('GPU bawaan lama','Old integrated GPU'),sub:t('Seperti Intel HD 4000-an. Game baru hampir tidak bisa.','Like an Intel HD 4000. New games barely run.'),fps:15,scale:.35,stutter:.06,detail:0},
    {id:'entry',name:t('GPU pemula','Entry-level GPU'),sub:t('Seperti GTX 1650 atau iGPU baru di setelan tinggi.','Like a GTX 1650 or a new iGPU on high settings.'),fps:30,scale:.55,stutter:.02,detail:1},
    {id:'vram',name:t('GPU menengah, VRAM penuh','Mid-range GPU, VRAM full'),sub:t('Seperti kartu 8 GB di game 2026 setelan Ultra.','Like an 8 GB card in a 2026 game on Ultra.'),fps:55,scale:1,stutter:.035,detail:2},
    {id:'good',name:t('GPU yang pas','The right GPU'),sub:t('Seperti RTX 5060 Ti di 1080p.','Like an RTX 5060 Ti at 1080p.'),fps:60,scale:1,stutter:0,detail:2}
  ];
  let P=PRE[0];
  const pres=document.getElementById('presets');
  PRE.forEach(p=>{const b=document.createElement('button');b.type='button';b.className='preset';b.dataset.id=p.id;b.innerHTML=`<b>${p.name}</b><span>${p.sub}</span>`;b.onclick=()=>{P=p;sync()};pres.appendChild(b)});
  function sync(){pres.querySelectorAll('.preset').forEach(b=>b.setAttribute('aria-pressed',b.dataset.id===P.id))}
  sync();
  const cv=document.getElementById('game'), ctx=cv.getContext('2d');
  const off=document.createElement('canvas'), o=off.getContext('2d');
  const ftg=document.getElementById('ftg'), f=ftg.getContext('2d');
  const hud=document.getElementById('hud'), pingT=document.getElementById('pingT');
  let target=.5, hist=[], car=.5, t0=performance.now(), last=0, freezeUntil=0, times=[], lastShown=performance.now(), visible=false;
  const setT=e=>{const r=cv.getBoundingClientRect();target=Math.min(1,Math.max(0,((e.touches?e.touches[0].clientX:e.clientX)-r.left)/r.width))};
  cv.addEventListener('pointermove',setT); cv.addEventListener('touchmove',e=>{setT(e);},{passive:true});
  new IntersectionObserver(es=>{visible=es[0].isIntersecting}).observe(cv);
  function scene(g,W,H,t,detail){
    const hz=H*.42;
    // sky
    const sky=g.createLinearGradient(0,0,0,hz); sky.addColorStop(0,'#0b1a2e'); sky.addColorStop(1,'#3b5b7a'); g.fillStyle=sky; g.fillRect(0,0,W,hz);
    if(detail>1){ g.fillStyle='rgba(255,220,170,.9)'; g.beginPath(); g.arc(W*.78,hz*.45,H*.05,0,7); g.fill(); }
    // buildings (parallax)
    for(let layer=0;layer<2;layer++){
      const sp=(layer?60:25), col=layer?'#1a2735':'#2a3c4f';
      for(let i=-1;i<14;i++){
        const bw=W*(layer?.11:.08), x=((i*bw*1.15 - (t*sp)%(bw*1.15)));
        const h=hz*(.35+((i*7+layer*3)%5)*.12)*(layer?1.1:.8);
        g.fillStyle=col; g.fillRect(x,hz-h,bw,h);
        if(detail>0 && layer){ g.fillStyle='rgba(255,214,120,.75)'; for(let wy=hz-h+8;wy<hz-6;wy+=detail>1?9:16) for(let wx=x+5;wx<x+bw-6;wx+=detail>1?9:16) if(((wx|0)+(wy|0)+i)%3) g.fillRect(wx,wy,detail>1?4:6,detail>1?5:7); }
      }
    }
    // ground
    g.fillStyle='#22301f'; g.fillRect(0,hz,W,H-hz);
    // road trapezoid
    g.fillStyle='#3a3d40'; g.beginPath(); g.moveTo(W*.47,hz); g.lineTo(W*.53,hz); g.lineTo(W*1.05,H); g.lineTo(-W*.05,H); g.fill();
    // stripes moving toward viewer
    for(let k=0;k<14;k++){
      const z=((k/14)+(t*.9)%1/14*1)%1, z2=z+.025, y=hz+(H-hz)*z*z, y2=hz+(H-hz)*Math.min(1,z2*z2);
      const w=(W*.004)+(W*.02)*z;
      g.fillStyle='#e8e2c8'; g.fillRect(W/2-w/2,y,w,Math.max(1,y2-y));
      // lamp posts
      if(k%2===0){ const xl=W/2-(W*.03+W*.58*z*z), xr=W/2+(W*.03+W*.58*z*z), ph=(H*.02)+H*.28*z*z;
        g.fillStyle='#9aa3ab'; g.fillRect(xl,y-ph,Math.max(1,3*z),ph); g.fillRect(xr,y-ph,Math.max(1,3*z),ph);
        if(detail>1){ g.fillStyle='rgba(255,230,160,.35)'; g.beginPath(); g.arc(xl,y-ph,10*z+2,0,7); g.arc(xr,y-ph,10*z+2,0,7); g.fill(); } }
    }
    // car
    const cx=W*(.15+.7*car), cy=H*.86, cw=W*.12, ch=H*.09;
    g.fillStyle='#000a'; g.fillRect(cx-cw/2+4,cy+ch*.55,cw-8,ch*.25);
    g.fillStyle='#c4602a'; g.fillRect(cx-cw/2,cy,cw,ch*.6); g.fillStyle='#e58c52'; g.fillRect(cx-cw*.32,cy-ch*.35,cw*.64,ch*.4);
    g.fillStyle='#2b3b48'; g.fillRect(cx-cw*.27,cy-ch*.28,cw*.54,ch*.26);
    if(detail>0){ g.fillStyle='#ff4a3a'; g.fillRect(cx-cw/2+3,cy+ch*.12,cw*.14,ch*.14); g.fillRect(cx+cw/2-3-cw*.14,cy+ch*.12,cw*.14,ch*.14); }
    g.fillStyle='#111'; g.fillRect(cx-cw/2-2,cy+ch*.45,cw*.2,ch*.32); g.fillRect(cx+cw/2+2-cw*.2,cy+ch*.45,cw*.2,ch*.32);
  }
  function drawGraph(){
    const r=ftg.getBoundingClientRect(), W=ftg.width=Math.round(r.width*devicePixelRatio), H=ftg.height=Math.round(r.height*devicePixelRatio);
    const css=getComputedStyle(document.documentElement);
    f.clearRect(0,0,W,H); f.strokeStyle=css.getPropertyValue('--line'); f.lineWidth=1;
    const y=ms=>H-Math.min(1,ms/150)*H*0.85-4;
    [16.7,33.3,100].forEach(ms=>{f.beginPath();f.moveTo(0,y(ms));f.lineTo(W,y(ms));f.stroke();});
    f.fillStyle=css.getPropertyValue('--muted'); f.font=`${11*devicePixelRatio}px IBM Plex Mono, monospace`;
    f.fillText('16 ms = 60 FPS',6,y(16.7)-3); f.fillText(t('100 ms = tersendat','100 ms = stutter'),6,y(100)-3);
    f.strokeStyle=css.getPropertyValue('--copper'); f.lineWidth=2*devicePixelRatio; f.beginPath();
    times.forEach((ms,i)=>{const x=W-(times.length-1-i)*(W/120); i?f.lineTo(x,y(ms)):f.moveTo(x,y(ms));}); f.stroke();
  }
  function loop(now){
    requestAnimationFrame(loop);
    if(!visible) { lastShown=now; return; }
    const t=(now-t0)/1000;
    hist.push([now,target]); while(hist.length && hist[0][0]<now-400) hist.shift();
    const delay=pingT.checked?250:0;
    let goal=target; if(delay){ for(let i=hist.length-1;i>=0;i--) if(hist[i][0]<=now-delay){goal=hist[i][1];break;} if(hist[0][0]>now-delay) goal=hist[0][1]; }
    car+= (goal-car)*0.25;
    if(now<freezeUntil) return;
    if(now-last < 1000/P.fps - 1) return;
    if(P.stutter && Math.random()<P.stutter){ freezeUntil=now+120+Math.random()*180; }
    times.push(now-lastShown); if(times.length>120) times.shift(); lastShown=now; last=now;
    const W=Math.max(32,Math.round(cv.width*P.scale)), H=Math.max(18,Math.round(cv.height*P.scale));
    if(off.width!==W){off.width=W;off.height=H;}
    scene(o,W,H,t,P.detail);
    ctx.imageSmoothingEnabled=true; ctx.drawImage(off,0,0,cv.width,cv.height);
    const avg=times.slice(-30).reduce((a,b)=>a+b,0)/Math.min(30,times.length);
    hud.innerHTML=`FPS ${Math.round(1000/avg)}<br>${t('Resolusi render','Render resolution')} ${Math.round(P.scale*1920)}×${Math.round(P.scale*1080)}${pingT.checked?'<br>Ping 250 ms':''}`;
    drawGraph();
  }
  if(reduceMotion){ scene(o,off.width=960,off.height=540,0,2); ctx.drawImage(off,0,0); hud.textContent=t('Animasi dimatikan (mode kurangi gerakan)','Animation off (reduced motion)'); }
  else requestAnimationFrame(loop);
}

}
if(document.getElementById('credits')){
/* ---------- credits ---------- */
document.getElementById('credits').innerHTML = PARTS.filter(p=>PHOTOS[p.id]).map(p=>{const f=PHOTOS[p.id];return `<li>${esc(p.name)}: <a href="${f.page}" target="_blank" rel="noopener">${esc(f.title)}</a> ${t('oleh','by')} ${esc(f.author)}, ${esc(f.license)}</li>`}).join('');

}
