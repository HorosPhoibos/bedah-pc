/* Mode Rakit — drag (or tap) parts onto a to-scale ATX motherboard drawing.
   Scale: 1 mm = 2.295 px (ATX board 244 × 305 mm). Board origin at (20,20). */
(function(){
const NS='http://www.w3.org/2000/svg';
const EN=document.documentElement.lang==='en', L=(id,en)=>EN?en:id;
const mm=v=>20+v*2.295;            // board mm -> svg px
const S=v=>v*2.295;                // size mm -> px
const rp=n=>EN?'Rp'+(n>=1e6?(n/1e6).toLocaleString('en-US',{maximumFractionDigits:2})+'M':Math.round(n/1e3)+'K'):'Rp'+(n>=1e6?(n/1e6).toLocaleString('id-ID',{maximumFractionDigits:2})+' jt':Math.round(n/1e3)+' rb');
const svg=document.getElementById('board');
const $=id=>document.getElementById(id);

/* ---------- parts ---------- */
const PARTS={
  'cpu-amd':{kind:'cpu',name:'AMD Ryzen 5 9600X',sub:'Socket AM5 · 6 core',socket:'AM5',price:3.6e6,watt:88,igpu:true},
  'cpu-intel':{kind:'cpu',name:'Intel Core i5-14400F',sub:'Socket LGA1700 · 10 core',socket:'LGA1700',price:2.7e6,watt:148,igpu:false},
  'ram5a':{kind:'ram',name:'RAM DDR5-5600 8 GB',sub:L('DIMM DDR5 · keping 1','DIMM DDR5 · stick 1'),type:'DDR5',price:1.4e6,watt:5},
  'ram5b':{kind:'ram',name:'RAM DDR5-5600 8 GB',sub:L('DIMM DDR5 · keping 2','DIMM DDR5 · stick 2'),type:'DDR5',price:1.4e6,watt:5},
  'ram4a':{kind:'ram',name:'RAM DDR4-3200 8 GB',sub:L('DIMM DDR4 · keping 1','DIMM DDR4 · stick 1'),type:'DDR4',price:0.9e6,watt:4},
  'ram4b':{kind:'ram',name:'RAM DDR4-3200 8 GB',sub:L('DIMM DDR4 · keping 2','DIMM DDR4 · stick 2'),type:'DDR4',price:0.9e6,watt:4},
  'ssd':{kind:'ssd',name:L('SSD NVMe 1 TB','NVMe SSD 1 TB'),sub:'M.2 2280 · PCIe Gen4',price:2.9e6,watt:7},
  'cooler':{kind:'cooler',name:L('Pendingin CPU tower','Tower CPU cooler'),sub:L('Heatsink + kipas 120 mm','Heatsink + 120 mm fan'),price:0.55e6,watt:3},
  'gpu-mid':{kind:'gpu',name:'RTX 5060 Ti 16 GB',sub:L('±180 W · saran PSU 600 W','±180 W · 600 W PSU advised'),price:8.5e6,watt:180,rec:600},
  'gpu-high':{kind:'gpu',name:'RTX 5080 16 GB',sub:L('±360 W · saran PSU 850 W','±360 W · 850 W PSU advised'),price:24e6,watt:360,rec:850}
};
const BOARDS={
  amd:{name:'AMD B650 (ATX)',socket:'AM5',ram:'DDR5',price:2.6e6},
  intel:{name:'Intel B760 DDR4 (ATX)',socket:'LGA1700',ram:'DDR4',price:1.9e6}
};
const PSUS={550:{name:'550 W 80+ Bronze',price:0.75e6},750:{name:'750 W 80+ Gold',price:1.6e6},1000:{name:'1000 W 80+ Gold',price:3e6}};
const FIXED={casePrice:1e6, mobo:50, fans:12};

/* ---------- slots (board mm) ---------- */
const SLOTS=[
  {id:'socket',kind:'socket',x:88,y:43,w:50,h:54,label:'CPU socket'},
  {id:'A1',kind:'dimm',x:150,y:12,w:6,h:146,label:'DIMM A1'},
  {id:'A2',kind:'dimm',x:160,y:12,w:6,h:146,label:'DIMM A2'},
  {id:'B1',kind:'dimm',x:170,y:12,w:6,h:146,label:'DIMM B1'},
  {id:'B2',kind:'dimm',x:180,y:12,w:6,h:146,label:'DIMM B2'},
  {id:'m2',kind:'m2',x:62,y:105,w:84,h:24,label:'M.2 slot'},
  {id:'x16',kind:'pcie16',x:12,y:137,w:92,h:8,label:L('PCIe x16 (atas)','PCIe x16 (top)')},
  {id:'x1',kind:'pcie1',x:12,y:160,w:27,h:8,label:'PCIe x1'},
  {id:'x16b',kind:'pcie16b',x:12,y:198,w:92,h:8,label:L('PCIe x16 bawah (x4)','Lower PCIe x16 (x4)')}
];

/* ---------- state ---------- */
const st={board:'amd',psu:750,placed:{}};   // placed: slotId -> partId (socket holds cpu; 'cooler' key for cooler)

/* ---------- drawing helpers ---------- */
function el(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);parent&&parent.appendChild(e);return e;}
function text(t,x,y,size,fill,parent,anchor='start',weight='500'){const e=el('text',{x,y,'font-size':size,fill,'font-family':'IBM Plex Mono, monospace','text-anchor':anchor,'font-weight':weight},parent);e.textContent=t;return e;}

function drawBoard(){
  svg.innerHTML='';
  const b=BOARDS[st.board];
  const g=el('g',{},svg);
  // PCB
  el('rect',{x:20,y:20,width:S(244),height:S(305),rx:6,fill:'var(--pcbc)',stroke:'#0c1511','stroke-width':2},g);
  // traces
  const tr=el('g',{stroke:'var(--pcb-line)','stroke-width':1.2,fill:'none',opacity:.6},g);
  for(let i=0;i<26;i++){const y=mm(20+i*11);el('path',{d:`M${mm(30)} ${y} h${S(40+(i*37)%90)} l12 12 h${S(20+(i*13)%40)}`},tr);}
  // mounting holes (ATX standard positions, approx)
  [[6.35,10.16],[163.83,10.16],[6.35,165],[163.83,165],[163.83,287],[6.35,287],[237,165],[237,287],[237,10.16]].forEach(([x,y])=>{el('circle',{cx:mm(x),cy:mm(y),r:7,fill:'#c9ced2'},g);el('circle',{cx:mm(x),cy:mm(y),r:3,fill:'#2a2d31'},g);});
  // rear I/O
  el('rect',{x:mm(0)-4,y:mm(10),width:S(26),height:S(140),rx:4,fill:'#3a4047'},g);
  text('REAR I/O',mm(13),mm(80),11,'#cfd5da',g,'middle').setAttribute('transform',`rotate(-90 ${mm(13)} ${mm(80)})`);
  // VRM heatsinks
  el('rect',{x:mm(30),y:mm(25),width:S(14),height:S(90),rx:4,fill:'#4b535b'},g);
  el('rect',{x:mm(50),y:mm(18),width:S(80),height:S(12),rx:4,fill:'#4b535b'},g);
  // EPS 8-pin
  el('rect',{x:mm(22),y:mm(3),width:S(20),height:S(9),rx:2,fill:'#111'},g);
  text('CPU 8-pin',mm(44),mm(10),11,'#cfd5da',g);
  // 24-pin
  el('rect',{x:mm(226),y:mm(60),width:S(10),height:S(52),rx:2,fill:'#111'},g);
  text('ATX 24-pin',mm(223),mm(86),11,'#cfd5da',g,'middle').setAttribute('transform',`rotate(-90 ${mm(223)} ${mm(86)})`);
  // chipset + SATA + battery + front panel
  el('rect',{x:mm(150),y:mm(200),width:S(42),height:S(40),rx:6,fill:'#4b535b'},g);
  text('CHIPSET',mm(171),mm(222),11,'#e3e7ea',g,'middle');
  text(st.board==='amd'?'B650':'B760',mm(171),mm(230),10,'#cfd5da',g,'middle');
  for(let i=0;i<4;i++) el('rect',{x:mm(226),y:mm(200+i*9),width:S(12),height:S(6),rx:1.5,fill:'#111'},g);
  text('SATA',mm(220),mm(237),10,'#cfd5da',g,'end');
  el('circle',{cx:mm(120),cy:mm(185),r:S(10),fill:'#c9ced2'},g); text('CMOS',mm(120),mm(187),9,'#2a2d31',g,'middle');
  el('rect',{x:mm(200),y:mm(290),width:S(22),height:S(6),rx:1,fill:'#111'},g); text('FRONT PANEL',mm(211),mm(286),9,'#cfd5da',g,'middle');
  // socket frame
  const s=SLOTS[0];
  const sw=st.board==='amd'?40:37.5, sh=st.board==='amd'?40:45;
  const scx=s.x+s.w/2, scy=s.y+s.h/2;
  el('rect',{x:mm(scx-sw/2-5),y:mm(scy-sh/2-5),width:S(sw+10),height:S(sh+10),rx:3,fill:'#8f979e'},g);
  el('rect',{x:mm(scx-sw/2),y:mm(scy-sh/2),width:S(sw),height:S(sh),fill:'#2b2f33'},g);
  const pins=el('g',{fill:'#b88a2c',opacity:.55},g);
  for(let i=1;i<14;i++)for(let j=1;j<14;j++)el('rect',{x:mm(scx-sw/2)+i*S(sw)/14-1,y:mm(scy-sh/2)+j*S(sh)/14-1,width:2,height:2},pins);
  el('path',{d:`M${mm(scx-sw/2)+3} ${mm(scy+sh/2)-3} l14 0 l-14 -14z`,fill:'#e8c75a'},g);
  text(b.socket,mm(scx),mm(scy-sh/2-7),11,'#e3e7ea',g,'middle','600');
  // DIMM slots
  SLOTS.filter(x=>x.kind==='dimm').forEach(d=>{
    el('rect',{x:mm(d.x),y:mm(d.y),width:S(d.w),height:S(d.h),rx:2,fill:'var(--slot)'},g);
    // key position (illustrative)
    const kp=b.ram==='DDR5'?.46:.56;
    el('rect',{x:mm(d.x)-1,y:mm(d.y+d.h*kp)-3,width:S(d.w)+2,height:6,fill:'#e8c75a'},g);
    el('rect',{x:mm(d.x)-2,y:mm(d.y)-6,width:S(d.w)+4,height:8,rx:2,fill:'#c9ced2'},g);
    el('rect',{x:mm(d.x)-2,y:mm(d.y+d.h)-2,width:S(d.w)+4,height:8,rx:2,fill:'#c9ced2'},g);
    text(d.id,mm(d.x+d.w/2),mm(d.y+d.h)+20,11,'#e3e7ea',g,'middle','600');
  });
  text(b.ram,mm(168),mm(8),11,'#e8c75a',g,'middle','600');
  // M.2
  const m=SLOTS.find(x=>x.id==='m2');
  el('rect',{x:mm(m.x),y:mm(m.y+4),width:S(4),height:S(16),rx:1,fill:'#111'},g);
  el('rect',{x:mm(m.x+4),y:mm(m.y),width:S(80),height:S(24),fill:'none',stroke:'#7f8c85','stroke-dasharray':'4 4'},g);
  el('circle',{cx:mm(m.x+84),cy:mm(m.y+12),r:5,fill:'#c9ced2'},g);
  text('M.2 (2280)',mm(m.x+44),mm(m.y+14),11,'#cfd5da',g,'middle');
  // PCIe
  [['x16','#c9ced2'],['x1','var(--slot)'],['x16b','var(--slot)']].forEach(([id,c])=>{const p=SLOTS.find(x=>x.id===id);
    el('rect',{x:mm(p.x),y:mm(p.y),width:S(p.w),height:S(p.h),rx:2,fill:c},g);
    text(p.label,mm(p.x+p.w)+8,mm(p.y+p.h-1),11,'#e3e7ea',g);});
  // placed parts layer + slot hit layer
  drawPlaced(el('g',{id:'placed'},svg));
  const hits=el('g',{id:'hits'},svg);
  SLOTS.forEach(sl=>{
    const pad=sl.kind==='dimm'?3:4;
    const gg=el('g',{class:'slot','data-slot':sl.id,tabindex:0,role:'button','aria-label':sl.label},hits);
    el('rect',{class:'hit',x:mm(sl.x-pad),y:mm(sl.y-pad),width:S(sl.w+pad*2),height:S(sl.h+pad*2),rx:6},gg);
    gg.addEventListener('click',()=>slotClick(sl.id));
    gg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();slotClick(sl.id);}});
  });
}

