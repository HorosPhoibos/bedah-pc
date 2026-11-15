/* ---------------- DATA ---------------- */
window.PARTS = [
{
  id:"cpu", name:"Prosesor", alias:"CPU · Central Processing Unit",
  deep:["Di dalam kotak logam kecil itu ada puluhan miliar transistor, yaitu saklar mikroskopis yang hanya bisa bernilai 0 atau 1. Semua yang dilakukan komputer, dari menghitung gaji di Excel sampai menggerakkan karakter di game, pada akhirnya diterjemahkan menjadi jutaan operasi 0 dan 1 yang dikerjakan transistor ini.", "CPU modern punya beberapa core. Setiap core adalah otak yang bisa bekerja sendiri. Banyak core berguna kalau aplikasinya bisa membagi pekerjaan, seperti render video atau kompres file. Untuk pekerjaan yang tidak bisa dibagi, misalnya sebagian besar game dan Excel, yang lebih penting adalah kecepatan satu core: kombinasi GHz dan IPC (seberapa banyak pekerjaan per detak).", "Karena itu, membandingkan CPU hanya dari angka GHz bisa menipu. Ryzen 5 9600X dengan 5,4 GHz jauh lebih cepat dari Core i7 generasi 7 yang 4,5 GHz, karena desainnya jauh lebih baru. Cara aman membandingkan: lihat generasinya dulu, lalu kelasnya (3/5/7/9), lalu cari hasil benchmark untuk aplikasi yang akan dipakai.", "CPU juga menentukan hal lain di PC: jenis RAM yang bisa dipakai (DDR4 atau DDR5), jumlah jalur PCIe untuk GPU dan SSD, dan apakah PC butuh kartu grafis atau tidak. Itulah kenapa merakit PC selalu dimulai dari memilih CPU."],
  where:"Di tengah-atas motherboard, terkunci di dalam socket. Tertutup pendingin, jadi dari luar biasanya tidak kelihatan.",
  what:"Otak komputer. Semua perintah, dari membuka Excel sampai menghitung fisika di game, dikerjakan di sini. Bentuknya kotak logam kecil sekitar 4×4 cm, bagian bawahnya berisi ratusan titik kontak emas.",
  analogy:"Bayangkan dapur restoran. CPU adalah tim koki: makin banyak koki (core) dan makin cepat tangannya (GHz), makin banyak pesanan selesai.",
  specs:[["Core / Thread","Jumlah koki. 6–8 core sudah cukup untuk hampir semua orang."],["Clock (GHz)","Kecepatan tiap koki. Contoh 5,4 GHz boost."],["Cache","Laci kecil super cepat di dalam CPU. Seri AMD X3D punya cache ekstra besar dan sangat kuat untuk game."],["Generasi","Angka di depan nama model. Ryzen 9600X = generasi 9000, lebih baru dari 7600X."],["Huruf akhir","K = bisa di-overclock, F = tanpa grafis bawaan, G = AMD dengan grafis bawaan, X = AMD versi kencang."]],
  names:"Cara membaca nama: Intel dulu memakai Core i3 / i5 / i7 / i9, sekarang Core Ultra 5 / 7 / 9. AMD memakai Ryzen 3 / 5 / 7 / 9. Angka 3 = kelas bawah, 5 = menengah, 7 = atas, 9 = paling tinggi. Ryzen 5 kira-kira selevel Core i5 / Ultra 5.",
  more:["Render video, kompres file, dan kerja 3D selesai lebih cepat.","Bisa buka banyak aplikasi berat sekaligus.","Game terasa lebih stabil (frame tidak drop) di game strategi atau simulasi."],
  less:["Kerja kantor, browsing, dan Zoom hanya memakai 2–4 core. Sisanya menganggur.","Kebanyakan game hanya memanfaatkan 6–8 core. Uangnya lebih terasa kalau dipindah ke GPU.","CPU besar butuh pendingin, motherboard, dan PSU yang lebih mahal juga."],
  tiers:[["Kantor / sekolah","Core i3-14100 · Ryzen 5 8500G","Rp1,7–2,5 jt"],["Menengah / gaming","Core Ultra 5 245K · Ryzen 5 9600X","Rp3–4 jt"],["Atas / streaming","Core Ultra 7 265K · Ryzen 7 9800X3D","Rp5,5–9 jt"],["Kerja berat","Core Ultra 9 285K · Ryzen 9 9950X","Rp9–13 jt"]],
  tips:["CPU dan motherboard harus satu socket. Ryzen 9000 pakai AM5, Core Ultra 200 pakai LGA1851.","Kalau tidak beli kartu grafis, pilih CPU yang punya grafis bawaan (hindari akhiran F di Intel)."],
  q:"processor ryzen 5 9600x"
},
{
  id:"cooler", name:"Pendingin CPU", alias:"CPU Cooler · Heatsink + kipas",
  deep:["Panas adalah musuh utama elektronik. CPU modern bisa menghasilkan 65 sampai 250 watt panas, setara solder listrik, di area sebesar perangko. Tanpa pendingin, CPU akan mencapai batas suhunya (sekitar 95–100 °C) dalam hitungan detik.", "Pendingin bekerja dalam tiga langkah. Pertama, pelat tembaga menyerap panas dari CPU lewat thermal paste. Kedua, heatpipe (pipa tembaga berisi sedikit cairan) memindahkan panas ke atas dengan sangat cepat: cairannya menguap di bagian panas, lalu mengembun di bagian dingin. Ketiga, sirip-sirip aluminium yang luas memberikan panas ke udara, dan kipas meniup udara panas itu pergi.", "Ketika pendingin kurang baik, CPU tidak langsung rusak. Ia melindungi diri dengan menurunkan kecepatan (thermal throttling). Akibatnya PC terasa lambat tanpa sebab yang jelas, dan kipas berbunyi keras. Di PC kantor yang dipakai bertahun-tahun, penyebab utamanya hampir selalu debu dan thermal paste yang mengering."],
  where:"Duduk tepat di atas CPU, dibaut ke motherboard. Tower besar dengan kipas yang biasanya meniup udara ke arah kipas belakang casing.",
  what:"CPU yang bekerja menghasilkan panas sampai 100 °C lebih. Pendingin menyedot panas itu lewat pipa tembaga (heatpipe), menyebarkannya ke sirip aluminium, lalu kipas membuangnya. Versi water cooling (AIO) memakai cairan dan radiator.",
  analogy:"Seperti radiator mobil. Mesinnya boleh kencang, tapi kalau radiatornya kecil, mesin akan kepanasan dan dipaksa melambat.",
  specs:[["Air cooler","Tower heatsink + kipas. Murah, awet, hampir tidak bisa rusak."],["AIO / liquid","Pompa + radiator 240/360 mm. Lebih dingin untuk CPU kelas atas, tampilan rapi."],["TDP (watt)","Kemampuan buang panas. Harus lebih besar dari panas CPU kamu."],["Thermal paste","Pasta abu-abu di antara CPU dan pendingin untuk menghantar panas."]],
  more:["CPU bisa bertahan di kecepatan maksimal lebih lama.","Lebih senyap, karena kipas tidak perlu berputar kencang."],
  less:["CPU kantor (i3 / Ryzen 5 G) sudah cukup dengan kipas bawaan kotaknya.","AIO punya pompa yang bisa rusak, dan harganya 3–5× lipat air cooler."],
  tiers:[["Bawaan (stock)","Termasuk di kotak CPU tertentu","Rp0"],["Tower 1 kipas","Thermalright Assassin X 120 · ID-Cooling SE-224","Rp200–450 rb"],["Tower 2 kipas","Thermalright Peerless Assassin 120","Rp450–800 rb"],["AIO 240–360 mm","Lian Li, Arctic Liquid Freezer III","Rp1–3 jt"]],
  tips:["Cek tinggi pendingin (mm) vs batas tinggi di spesifikasi casing.","Kalau CPU sering 95 °C dan PC melambat, cek pendingin dan thermal paste."],
  q:"cpu cooler tower"
},
{
  id:"mobo", name:"Motherboard", alias:"Mainboard · Papan induk",
  deep:["Motherboard adalah papan sirkuit berlapis-lapis (biasanya 6–10 lapisan tembaga) yang menghubungkan semua komponen. Setiap jalur tembaga di dalamnya dirancang dengan panjang dan jarak tertentu supaya sinyal berkecepatan miliaran kali per detik tetap rapi.", "Bagian penting yang jarang dibahas adalah VRM, rangkaian di sekitar socket yang biasanya tertutup heatsink. VRM mengubah listrik 12 V dari PSU menjadi sekitar 1 V yang dibutuhkan CPU, dengan arus sangat besar. Motherboard murah dengan VRM lemah bisa membuat CPU kelas atas melambat karena VRM-nya kepanasan.", "Motherboard juga menentukan apa yang bisa di-upgrade nanti: berapa slot RAM, berapa slot M.2, ada Wi-Fi atau tidak, dan apakah BIOS-nya akan mendapat update untuk CPU generasi berikutnya. Contohnya, socket AM5 dijanjikan AMD didukung sampai 2029, jadi motherboard AM5 hari ini kemungkinan masih bisa dipasangi CPU AMD beberapa tahun lagi."],
  where:"Papan besar yang dibaut ke dinding belakang casing. Semua komponen lain menancap ke sini.",
  what:"Jalan raya dan kantor pos komputer. Motherboard menghubungkan CPU, RAM, GPU, SSD, dan port USB, serta mengatur listrik dari PSU ke tiap komponen. Ia juga menyimpan firmware BIOS/UEFI.",
  analogy:"Seperti jaringan jalan di sebuah kota. Gedungnya (komponen) bisa bagus, tapi jalannya menentukan berapa gedung yang bisa dibangun dan seberapa lancar lalu lintasnya.",
  specs:[["Socket","Harus cocok dengan CPU: AM5 (AMD) atau LGA1851 (Intel terbaru)."],["Chipset","Kelas fitur. AMD: A620 < B650/B850 < X870. Intel: H810 < B860 < Z890."],["Ukuran","ATX (besar), Micro-ATX (sedang), Mini-ITX (kecil)."],["Slot RAM","2 atau 4 slot, dan jenisnya DDR4 atau DDR5 (tidak bisa dicampur)."],["Port","Jumlah slot M.2, USB, Wi-Fi bawaan, LAN 2.5G."]],
  more:["Lebih banyak slot M.2 dan port USB.","VRM (pengatur daya) lebih kuat untuk CPU kelas atas.","Wi-Fi, Bluetooth, dan audio yang lebih baik sudah termasuk."],
  less:["Motherboard mahal tidak membuat game lebih cepat.","Untuk kantor, chipset paling dasar sudah punya semua yang dibutuhkan."],
  tiers:[["Dasar","AMD A620 · Intel H610 / H810","Rp1,2–1,9 jt"],["Menengah","AMD B650 / B850 · Intel B860","Rp2–4 jt"],["Atas","AMD X870 · Intel Z890","Rp4–10 jt"]],
  tips:["Urutan memilih: CPU dulu, lalu motherboard yang socket-nya cocok, lalu RAM sesuai jenis yang didukung motherboard.","Ukuran motherboard harus muat di casing."],
  q:"motherboard b650"
},
{
  id:"ram", name:"RAM", alias:"Memory · DDR4 / DDR5",
  deep:["Kenapa komputer butuh RAM kalau sudah ada SSD? Karena kecepatannya berbeda jauh. CPU bisa mengambil data dari RAM dalam sekitar 0,0000001 detik, sedangkan dari SSD tercepat sekitar 500 kali lebih lama. Semua yang sedang aktif (Windows, aplikasi yang terbuka, tab browser, dokumen) disalin ke RAM supaya CPU bisa bekerja tanpa menunggu.", "Saat RAM penuh, Windows terpaksa memindahkan sebagian isi RAM ke SSD (page file). Inilah momen PC terasa \"hang\": kursor tersendat, pindah aplikasi butuh beberapa detik. Menambah RAM menyelesaikan masalah ini. Tapi kalau RAM belum pernah penuh, menambahnya tidak membuat PC lebih cepat sama sekali.", "Kecepatan RAM (misalnya DDR5-6000) dan dual channel juga berpengaruh, terutama di game dan di PC tanpa kartu grafis. Grafis bawaan CPU memakai RAM sebagai memori grafisnya, jadi PC kantor dengan 2 keping RAM terasa jauh lebih lancar dibanding 1 keping, walau kapasitasnya sama.", "Satu hal penting: RAM yang baru dipasang sering berjalan di kecepatan dasar. Supaya mencapai kecepatan di labelnya, profil XMP (Intel) atau EXPO (AMD) harus diaktifkan di BIOS. Ini langkah yang sering terlewat, bahkan oleh toko."],
  where:"Batang-batang tegak di sebelah kanan CPU. Biasanya 2 keping dipasang di slot ke-2 dan ke-4.",
  what:"Memori kerja sementara. Saat kamu membuka aplikasi, datanya disalin dari SSD ke RAM karena RAM ribuan kali lebih cepat. Isinya hilang saat PC dimatikan.",
  analogy:"RAM adalah meja kerja. SSD adalah lemari arsip. Makin luas meja, makin banyak berkas yang bisa dibuka bersamaan tanpa bolak-balik ke lemari.",
  specs:[["Kapasitas (GB)","Luas meja. 8 / 16 / 32 / 64 GB."],["Jenis","DDR4 (lama, lebih murah) atau DDR5 (baru, lebih cepat). Harus sesuai motherboard."],["Kecepatan","DDR4-3200, DDR5-6000. Angka lebih tinggi = lebih cepat."],["Dual channel","2 keping (2×8 GB) lebih cepat dari 1 keping 16 GB, karena jalurnya dua."]],
  more:["Bisa buka puluhan tab Chrome, Photoshop, dan game bersamaan tanpa tersendat.","Editing video 4K, mesin virtual, dan AI lokal butuh 32–64 GB.","Kalau RAM penuh, Windows memakai SSD sebagai cadangan dan PC terasa sangat lambat."],
  less:["RAM tidak membuat PC lebih cepat kalau tidak terpakai. Kalau pemakaianmu 10 GB, sisa 54 GB dari RAM 64 GB hanya diam.","Untuk kantor dan sekolah, 16 GB sudah lega. Untuk gaming, 32 GB sudah lebih dari cukup.","Saat ini harga RAM sedang sangat mahal, jadi kapasitas berlebih berarti uang yang terbuang."],
  tiers:[["Minimum","8 GB DDR4 (1 keping)","Rp0,8–1,3 jt"],["Kantor / sekolah","16 GB DDR4 (2×8)","Rp1,6–2,5 jt"],["Standar baru","16 GB DDR5 (2×8)","Rp2,5–4 jt"],["Gaming / editing","32 GB DDR5 (2×16)","Rp4,5–7 jt"],["Kerja berat / AI","64 GB DDR5 (2×32)","Rp9–15 jt"]],
  note:"Harga RAM 2026 sedang naik 2–3× lipat dibanding 2025 karena krisis chip memori untuk AI. Harganya mulai turun sejak April 2026, tapi masih jauh di atas normal.",
  tips:["Cara cek pemakaian: tekan Ctrl+Shift+Esc → tab Performance → Memory. Kalau sering di atas 85%, saatnya tambah.","Selalu beli sepasang (kit 2 keping) supaya dual channel."],
  q:"ram ddr5 32gb kit"
},
{
  id:"gpu", name:"Kartu Grafis", alias:"GPU · VGA",
  deep:["GPU berisi ribuan core kecil yang mengerjakan perhitungan sederhana secara bersamaan. Untuk menggambar satu frame game di layar 1920×1080, GPU harus menghitung warna sekitar 2 juta piksel, lalu mengulanginya 60 sampai 144 kali per detik. Pekerjaan seperti ini cocok dikerjakan oleh banyak pekerja sekaligus.", "Kartu grafis punya memorinya sendiri yang disebut VRAM, untuk menyimpan tekstur, model 3D, dan gambar yang sedang diolah. Kalau VRAM penuh, data harus diambil dari RAM sistem yang jauh lebih lambat, dan hasilnya game tersendat (stutter) walau FPS rata-ratanya terlihat tinggi. Karena itu kartu 16 GB lebih awet untuk game baru dibanding kartu 8 GB di kelas yang sama.", "Selain game, GPU dipakai untuk mempercepat editing video (encode/decode), render 3D, CAD, dan AI. NVIDIA unggul di software profesional dan AI karena ekosistem CUDA-nya. AMD sering memberi performa game lebih besar per rupiah. Intel Arc adalah pilihan hemat yang terus membaik.", "Membaca nama GPU: merek chip (NVIDIA GeForce RTX), generasi (50), kelas (60/70/80/90), lalu varian (Ti, Super). Merek kartu seperti ASUS, MSI, Gigabyte, Zotac, dan Palit membuat kartu dari chip yang sama dengan pendingin berbeda. Selisih performanya kecil, yang beda adalah suhu, suara, dan garansi."],
  where:"Kartu panjang yang menancap di slot PCIe di bawah CPU. Kipasnya menghadap ke bawah, dan kabel monitor dicolok ke ujungnya di belakang casing.",
  what:"Prosesor khusus gambar. CPU punya sedikit koki yang sangat pintar, GPU punya ribuan koki sederhana yang mengerjakan hal kecil sekaligus. Itu cocok untuk menggambar jutaan piksel per detik, mengedit video, dan menjalankan AI.",
  analogy:"CPU itu 8 profesor matematika. GPU itu 5.000 anak SD yang masing-masing menghitung satu soal penjumlahan. Untuk mewarnai gambar raksasa, 5.000 anak SD jauh lebih cepat.",
  specs:[["Seri","NVIDIA GeForce RTX 50xx, AMD Radeon RX 90xx, Intel Arc B-series."],["Angka model","Digit kedua: 50 < 60 < 70 < 80 < 90. RTX 5070 lebih kuat dari RTX 5060."],["VRAM","Memori milik GPU. 8 GB mulai sesak untuk game baru, 12–16 GB lebih aman."],["Watt (TGP)","Daya listrik yang dipakai. Menentukan besar PSU."]],
  more:["FPS lebih tinggi dan grafis game bisa disetel ke Ultra.","Bisa main di resolusi 1440p atau 4K.","Render 3D, editing video, dan AI lokal jauh lebih cepat."],
  less:["Untuk kantor, Zoom, dan YouTube, grafis bawaan CPU sudah cukup. Tidak perlu kartu grafis sama sekali.","Monitor 1080p 60 Hz tidak bisa menampilkan kelebihan GPU kelas atas.","GPU besar butuh PSU, casing, dan pendingin ruangan yang lebih besar."],
  tiers:[["Tanpa kartu","Grafis bawaan CPU (iGPU)","Rp0"],["Gaming 1080p","RTX 5050 · RTX 5060 · Arc B580","Rp4–6,5 jt"],["1080p tinggi / 1440p","RTX 5060 Ti 16GB · RX 9060 XT","Rp7–10 jt"],["1440p tinggi","RTX 5070 · RX 9070","Rp10–15 jt"],["4K / kerja berat","RTX 5080","Rp20–28 jt"],["Paling atas","RTX 5090","Rp55–80 jt"]],
  note:"GPU juga terdampak krisis memori. Beberapa model RTX 50 dijual 50–80% di atas harga resminya pada pertengahan 2026.",
  tips:["Sesuaikan dengan monitor. GPU kelas atas + monitor 60 Hz = uang terbuang.","Kabel monitor dicolok ke port GPU, bukan port motherboard. Ini kesalahan pemula paling umum."],
  q:"rtx 5060 ti 16gb"
},
{
  id:"nvme", name:"SSD NVMe", alias:"M.2 · Penyimpanan utama",
  deep:["SSD menyimpan data di chip NAND, sel-sel kecil yang menahan muatan listrik meski daya mati. Karena tidak ada piringan yang berputar, SSD bisa membuka ribuan file kecil hampir seketika. Ini yang membuat Windows menyala dalam belasan detik.", "NVMe adalah \"bahasa\" yang dipakai SSD modern untuk berbicara langsung lewat jalur PCIe, jalur yang sama dengan kartu grafis. Inilah kenapa NVMe bisa 6–25 kali lebih cepat dari SSD SATA. Bentuk M.2 hanyalah bentuk kepingnya. Ada juga SSD M.2 yang masih memakai jalur SATA dan kecepatannya sama dengan SSD SATA biasa.", "Hal yang membedakan SSD murah dan mahal: ada tidaknya DRAM cache (membuat kecepatan stabil), jenis NAND (TLC lebih awet dari QLC), dan nilai TBW (berapa terabyte data yang boleh ditulis selama garansi). Untuk PC kantor, SSD NVMe Gen4 tanpa DRAM pun sudah jauh lebih dari cukup."],
  where:"Keping kecil sebesar permen karet, ditidurkan di motherboard antara CPU dan kartu grafis. Sering tertutup pelat logam pendingin.",
  what:"Tempat Windows, aplikasi, file, dan game disimpan secara permanen. Tidak hilang saat listrik mati. NVMe menancap langsung ke jalur PCIe, jadi jauh lebih cepat dari hard disk.",
  analogy:"Lemari arsip di samping meja. Makin besar lemari, makin banyak berkas yang bisa disimpan. NVMe adalah lemari dengan laci yang membuka sendiri dalam sekejap.",
  specs:[["Kapasitas","512 GB, 1 TB, 2 TB, 4 TB. Game modern 80–150 GB per judul."],["Generasi PCIe","Gen3 ±3.500 MB/s, Gen4 ±7.000 MB/s, Gen5 ±12.000 MB/s."],["Ukuran 2280","Panjang 80 mm, ukuran standar untuk PC dan sebagian besar laptop."],["DRAM cache / TBW","Penanda kualitas dan daya tahan tulis."]],
  more:["Lebih banyak ruang untuk game, video, dan foto.","SSD yang lebih besar biasanya juga sedikit lebih cepat dan awet."],
  less:["Booting Windows hampir sama cepat di Gen3 dan Gen5. Bedanya hanya terasa saat menyalin file raksasa.","Untuk kantor yang filenya di cloud, 512 GB sudah cukup."],
  tiers:[["Kantor","512 GB Gen3/Gen4","Rp1,2–2 jt"],["Standar","1 TB Gen4 · Kingston NV3, WD SN7100","Rp2,5–3,5 jt"],["Gamer / kreator","2 TB Gen4","Rp4,5–7 jt"],["Premium","1–2 TB Gen5 · Samsung 9100 Pro","Rp5–9 jt"]],
  note:"Seperti RAM, harga SSD naik sepanjang 2026 karena chip NAND dialihkan ke pusat data.",
  tips:["Ganti hard disk ke SSD adalah upgrade paling terasa untuk PC atau laptop lama.","Sisakan 15–20% ruang kosong supaya SSD tetap kencang."],
  q:"ssd nvme 1tb gen4"
},
{
  id:"sata", name:"HDD & SSD SATA", alias:"Penyimpanan tambahan",
  deep:["Hard disk bekerja seperti piringan hitam: piringan berlapis magnet berputar 5.400–7.200 kali per menit, dan kepala baca bergerak di atasnya dengan jarak lebih tipis dari sidik jari. Karena harus menunggu piringan berputar ke posisi yang tepat, membuka ribuan file kecil terasa sangat lambat.", "Kelebihan HDD tetap ada: harga per terabyte paling murah, dan data bisa bertahan lama di rak. Karena itu HDD masih menjadi pilihan untuk backup, arsip, NAS kantor, dan rekaman CCTV.", "HDD sensitif terhadap guncangan saat menyala dan pasti aus seiring waktu. Tanda bahaya: bunyi klik berulang, PC sering \"not responding\" saat membuka file, atau status SMART di CrystalDiskInfo berubah menjadi \"Caution\". Segera backup kalau melihat tanda ini."],
  where:"Di rak drive bagian depan-bawah casing, di balik penutup PSU. SSD SATA 2,5\" sering ditempel di atas penutup PSU atau di balik motherboard.",
  what:"Penyimpanan model lama yang dicolok dengan kabel SATA. Hard disk (HDD) memakai piringan berputar dan jarum baca, mirip piringan hitam. Murah per terabyte, tapi lambat dan bisa rusak kalau terbentur.",
  analogy:"HDD adalah gudang besar di belakang toko. Murah dan luas, tapi mengambil barangnya lama.",
  specs:[["HDD 3,5\"","Kecepatan putar 7200 rpm, ±150–250 MB/s. Cocok untuk arsip, backup, dan CCTV."],["SSD SATA 2,5\"","±550 MB/s. Upgrade murah untuk PC/laptop lama tanpa slot M.2."],["Kapasitas","HDD 1–20 TB, SSD SATA 256 GB–4 TB."]],
  more:["Bisa menyimpan arsip bertahun-tahun, foto keluarga, dan backup."],
  less:["Jangan pasang Windows di HDD. Booting bisa makan 1–2 menit.","Kalau semua file muat di NVMe, HDD tidak perlu."],
  tiers:[["SSD SATA","500 GB – 1 TB","Rp0,9–2,2 jt"],["HDD arsip","2 TB 7200 rpm","Rp1–1,6 jt"],["HDD besar","4 TB","Rp1,8–2,8 jt"]],
  tips:["HDD paling murah per TB, jadi cocok untuk backup data kantor."],
  q:"hdd 4tb"
},
{
  id:"psu", name:"Power Supply", alias:"PSU · Catu daya",
  deep:["Listrik dari PLN adalah arus bolak-balik 220 V. Semua chip di PC butuh arus searah bertegangan rendah dan sangat stabil: 12 V untuk CPU dan GPU, 5 V dan 3,3 V untuk perangkat lain. PSU menyearahkan, menurunkan, dan menghaluskan listrik itu, lalu membaginya ke tiap komponen lewat kabel-kabelnya.", "Di dalam PSU ada kapasitor, trafo, dan rangkaian pengatur. Kualitas komponen ini yang membedakan PSU bagus dan buruk. PSU berkualitas menjaga tegangan tetap rata saat GPU tiba-tiba menarik daya besar, dan punya proteksi yang memutus listrik sebelum terjadi kerusakan. PSU murah sering menuliskan watt di label yang tidak bisa benar-benar ia keluarkan.", "PSU juga penentu ketahanan PC terhadap listrik Indonesia yang kadang naik-turun. Untuk PC kantor, kombinasi PSU yang layak dengan UPS atau stabilizer adalah investasi kecil yang mencegah banyak kerusakan.", "Jangan pernah membuka casing PSU. Kapasitor besar di dalamnya bisa menyimpan listrik bertegangan tinggi berjam-jam setelah dicabut."],
  where:"Kotak logam di bagian bawah-belakang casing, biasanya tertutup shroud. Kabel listrik dari stopkontak dicolok ke sini.",
  what:"Mengubah listrik PLN 220 V menjadi 12 V, 5 V, dan 3,3 V yang dibutuhkan komponen, lalu membaginya lewat kabel ke motherboard, CPU, GPU, dan drive.",
  analogy:"Seperti jantung yang memompa darah ke seluruh tubuh. Jantung yang lemah membuat semua organ ikut bermasalah.",
  specs:[["Watt","Daya maksimal. Kantor 450–550 W, gaming 650–850 W, kelas atas 1000 W+."],["Sertifikat 80+","Efisiensi: Bronze < Gold < Platinum. Gold membuang lebih sedikit listrik jadi panas."],["Modular","Kabel bisa dilepas, jadi casing lebih rapi."],["ATX 3.1 / 12V-2x6","Konektor baru untuk GPU RTX 50 kelas atas."]],
  more:["Bisa menampung GPU yang lebih besar dan upgrade nanti.","Bekerja di beban rendah, jadi lebih senyap dan awet."],
  less:["PSU 1000 W tidak membuat tagihan listrik lebih besar. PC hanya mengambil daya sesuai kebutuhan. Tapi juga tidak membuat PC lebih kencang.","Untuk PC kantor tanpa GPU yang memakai ±150 W, PSU 450 W sudah sangat lega."],
  tiers:[["Kantor","450–550 W 80+ Bronze","Rp500 rb–1 jt"],["Gaming","650–850 W 80+ Gold","Rp1,2–2,5 jt"],["Kelas atas","1000–1200 W Gold/Platinum ATX 3.1","Rp2,5–5 jt"]],
  extra:[{h:"Apa pengaruh PSU ke PC",items:["Stabilitas: PSU bagus menjaga tegangan tetap rata saat beban naik-turun. PSU jelek membuat PC restart acak atau blue screen yang sulit dilacak.","Keselamatan: PSU berkualitas punya proteksi OVP, OCP, SCP, dan OTP (tegangan lebih, arus lebih, korsleting, panas berlebih). Saat ada masalah, PSU mematikan diri sebelum komponen lain rusak.","Efisiensi: PSU 80+ Gold membuang ±10% listrik jadi panas, sedangkan PSU tanpa sertifikat bisa membuang 20–25%. Untuk PC yang menyala 8–24 jam di kantor, selisih ini terasa di tagihan.","Umur pakai: PSU bagus biasanya bergaransi 5–10 tahun dan bisa dipindah ke rakitan berikutnya.","Upgrade: watt cadangan memungkinkan pasang GPU lebih besar nanti tanpa ganti PSU."]},
         {h:"Yang membuat PSU butuh watt lebih besar",items:["GPU: penentu terbesar. RTX 5060 ±145 W, RTX 5080 ±360 W, RTX 5090 ±575 W.","CPU: Ryzen 5 9600X ±88 W, Core Ultra 9 285K sampai ±250 W.","RAM: hanya ±3–5 W per keping. RAM 64 GB hampir tidak menambah kebutuhan PSU.","SSD ±5–8 W, HDD ±6–9 W, kipas ±2–3 W per buah."]}],
  tips:["Jangan berhemat di PSU. PSU abal-abal yang rusak bisa ikut merusak motherboard dan GPU.","Pakai kalkulator PSU di halaman Memilih untuk menghitung kebutuhan watt."],
  q:"psu 750w gold"
},
{
  id:"fans", name:"Kipas Casing", alias:"Case fan · 120 / 140 mm",
  deep:["Kipas casing tidak mendinginkan komponen secara langsung. Tugasnya mengganti udara panas di dalam casing dengan udara ruangan yang lebih dingin. Pendingin CPU dan GPU hanya bisa bekerja sebaik udara yang mereka terima.", "Pola yang paling umum dan efektif: kipas depan menyedot udara masuk (intake), kipas belakang dan atas membuang udara keluar (exhaust). Usahakan udara masuk sedikit lebih banyak dari yang keluar (tekanan positif), supaya debu hanya masuk lewat filter depan, bukan dari celah-celah casing.", "Arah tiup kipas bisa dilihat dari bingkainya. Sisi yang ada jeruji penyangga motor adalah sisi udara keluar, dan biasanya ada tanda panah kecil di samping kipas."],
  where:"Tiga di depan casing menyedot udara dingin masuk, satu di belakang membuang udara panas keluar.",
  what:"Mengatur aliran udara. Udara dingin masuk dari depan, melewati GPU dan CPU, lalu keluar lewat belakang dan atas. Tanpa aliran ini, panas terjebak di dalam casing.",
  analogy:"Ventilasi rumah. AC di kamar (pendingin CPU) tidak banyak membantu kalau semua jendela rumah tertutup rapat.",
  specs:[["Ukuran","120 mm atau 140 mm. 140 mm bisa lebih senyap di aliran udara yang sama."],["PWM","Kecepatan otomatis mengikuti suhu."],["ARGB","Lampu warna-warni. Murni untuk tampilan."]],
  more:["Suhu semua komponen lebih rendah dan kipas bisa berputar lebih pelan."],
  less:["Lebih dari 5–6 kipas biasanya tidak menurunkan suhu lagi, hanya menambah suara dan debu.","PC kantor cukup 1–2 kipas."],
  tiers:[["Satuan","Kipas 120 mm biasa","Rp40–120 rb"],["Paket 3","120 mm ARGB","Rp200–500 rb"],["Premium","Noctua, Lian Li, Arctic P14","Rp150–400 rb/kipas"]],
  tips:["Bersihkan debu tiap 3–6 bulan. Debu adalah musuh nomor satu PC sewaan di kantor."],
  q:"kipas casing 120mm argb"
},
{
  id:"case", name:"Casing", alias:"Case · Chassis",
  deep:["Casing menentukan tiga hal: komponen apa yang muat, seberapa dingin, dan seberapa senyap. Selalu cek spesifikasinya: panjang GPU maksimal, tinggi pendingin CPU maksimal, ukuran motherboard yang didukung, dan jumlah kipas atau radiator yang bisa dipasang.", "Casing dengan panel depan kaca penuh memang cantik, tapi sering lebih panas karena udara hanya masuk lewat celah sempit di pinggir. Panel depan mesh (berlubang) hampir selalu membuat semua komponen lebih dingin dan kipas lebih senyap.", "Untuk kantor, casing juga soal perawatan: filter debu yang mudah dilepas, tempat merapikan kabel di belakang, dan port USB depan yang mudah dijangkau karyawan."],
  where:"Rumah untuk semua komponen. Panel samping kaca membuat isinya terlihat. Tombol power dan port USB depan ada di atasnya.",
  what:"Melindungi komponen dari debu dan benturan, mengatur aliran udara, dan menentukan ukuran maksimal komponen yang bisa dipasang.",
  analogy:"Seperti rumah. Ukurannya menentukan berapa perabot yang muat, dan jendelanya menentukan seberapa sejuk di dalam.",
  specs:[["Ukuran","Full tower, mid tower (paling umum), micro / mini-ITX."],["Panel depan","Mesh (banyak lubang, lebih dingin) atau kaca/solid (lebih senyap, lebih panas)."],["Batas ukuran","Panjang GPU maksimal dan tinggi pendingin CPU maksimal."],["Port depan","USB-A, USB-C, jack audio."]],
  more:["Lebih banyak ruang untuk GPU panjang, radiator, dan kipas.","Merakit dan merapikan kabel lebih mudah."],
  less:["Casing tidak membuat PC lebih cepat. Casing murah dengan panel mesh sering lebih dingin dari casing mahal berkaca penuh.","PC kantor bisa memakai casing micro-ATX yang kecil di bawah meja."],
  tiers:[["Kantor","Micro-ATX sederhana","Rp350–600 rb"],["Gaming mid tower","Panel mesh + kaca samping","Rp700 rb–1,5 jt"],["Premium","Lian Li, Fractal, NZXT","Rp1,5–4 jt"]],
  tips:["Cek panjang GPU dan tinggi pendingin CPU terhadap batas di spesifikasi casing sebelum beli."],
  q:"casing pc mid tower mesh"
}
];

