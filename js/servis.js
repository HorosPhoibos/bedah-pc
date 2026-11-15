/* Mode Servis — diagnose common PC faults the way a technician does. */
(function(){
const NS='http://www.w3.org/2000/svg', $=id=>document.getElementById(id);
const svg=$('rig'); const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- scenarios ---------- */
const SC={
  cable:{name:'Layar hitam "No Signal"',sub:'Kipas berputar, ada satu bip normal, tapi monitor bilang tidak ada sinyal',
    stopAt:null, beep:null, screen:'nosignal', fixHot:'cable', fixAct:'move',
    lesson:'Ini kasus nomor satu di toko komputer. PC sebenarnya menyala normal, tapi kabel monitor dicolok ke port HDMI di motherboard, padahal CPU-nya Core i5-14400F (versi "F", tanpa grafis bawaan). Port di motherboard hanya berfungsi kalau CPU punya grafis bawaan. Kalau ada kartu grafis, kabel monitor selalu dicolok ke port di kartu grafis, yang posisinya lebih rendah di panel belakang dan berjajar mendatar.'},
  ram:{name:'Lampu DRAM menyala',sub:'Kipas berputar, lampu debug berhenti di DRAM, ada bunyi bip berulang',
    stopAt:'DRAM', beep:'ram', screen:'nosignal', fixHot:'ram', fixAct:['reseat','clean'],
    lesson:'RAM yang kurang masuk atau pinnya teroksidasi adalah penyebab "PC nyala tapi tidak tampil" yang sangat sering, terutama setelah PC dipindahkan atau lama tidak dipakai. Lampu debug DRAM (atau bunyi bip) menunjukkan motherboard gagal membaca memori. Solusinya: lepas RAM, gosok pin emasnya pelan dengan penghapus pensil, bersihkan sisa penghapus, lalu pasang lagi sampai klip berbunyi klik. Catatan penting: PC DDR5 yang baru dirakit atau baru ganti RAM bisa layar hitam 1–3 menit saat pertama kali menyala karena "memory training". Itu normal, jadi tunggu dulu sebelum panik.'},
  eps:{name:'Lampu CPU menyala',sub:'Kipas berputar, lampu debug berhenti di CPU, tidak tampil',
    stopAt:'CPU', beep:null, screen:'nosignal', fixHot:'eps', fixAct:'plug',
    lesson:'Kabel daya CPU 8-pin (EPS) di pojok kiri atas motherboard sering terlupa karena letaknya tersembunyi di balik pendingin dan sulit dijangkau setelah motherboard masuk casing. Tanpa kabel ini kipas tetap berputar karena dapat listrik dari kabel 24-pin, tapi CPU tidak menyala. Lampu debug CPU adalah petunjuknya. Penyebab lain lampu CPU: CPU belum didukung BIOS (perlu update BIOS) atau pin socket bengkok.'},
  psu:{name:'Mati sendiri saat main game',sub:'Menyala normal, tapi mati total saat beban berat',
    stopAt:null, beep:null, screen:'desktop', load:'shutdown', fixHot:'psu', fixAct:'replace',
    lesson:'PC yang menyala normal tapi mati total saat game atau render hampir selalu masalah daya. Di kasus ini PSU-nya 450 W tanpa merek dan tanpa sertifikat, sedangkan RTX 5060 Ti ditambah CPU bisa menarik hampir 400 W saat beban penuh, dengan lonjakan sesaat di atasnya. PSU murah sering tidak sanggup memberi daya sesuai angka di labelnya. Proteksinya memutus listrik, atau lebih buruk lagi tidak memutus sama sekali. Solusi: PSU bermerek 650–750 W bersertifikat 80+ Gold.'},
  heat:{name:'Lambat dan berisik',sub:'Makin lama makin lambat, kipas menderu, suhu CPU 99 °C',
    stopAt:null, beep:null, screen:'desktop', load:'throttle', fixHot:'cooler', fixAct:'clean',
    lesson:'Debu yang menutup sirip pendingin dan thermal paste yang mengering (biasanya setelah 3–5 tahun) membuat CPU cepat menyentuh batas suhu sekitar 95–100 °C. CPU lalu menurunkan kecepatannya sendiri (thermal throttling) untuk melindungi diri, sehingga PC terasa lambat dan kipas berteriak. Ini sangat umum di PC sewaan kantor yang tidak pernah dibersihkan. Solusinya: semprot debu dengan blower atau compressed air, bersihkan pasta lama dengan alkohol isopropil, oles pasta baru. Jadwalkan pembersihan tiap 6 bulan.'},
  boot:{name:'"Reboot and Select proper Boot device"',sub:'Logo motherboard muncul, lalu tulisan putih di layar hitam',
    stopAt:'BOOT', beep:null, screen:'bootfail', fixHot:'ssd', fixAct:['reseat','order'],
    lesson:'Pesan ini berarti hardware utama sehat (CPU, RAM, dan GPU lolos pemeriksaan), tapi komputer tidak menemukan sistem operasi untuk dijalankan. Penyebab tersering: SSD M.2 tidak terpasang rapat atau sekrupnya lepas, urutan boot di BIOS salah (misalnya flashdisk dipilih lebih dulu), atau SSD rusak. Cara cek: masuk BIOS (tekan Del atau F2), lihat apakah SSD terdeteksi. Kalau tidak terdeteksi, pasang ulang. Kalau tetap tidak ada, SSD kemungkinan rusak.'}
};

/* ---------- hotspots & actions ---------- */
const HOT={
  ram:{label:'RAM',acts:[['reseat','Lepas & pasang ulang sampai klik'],['clean','Bersihkan pin emas dengan penghapus']]},
  gpu:{label:'Kartu grafis',acts:[['reseat','Pasang ulang kartu grafis'],['power','Cek kabel daya GPU']]},
  cable:{label:'Kabel monitor',acts:[['look','Lihat kabel di panel belakang'],['move','Pindahkan kabel ke port kartu grafis']]},
  eps:{label:'Kabel CPU 8-pin',acts:[['look','Periksa konektor CPU 8-pin'],['plug','Colok kabel CPU 8-pin sampai klik']]},
  ssd:{label:'SSD M.2',acts:[['reseat','Pasang ulang SSD & kencangkan sekrup'],['order','Atur urutan boot di BIOS']]},
  psu:{label:'Power supply',acts:[['look','Baca label PSU'],['replace','Ganti PSU 750 W 80+ Gold']]},
  cooler:{label:'Pendingin CPU',acts:[['look','Cek suhu & sirip pendingin'],['clean','Bersihkan debu + ganti thermal paste']]}
};
const FIND={ // what a technician sees when inspecting, per scenario
  cable:{cable:'Kabel HDMI tercolok di port HDMI motherboard, bagian atas panel belakang. Sementara itu ada kartu grafis terpasang, dan CPU-nya Core i5-14400F.',gpu:'Kartu grafis terpasang rapat, kipasnya berputar.'},
  ram:{ram:'Klip di salah satu ujung slot RAM tidak menutup penuh. RAM terlihat sedikit miring.'},
  eps:{eps:'Konektor CPU 8-pin di pojok kiri atas motherboard kosong. Kabelnya masih terikat di belakang casing.'},
  psu:{psu:'Label PSU: "450 W", tanpa merek, tanpa sertifikat 80+. Kabelnya tipis.',gpu:'Kabel daya GPU tercolok dengan benar.'},
  heat:{cooler:'Sirip pendingin tertutup lapisan debu tebal. Suhu CPU 99 °C saat beban dan kecepatan CPU turun dari 4,7 GHz ke 2,1 GHz.'},
  boot:{ssd:'SSD M.2 tidak masuk penuh di slotnya, sekrup penguncinya tidak ada. Di BIOS, daftar boot device kosong.'}
};


/* ---------- English text ---------- */
const EN=document.documentElement.lang==='en', L=(id,en)=>EN?en:id;
if(EN){
  Object.assign(SC.cable,{name:'Black screen, "No Signal"',sub:'Fans spin, one normal beep, but the monitor says there is no signal',
    lesson:'This is the number one case at any computer shop. The PC is actually running fine, but the monitor cable is plugged into the motherboard\'s HDMI port while the CPU is a Core i5-14400F (an "F" model, with no integrated graphics). Motherboard video ports only work if the CPU has integrated graphics. If there is a graphics card, the monitor cable always goes into the graphics card\'s ports, which sit lower on the rear panel in a horizontal row.'});
  Object.assign(SC.ram,{name:'DRAM light stays on',sub:'Fans spin, the debug light stops at DRAM, repeated beeping',
    lesson:'RAM that isn\'t fully seated, or has oxidised contacts, is a very common cause of "the PC turns on but shows nothing", especially after a PC has been moved or left unused for a while. The DRAM debug light (or the beeps) means the motherboard couldn\'t read the memory. The fix: remove the RAM, gently rub the gold contacts with a pencil eraser, clear away the eraser crumbs, then reinstall it until the clips click. Important: a newly built DDR5 PC, or one with new RAM, can show a black screen for 1–3 minutes on first start because of "memory training". That\'s normal, so wait before you panic.'});
  Object.assign(SC.eps,{name:'CPU light stays on',sub:'Fans spin, the debug light stops at CPU, no picture',
    lesson:'The 8-pin CPU power cable (EPS) in the top-left corner of the motherboard is often forgotten, because it\'s hidden behind the cooler and hard to reach once the board is in the case. Without it the fans still spin, since they get power from the 24-pin cable, but the CPU doesn\'t start. The CPU debug light is the clue. Other causes of a CPU light: the CPU isn\'t supported by the current BIOS (needs a BIOS update), or bent socket pins.'});
  Object.assign(SC.psu,{name:'Shuts off while gaming',sub:'Starts normally, but dies completely under heavy load',
    lesson:'A PC that runs fine but shuts off completely during games or rendering is almost always a power problem. Here the PSU is a 450 W no-name unit with no certification, while an RTX 5060 Ti plus the CPU can draw nearly 400 W at full load, with brief spikes above that. Cheap PSUs often can\'t deliver the wattage on their label. Their protection cuts the power, or worse, doesn\'t cut it at all. The fix: a brand-name 650–750 W PSU certified 80+ Gold.'});
  Object.assign(SC.heat,{name:'Slow and noisy',sub:'Gets slower over time, fans roar, CPU at 99 °C',
    lesson:'Dust clogging the cooler fins and dried-out thermal paste (usually after 3–5 years) make the CPU hit its temperature limit of about 95–100 °C quickly. The CPU then slows itself down (thermal throttling) to stay safe, so the PC feels sluggish and the fans scream. This is very common in rented office PCs that are never cleaned. The fix: blow out the dust with a blower or compressed air, clean off the old paste with isopropyl alcohol, and apply new paste. Schedule a clean every 6 months.'});
  Object.assign(SC.boot,{name:'"Reboot and Select proper Boot device"',sub:'The motherboard logo appears, then white text on a black screen',
    lesson:'This message means the main hardware is healthy (the CPU, RAM, and GPU passed their checks), but the computer can\'t find an operating system to start. The most common causes: the M.2 SSD isn\'t fully seated or its screw is missing, the BIOS boot order is wrong (for example a flash drive is selected first), or the SSD has failed. How to check: enter the BIOS (press Del or F2) and see whether the SSD is detected. If it isn\'t, reseat it. If it still doesn\'t appear, the SSD has probably failed.'});
  Object.assign(HOT.ram,{acts:[['reseat','Remove & reinstall until it clicks'],['clean','Clean the gold contacts with an eraser']]});
  Object.assign(HOT.gpu,{label:'Graphics card',acts:[['reseat','Reseat the graphics card'],['power','Check the GPU power cable']]});
  Object.assign(HOT.cable,{label:'Monitor cable',acts:[['look','Look at the cable on the rear panel'],['move','Move the cable to the graphics card port']]});
  Object.assign(HOT.eps,{label:'CPU 8-pin cable',acts:[['look','Inspect the CPU 8-pin connector'],['plug','Plug in the CPU 8-pin cable until it clicks']]});
  Object.assign(HOT.ssd,{label:'M.2 SSD',acts:[['reseat','Reseat the SSD & tighten the screw'],['order','Set the boot order in the BIOS']]});
  Object.assign(HOT.psu,{acts:[['look','Read the PSU label'],['replace','Replace with a 750 W 80+ Gold PSU']]});
  Object.assign(HOT.cooler,{label:'CPU cooler',acts:[['look','Check temperatures & cooler fins'],['clean','Clean the dust + replace thermal paste']]});
  FIND.cable={cable:'The HDMI cable is plugged into the motherboard\'s HDMI port, near the top of the rear panel. Meanwhile a graphics card is installed, and the CPU is a Core i5-14400F.',gpu:'The graphics card is firmly seated and its fans are spinning.'};
  FIND.ram={ram:'The clip at one end of the RAM slot isn\'t fully closed. The stick looks slightly tilted.'};
  FIND.eps={eps:'The CPU 8-pin connector in the top-left corner of the motherboard is empty. The cable is still tied up behind the case.'};
  FIND.psu={psu:'PSU label: "450 W", no brand, no 80+ certification. Thin cables.',gpu:'The GPU power cable is plugged in correctly.'};
  FIND.heat={cooler:'The cooler fins are covered in a thick layer of dust. CPU at 99 °C under load, with its speed dropping from 4.7 GHz to 2.1 GHz.'};
  FIND.boot={ssd:'The M.2 SSD isn\'t fully inserted in its slot, and its retaining screw is missing. In the BIOS, the boot device list is empty.'};
}

/* ---------- state ---------- */
let cur='cable', solved=false, on=false, checks=0, timers=[], done=new Set();
const later=(fn,ms)=>timers.push(setTimeout(fn,ms));
function clearTimers(){timers.forEach(clearTimeout);timers=[];stopBeep();}

/* ---------- audio ---------- */
let ac=null, beepTimer=null, muted=false;
function tone(freq,dur,at){ if(muted) return; ac=ac||new (window.AudioContext||window.webkitAudioContext)(); const o=ac.createOscillator(),g=ac.createGain(); o.type='square'; o.frequency.value=freq; g.gain.value=.05; o.connect(g); g.connect(ac.destination); const t=ac.currentTime+(at||0); o.start(t); o.stop(t+dur); }
function beepPattern(kind){
  stopBeep(); if(kind==='ok'){ tone(1000,.18); return; }
  const loop=()=>{ tone(880,.7,0); };
  loop(); beepTimer=setInterval(loop,1400);
}
function stopBeep(){ clearInterval(beepTimer); beepTimer=null; }

/* ---------- drawing ---------- */
function el(t,a,p){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e;}
function tx(s,x,y,size,fill,p,anchor='start',w='500'){const e=el('text',{x,y,'font-size':size,fill,'font-family':'IBM Plex Mono, monospace','text-anchor':anchor,'font-weight':w},p);e.textContent=s;return e;}
function fan(cx,cy,r,p){const g=el('g',{},p);el('circle',{cx,cy,r,fill:'#1b1e21',stroke:'#3a4047','stroke-width':2},g);const rot=el('g',{class:'rotor'},g);for(let i=0;i<7;i++){const a=i*Math.PI*2/7;el('path',{d:`M${cx} ${cy} q${Math.cos(a)*r*.9} ${Math.sin(a)*r*.2} ${Math.cos(a+.6)*r*.85} ${Math.sin(a+.6)*r*.85}`,stroke:'#59616a','stroke-width':r*.18,fill:'none','stroke-linecap':'round'},rot);}el('circle',{cx,cy,r:r*.28,fill:'#2c3035'},g);return rot;}
function hot(id,x,y,w,h,p){const g=el('g',{class:'hot','data-hot':id,tabindex:0,role:'button','aria-label':L('Periksa ','Inspect ')+HOT[id].label},p);el('rect',{class:'hl',x:x-4,y:y-4,width:w+8,height:h+8,rx:6},g);g.addEventListener('click',()=>inspect(id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();inspect(id);}});return g;}

let rotors=[], leds={}, screenG, cablePlug, monLed;
function draw(){
  svg.innerHTML=''; rotors=[]; leds={};
  const s=SC[cur];
  // case
  el('rect',{x:20,y:20,width:300,height:400,rx:10,fill:'#202428',stroke:'#3a4047','stroke-width':2},svg);
  tx(L('PC (dilihat dari samping)','PC (side view)'),30,14,11,'var(--muted)',svg);
  el('circle',{cx:290,cy:34,r:7,fill:'#c9ced2'},svg); tx('⏻',290,38,10,'#202428',svg,'middle');
  // motherboard
  el('rect',{x:40,y:40,width:200,height:250,rx:4,fill:'#17251f',stroke:'#2f5a47'},svg);
  // EPS (top-left)
  const epsG=el('g',{},svg); el('rect',{x:48,y:44,width:26,height:10,rx:2,fill:'#111'},epsG);
  if(!(cur==='eps'&&!solved)) el('path',{d:'M61 44 C 61 30, 30 30, 28 60',stroke:'#e8c75a','stroke-width':4,fill:'none'},epsG);
  else el('path',{d:'M28 60 C 26 40, 22 30, 26 26',stroke:'#e8c75a','stroke-width':4,fill:'none','stroke-dasharray':'2 0'},epsG);
  tx('8-pin',78,52,9,'#cfd5da',epsG);
  hot('eps',44,40,40,18,svg);
  // cooler + fan
  el('rect',{x:90,y:70,width:70,height:80,rx:4,fill:'#b9c0c6'},svg);
  if(cur==='heat'&&!solved) for(let i=0;i<9;i++) el('rect',{x:92,y:74+i*8,width:66,height:4,fill:'#8a7a5c',opacity:.7},svg);
  rotors.push(fan(125,110,30,svg)); hot('cooler',90,70,70,80,svg);
  // RAM
  [0,1].forEach(i=>{ const off=(cur==='ram'&&!solved&&i===1)?-6:0; el('rect',{x:180+i*16,y:60+off,width:9,height:110,rx:1,fill:'#2c3e57',transform:off?`rotate(-2 ${184+i*16} 60)`:''},svg); el('rect',{x:180+i*16,y:60+off,width:9,height:4,fill:'#8fd3ff'},svg); });
  hot('ram',176,56,34,118,svg);
  // debug LEDs
  tx('DEBUG LED',214,192,8.5,'#cfd5da',svg,'middle');
  ['CPU','DRAM','VGA','BOOT'].forEach((n,i)=>{ leds[n]=el('circle',{class:'led',cx:196+i*13,cy:202,r:4,fill:'#3a2a20'},svg); tx(n[0],196+i*13,216,7,'#cfd5da',svg,'middle'); });
  // M.2
  el('rect',{x:80,y:170,width:80,height:16,rx:2,fill:'#13301f',stroke:'#2f5a47',transform:(cur==='boot'&&!solved)?'rotate(-6 80 178)':''},svg);
  tx('M.2 SSD',120,182,9,'#cfd5da',svg,'middle'); hot('ssd',76,164,88,26,svg);
  // GPU
  el('rect',{x:40,y:200,width:150,height:40,rx:6,fill:'#24282c',stroke:'#4b535b'},svg);
  rotors.push(fan(80,232,14,svg)); rotors.push(fan(150,232,14,svg));
  tx(L('KARTU GRAFIS','GRAPHICS CARD'),115,214,9,'#cfd5da',svg,'middle'); hot('gpu',40,200,150,40,svg);
  // PSU
  el('rect',{x:30,y:330,width:150,height:76,rx:4,fill:'#16181a',stroke:'#3a4047'},svg);
  rotors.push(fan(105,368,28,svg)); tx(cur==='psu'&&!solved?'PSU 450 W':'PSU 750 W Gold',105,326,10,'#cfd5da',svg,'middle');
  hot('psu',30,330,150,76,svg);
  // front fan
  rotors.push(fan(290,140,22,svg)); rotors.push(fan(290,200,22,svg));
  // rear panel
  el('rect',{x:345,y:20,width:120,height:400,rx:8,fill:'#1b1e21',stroke:'#3a4047'},svg);
  tx(L('PANEL BELAKANG','REAR PANEL'),405,14,10,'var(--muted)',svg,'middle');
  el('rect',{x:355,y:40,width:100,height:120,rx:4,fill:'#2b2f33'},svg); tx('Motherboard I/O',405,56,9,'#cfd5da',svg,'middle');
  [70,84,98].forEach(y=>el('rect',{x:365,y,width:20,height:8,rx:1,fill:'#4a6fa5'},svg)); tx('USB',395,82,8,'#cfd5da',svg);
  el('rect',{x:365,y:120,width:28,height:10,rx:2,fill:'#111',stroke:'#888'},svg); tx('HDMI',397,129,8,'#cfd5da',svg);
  el('rect',{x:355,y:210,width:100,height:44,rx:4,fill:'#2b2f33'},svg); tx(L('Kartu grafis','Graphics card'),405,224,9,'#cfd5da',svg,'middle');
  [365,395,425].forEach(x=>el('rect',{x,y:232,width:22,height:10,rx:2,fill:'#111',stroke:'#888'},svg)); tx('HDMI · DP · DP',405,265,8,'#cfd5da',svg,'middle');
  el('rect',{x:360,y:300,width:90,height:80,rx:4,fill:'#16181a'},svg); tx('PSU · 220V',405,345,9,'#cfd5da',svg,'middle');
  // cable plug
  const atMobo=cur==='cable'&&!solved; const py=atMobo?125:237, px=atMobo?379:376;
  el('path',{d:`M${px} ${py} C ${px+90} ${py}, 470 300, 600 300`,stroke:'#0d0d0d','stroke-width':6,fill:'none'},svg);
  el('rect',{x:px-12,y:py-7,width:26,height:14,rx:3,fill:'#2c3035',stroke:'#e0a800','stroke-width':atMobo?2:0},svg);
  hot('cable',px-16,py-12,34,24,svg);
  // monitor
  el('rect',{x:490,y:60,width:250,height:160,rx:8,fill:'#0e0f10',stroke:'#3a4047','stroke-width':3},svg);
  screenG=el('g',{},svg); el('rect',{x:603,y:220,width:24,height:40,fill:'#2b2f33'},svg); el('rect',{x:570,y:258,width:90,height:8,rx:3,fill:'#2b2f33'},svg);
  monLed=el('circle',{cx:730,cy:212,r:3,fill:'#e08a2c'},svg);
  tx('MONITOR',615,52,10,'var(--muted)',svg,'middle');
  setScreen(on?screenState:'off');
  document.querySelectorAll('.hot').forEach(h=>h.classList.toggle('checked',checkedSet.has(h.dataset.hot)));
}
let screenState='off', checkedSet=new Set();
function setScreen(state){
  screenState=state; if(!screenG) return; screenG.innerHTML=''; monLed.setAttribute('fill',state==='off'?'#e08a2c':'#57c07a');
  const g=screenG;
  if(state==='off'||state==='dead') return;
  if(state==='nosignal'){ el('rect',{x:560,y:120,width:110,height:36,rx:4,fill:'#1c3f73'},g); tx('No Signal',615,137,12,'#fff',g,'middle','600'); tx('HDMI 1',615,150,9,'#c8d6ea',g,'middle'); }
  if(state==='bios'){ tx('MOTHERBOARD',615,135,16,'#e3e7ea',g,'middle','700'); tx('Press DEL or F2 to enter Setup',615,200,9,'#aab3bb',g,'middle'); }
  if(state==='bootfail'){ tx('Reboot and Select proper Boot device',502,90,8.5,'#e3e7ea',g); tx('or Insert Boot Media in selected Boot',502,103,8.5,'#e3e7ea',g); tx('device and press a key_',502,116,8.5,'#e3e7ea',g); }
  if(state==='desktop'||state==='game'||state==='slow'){
    const gr=el('linearGradient',{id:'wall',x1:0,y1:0,x2:1,y2:1},g); el('stop',{offset:'0','stop-color':'#2b6fb3'},gr); el('stop',{offset:'1','stop-color':'#6db3e8'},gr);
    el('rect',{x:494,y:64,width:242,height:152,fill:state==='game'?'#3d6b3a':'url(#wall)'},g);
    if(state==='game'){ el('path',{d:'M494 216 L600 140 L630 140 L736 216Z',fill:'#454a4f'},g); el('rect',{x:603,y:180,width:24,height:12,fill:'#c4602a'},g); tx('GAME',500,78,9,'#fff',g); }
    el('rect',{x:494,y:202,width:242,height:14,fill:'rgba(10,15,20,.75)'},g);
    if(state==='slow'){ el('rect',{x:560,y:110,width:110,height:40,rx:4,fill:'rgba(0,0,0,.65)'},g); tx(L('Tidak merespons…','Not responding…'),615,128,10,'#fff',g,'middle'); tx(L('CPU 99 °C · 2,1 GHz','CPU 99 °C · 2.1 GHz'),615,142,9,'#ffb36b',g,'middle'); }
  }
}
function setLed(n,onn){ if(leds[n]) leds[n].setAttribute('fill',onn?'#ff5a3c':'#3a2a20'); }
function spin(v){ rotors.forEach(r=>r.classList.toggle('spin',v)); }

/* ---------- flow ---------- */
function log(m){ const d=document.createElement('div'); const t=new Date(); d.innerHTML=`<span class="t">${String(t.getMinutes()).padStart(2,'0')}:${String(t.getSeconds()).padStart(2,'0')}</span> ${m}`; $('log').prepend(d); }
function power(){
  clearTimers();
  if(on){ on=false; spin(false); ['CPU','DRAM','VGA','BOOT'].forEach(n=>setLed(n,false)); setScreen('off'); $('loadBtn').disabled=true; $('powerBtn').textContent=L('⏻ Nyalakan','⏻ Power on'); log(L('PC dimatikan.','PC switched off.')); return; }
  on=true; $('powerBtn').textContent=L('⏻ Matikan','⏻ Power off'); spin(true); log(L('Tombol power ditekan. Kipas mulai berputar.','Power button pressed. Fans start spinning.'));
  const s=SC[cur]; const stop=solved?null:s.stopAt;
  const order=['CPU','DRAM','VGA','BOOT']; let i=0;
  const step=()=>{ order.forEach(n=>setLed(n,false)); const n=order[i]; setLed(n,true);
    if(n===stop){ log(EN?`The <b>${n}</b> debug light stays on. Startup stops at this stage.`:`Lampu debug <b>${n}</b> menyala terus. Proses berhenti di tahap ini.`);
      if(n==='BOOT'){ setScreen('bios'); later(()=>{setScreen('bootfail'); log(L('Layar: "Reboot and Select proper Boot device".','Screen: "Reboot and Select proper Boot device".'));},1500); }
      else { later(()=>{setScreen('nosignal');log('Monitor: No Signal.');},1200); if(s.beep){ beepPattern('ram'); log(L('Speaker: bip panjang berulang terus. Pola ini umum untuk masalah memori, tapi tiap merek BIOS punya kode sendiri, jadi cek manual motherboard.','Speaker: long beeps, repeating. This pattern is common for memory problems, but every BIOS brand has its own codes, so check the motherboard manual.')); } }
      return; }
    i++; if(i<order.length) later(step,450);
    else { order.forEach(n=>setLed(n,false)); beepPattern('ok'); log(L('Satu bip pendek: POST berhasil, semua hardware utama lolos pemeriksaan.','One short beep: POST passed, all main hardware checked out.'));
      if(cur==='cable'&&!solved){ later(()=>{setScreen('nosignal');log(L('Monitor: No Signal, padahal PC menyala.','Monitor: No Signal, even though the PC is running.'));},900); return; }
      setScreen('bios'); later(()=>{ setScreen('desktop'); log(solved?L('<b>Windows berhasil dimuat. Masalah selesai ✓</b>','<b>Windows loaded. Problem solved ✓</b>'):L('Windows berhasil dimuat.','Windows loaded.')); if(SC[cur].load) $('loadBtn').disabled=false; if(solved) finish(); },1800); }
  };
  later(step,500);
}
function runLoad(){
  const s=SC[cur]; setScreen('game'); log(L('Menjalankan game berat…','Running a heavy game…'));
  if(solved){ later(()=>{log(L('Game berjalan stabil 30 menit. Suhu CPU 72 °C. ✓','The game runs stable for 30 minutes. CPU at 72 °C. ✓')); finish();},1500); return; }
  if(s.load==='shutdown'){ later(()=>{ on=false; spin(false); setScreen('off'); $('loadBtn').disabled=true; $('powerBtn').textContent=L('⏻ Nyalakan','⏻ Power on'); log(L('<b>PC mati total tanpa peringatan</b> setelah 20 detik bermain.','<b>The PC shuts off completely without warning</b> after 20 seconds of play.')); },2200); }
  if(s.load==='throttle'){ later(()=>{ setScreen('slow'); log(L('Kipas menderu keras. Suhu CPU 99 °C, kecepatan turun ke 2,1 GHz. Game patah-patah.','Fans roaring. CPU at 99 °C, speed dropped to 2.1 GHz. The game stutters badly.')); },1800); }
}
function inspect(id){
  checks++; checkedSet.add(id); document.querySelectorAll(`.hot[data-hot="${id}"]`).forEach(h=>h.classList.add('checked'));
  const f=(FIND[cur]&&FIND[cur][id])||L('Terlihat normal. Terpasang rapat dan tidak ada kerusakan yang terlihat.','Looks normal. Firmly installed with no visible damage.');
  const h=HOT[id];
  $('inspect').innerHTML=`<h3>${L('Periksa','Inspect')}: ${h.label}</h3><p style="margin:0 0 6px">${f}</p><div class="acts">${h.acts.map(([k,l])=>`<button class="btn" type="button" data-act="${k}">${l}</button>`).join('')}</div>`;
  $('inspect').querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(id,b.dataset.act));
  $('inspect').scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'});
}
function act(hotId,a){
  const s=SC[cur]; const fixes=[].concat(s.fixAct);
  if(on){ log(L('⚠ Matikan PC dan cabut kabel listrik dulu sebelum menyentuh komponen.','⚠ Switch the PC off and unplug it before touching any component.')); toastIn('warn',L('Matikan dulu','Switch it off first'),L('Teknisi selalu mematikan PC, mencabut kabel listrik, dan menekan tombol power sekali untuk membuang sisa listrik sebelum menyentuh komponen di dalam.','Technicians always switch the PC off, unplug the power cord, and press the power button once to drain leftover power before touching anything inside.')); return; }
  if(a==='look'){ const f=(FIND[cur]&&FIND[cur][hotId]); log(`${L('Diperiksa','Inspected')}: ${HOT[hotId].label}. ${f||L('Normal.','Normal.')}`); return; }
  if(hotId===s.fixHot&&fixes.includes(a)&&!solved){ solved=true; draw(); log(`<b>${L('Tindakan','Action')}: ${HOT[hotId].acts.find(x=>x[0]===a)[1]}.</b> ${L('Sekarang nyalakan lagi untuk menguji.','Now power it on again to test.')}`); toastIn('good',L('Tindakan tepat','Right move'),L('Sekarang nyalakan PC lagi untuk memastikan masalahnya benar-benar selesai. Teknisi selalu menguji ulang.','Now power the PC on again to make sure the problem is really fixed. Technicians always retest.')); return; }
  if(solved){ log(L('Masalah sudah ditangani. Nyalakan PC untuk menguji.','The problem has been handled. Power on the PC to test.')); return; }
  log(`${L('Tindakan','Action')}: ${HOT[hotId].acts.find(x=>x[0]===a)[1]}. ${L('Tidak ada perubahan.','No change.')}`);
  toastIn('warn',L('Belum kena','Not it'),L('Bagian ini kelihatannya bukan penyebabnya. Perhatikan lagi gejalanya: lampu debug mana yang menyala, apakah ada bunyi bip, dan apa tulisan di monitor.','This part doesn\'t seem to be the cause. Look at the symptoms again: which debug light is on, whether there are beeps, and what the monitor says.'));
}
function toastIn(c,t,m){ $('inspect').insertAdjacentHTML('beforeend',`<div class="alert ${c}" style="margin-top:10px"><b>${t}</b>${m}</div>`); }
function finish(){
  if(!$('lesson').hidden) return; done.add(cur);
  document.querySelector(`.scn[data-id="${cur}"]`)?.classList.add('solved');
  $('lesson').hidden=false;
  $('lesson').innerHTML=`<div class="alert good"><b>${EN?`Solved in ${checks} checks ✓`:`Selesai dalam ${checks} pemeriksaan ✓`}</b>${SC[cur].lesson}</div>`;
  $('lesson').scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest'});
}
function choose(id){
  clearTimers(); cur=id; solved=false; on=false; checks=0; checkedSet=new Set();
  document.querySelectorAll('.scn').forEach(b=>b.setAttribute('aria-pressed',b.dataset.id===id));
  $('powerBtn').textContent=L('⏻ Nyalakan','⏻ Power on'); $('loadBtn').disabled=true; $('log').innerHTML=''; $('lesson').hidden=true;
  $('inspect').innerHTML=L('<h3>Pemeriksaan</h3><p style="margin:0;color:var(--muted)">Nyalakan PC dan amati gejalanya. Lalu matikan, dan ketuk bagian PC (garis kuning saat diarahkan) untuk memeriksanya.</p>','<h3>Inspection</h3><p style="margin:0;color:var(--muted)">Power on the PC and watch the symptoms. Then switch it off and tap a part of the PC (yellow outline on hover) to inspect it.</p>');
  $('symptom').textContent=SC[id].sub;
  draw(); log(EN?`Case: <b>${SC[id].name}</b>. The client reports: "${SC[id].sub}."`:`Kasus: <b>${SC[id].name}</b>. Klien melapor: "${SC[id].sub}."`);
}

/* ---------- init ---------- */
const list=$('scenarios');
Object.entries(SC).forEach(([id,s],i)=>{const b=document.createElement('button');b.type='button';b.className='scn';b.dataset.id=id;b.innerHTML=`<b>${i+1}. ${s.name}</b><span>${s.sub}</span>`;b.onclick=()=>choose(id);list.appendChild(b);});
$('powerBtn').onclick=power; $('loadBtn').onclick=runLoad;
$('muteBtn').onclick=()=>{muted=!muted; $('muteBtn').textContent=muted?L('🔇 Suara mati','🔇 Sound off'):L('🔊 Suara nyala','🔊 Sound on'); if(muted) stopBeep();};
choose('cable');
})();
