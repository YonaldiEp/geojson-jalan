import { createMap, addGeoJSON, fitMap, getGeoJSON }
  from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/map.min.js";
import { getLength }
  from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/geomeasure.min.js";
import { addScaleBar }
  from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/mapcontrol.min.js";

const GEOJSON_URL = "jalan-714240028.geojson";

// Samakan dengan tarif di screenshot ojek online
const TARIF_OJOL = 10000;

createMap("peta", {
  center: [107.537, -6.884],
  zoom: 15
});
addScaleBar("peta", "bottom-left");

const loadEl = document.createElement("div");
loadEl.className = "loading";
loadEl.textContent = "Memuat data…";
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
  isiPanel(geojson);
});

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
  judul.textContent = feature.properties.Nama || "Rute";

  box.append(
    judul,
    buatBaris("Panjang", (panjang / 1000).toFixed(2) + " km"),
    buatBaris("Jumlah titik", feature.geometry.coordinates.length),
    buatBaris("Tarif ojek online", formatRupiah(TARIF_OJOL))
  );
  return box;
}

function isiPanel(geojson) {
  const fitur = geojson.features[0];
  if (!fitur) return;

  const panjangM = getLength(fitur);
  document.getElementById("nama-rute").textContent = fitur.properties.Nama || "-";
  document.getElementById("panjang-jalan").textContent =
    (panjangM / 1000).toFixed(2) + " km (" + Math.round(panjangM) + " m)";
  document.getElementById("jml-titik").textContent =
    fitur.geometry.coordinates.length + " titik";
  document.getElementById("tarif").textContent = formatRupiah(TARIF_OJOL);
}