function drawPlaced(g){
  const P=st.placed;
  const cpu=P.socket&&PARTS[P.socket];
  if(cpu){const s=SLOTS[0],cx=s.x+s.w/2,cy=s.y+s.h/2,w=cpu.socket==='AM5'?40:37.5,h=cpu.socket==='AM5'?40:45;
    const pg=el('g',{class:'placed','data-slot':'socket'},g);
    el('rect',{x:mm(cx-w/2),y:mm(cy-h/2),width:S(w),height:S(h),rx:3,fill:'#1f5a3c'},pg);
    el('rect',{x:mm(cx-w/2+3),y:mm(cy-h/2+3),width:S(w-6),height:S(h-6),rx:4,fill:'#c3c9ce',stroke:'#8b939a'},pg);
    text(cpu.socket==='AM5'?'RYZEN 5':'CORE i5',mm(cx),mm(cy),12,'#3a4047',pg,'middle','700');
    text(cpu.socket==='AM5'?'9600X':'14400F',mm(cx),mm(cy+6),11,'#3a4047',pg,'middle');
    pg.addEventListener('click',()=>remove('socket'));}
  if(P.cooler){const s=SLOTS[0],cx=s.x+s.w/2,cy=s.y+s.h/2;
    const pg=el('g',{class:'placed','data-slot':'cooler'},g);
    el('rect',{x:mm(cx-30),y:mm(cy-62),width:S(60),height:S(124),rx:6,fill:'#b9c0c6',opacity:.95},pg);
    for(let i=0;i<20;i++) el('line',{x1:mm(cx-28),x2:mm(cx+28),y1:mm(cy-60+i*6),y2:mm(cy-60+i*6),stroke:'#8b939a','stroke-width':1.5},pg);
    el('rect',{x:mm(cx+24),y:mm(cy-62),width:S(12),height:S(124),rx:4,fill:'#24282c'},pg);
    text(L('PENDINGIN','COOLER'),mm(cx),mm(cy+2),12,'#24282c',pg,'middle','700');
    pg.addEventListener('click',()=>remove('cooler'));}
  ['A1','A2','B1','B2'].forEach(id=>{const pid=P[id]; if(!pid) return; const d=SLOTS.find(s=>s.id===id),p=PARTS[pid];
    const pg=el('g',{class:'placed','data-slot':id},g);
    el('rect',{x:mm(d.x)-2,y:mm(d.y)+2,width:S(d.w)+4,height:S(d.h)-4,rx:2,fill:p.type==='DDR5'?'#2c3e57':'#3d3a2b'},pg);
    el('rect',{x:mm(d.x)-2,y:mm(d.y)+2,width:S(d.w)+4,height:6,fill:'#8fd3ff'},pg);
    const t=text(p.type,mm(d.x+d.w/2)+4,mm(d.y+d.h/2),10,'#e3e7ea',pg,'middle','600');t.setAttribute('transform',`rotate(-90 ${mm(d.x+d.w/2)} ${mm(d.y+d.h/2)})`);
    pg.addEventListener('click',()=>remove(id));});
  if(P.m2){const m=SLOTS.find(x=>x.id==='m2');const pg=el('g',{class:'placed','data-slot':'m2'},g);
    el('rect',{x:mm(m.x+4),y:mm(m.y+1),width:S(80),height:S(22),rx:2,fill:'#13301f'},pg);
    [12,34,56].forEach(o=>el('rect',{x:mm(m.x+4+o),y:mm(m.y+5),width:S(16),height:S(14),fill:'#0c0c0c'},pg));
    text('NVMe 1TB',mm(m.x+76),mm(m.y+20),10,'#cfd5da',pg,'end');
    pg.addEventListener('click',()=>remove('m2'));}
  if(P.x16){const p=PARTS[P.x16];const pg=el('g',{class:'placed','data-slot':'x16'},g);
    // GPU top view: ~2.5 slots thick (51 mm), length 245/300 mm — overhangs the board, like real cards
    const L_=p.watt>300?300:245;
    el('rect',{x:mm(8),y:mm(130),width:S(L_),height:S(51),rx:8,fill:'#24282c',stroke:'#4b535b'},pg);
    el('rect',{x:mm(8),y:mm(130),width:S(L_),height:S(5),fill:'#6d747b'},pg);
    el('rect',{x:mm(2),y:mm(128),width:S(4),height:S(56),fill:'#a9b0b6'},pg);
    text(p.name.replace(' 16 GB',''),mm(8+L_/2),mm(158),15,'#e3e7ea',pg,'middle','700');
    text(EN?`${L_} mm long · covers the slot below`:`panjang ${L_} mm · menutup slot di bawahnya`,mm(8+L_/2),mm(170),11,'#aab3bb',pg,'middle');
    pg.addEventListener('click',()=>remove('x16'));}
}

