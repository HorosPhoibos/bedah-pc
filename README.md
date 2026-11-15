# Bedah PC

**by [@cvmegadinamika](https://megadinamika.com/) · CV Mega Dinamika**

Panduan interaktif hardware komputer untuk belajar dan untuk bisnis pengadaan/penyewaan PC, dalam **Bahasa Indonesia** dan **English**.
An interactive PC hardware guide for learning and for the PC procurement and leasing business, in **Indonesian** and **English**.

Situs statis biasa (HTML, CSS, JavaScript): tidak perlu instal apa pun dan tidak ada proses build.

## Isi

| Halaman | File (ID) | File (EN) | Isi |
|---|---|---|---|
| Bedah 3D | `index.html` | `en/index.html` | Model PC 3D yang bisa diputar dan dibongkar, 10 komponen dengan foto asli, penjelasan lengkap, dan harga |
| Foto PC | `foto.html` | `en/foto.html` | Foto asli motherboard dan isi PC rakitan dan build-up (Dell, Lenovo) dengan lingkaran merah bernomor |
| Foto Laptop | `laptop.html` | `en/laptop.html` | Foto asli isi laptop modern (Framework 13), gaming (ASUS ROG), dan bisnis (Dell Latitude) dengan lingkaran merah bernomor |
| Mulai dari nol | `dasar.html` | `en/dasar.html` | Dasar komputer untuk pemula |
| Port & Penyimpanan | `port.html` | `en/port.html` | HDD, SSD, M.2, USB A/B/C/micro, HDMI, DisplayPort, VGA, DVI, LAN, audio, kabel internal |
| Mode Rakit | `rakit.html` | `en/rakit.html` | Simulasi merakit dengan cek kompatibilitas (socket, DDR4/DDR5, slot PCIe, watt PSU) |
| Mode Servis | `servis.html` | `en/servis.html` | Simulasi 6 kerusakan umum dengan lampu debug, bunyi bip, dan alur diagnosis teknisi |
| Memilih | `pilih.html` | `en/pilih.html` | Contoh rakitan, kalkulator PSU, demo GPU lemah, spek game, monitor/UPS/jaringan |
| Belajar | `belajar.html` | `en/belajar.html` | Kabel, laptop, software, dan kuliah dasar arsitektur komputer |
| Bisnis | `bisnis.html` | `en/bisnis.html` | Pengadaan, checklist QC, unit bekas, hapus data klien (UU PDP), contekan klien, kabar terbaru |
| Glosarium | `glosarium.html` | `en/glosarium.html` | 118 istilah dengan artinya |

Tombol **ID / EN** di kanan atas setiap halaman berpindah ke halaman yang sama dalam bahasa lain.

## Buka di komputer sendiri

```bash
python3 -m http.server 8000
```

Lalu buka http://localhost:8000.

## GitHub Pages

Repository ini dipublikasikan lewat GitHub Pages dari branch `main`, folder `/ (root)`. Kalau perlu mengaturnya ulang: **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save**.

## Mengganti foto dengan foto sendiri

- Foto komponen utama ada di `img/`, foto port di `img/port/`, foto berlabel di `img/foto/`.
- Timpa file dengan nama yang **sama persis**. Lebar 800–1600 piksel sudah cukup.
- Ubah keterangan dan nama fotografernya di `js/data.js` dan `js/data.en.js` (bagian `window.PHOTOS`).
- Untuk foto berlabel, posisi lingkaran ada di `js/foto.js` (persen dari lebar dan tinggi foto). Kalau fotonya diganti, posisi lingkaran juga harus disesuaikan.

Jangan memakai foto dari toko online atau situs merek tanpa izin. Foto itu milik penjual atau produsennya.

## Memperbarui isi

| Yang diubah | Bahasa Indonesia | English |
|---|---|---|
| Data komponen, harga, rakitan | `js/data.js` | `js/data.en.js` |
| Harga di Mode Rakit | `js/rakit.js` (`PARTS`, `BOARDS`, `PSUS`) | sama, teks ada di fungsi `L('id','en')` |
| Kasus Mode Servis | `js/servis.js` | blok `if(EN)` di file yang sama |
| Label foto berlabel | `js/foto.js` | `js/foto.en.js` |
| Glosarium | `js/glossary.js` | `js/glossary.en.js` |
| Teks halaman (mis. kabar terbaru) | `bisnis.html` dan lainnya | `en/bisnis.html` dan lainnya |

## Kredit

- Semua foto komponen berasal dari Wikimedia Commons dengan lisensi bebas (CC0, Public domain, CC BY, CC BY-SA). Nama pembuat, lisensi, dan tautan aslinya tercantum di halaman yang memakai foto tersebut. Pertahankan kredit itu kalau fotonya tetap dipakai. Lingkaran dan nomor di halaman Foto Asli ditambahkan untuk penjelasan.
- Logo CV Mega Dinamika milik CV Mega Dinamika.
- Model 3D memakai [three.js](https://threejs.org) (lisensi MIT) yang dimuat dari CDN jsDelivr.
