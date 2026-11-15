/* Foto Asli — real photos with numbered red markers. Marker = [x%, y%, rx%, ry%, name, explanation]. */
(function(){
const CM='https://commons.wikimedia.org/wiki/File:';
const PHOTOS=[
 {id:'z390',kind:'Rakitan',title:'Motherboard rakitan: ASUS ROG Strix Z390-F Gaming',img:'img/foto/z390.jpg',w:1600,h:1330,
  note:'Motherboard retail yang dibeli terpisah untuk PC rakitan (rilis 2018, untuk Intel Core generasi 8 dan 9). Foto ini diputar: port belakang ada di BAWAH, slot RAM di ATAS. Di casing, papan ini berdiri dengan port belakang di kiri.',
  credit:['Asus-ROG-Strix-Z390-F-Gaming-Motherboard 20201120 DSC6025.jpg','PantheraLeo1359531','CC BY 4.0',CM+'Asus-ROG-Strix-Z390-F-Gaming-Motherboard_20201120_DSC6025.jpg'],
  m:[[35.4,45.7,10,10.5,'Socket CPU (LGA1151)','Dudukan prosesor, masih tertutup tutup plastik pelindung. Tuas logam di sampingnya untuk membuka dan mengunci CPU.'],
     [34.1,21.6,19,7.5,'4 slot RAM (DDR4 DIMM)','Ada klip pengunci di ujung tiap slot. Tulisan DIMM_A1, A2, B1, B2 tercetak di papan. Untuk 2 keping, pakai A2 dan B2.'],
     [40,11,7.5,3.2,'Konektor ATX 24-pin','Daya utama motherboard dari PSU. Konektor paling besar di papan.'],
     [13.8,69.2,2.2,3.6,'Konektor CPU 8-pin (ATX12V)','Daya khusus prosesor. Letaknya di pojok dekat port belakang, sering terlupa dicolok.'],
     [15.6,48.7,4.5,15,'Heatsink VRM','Pendingin untuk rangkaian pengatur daya CPU. Motherboard gaming punya heatsink VRM besar supaya CPU kelas atas tetap stabil.'],
     [53.1,49.5,3.5,14,'Slot M.2 pertama','Untuk SSD NVMe. Lubang sekrup bertuliskan 2242, 2260, 2280 untuk tiga panjang SSD yang berbeda.'],
     [60.8,52.3,2.2,14.5,'PCIe x16 utama','Slot kartu grafis. Diperkuat pelindung logam (SafeSlot) supaya kuat menahan GPU yang berat.'],
     [56,62.5,1.6,4.5,'Slot PCIe x1','Slot pendek untuk kartu tambahan kecil seperti Wi-Fi, kartu LAN, atau capture card.'],
     [69,26.3,10.5,13,'Heatsink chipset','Di bawahnya ada chipset Intel Z390 yang mengatur port USB, SATA, dan slot tambahan.'],
     [82.8,36,3.5,22,'Pelat pendingin M.2 kedua','Silkscreen di sebelahnya bertuliskan HEATSINK_M.2_2. SSD kedua dipasang di bawah pelat ini.'],
     [66.4,10.3,7.5,3,'Port SATA (6 buah)','Untuk HDD dan SSD 2,5 inci. Port-nya menghadap ke samping supaya kabel rapi di casing.'],
     [66.4,57.3,3,3.6,'Baterai CMOS (CR2032)','Menjaga jam dan pengaturan BIOS tetap tersimpan saat PC dicabut dari listrik.'],
     [86.5,84.5,9,4.5,'Bagian audio (SupremeFX)','Chip audio bertutup logam dan kapasitor audio berwarna emas. Dipisah dari bagian lain supaya suara lebih bersih.'],
     [69.8,84,3.5,4.5,'Chip Super I/O (Nuvoton)','Membaca suhu, tegangan, dan mengatur kecepatan kipas. Data inilah yang ditampilkan HWiNFO.'],
     [26,81,15,10,'Penutup port belakang','Di bawah penutup bergambar logo ROG ini ada deretan port belakang: USB, LAN, audio, HDMI, dan DisplayPort.'],
     [92.5,14.5,1.8,6.5,'Front panel header','Deretan pin untuk kabel tombol power, reset, dan lampu dari casing.'],
     [17.2,30,2.2,2.5,'Header CPU_FAN','Colokan kipas pendingin CPU. Kalau tidak tercolok, banyak BIOS memberi peringatan "CPU Fan Error".']]},
 {id:'rakitan-isi',kind:'Rakitan',title:'Isi PC rakitan: PC gaming 2021',img:'img/foto/rakitan-isi.jpg',w:1535,h:1600,
  note:'PC rakitan dalam casing mid-tower, dilihat dari panel samping. Motherboard-nya adalah ASUS Z390-F yang sama dengan foto pertama, jadi kamu bisa membandingkan papan sebelum dan sesudah dirakit.',
  credit:['Das Innenleben eines Gaming-PCs aus 2021 … HOF08240','PantheraLeo1359531','CC BY 4.0',CM+'Das_Innenleben_eines_Gaming-PCs_aus_2021_20211126_HOF08240_RAW-Export_20220714004132.png'],
  m:[[31.9,26.5,13,15,'Pendingin CPU tower','Heatsink besar dengan kipas yang menutupi socket CPU. CPU-nya ada di bawah sini.'],
     [10.9,24,7,12,'Kipas belakang (exhaust)','Membuang udara panas keluar lewat belakang casing.'],
     [49.8,30.6,3.5,11,'2 keping RAM','RAM HyperX di slot ke-2 dan ke-4 untuk dual channel, persis seperti saran di Mode Rakit.'],
     [34.6,41.8,6,2.6,'SSD M.2 NVMe','Terpasang mendatar di slot M.2 pertama, di antara pendingin CPU dan kartu grafis.'],
     [34.6,51.5,24,6.5,'Kartu grafis (Gigabyte GeForce RTX)','Terpasang di slot PCIe x16 paling atas. Terlihat heatpipe tembaga dan sirip pendinginnya.'],
     [64.5,48.5,6,5,'Kabel daya GPU','Kabel PCIe dari PSU ke kartu grafis. Kartu kelas atas butuh 2–3 colokan.'],
     [57.4,32.7,5,6,'Kabel ATX 24-pin','Kabel tebal dari PSU yang masuk ke konektor 24-pin di tepi motherboard.'],
     [82.5,45.9,5,28,'Kipas depan (intake)','Tiga kipas menyedot udara dingin masuk dari depan.'],
     [34.6,84,26,7,'Penutup PSU (shroud)','PSU tersembunyi di bawah pelat ini supaya kabel rapi dan udara panas PSU tidak bercampur.'],
     [20,60,7,5,'Motherboard','Bagian bawah motherboard yang terlihat: audio SupremeFX dan slot PCIe yang tidak terpakai.'],
     [77.6,9.2,5,6,'Drive 2,5 inci','SSD atau HDD 2,5" di bracket dekat atas, dengan kabel SATA data dan power.'],
     [8.5,62,3.5,9,'Penutup slot belakang','Pelat yang dilepas saat memasang kartu. Bracket GPU menggantikan dua di antaranya.']]},
 {id:'optiplex9020',kind:'Build-up',title:'Motherboard build-up: Dell OptiPlex 9020',img:'img/foto/optiplex9020.jpg',w:1600,h:1066,
  note:'Motherboard buatan Dell khusus untuk PC kantor OptiPlex (2013, Intel Core generasi 4, chipset Q87 kelas bisnis). Perhatikan perbedaannya dengan motherboard rakitan: hampir tanpa heatsink, konektor daya khusus Dell, dan banyak port lama untuk kantor.',
  credit:['Dell Optiplex 9020 Mobo (1).jpg','Oligopolism','CC0',CM+'Dell_Optiplex_9020_Mobo_(1).jpg'],
  m:[[50.5,36.7,7,11,'CPU Intel Core i5-4590 di socket LGA1150','Prosesor terpasang di socket, tuas pengunci sudah tertutup.'],
     [67.4,34.8,5,31,'4 slot RAM (DDR3)','Urutan slot di Dell ditandai angka 1, 2, 3, 4 di atas slot. Isi slot 1 dan 2 dulu.'],
     [76.3,36.3,1.8,3.5,'Konektor daya utama 8-pin (khusus Dell)','Bukan 24-pin seperti rakitan. PSU Dell model ini tidak bisa diganti PSU rakitan biasa tanpa adapter.'],
     [38.3,18,1.6,2.5,'Konektor daya CPU 4-pin','Daya khusus prosesor, hanya 4 pin karena CPU kantor tidak terlalu boros listrik.'],
     [40.1,33.6,2.5,11,'VRM tanpa heatsink','Coil kuning pengatur daya CPU. Tidak perlu heatsink besar karena CPU kantor dayanya rendah.'],
     [76,51.2,1.8,3,'HDD_ODD_POWER','Daya untuk hard disk dan DVD diambil dari motherboard, bukan langsung dari PSU. Ciri khas PC build-up.'],
     [76.6,44.5,2,4,'Port SATA (atas)','Untuk drive tambahan.'],
     [66.1,82,2,4.5,'Port SATA0 dan SATA1','SATA0 (biru) biasanya untuk drive utama tempat Windows.'],
     [43.8,65.5,14,2.2,'PCIe x16 (biru)','Slot kartu grafis. Di PC kantor sering kosong karena memakai grafis bawaan CPU.'],
     [32.8,72.7,3.2,2,'PCIe x1','Slot pendek untuk kartu tambahan.'],
     [36.5,79.3,10.5,2.2,'Slot PCI lama (krem)','Standar lama sebelum PCIe. Masih disediakan untuk kartu kantor lama, misalnya kartu serial atau mesin khusus.'],
     [41.1,86.3,11,2.3,'Slot panjang kedua (x4)','Bentuknya x16, tapi jalurnya lebih sedikit.'],
     [39.8,72.3,2.5,4.2,'Baterai CMOS','Baterai koin CR2032 untuk menyimpan pengaturan BIOS.'],
     [58.2,78.9,3.5,5,'Chipset Intel Q87','Chip tanpa heatsink. Q87 adalah chipset bisnis dengan fitur manajemen jarak jauh (vPro).'],
     [33.9,54.7,2.8,4,'Chip Super I/O (SMSC)','Mengurus sensor suhu, kipas, dan port lama seperti serial.'],
     [21.9,34.4,4.5,31,'Port belakang','Dari atas: PS/2 keyboard-mouse, USB, LAN, DisplayPort ×2, USB, VGA + serial, dan audio. Port VGA dan serial adalah ciri PC kantor.'],
     [58.1,14.1,2,2.4,'FAN_CPU','Header kipas CPU.'],
     [36.5,92.2,1.6,2.6,'Speaker bip (BEEP)','Speaker kecil di papan. Inilah yang berbunyi bip saat ada masalah, seperti di Mode Servis.'],
     [75.5,93,3,2,'Front panel header','Kabel tombol power, lampu, dan USB depan. Konektornya khusus Dell.']]},
 {id:'optiplex3020',kind:'Build-up',title:'Isi PC build-up: Dell OptiPlex 3020 SFF',img:'img/foto/optiplex3020.jpg',w:1332,h:1600,
  note:'PC kantor small form factor (2014) dengan casing dibuka. Desainnya fokus pada servis cepat: banyak pengunci biru yang bisa dibuka tanpa obeng, dan saluran udara plastik yang mengarahkan angin ke pendingin CPU.',
  credit:['Dell OptiPlex 3020 004.jpg','Miguel Durán, Museo8bits','CC BY-SA 4.0',CM+'Dell_OptiPlex_3020_004.jpg'],
  m:[[12.6,31,9,15,'PSU Dell (80 PLUS Bronze)','PSU ramping khusus casing Dell SFF. Label 80 PLUS Bronze terlihat di stikernya. Ukurannya bukan ATX standar, jadi pengganti harus model Dell yang sama.'],
     [63.7,38,11,12,'Pendingin CPU','Heatsink dengan kipas di atas CPU. Diikat dengan pegangan biru supaya cepat dilepas.'],
     [58.3,16.8,22,4,'Saluran udara (shroud)','Plastik hitam bertuliskan Performance yang mengarahkan udara ke pendingin CPU. Jangan dibuang saat servis karena CPU bisa kepanasan.'],
     [66.7,74,17,12,'DVD writer','Drive optik slim. Di bawahnya biasanya ada hard disk.'],
     [61.9,54.8,14,1.8,'Slot RAM','Dua slot RAM DDR3 dengan klip krem, sebagian tertutup bracket drive. Bracket harus diangkat dulu untuk upgrade RAM.'],
     [31.2,40,1.6,13,'PCIe x16','Slot kartu grafis. Di SFF hanya muat kartu low profile (pendek).'],
     [36,29.5,1.4,4,'PCIe x1','Slot pendek untuk kartu tambahan low profile.'],
     [38.7,48.2,2.6,2.5,'Chipset Intel H81','Chipset kelas dasar tanpa heatsink.'],
     [33.6,66.5,4,6,'Kabel SATA (biru)','Kabel data ke hard disk dan DVD.'],
     [23.4,85,6,4,'Kipas sistem','Kipas casing di bagian depan bawah.'],
     [29.7,12.7,2.8,2.5,'Pengunci tanpa obeng (biru)','Ciri khas PC bisnis: bagian berwarna biru bisa dibuka dengan tangan, sehingga teknisi bisa servis lebih cepat.']]},
 {id:'thinkcentre',kind:'Build-up',title:'Mini PC build-up: Lenovo ThinkCentre M715q',img:'img/foto/thinkcentre.jpg',w:1600,h:1200,
  note:'Mini PC seukuran buku (sekitar 1 liter) yang sering dipasang di belakang monitor kantor. Isinya tetap PC lengkap, tapi memakai komponen laptop dan adaptor daya di luar.',
  credit:['P5300569 Lenovo ThinkCentre m715q disassembled.webp','Alexey Vazhnov','CC BY-SA 4.0',CM+'P5300569_Lenovo_ThinkCentre_m715q_disassembled.webp'],
  m:[[63,68,8,13,'CPU AMD Ryzen 5 2400GE (socket AM4)','CPU desktop versi hemat daya (akhiran GE = 35 W). Socket AM4 bisa dilepas, berbeda dengan laptop yang CPU-nya disolder.'],
     [38.5,62.5,5,18,'2 slot RAM SO-DIMM (DDR4)','Memakai RAM laptop, bukan RAM PC biasa. Bisa di-upgrade.'],
     [47.4,39,2,6,'Slot M.2 untuk SSD','Slot SSD NVMe utama.'],
     [18.8,70.5,4.5,2.5,'Slot M.2 Wi-Fi','Slot M.2 kecil (key A/E) untuk kartu Wi-Fi dan Bluetooth. Kabel antena hitam terlihat di pojok kiri atas.'],
     [33.3,27.8,8.5,4,'Konektor SATA','Untuk drive 2,5 inci tambahan, memakai konektor khusus yang menyatukan data dan daya.'],
     [52,11,26,6,'Port belakang','USB, LAN, DisplayPort, dan HDMI. Satu mini PC bisa mendukung dua monitor.'],
     [73.4,11,3.2,5,'Colokan adaptor daya','Tidak ada PSU di dalam. Listrik datang dari adaptor seperti adaptor laptop.'],
     [19,52,3.8,5.5,'Baterai CMOS','Baterai koin yang dibungkus pelindung.'],
     [56,18,1.8,2.6,'Speaker bip','Speaker kecil untuk kode bip saat ada masalah.'],
     [37.5,95,9,4,'Port depan','USB dan jack audio di bagian depan.'],
     [79,73,4,8,'VRM','Rangkaian pengatur daya CPU (coil hitam bertuliskan R30).'],
     [46,76.4,1.6,2,'Jumper CLR_CMOS','Pin merah untuk mereset BIOS ke pengaturan pabrik, misalnya saat lupa password BIOS.']]}
];

const root=document.getElementById('fotoList'); if(!root) return;
const EN=document.documentElement.lang==='en', t=(i,e)=>EN?e:i, BASE=window.BASE||'';
if(EN&&window.FOTO_EN) PHOTOS.forEach(p=>{const e=window.FOTO_EN[p.id]; if(!e) return; p.kindLabel=e.kind; p.title=e.title; p.note=e.note; p.m.forEach((m,i)=>{ if(e.m[i]){ m[4]=e.m[i][0]; m[5]=e.m[i][1]; } });});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
root.innerHTML=PHOTOS.map(p=>`
<section class="lesson annot" id="${p.id}">
  <header><div class="eyebrow"><span class="pill ${p.kind==='Rakitan'?'rilis':'info'}">${p.kindLabel||p.kind}</span></div><h2>${esc(p.title)}</h2><p>${esc(p.note)}</p></header>
  <div class="annot-grid">
    <div style="min-width:0">
      <div class="annot-fig" style="aspect-ratio:${p.w}/${p.h}">
        <img src="${BASE+p.img}" alt="${esc(p.title)}" loading="lazy" width="${p.w}" height="${p.h}">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${p.m.map((m,i)=>`<ellipse data-i="${i}" cx="${m[0]}" cy="${m[1]}" rx="${m[2]}" ry="${m[3]}"/>`).join('')}</svg>
        ${p.m.map((m,i)=>`<button type="button" class="pin" data-i="${i}" style="left:${m[0]}%;top:${Math.max(2.5,m[1]-m[3])}%" aria-label="${i+1}. ${esc(m[4])}">${i+1}</button>`).join('')}
      </div>
      <div class="annot-cap" aria-live="polite"><b>${t('Ketuk nomor atau nama komponen','Tap a number or a component name')}</b><span>${t('untuk menyorotnya di foto.','to highlight it in the photo.')}</span></div>
      <div class="annot-tools"><button type="button" class="btn" data-act="all">${t('Tampilkan semua','Show all')}</button><button type="button" class="btn" data-act="hide">${t('Sembunyikan tanda','Hide markers')}</button><a class="btn" href="${BASE+p.img}" target="_blank" rel="noopener" style="text-decoration:none">${t('Buka foto ukuran penuh','Open full-size photo')} ↗</a></div>
      <p class="annot-credit">${t('Foto','Photo')}: <a href="${p.credit[3]}" target="_blank" rel="noopener">${esc(p.credit[0])}</a> ${t('oleh','by')} ${esc(p.credit[1])}, ${esc(p.credit[2])}. ${t('Lingkaran dan nomor ditambahkan untuk penjelasan.','Circles and numbers added for explanation.')}</p>
    </div>
    <ol class="annot-legend">${p.m.map((m,i)=>`<li><button type="button" data-i="${i}"><i>${i+1}</i><span><b>${esc(m[4])}</b>${esc(m[5])}</span></button></li>`).join('')}</ol>
  </div>
</section>`).join('');

root.querySelectorAll('.annot').forEach(sec=>{
  const p=PHOTOS.find(x=>x.id===sec.id), fig=sec.querySelector('.annot-fig'), cap=sec.querySelector('.annot-cap');
  const set=i=>{
    fig.classList.toggle('focus',i!=null); fig.classList.remove('off');
    sec.querySelectorAll('[data-i]').forEach(e=>e.classList.toggle('on',i!=null&&+e.dataset.i===i));
    if(i==null){cap.innerHTML=`<b>${t('Ketuk nomor atau nama komponen','Tap a number or a component name')}</b><span>${t('untuk menyorotnya di foto.','to highlight it in the photo.')}</span>`;return;}
    const m=p.m[i]; cap.innerHTML=`<b>${i+1}. ${esc(m[4])}</b><span>${esc(m[5])}</span>`;
  };
  sec.querySelectorAll('.pin').forEach(b=>b.onclick=()=>set(+b.dataset.i));
  sec.querySelectorAll('.annot-legend button').forEach(b=>b.onclick=()=>{set(+b.dataset.i); if(innerWidth<961) fig.scrollIntoView({behavior:'smooth',block:'center'});});
  sec.querySelector('[data-act=all]').onclick=()=>set(null);
  sec.querySelector('[data-act=hide]').onclick=()=>{set(null); fig.classList.add('off');};
});
})();
