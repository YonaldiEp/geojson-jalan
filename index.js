import { createMap, addGeoJSON, fitMap, getGeoJSON }
  from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/map.min.js";
import { getLength }
  from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/geomeasure.min.js";
import { addScaleBar }
  from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/mapcontrol.min.js";

const GEOJSON_URL = "jalan10k-yonaldi-714240028.geojson";

// Asumsi tarif, samakan dengan screenshot aplikasi Gojek
const TARIF_MINIMAL = 10000;
const JARAK_MINIMAL_M = 2000;
const TARIF_PER_KM = 4000;

createMap("peta", {
  center: [107.537, -6.884],
  zoom: 15
});
addScaleBar("peta", "bottom-left");

const loadEl = document.createElement("div");
loadEl.className = "loading";
loadEl.textContent = "Memuat data GeoJSON…";
document.querySelector(".map-wrapper").appendChild(loadEl);

getGeoJSON(GEOJSON_URL, (response) => {
  loadEl.classList.add("hidden");

  if (!response.data) {
    console.error("Gagal memuat GeoJSON. Status:", response.status);
    document.getElementById("nama-rute").textContent = "Gagal memuat data";
    return;
  }

  const geojson = response.data;

  addGeoJSON("peta", geojson, {
    style: {
      stroke: "#00b14f",
      strokeWidth: 6,
      strokeOpacity: 0.95
    },
    popup: buatPopup
  });

  fitMap("peta", geojson);
  updateInfoPanel(geojson);
});

function hitungTarif(jarakMeter) {
  if (jarakMeter <= JARAK_MINIMAL_M) return TARIF_MINIMAL;
  const sisaKm = (jarakMeter - JARAK_MINIMAL_M) / 1000;
  return Math.round(TARIF_MINIMAL + sisaKm * TARIF_PER_KM);
}

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function buatBaris(label, nilai) {
  const baris = document.createElement("div");
  baris.className = "popup-baris";
  const kiri = document.createElement("span");
  kiri.textContent = label;
  const kanan = document.createElement("strong");
  kanan.textContent = nilai;
  baris.append(kiri, kanan);
  return baris;
}

function buatPopup(feature) {
  const panjang = getLength(feature);
  const box = document.createElement("div");

  const judul = document.createElement("div");
  judul.className = "popup-judul";
  judul.textContent = feature.properties.Nama || "Rute Gojek";

  box.append(
    judul,
    buatBaris("Panjang", (panjang / 1000).toFixed(2) + " km"),
    buatBaris("Tarif", formatRupiah(hitungTarif(panjang))),
    buatBaris("Titik", feature.geometry.coordinates.length + " koordinat")
  );
  return box;
}

function updateInfoPanel(geojson) {
  const fitur = geojson.features[0];
  if (!fitur) return;

  const panjangM = getLength(fitur);
  document.getElementById("nama-rute").textContent = fitur.properties.Nama || "-";
  document.getElementById("panjang-jalan").textContent =
    (panjangM / 1000).toFixed(2) + " km (" + Math.round(panjangM) + " m)";
  document.getElementById("estimasi-tarif").textContent = formatRupiah(hitungTarif(panjangM));
  document.getElementById("jml-titik").textContent =
    fitur.geometry.coordinates.length + " titik koordinat";
}