/* ---------- rules ---------- */
const DIAG_NOTCH=`<svg viewBox="0 0 420 120" role="img" aria-label="${L('Posisi lekukan DDR4 dan DDR5 berbeda','DDR4 and DDR5 notches sit in different positions')}">
<g font-family="IBM Plex Mono,monospace" font-size="11" fill="currentColor">
<text x="0" y="14">DDR5</text><rect x="44" y="4" width="360" height="34" rx="3" fill="#2c3e57"/><rect x="${44+360*.46-5}" y="28" width="10" height="12" fill="var(--surface)"/>
<text x="0" y="74">DDR4</text><rect x="44" y="64" width="360" height="34" rx="3" fill="#3d3a2b"/><rect x="${44+360*.56-5}" y="88" width="10" height="12" fill="var(--surface)"/>
<line x1="${44+360*.46}" y1="40" x2="${44+360*.46}" y2="112" stroke="#e0a800" stroke-dasharray="3 3"/><text x="${44+360*.46-4}" y="118" text-anchor="end">${L('lekukan DDR5','DDR5 notch')}</text>
<text x="${44+360*.56+4}" y="118">${L('lekukan DDR4','DDR4 notch')}</text></g></svg>`;

function check(pid,slotId){
  const p=PARTS[pid], b=BOARDS[st.board], sl=SLOTS.find(s=>s.id===slotId);
  const occupied = slotId==='socket' ? (p.kind==='cooler'?st.placed.cooler:st.placed.socket) : st.placed[slotId];
  const wrongHome={
    cpu:L('CPU dipasang di socket persegi di tengah atas motherboard, yang dikelilingi heatsink VRM.','The CPU goes in the square socket in the upper middle of the motherboard, surrounded by the VRM heatsinks.'),
    ram:L('RAM dipasang tegak di slot panjang DIMM di sebelah kanan socket CPU.','RAM stands upright in the long DIMM slots to the right of the CPU socket.'),
    ssd:L('SSD NVMe dipasang mendatar di slot M.2, lalu ujungnya dikunci dengan sekrup kecil atau latch.','An NVMe SSD lies flat in the M.2 slot, with its end held down by a small screw or latch.'),
    cooler:L('Pendingin dipasang tepat di atas CPU, di area socket.','The cooler sits directly on top of the CPU, over the socket.'),
    gpu:L('Kartu grafis dipasang di slot PCIe x16 paling atas, slot panjang yang paling dekat ke CPU.','The graphics card goes in the top PCIe x16 slot, the long slot closest to the CPU.')
  }[p.kind];
  if(p.kind==='cpu'){
    if(slotId!=='socket') return {ok:false,title:L('Bukan di sini','Not here'),msg:wrongHome};
    if(occupied) return {ok:false,title:L('Socket sudah terisi','Socket already taken'),msg:L('Satu socket hanya untuk satu CPU. Ketuk CPU yang terpasang untuk melepasnya.','One socket holds one CPU. Tap the installed CPU to remove it.')};
    if(p.socket!==b.socket) return {ok:false,title:`${p.socket} ≠ ${b.socket}`,msg:EN?`The ${p.name} uses the ${p.socket} socket, but this motherboard is ${b.socket}. The size, number of contacts (AM5 has 1,718, LGA1700 has 1,700), and the position of the locking notches all differ, so it physically won't fit. Forcing it can bend the socket pins, and that kind of damage isn't covered by warranty.`:`${p.name} memakai socket ${p.socket}, sedangkan motherboard ini ${b.socket}. Ukuran, jumlah titik kontak (AM5 punya 1.718, LGA1700 punya 1.700), dan posisi lekukan pengunci berbeda, jadi secara fisik tidak bisa dipasang. Memaksanya bisa membengkokkan pin socket, dan kerusakan seperti itu tidak ditanggung garansi.`};
    return {ok:true,title:L('CPU terpasang','CPU installed'),msg:L('Cocokkan segitiga emas di pojok CPU dengan tanda segitiga di socket, letakkan tanpa ditekan, lalu tutup tuas pengunci. Jangan pernah menyentuh pin di socket.','Line up the gold triangle on the CPU corner with the triangle mark on the socket, set it down without pressing, then close the locking lever. Never touch the socket pins.')};
  }
  if(p.kind==='cooler'){
    if(slotId!=='socket') return {ok:false,title:L('Bukan di sini','Not here'),msg:wrongHome};
    if(!st.placed.socket) return {ok:false,title:L('Pasang CPU dulu','Install the CPU first'),msg:L('Pendingin menempel di atas CPU. Tanpa CPU tidak ada yang didinginkan, dan urutan rakit yang benar adalah CPU dulu baru pendingin.','The cooler sits on top of the CPU. Without a CPU there\'s nothing to cool, and the correct build order is CPU first, then the cooler.')};
    if(occupied) return {ok:false,title:L('Sudah ada pendingin','Cooler already installed'),msg:L('Satu CPU cukup satu pendingin.','One CPU needs only one cooler.')};
    return {ok:true,title:L('Pendingin terpasang','Cooler installed'),msg:L('Pastikan ada thermal paste di antara CPU dan pendingin (sebesar butir kacang hijau sudah cukup). Kencangkan sekrupnya menyilang sedikit demi sedikit supaya tekanannya rata. Jangan lupa colok kabel kipasnya ke header CPU_FAN.','Make sure there\'s thermal paste between the CPU and cooler (a pea-sized dot is enough). Tighten the screws diagonally, a little at a time, so the pressure is even. Don\'t forget to plug the fan cable into the CPU_FAN header.')};
  }
  if(p.kind==='ram'){
    if(sl.kind!=='dimm') return {ok:false,title:L('Bukan di sini','Not here'),msg:wrongHome};
    if(occupied) return {ok:false,title:L('Slot sudah terisi','Slot already taken'),msg:L('Pilih slot DIMM lain yang masih kosong.','Choose another empty DIMM slot.')};
    if(p.type!==b.ram) return {ok:false,title:EN?`${p.type} won't fit a ${b.ram} slot`:`${p.type} tidak masuk slot ${b.ram}`,msg:EN?`DDR4 and DDR5 are the same length and both have 288 pins, but the notch in the edge connector is in a different position. A ${b.ram} slot has a key that only matches a ${b.ram} notch. That's deliberate, so the wrong RAM can't be installed, because the voltages and the way they work differ.`:`Panjang dan jumlah pin DDR4 dan DDR5 sama-sama 288, tapi lekukan (notch) di kakinya berada di posisi berbeda. Slot ${b.ram} punya tonjolan yang hanya cocok dengan lekukan ${b.ram}, sengaja dibuat begitu supaya RAM yang salah tidak bisa terpasang, karena tegangan dan cara kerjanya berbeda.`,diagram:DIAG_NOTCH};
    const after={...st.placed,[slotId]:pid}; const used=['A1','A2','B1','B2'].filter(s=>after[s]);
    let tip=L('Buka klip di ujung slot, sejajarkan lekukan, lalu tekan kedua ujungnya sampai klip menutup sendiri dan berbunyi klik.','Open the clips at the end of the slot, line up the notch, then press both ends down until the clips close by themselves with a click.');
    if(used.length===1 && slotId!=='A2') tip+=L(' Untuk satu keping, kebanyakan produsen menyarankan slot A2 (ke-2 dari CPU).',' For a single stick, most manufacturers recommend slot A2 (2nd from the CPU).');
    if(used.length===2){ tip+= (after.A2&&after.B2)?L(' Dua keping di A2 dan B2: dual channel aktif ✓',' Two sticks in A2 and B2: dual channel active ✓'):L(' Untuk dua keping, pakai A2 dan B2 (ke-2 dan ke-4 dari CPU) supaya dual channel aktif dan RAM bisa mencapai kecepatan maksimal. Cek manual motherboard karena urutannya bisa berbeda.',' For two sticks, use A2 and B2 (2nd and 4th from the CPU) so dual channel is active and the RAM reaches full speed. Check the motherboard manual, as the order can differ.'); }
    return {ok:true,title:L('RAM terpasang','RAM installed'),msg:tip};
  }
  if(p.kind==='ssd'){
    if(sl.kind!=='m2') return {ok:false,title:L('Bukan di sini','Not here'),msg:wrongHome};
    if(occupied) return {ok:false,title:L('Slot sudah terisi','Slot already taken'),msg:L('Slot M.2 ini sudah terisi.','This M.2 slot is already taken.')};
    return {ok:true,title:L('SSD terpasang','SSD installed'),msg:L('Masukkan miring sekitar 30°, tekan rata ke bawah, lalu kunci ujungnya. Kalau motherboard punya pelat pendingin M.2, lepas plastik pelindung di bawahnya. Ini sering terlupa.','Insert it at about a 30° angle, press it flat, then secure the end. If the motherboard has an M.2 heat plate, peel the protective plastic off its underside. This is often forgotten.')};
  }
  if(p.kind==='gpu'){
    if(sl.kind==='pcie1') return {ok:false,title:L('Slot ini terlalu pendek','This slot is too short'),msg:L('Ini slot PCIe x1, panjangnya hanya ±25 mm. Kaki kartu grafis (x16) panjangnya ±89 mm, jadi tidak muat. Slot x1 dipakai untuk kartu kecil seperti Wi-Fi atau capture card.','This is a PCIe x1 slot, only about 25 mm long. A graphics card\'s x16 edge connector is about 89 mm long, so it won\'t fit. x1 slots are for small cards like Wi-Fi or capture cards.')};
    if(sl.kind==='pcie16b') return {ok:false,title:L('Bisa masuk, tapi salah slot','It fits, but it\'s the wrong slot'),msg:L('Slot panjang di bawah ini biasanya hanya tersambung 4 jalur (x4) lewat chipset, walaupun bentuknya x16. Kartu grafis akan berjalan lebih lambat. Pakai slot x16 paling atas yang tersambung langsung ke CPU.','This lower long slot is usually wired with only 4 lanes (x4) through the chipset, even though it\'s x16-shaped. The graphics card would run slower. Use the top x16 slot, which connects directly to the CPU.')};
    if(sl.kind!=='pcie16') return {ok:false,title:L('Bukan di sini','Not here'),msg:wrongHome};
    if(occupied) return {ok:false,title:L('Slot sudah terisi','Slot already taken'),msg:L('Slot x16 sudah dipakai.','The x16 slot is already in use.')};
    return {ok:true,title:L('Kartu grafis terpasang','Graphics card installed'),msg:L('Lepas 2–3 penutup slot di belakang casing, buka kunci slot, tekan kartu sampai kunci berbunyi klik, lalu sekrup bracket-nya. Colok kabel daya dari PSU (PCIe 8-pin atau 12V-2x6) sampai benar-benar masuk. Kabel monitor nanti dicolok ke port di kartu ini, bukan ke port motherboard.','Remove 2–3 slot covers at the back of the case, open the slot latch, press the card in until the latch clicks, then screw in its bracket. Plug in the PSU power cable (PCIe 8-pin or 12V-2x6) all the way. The monitor cable later goes into this card\'s port, not the motherboard\'s.')};
  }
}

