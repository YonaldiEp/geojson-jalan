# Peta Rute Gojek Rp10.000

Tugas mata kuliah **Sistem Informasi Geografis** (Semester 5)
**Nama:** Yonaldi Ernanda P | **NIM:** 714240028

Aplikasi peta web yang menampilkan data jalan (GeoJSON LineString) rute **Kartini - Pasar Antri** dengan ongkos Gojek Rp10.000. Dibuat memakai [CrootJS](https://croot.js.org) (`map.js`) tanpa Leaflet atau library peta lain.

**Demo:** https://yonaldiep.github.io/geojson-jalan/

## Fitur

- Menampilkan garis rute di atas peta OpenStreetMap
- Popup detail rute saat garis diklik (nama, panjang, tarif, jumlah titik)
- Panel informasi rute di samping peta
- Skala peta dan tombol zoom
- Tombol unduh file GeoJSON

## Struktur File

```
geojson-jalan/
├── index.html
├── index.js
├── style.css
├── jalan10k-yonaldi-714240028.geojson
└── README.md
```

| File | Fungsi |
|---|---|
| `index.html` | Kerangka halaman |
| `index.js` | Logika peta (ES module, memakai CrootJS) |
| `style.css` | Tampilan halaman |
| `jalan10k-yonaldi-714240028.geojson` | Data jalan hasil gambar di geojson.io |

## Data

- Format: GeoJSON `FeatureCollection` berisi satu `LineString`
- Properti: `Nama` = "Kartini - Pasar Antri 10 Ribu"
- Jumlah titik: 17 koordinat
- Panjang: sekitar 1,06 km (dihitung dengan `getLength`)
- Dibuat dengan [geojson.io](https://geojson.io) memakai tool polyline

## Modul CrootJS yang Dipakai

Semua diimpor dari jsDelivr dengan versi dipin (`@0.0.16`):

| Modul | Fungsi yang dipakai |
|---|---|
| `map.min.js` | `createMap`, `getGeoJSON`, `addGeoJSON`, `fitMap` |
| `geomeasure.min.js` | `getLength` |
| `mapcontrol.min.js` | `addScaleBar` |

## Konvensi CrootJS

- HTML, CSS, dan JS dipisah dalam file masing-masing
- JS dimuat sebagai `<script type="module">`
- Tanpa `<style>`, `<script>`, `style=""`, atau `onclick` inline
- Tidak memakai library JS selain CrootJS

## Menjalankan Secara Lokal

Karena memakai ES module dan `fetch`, halaman harus dibuka lewat server lokal (bukan klik dua kali pada `index.html`):

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Deploy ke GitHub Pages

1. Push semua file ke branch `main`
2. Buka **Settings > Pages**
3. Source: *Deploy from a branch*, branch `main`, folder `/ (root)`
4. Tunggu beberapa menit, lalu buka link demo

## Tarif

Estimasi tarif di halaman dihitung dengan asumsi Rp10.000 untuk 2 km pertama dan Rp4.000 per km berikutnya. Bukti tarif sebenarnya dari aplikasi Gojek: `screenshot-tarif.png` (tambahkan file ini ke repo).

## Tutorial

- Artikel Medium: _tambahkan link di sini_
- Video tutorial: _tambahkan link di sini_

## Lisensi

Peta dasar: © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)
