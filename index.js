/**
 * index.js — Aplikasi Peta Jalan Gojek 10 Ribu
 * Menggunakan CrootJS (croot.js.org):
 *  - map.js        : membuat peta interaktif (tanpa Leaflet)
 *  - geomeasure.js : menghitung panjang rute (getLength)
 *  - mapcontrol.js : menambahkan scale bar
 *
 * Data: jalan10k-yonaldi-714240028.geojson
 * Mahasiswa: Yonaldi Ernanda P (714240028)
 */

// ================================================================
// 1. IMPORT dari CrootJS (croot.js.org) via jsDelivr CDN
//    Tidak perlu npm install, tidak perlu bundler!
// ================================================================
import { createMap, addGeoJSON, fitMap, getGeoJSON } from
  "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/map.js";

import { getLength } from
  "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/geomeasure.js";

import { addScaleBar } from
  "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/mapcontrol.js";

// ================================================================
// 2. KONSTANTA
// ================================================================
// File GeoJSON (di-serve bersama index.html di GitHub Pages)
const GEOJSON_URL = "jalan10k-yonaldi-714240028.geojson";

// Tarif Gojek GoRide:
// Minimal Rp10.000 untuk 2 km pertama, +Rp4.000 per km setelahnya
const TARIF_MINIMAL   = 10000;
const JARAK_MINIMAL_M = 2000;
const TARIF_PER_KM    = 4000;

// ================================================================
// 3. INISIALISASI PETA
// ================================================================
// createMap(id, options) — membuat peta interaktif di <div id="peta">
// center: [lng, lat] — perhatikan urutan: longitude dulu, baru latitude!
createMap("peta", {
  center: [107.537, -6.884],   // [lng, lat] tengah rute Kartini–Pasar Antri
  zoom  : 15,
});

// addScaleBar(id, corner) — tambah garis skala peta (dari mapcontrol.js)
addScaleBar("peta", "bottom-left");

// ================================================================
// 4. TAMPILKAN LOADING DI ATAS PETA
// ================================================================
const mapWrap = document.querySelector(".map-wrapper");
const loadEl  = document.createElement("div");
loadEl.className = "loading-indicator";
loadEl.innerHTML  = `<div class="spinner"></div><p class="loading-text">Memuat data GeoJSON…</p>`;
mapWrap.appendChild(loadEl);

// ================================================================
// 5. MUAT DATA GEOJSON & TAMPILKAN DI PETA
// ================================================================
// getGeoJSON(url, callback) — mengambil GeoJSON dari URL
// Callback selalu dipanggil dengan { status, data }
getGeoJSON(GEOJSON_URL, (response) => {

  // Sembunyikan loading indicator
  loadEl.classList.add("hidden");
  setTimeout(() => loadEl.remove(), 400);

  // Cek apakah data berhasil dimuat
  if (!response.data) {
    console.error("Gagal memuat GeoJSON. HTTP status:", response.status);
    document.getElementById("nama-rute").textContent = "❌ Gagal memuat data!";
    return;
  }

  const geojson = response.data;

  // ---- 5a. Gambar GeoJSON di atas peta ----
  // addGeoJSON(id, geojson, options)
  // Style: gunakan stroke, strokeWidth, dll (BUKAN color, weight seperti Leaflet)
  addGeoJSON("peta", geojson, {
    // Style untuk garis (LineString)
    stroke       : "#00b14f",   // warna garis — hijau Gojek
    strokeWidth  : 6,           // ketebalan garis (pixel)
    strokeOpacity: 0.95,        // opasitas garis

    // Popup saat feature diklik
    // Fungsi menerima (feature) dan harus mengembalikan string HTML
    popup: (feature) => {
      const p       = feature.properties;
      const coords  = feature.geometry.coordinates;
      const panjang = getLength(feature);        // dalam meter
      const panjangKm = (panjang / 1000).toFixed(2);
      const tarif   = hitungTarif(panjang);

      return `
        <div style="
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          min-width: 210px;
          padding: 4px 0;
        ">
          <div style="
            font-weight: 800;
            font-size: 1rem;
            color: #00b14f;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
          ">🛵 ${p.Nama || "Rute Gojek"}</div>
          <table style="width:100%;border-collapse:collapse;font-size:0.83rem">
            <tr>
              <td style="color:#666;padding:4px 0;vertical-align:top">📏 Panjang</td>
              <td style="font-weight:700;text-align:right;color:#333">${panjangKm} km</td>
            </tr>
            <tr>
              <td style="color:#666;padding:4px 0;vertical-align:top">💰 Tarif Gojek</td>
              <td style="font-weight:800;color:#00b14f;text-align:right;font-size:1rem">${formatRupiah(tarif)}</td>
            </tr>
            <tr>
              <td style="color:#666;padding:4px 0;vertical-align:top">📍 Titik</td>
              <td style="font-weight:600;text-align:right;color:#333">${coords.length} koordinat</td>
            </tr>
          </table>
          <div style="margin-top:10px;font-size:0.7rem;color:#aaa;text-align:right">
            GeoJSON · SIG Semester 5 · Yonaldi (714240028)
          </div>
        </div>
      `;
    }
  });

  // ---- 5b. Sesuaikan viewport peta ke data ----
  // fitMap(id, geojson) — zoom & pan agar semua fitur terlihat
  fitMap("peta", geojson);

  // ---- 5c. Update panel info di sidebar ----
  updateInfoPanel(geojson);
});

// ================================================================
// 6. FUNGSI BANTU
// ================================================================

/**
 * Hitung estimasi tarif Gojek berdasarkan jarak (meter)
 * Minimal Rp10.000 untuk ≤2 km, +Rp4.000/km setelahnya
 */
function hitungTarif(jarakMeter) {
  if (jarakMeter <= JARAK_MINIMAL_M) return TARIF_MINIMAL;
  const sisaKm = (jarakMeter - JARAK_MINIMAL_M) / 1000;
  return Math.round(TARIF_MINIMAL + sisaKm * TARIF_PER_KM);
}

/**
 * Format angka ke string Rupiah
 * Contoh: 10000 → "Rp 10.000"
 */
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

/**
 * Update elemen-elemen panel info di sidebar kiri
 * dengan data dari GeoJSON yang sudah dimuat
 */
function updateInfoPanel(geojson) {
  const fitur = geojson.features[0];
  if (!fitur) return;

  const props  = fitur.properties;
  const coords = fitur.geometry.coordinates;

  // Hitung panjang menggunakan getLength dari geomeasure.js
  const panjangM  = getLength(fitur);                   // meter
  const panjangKm = (panjangM / 1000).toFixed(2);
  const tarif     = hitungTarif(panjangM);

  // Update elemen di DOM
  document.getElementById("nama-rute").textContent      = props.Nama || "—";
  document.getElementById("panjang-jalan").textContent  = `${panjangKm} km  (${Math.round(panjangM)} m)`;
  document.getElementById("estimasi-tarif").textContent = formatRupiah(tarif);
  document.getElementById("jml-titik").textContent      = `${coords.length} titik koordinat`;
}