/* ---------- actions ---------- */
let selected=null;
function place(pid,slotId){
  const r=check(pid,slotId);
  if(r.ok){ const p=PARTS[pid]; if(p.kind==='cooler') st.placed.cooler=pid; else st.placed[slotId]=pid; selected=null; render(); }
  toast(r); return r.ok;
}
function remove(key){
  if(key==='socket' && st.placed.cooler){ toast({ok:false,title:L('Lepas pendingin dulu','Remove the cooler first'),msg:L('CPU tertutup pendingin. Lepas pendingin lebih dulu, baru CPU bisa diangkat.','The CPU is covered by the cooler. Remove the cooler first, then the CPU can be lifted out.')}); return; }
  const pid=st.placed[key]; delete st.placed[key]; render();
  toast({ok:null,title:L('Dilepas','Removed'),msg:EN?`${PARTS[pid].name} returned to the parts tray.`:`${PARTS[pid].name} dikembalikan ke meja.`});
}
function slotClick(slotId){
  if(selected){ const chip=document.querySelector(`.chip[data-id="${selected}"]`); const ok=place(selected,slotId); if(!ok && chip) shake(chip); }
  else{ const key=slotId==='socket'&&st.placed.cooler?'cooler':slotId; if(st.placed[key]) remove(key); else toast({ok:null,title:SLOTS.find(s=>s.id===slotId).label,msg:L('Pilih komponen di meja dulu, lalu ketuk slot ini. Atau seret komponen langsung ke sini.','Pick a part from the tray first, then tap this slot. Or drag a part straight here.')}); }
}
function shake(node){ node.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(-5px)'},{transform:'translateX(0)'}],{duration:350}); }

/* ---------- toast ---------- */
let tt;
function toast(r){
  const box=$('toast'); const cls=r.ok===true?'good':r.ok===false?'bad':'warn';
  box.innerHTML=`<div class="alert ${cls}"><button type="button" aria-label="${L('Tutup','Close')}">${L('Tutup','Close')}</button><b>${r.ok===false?'✕ ':''}${r.ok===true?'✓ ':''}${r.title}</b>${r.msg}${r.diagram||''}</div>`;
  box.hidden=false; box.querySelector('button').onclick=()=>box.hidden=true;
  clearTimeout(tt); tt=setTimeout(()=>box.hidden=true, r.ok===false?14000:8000);
}

/* ---------- tray & drag ---------- */
function chipIcon(p){
  const c={cpu:'<rect x="9" y="3" width="28" height="28" rx="3" fill="#1f5a3c"/><rect x="13" y="7" width="20" height="20" rx="2" fill="#c3c9ce"/>',
    ram:'<rect x="2" y="10" width="42" height="14" rx="2" fill="#2c3e57"/><rect x="2" y="10" width="42" height="3" fill="#8fd3ff"/>',
    ssd:'<rect x="3" y="11" width="40" height="12" rx="1" fill="#13301f"/><rect x="9" y="13" width="8" height="8" fill="#000"/><rect x="21" y="13" width="8" height="8" fill="#000"/>',
    cooler:'<rect x="8" y="2" width="30" height="30" rx="3" fill="#b9c0c6"/><circle cx="23" cy="17" r="11" fill="#24282c"/>',
    gpu:'<rect x="1" y="8" width="44" height="18" rx="4" fill="#24282c"/><circle cx="14" cy="17" r="6" fill="#4b535b"/><circle cx="31" cy="17" r="6" fill="#4b535b"/>'}[p.kind];
  let s=c; if(p.type==='DDR4') s=s.replace('#2c3e57','#3d3a2b');
  return `<svg viewBox="0 0 46 34" aria-hidden="true">${s}</svg>`;
}
function buildTray(){
  const tray=$('tray'); tray.innerHTML='';
  Object.entries(PARTS).forEach(([id,p])=>{
    const b=document.createElement('button'); b.type='button'; b.className='chip'; b.dataset.id=id;
    b.innerHTML=`${chipIcon(p)}<div><b>${p.name}</b><span>${p.sub} · ${rp(p.price)}</span></div>`;
    tray.appendChild(b); attachDrag(b,id);
  });
}
function markCandidates(pid){
  const p=pid&&PARTS[pid];
  svg.querySelectorAll('.slot').forEach(s=>{const sl=SLOTS.find(x=>x.id===s.dataset.slot);
    const fits=p&&({cpu:['socket'],cooler:['socket'],ram:['dimm'],ssd:['m2'],gpu:['pcie16','pcie1','pcie16b']}[p.kind]||[]).includes(sl.kind);
    s.classList.toggle('cand',!!fits);});
}
function attachDrag(chip,pid){
  let sx,sy,ghost=null,moved=false,over=null,pidDown=null;
  chip.addEventListener('pointerdown',e=>{ if(e.button!==0) return; sx=e.clientX; sy=e.clientY; moved=false; pidDown=e.pointerId; chip.setPointerCapture(e.pointerId); });
  chip.addEventListener('pointermove',e=>{
    if(pidDown!==e.pointerId) return;
    if(!moved && Math.hypot(e.clientX-sx,e.clientY-sy)>6){ moved=true; const r=chip.getBoundingClientRect(); ghost=chip.cloneNode(true); ghost.classList.add('ghost'); ghost.style.width=r.width+'px'; ghost.dataset.ox=r.left; ghost.dataset.oy=r.top; document.body.appendChild(ghost); markCandidates(pid); }
    if(moved){ const r=chip.getBoundingClientRect(); ghost.style.transform=`translate(${e.clientX-r.width/2}px,${e.clientY-24}px) scale(.9)`;
      const t=document.elementFromPoint(e.clientX,e.clientY); const s=t&&t.closest&&t.closest('.slot');
      if(over&&over!==s) over.classList.remove('over'); over=s; if(s) s.classList.add('over'); }
  });
  const end=e=>{
    if(pidDown!==e.pointerId) return; pidDown=null;
    if(!moved){ // tap = select
      selected = selected===pid?null:pid;
      document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.id===selected));
      markCandidates(selected);
      if(selected) toast({ok:null,title:PARTS[pid].name+L(' dipilih',' selected'),msg:L('Sekarang ketuk slot tujuan di motherboard. Slot yang mungkin cocok ditandai garis kuning.','Now tap the target slot on the motherboard. Slots that might fit are outlined in yellow.')});
      return; }
    markCandidates(null); if(over) over.classList.remove('over');
    const slot=over&&over.dataset.slot; over=null;
    const ok = slot && e.type==='pointerup' ? place(pid,slot) : false;
    if(!slot && e.type==='pointerup') toast({ok:false,title:L('Belum di slot','Not on a slot'),msg:L('Lepaskan komponen tepat di atas slot yang ditandai garis kuning.','Release the part right over a slot outlined in yellow.')});
    if(ok){ ghost.remove(); ghost=null; return; }
    // bounce back to origin
    const g=ghost; ghost=null; g.classList.add('back'); requestAnimationFrame(()=>{ g.style.transform=`translate(${g.dataset.ox}px,${g.dataset.oy}px) scale(1)`; g.style.opacity='.4'; });
    setTimeout(()=>{g.remove(); shake(chip);},460);
  };
  chip.addEventListener('pointerup',end); chip.addEventListener('pointercancel',end);
}