const CM = "https://commons.wikimedia.org/wiki/File:";
window.PHOTOS = {
  cpu:{src:"img/cpu.jpg",alt:"Prosesor Intel Core i9-14900KF dilihat dari atas",caption:"Intel Core i9-14900KF. Bagian logam di atas disebut heat spreader",title:"Intel i9-14900KF CPU.jpg",author:"Pstrahl",license:"CC BY-SA 4.0",page:CM+"Intel_i9-14900KF_CPU.jpg"},
  cooler:{src:"img/cooler.jpg",alt:"Pendingin CPU tower Jonsbo CR-1000 GT dilihat dari atas, terlihat sirip dan heatpipe tembaga",caption:"Jonsbo CR-1000 GT dilihat dari atas. Terlihat sirip aluminium dan heatpipe tembaga",title:"Jonsbo CR-1000 GT CPU-Kühler",author:"PantheraLeo1359531",license:"CC BY 4.0",page:CM+"Jonsbo_CR-1000_GT_CPU-K%C3%BChler,_ARGB_-_120mm,_schwarz_20201120_DSC6204.jpg"},
  mobo:{src:"img/mobo.jpg",alt:"Socket AM5 terbuka di motherboard dengan ribuan pin",caption:"Socket AM5 di motherboard dalam keadaan terbuka. Di sinilah CPU dikunci",title:"AM5 Socket Open.jpg",author:"CristoCalis",license:"CC BY-SA 4.0",page:CM+"AM5_Socket_Open.jpg"},
  ram:{src:"img/ram.jpg",alt:"Dua sisi RAM SK hynix DDR5 16 GB",caption:"SK hynix DDR5-5600 16 GB, depan dan belakang. Kotak hitam adalah chip memori",title:"SK hynix 16GB DDR5-5600 UDIMM",author:"ITEagle Europe – Sebastiaan Broekhoven",license:"CC BY-SA 4.0",page:CM+"SK_hynix_16GB_DDR5-5600_UDIMM_HMCG78AGBUA084N_BA.jpg"},
  gpu:{src:"img/gpu.jpg",alt:"Kartu grafis Palit GeForce RTX 5090 Gamerock dengan tiga kipas",caption:"Palit GeForce RTX 5090 GameRock. Tiga kipas menghadap ke bawah saat terpasang",title:"Palit GeForce RTX 5090 Gamerock",author:"PantheraLeo1359531",license:"CC BY 4.0",page:CM+"Palit_GeForce_RTX_5090_Gamerock_20250530_HOF4166_RAW-Export.png"},
  nvme:{src:"img/nvme.jpg",alt:"SSD Kingston NV2 2 TB format M.2",caption:"Kingston NV2 2 TB, SSD NVMe PCIe 4.0 ukuran M.2 2280",title:"2023 Dysk SSD Kingston NV2 2TB.jpg",author:"Jacek Halicki",license:"CC BY-SA 4.0",page:CM+"2023_Dysk_SSD_Kingston_NV2_2TB.jpg"},
  sata:{src:"img/sata.jpg",alt:"Hard disk Seagate Barracuda 3,5 inci",caption:"Hard disk Seagate Barracuda 3,5\" 7200 rpm. Piringan dan jarum ada di dalam casing logam ini",title:"ST3320620AS.jpg",author:"User5515",license:"CC0",page:CM+"ST3320620AS.jpg"},
  psu:{src:"img/psu.jpg",alt:"Power supply yang dibuka, terlihat kipas, kapasitor, heatsink, dan kabel",caption:"Isi sebuah PSU (unit lama): heatsink aluminium, trafo, kapasitor, dan berkas kabel",title:"PSU-Open1.jpg",author:"Wikimedia Commons",license:"Public domain",page:CM+"PSU-Open1.jpg"},
  fans:{src:"img/fans.jpg",alt:"Casing Kolink Observatory dengan tiga kipas di panel depan",caption:"Tiga kipas intake di panel depan casing Kolink Observatory",title:"PC-Gehäuse Kolink Observatory RGB",author:"PantheraLeo1359531",license:"CC BY 4.0",page:CM+"PC-Geh%C3%A4use_Kolink_Observatory_RGB_Midi-Tower_20201120_DSC6134.jpg"},
  case:{src:"img/case.jpg",alt:"Isi PC rakitan modern dengan GPU, RAM, pendingin AIO, dan kipas RGB",caption:"PC rakitan nyata tahun 2026. Coba cari GPU, RAM, dan pendingin AIO-nya",title:"2026 Wnętrze komputera PC.jpg",author:"Jacek Halicki",license:"CC BY-SA 4.0",page:CM+"2026_Wn%C4%99trze_komputera_PC.jpg"}
};

