# 🗺️ Peta Jalan Gojek 10 Ribu

**Nama:** Yonaldi Ernanda P  
**NIM:** 714240028  
**Mata Kuliah:** Sistem Informasi Geografis — Semester 5  

---

## 📌 Tentang Proyek Ini

Aplikasi peta interaktif yang menampilkan **rute jalan yang memenuhi syarat minimal ongkos Gojek Rp10.000**, dibuat menggunakan library [**CrootJS**](https://croot.js.org) (croot.js.org).

> 🔗 **Live App:** [Lihat di GitHub Pages](https://YonaldiEp.github.io/geojson-jalan/)

---

## 🛵 Data Rute

| Properti      | Nilai |
|---------------|-------|
| Nama Rute     | Kartini – Pasar Antri 10 Ribu |
| Tipe Geometri | LineString (Polyline) |
| Jumlah Titik  | 17 koordinat |
| Wilayah       | Cimahi, Jawa Barat |

Rute dibuat menggunakan **[geojson.io](https://geojson.io)** dengan menelusuri jalan sesungguhnya sesuai estimasi ongkos Gojek Rp10.000.

---

## 🛠️ Teknologi

| Library | Versi | Fungsi |
|---------|-------|--------|
| [CrootJS `map.js`](https://croot.js.org/docs/map) | 0.0.16 | Peta interaktif tanpa Leaflet |
| [CrootJS `geo.js`](https://croot.js.org/docs/geo) | 0.0.16 | Baca data GeoJSON dari URL |
| [CrootJS `geomeasure.js`](https://croot.js.org/docs/geomeasure) | 0.0.16 | Hitung panjang rute |
| [CrootJS `mapcontrol.js`](https://croot.js.org/docs/mapcontrol) | 0.0.16 | Scale bar |

**⚠️ WAJIB menggunakan CrootJS — tidak boleh menggunakan Leaflet atau library lain.**

---

## 📁 Struktur File

```
geojson-jalan/
├── index.html                          # Halaman utama
├── style.css                           # Styling dark mode premium
├── index.js                            # Script utama (ES Module)
├── jalan10k-yonaldi-714240028.geojson  # Data GeoJSON rute
└── README.md                           # Dokumentasi ini
```

---

## 🚀 Cara Menjalankan Lokal

Karena menggunakan ES Module (`type="module"`), file harus dijalankan melalui HTTP server, bukan langsung double-click di browser.

### Cara 1 — VS Code Live Server
1. Install ekstensi **Live Server** di VS Code
2. Klik kanan `index.html` → **Open with Live Server**

### Cara 2 — Python HTTP Server
```bash
cd "path/ke/folder/geojson-jalan"
python -m http.server 8000
# Buka: http://localhost:8000
```

### Cara 3 — Node.js
```bash
npx serve .
```

---

## 🌐 Deploy ke GitHub Pages

1. Pastikan file sudah di-commit dan push ke GitHub
2. Buka **Settings** repo → **Pages**
3. Source: pilih branch `main`, folder `/` (root)
4. Klik **Save** → URL akan muncul dalam beberapa menit

---

## 📖 Cara Pakai Aplikasi

1. Buka URL GitHub Pages
2. **Klik garis rute** (berwarna hijau) di peta
3. Popup akan menampilkan: nama rute, panjang, estimasi tarif
4. Gunakan scroll/pinch untuk zoom in/out
5. Geser peta untuk eksplorasi area sekitar
6. Klik **"Unduh GeoJSON"** untuk download data

---

## 📝 Tutorial Medium

Tutorial penggunaan CrootJS tersedia di Medium:  
🔗 *(link akan diisi setelah artikel dipublikasikan)*

---

## ⚖️ Lisensi

Data GeoJSON dibuat sendiri untuk keperluan tugas akademik.  
Library CrootJS: [MIT License](https://github.com/crootjs/lib/blob/main/LICENSE)  
Peta dasar: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