/* ---------- panel ---------- */
function render(){
  drawBoard();
  const P=st.placed, used=new Set(Object.values(P));
  document.querySelectorAll('.chip').forEach(c=>{c.classList.toggle('used',used.has(c.dataset.id)); c.setAttribute('aria-pressed',c.dataset.id===selected);});
  const parts=[...used].map(id=>PARTS[id]);
  const b=BOARDS[st.board], psu=PSUS[st.psu];
  const cost=parts.reduce((a,p)=>a+p.price,0)+b.price+psu.price+FIXED.casePrice;
  const watt=parts.reduce((a,p)=>a+p.watt,0)+FIXED.mobo+FIXED.fans;
  const gpu=P.x16&&PARTS[P.x16], cpu=P.socket&&PARTS[P.socket];
  const rec=Math.max(450,Math.ceil(watt/0.7/50)*50,gpu?gpu.rec:0);
  const rams=['A1','A2','B1','B2'].filter(s=>P[s]);
  $('sCost').textContent=rp(cost); $('sWatt').textContent=watt+' W'; $('sRec').textContent=rec+' W';
  $('sTier').textContent=!cpu?'–':gpu?(gpu.watt>300?L('Gaming 4K / kerja berat','4K gaming / heavy work'):'Gaming 1080p–1440p'):(cpu.igpu?L('Kantor (grafis bawaan)','Office (integrated graphics)'):L('Belum bisa tampil','No display yet'));
  // steps
  const steps=[[!!cpu,L('CPU ke socket','CPU into the socket')],[!!P.cooler,L('Pendingin di atas CPU','Cooler on top of the CPU')],[rams.length>=2,L('2 keping RAM (A2 + B2)','2 RAM sticks (A2 + B2)')],[!!P.m2,L('SSD ke slot M.2','SSD into the M.2 slot')],[!!gpu||(cpu&&cpu.igpu),L('Kartu grafis ke PCIe x16 (wajib kalau CPU tanpa grafis)','Graphics card into PCIe x16 (required if the CPU has no graphics)')]];
  $('steps').innerHTML=steps.map(([d,t],i)=>`<li class="${d?'done':''}"><i>${d?'✓':i+1}</i><span>${t}</span></li>`).join('');
  // alerts
  const A=[];
  if(watt>st.psu*0.9) A.push(['bad',L('PSU kekurangan daya','PSU is underpowered'),EN?`The components can draw about ${watt} W, ${watt>st.psu?'more than':'nearly all of'} the PSU's ${st.psu} W capacity. Modern graphics cards also spike briefly above their rated figure. Under heavy load, the PSU's protection will cut power and the PC will shut off suddenly. A cheap PSU without protection can even fail and take other components with it.`:`Komponen bisa menarik ±${watt} W, ${watt>st.psu?'melebihi':'hampir menghabiskan'} kapasitas PSU ${st.psu} W. Kartu grafis modern juga melonjak sesaat di atas angka resminya. Saat beban berat, proteksi PSU akan memutus listrik dan PC mati mendadak. PSU murah tanpa proteksi bahkan bisa rusak dan ikut merusak komponen lain.`]);
  else if(rec>st.psu) A.push(['warn',L('PSU pas-pasan','PSU is cutting it close'),EN?`The PC will turn on, but the PSU runs too close to its limit${gpu&&gpu.rec>st.psu?`, and NVIDIA recommends at least ${gpu.rec} W for the ${gpu.name}`:''}. The risks: restarts during power spikes, a noisy PSU fan, and a shorter PSU life. Recommended: ${rec} W.`:`PC akan menyala, tapi PSU bekerja terlalu dekat dengan batasnya${gpu&&gpu.rec>st.psu?`, dan NVIDIA menyarankan minimal ${gpu.rec} W untuk ${gpu.name}`:''}. Risikonya PC restart saat lonjakan daya, kipas PSU berisik, dan umur PSU lebih pendek. Saran: ${rec} W.`]);
  else if(cpu) A.push(['good',L('Daya aman','Power is fine'),EN?`Peak draw about ${watt} W on a ${st.psu} W PSU (±${Math.round(watt/st.psu*100)}%). The PSU runs in its efficient range and stays cool.`:`Pemakaian maksimal ±${watt} W dari PSU ${st.psu} W (±${Math.round(watt/st.psu*100)}%). PSU bekerja di rentang efisien dan tidak kepanasan.`]);
  if(cpu&&!cpu.igpu&&!gpu) A.push(['bad',L('Tidak akan ada gambar di monitor','There will be no picture on the monitor'),EN?`The ${cpu.name} is an "F" model, with no integrated graphics. The motherboard's HDMI port won't work, so a graphics card is required.`:`${cpu.name} adalah versi "F", yaitu tanpa grafis bawaan. Port HDMI di motherboard tidak akan berfungsi, jadi kartu grafis wajib dipasang.`]);
  if(rams.length===1) A.push(['warn',L('Baru 1 keping RAM','Only 1 RAM stick'),L('PC bisa menyala, tapi hanya single channel. Kecepatan memori jadi setengahnya, dan ini terasa di game dan grafis bawaan.','The PC will start, but only in single channel. Memory bandwidth is halved, which you\'ll notice in games and with integrated graphics.')]);
  if(rams.length===2&&!(P.A2&&P.B2)) A.push(['warn',L('Posisi RAM kurang tepat','RAM is in the wrong slots'),L('Dua keping RAM sebaiknya di A2 dan B2. Kalau di A1 + A2, keduanya bisa berada di channel yang sama, sehingga dual channel tidak aktif.','Two sticks should go in A2 and B2. In A1 + A2 they can end up on the same channel, so dual channel won\'t be active.')]);
  if(cpu&&!P.cooler) A.push(['warn',L('CPU belum ada pendingin','CPU has no cooler yet'),L('Tanpa pendingin, CPU akan mencapai batas suhu dalam hitungan detik, lalu melambat atau PC mati untuk melindungi diri.','Without a cooler, the CPU hits its temperature limit within seconds, then slows down or the PC shuts off to protect itself.')]);
  if(gpu&&cpu&&gpu.watt>300&&cpu.socket==='LGA1700') A.push(['warn',L('Kemungkinan bottleneck','Possible bottleneck'),L('RTX 5080 sangat kencang. Di resolusi 1080p, CPU kelas menengah bisa menjadi penahan sehingga GPU tidak bekerja penuh. Untuk 1440p dan 4K, ini jauh lebih kecil pengaruhnya.','The RTX 5080 is very fast. At 1080p, a mid-range CPU can hold it back so the GPU isn\'t fully used. At 1440p and 4K the effect is much smaller.')]);
  const done=cpu&&P.cooler&&rams.length>=2&&P.m2&&(gpu||cpu.igpu)&&watt<=st.psu*0.9;
  if(done) A.push([rec>st.psu?'warn':'good',rec>st.psu?L('Terpasang lengkap, tapi PSU sebaiknya dinaikkan','Fully assembled, but the PSU should be upgraded'):L('Siap dinyalakan 🎉','Ready to power on 🎉'),L('Semua komponen utama terpasang dan cocok. Di dunia nyata, langkah berikutnya: masuk ke casing, colok semua kabel daya, nyalakan, masuk BIOS untuk mengecek semua komponen terdeteksi, lalu aktifkan profil RAM (EXPO/XMP).','All the main components are installed and compatible. In the real world, the next steps are: put it in the case, connect all power cables, power on, enter the BIOS to check every component is detected, then enable the RAM profile (EXPO/XMP).')]);
  $('alerts').innerHTML=A.map(([c,t,m])=>`<div class="alert ${c}"><b>${t}</b>${m}</div>`).join('');
}