window.CPUS = [["Core i3-14100 (kantor)",110],["Ryzen 5 8500G (kantor)",88],["Ryzen 5 9600X",88],["Core Ultra 5 245K",159],["Ryzen 7 9800X3D",162],["Core Ultra 7 265K",250],["Ryzen 9 9950X",230],["Core Ultra 9 285K",250]];
window.GPUS = [["Tidak ada (grafis bawaan CPU)",0,0],["RTX 5050",130,550],["RTX 5060",145,550],["Arc B580",190,0],["RTX 5060 Ti 16GB",180,600],["RX 9060 XT 16GB",160,0],["RTX 5070",250,650],["RX 9070",220,0],["RX 9070 XT",304,0],["RTX 5070 Ti",300,750],["RTX 5080",360,850],["RTX 5090",575,1000]];

window.BUILDS = [
  {id:"kantor", name:"Kantor & sekolah", total:"Rp8–10 jt", desc:"Word, Excel, browser, Zoom, aplikasi kasir. Spesifikasi seperti ini yang paling sering disewakan ke perusahaan.", rows:[
    ["cpu","Ryzen 5 8500G (grafis bawaan)","Rp2,2 jt"],["cooler","Kipas bawaan CPU","Rp0"],["mobo","AMD A620 Micro-ATX","Rp1,4 jt"],["ram","16 GB DDR5 (2×8)","Rp2,8 jt"],["gpu","Tidak perlu, pakai iGPU","Rp0"],["nvme","512 GB NVMe Gen4","Rp1,4 jt"],["psu","500 W 80+ Bronze","Rp650 rb"],["case","Micro-ATX + 1 kipas","Rp450 rb"]]},
  {id:"gaming", name:"Gaming 1080p–1440p", total:"Rp24–28 jt", desc:"Game baru di setelan tinggi, streaming ringan, editing video sesekali.", rows:[
    ["cpu","Ryzen 5 9600X / Core Ultra 5 245K","Rp3,6 jt"],["cooler","Tower 2 kipas","Rp550 rb"],["mobo","AMD B650 ATX","Rp2,6 jt"],["ram","32 GB DDR5-6000 (2×16)","Rp5,5 jt"],["gpu","RTX 5060 Ti 16 GB","Rp8,5 jt"],["nvme","1 TB NVMe Gen4","Rp2,9 jt"],["psu","750 W 80+ Gold","Rp1,6 jt"],["case","Mid tower mesh + 4 kipas","Rp1 jt"]]},
  {id:"kreator", name:"Kreator & AI", total:"Rp60–70 jt", desc:"Editing 4K, render 3D, arsitektur, menjalankan model AI di komputer sendiri.", rows:[
    ["cpu","Ryzen 9 9950X","Rp10,5 jt"],["cooler","AIO 360 mm","Rp2,2 jt"],["mobo","AMD X870 ATX","Rp5 jt"],["ram","64 GB DDR5 (2×32)","Rp11 jt"],["gpu","RTX 5080 16 GB","Rp24 jt"],["nvme","2 TB NVMe Gen4 + 4 TB HDD","Rp8 jt"],["psu","1000 W 80+ Gold ATX 3.1","Rp3 jt"],["case","Mid/full tower premium","Rp2 jt"]]}
];

