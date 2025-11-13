// ========== SERVICE DETAIL PAGE SCRIPT ==========

// Fungsi utama untuk memuat detail layanan
async function loadServiceDetail() {
  // Ambil parameter id dari URL (contoh: service.html?id=2)
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  // Ambil elemen HTML yang akan digunakan
  const loading = document.getElementById("loading");
  const detail = document.getElementById("serviceDetail");
  const errorMessage = document.getElementById("errorMessage");

  try {
    // Ambil data dari services.json
    const res = await fetch("services.json");
    const data = await res.json();

    // Cari layanan berdasarkan id
    const service = data.find(item => item.id === id);

    // Sembunyikan loading
    loading.style.display = "none";

    // Jika data tidak ditemukan, tampilkan pesan error
    if (!service) {
      errorMessage.classList.remove("hidden");
      return;
    }

    // Jika ditemukan, tampilkan detailnya
    detail.innerHTML = `
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden fade-in border border-gray-100">
        <img src="${service.image}" alt="${service.name}" class="w-full h-72 object-cover">
        <div class="p-8">
          <div class="flex flex-wrap items-center justify-between mb-4">
            <h1 class="text-3xl font-bold text-gray-800">${service.name}</h1>
            <span class="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-full font-semibold">
              <i class="fas fa-tag"></i> ${service.category}
            </span>
          </div>

          <p class="text-gray-600 text-lg leading-relaxed mb-6">${service.description}</p>

          <div class="grid sm:grid-cols-2 gap-6 text-gray-700">
            <div class="flex items-start gap-3">
              <i class="fas fa-map-marker-alt text-blue-600 mt-1"></i>
              <div>
                <p class="font-semibold">Alamat</p>
                <p>${service.address}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-clock text-blue-600 mt-1"></i>
              <div>
                <p class="font-semibold">Jam Operasional</p>
                <p>${service.hours}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <i class="fas fa-phone text-blue-600 mt-1"></i>
              <div>
                <p class="font-semibold">Kontak</p>
                <p>${service.contact}</p>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <a href="index.html" class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              <i class="fas fa-arrow-left"></i> Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    // Tangani error jika file JSON gagal dimuat
    console.error("Gagal memuat data:", error);
    loading.style.display = "none";
    errorMessage.classList.remove("hidden");
  }
}

// Jalankan fungsi saat halaman dimuat
window.addEventListener("DOMContentLoaded", loadServiceDetail);