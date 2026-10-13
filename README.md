# Peta Rute Jalan

Tugas Sistem Informasi Geografis, Semester 5
Yonaldi Ernanda P (714240028)

Peta web yang menampilkan rute jalan **Kartini - Pasar Antri** dari data GeoJSON. Dibuat dengan [CrootJS](https://croot.js.org), tanpa Leaflet atau library peta lain.

Demo: https://yonaldiep.github.io/geojson-jalan/

## Isi repo

```
geojson-jalan/
├── index.html
├── index.js
├── style.css
├── jalan-714240028.geojson
├── screenshot-tarif.png
└── README.md
```

| File | Isi |
|---|---|
| `index.html` | Kerangka halaman |
| `index.js` | Logika peta dengan CrootJS (ES module) |
| `style.css` | Tampilan |
| `jalan-714240028.geojson` | Data jalan, digambar di geojson.io |
| `screenshot-tarif.png` | Bukti tarif ojek online |

## Data

- Satu `LineString` dengan 17 titik koordinat
- Properti `Nama`: "Kartini - Pasar Antri 10 Ribu"
- Panjang sekitar 1,06 km (dihitung dengan `getLength`)

## Modul CrootJS

Diimpor dari jsDelivr, versi dipin ke `0.0.16`.

| Modul | Fungsi |
|---|---|
| `map.min.js` | `createMap`, `getGeoJSON`, `addGeoJSON`, `fitMap` |
| `geomeasure.min.js` | `getLength` |
| `mapcontrol.min.js` | `addScaleBar` |

Mengikuti konvensi CrootJS: HTML, CSS, dan JS dipisah, JS dimuat sebagai module, tanpa kode inline, dan tanpa library JS lain.

## Menjalankan lokal

Halaman memakai ES module dan `fetch`, jadi harus dibuka lewat server lokal:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Tarif

Tarif Rp10.000 adalah konstanta `TARIF_OJOL` di `index.js`, disamakan dengan screenshot aplikasi ojek online di `screenshot-tarif.png`. Bukan tarif resmi.

## Tutorial

- Artikel Medium: _isi link_
- Video: _isi link_

Peta dasar © OpenStreetMap contributors.