window.LAYERS = [
  {id:"app", name:"Aplikasi", short:"Chrome, Excel, game, Photoshop", body:"Program yang kamu pakai langsung. Aplikasi tidak bicara langsung ke hardware. Ia meminta tolong ke sistem operasi: \"tolong simpan file ini\", \"tolong tampilkan gambar ini\".", ex:"Kebutuhan aplikasi menentukan spesifikasi PC. Cek bagian \"minimum / recommended requirements\" di situs aplikasi atau game."},
  {id:"os", name:"Sistem operasi", short:"Windows 11, macOS, Linux", body:"Manajer seluruh komputer. OS membagi waktu CPU ke tiap aplikasi, mengatur isi RAM, mengelola file di SSD, dan menampilkan jendela di layar. Bagian intinya disebut kernel.", ex:"Windows 11 butuh minimal 4 GB RAM, 64 GB penyimpanan, dan chip keamanan TPM 2.0. Lisensi Windows 11 Home resmi sekitar Rp1,9–2,3 jt."},
  {id:"driver", name:"Driver", short:"Penerjemah untuk tiap komponen", body:"Program kecil yang mengajari OS cara bicara dengan satu hardware tertentu. Kartu grafis NVIDIA butuh driver NVIDIA, Wi-Fi butuh driver Wi-Fi, dan seterusnya.", ex:"Kalau game patah-patah atau layar resolusinya aneh setelah instal ulang, biasanya driver GPU belum dipasang."},
  {id:"firmware", name:"Firmware", short:"BIOS / UEFI di chip motherboard", body:"Software pertama yang jalan saat PC dinyalakan, tersimpan di chip kecil di motherboard. Ia memeriksa hardware, lalu menyerahkan kendali ke OS. Di sini kamu bisa mengatur urutan boot, mengaktifkan profil kecepatan RAM (XMP/EXPO), dan melihat suhu CPU.", ex:"Masuk BIOS dengan menekan Del atau F2 berulang kali tepat setelah tombol power ditekan."}
];