/* ---------- init ---------- */
const bs=$('boardSel'), ps=$('psuSel');
Object.entries(BOARDS).forEach(([k,v])=>bs.add(new Option(`${v.name} · ${v.socket} · ${v.ram} · ${rp(v.price)}`,k)));
Object.entries(PSUS).forEach(([k,v])=>ps.add(new Option(`${v.name} · ${rp(v.price)}`,k)));
bs.value=st.board; ps.value=st.psu;
bs.onchange=()=>{ st.board=bs.value; const removed=[]; const b=BOARDS[st.board];
  Object.entries(st.placed).forEach(([k,pid])=>{const p=PARTS[pid]; if((p.kind==='cpu'&&p.socket!==b.socket)||(p.kind==='ram'&&p.type!==b.ram)){delete st.placed[k];removed.push(p.name);} });
  if(removed.length && !st.placed.socket) delete st.placed.cooler;
  render(); if(removed.length) toast({ok:null,title:L('Motherboard diganti','Motherboard changed'),msg:EN?`Parts that don't fit the ${b.name} went back to the tray: ${[...new Set(removed)].join(', ')}.`:`Komponen yang tidak cocok dengan ${b.name} dikembalikan ke meja: ${[...new Set(removed)].join(', ')}.`}); };
ps.onchange=()=>{st.psu=+ps.value;render();};
$('resetRig').onclick=()=>{st.placed={};selected=null;render();toast({ok:null,title:L('Dikosongkan','Cleared'),msg:L('Semua komponen kembali ke meja.','All parts are back on the tray.')});};
document.querySelectorAll('[data-try]').forEach(btn=>btn.onclick=()=>{
  const t=btn.dataset.try;
  if(t==='ddr4'){ st.board='amd'; bs.value='amd'; render(); place('ram4a','A2'); }
  if(t==='socket'){ st.board='amd'; bs.value='amd'; render(); place('cpu-intel','socket'); }
  if(t==='x1'){ place('gpu-mid','x1'); }
  if(t==='cooler'){ st.placed={}; selected=null; render(); place('cooler','socket'); }
  if(t==='psu'){ st.board='amd'; bs.value='amd'; st.psu=550; ps.value=550; st.placed={socket:'cpu-amd',cooler:'cooler',A2:'ram5a',B2:'ram5b',m2:'ssd',x16:'gpu-high'}; render(); document.getElementById('alerts').scrollIntoView({behavior:'smooth',block:'center'}); }
});
buildTray(); render();
})();
