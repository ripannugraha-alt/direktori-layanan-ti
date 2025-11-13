// ===== FUNGSI MEMUAT DATA LAYANAN DARI services.json =====
async function loadServices() {
  try {
    const res = await fetch("services.json");
    const data = await res.json();
    const grid = document.getElementById("servicesGrid");
    const emptyState = document.getElementById("emptyState");

    // Fungsi untuk menampilkan daftar layanan di halaman
    function render(list) {
      grid.innerHTML = list.map(item => `
        <div class="service-card bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 border border-gray-100 fade-in">
          <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-xl mb-4">
          <h3 class="font-semibold text-xl text-blue-700 mb-1">${item.name}</h3>
          <p class="text-gray-600 text-sm mb-3">${item.category}</p>
          <p class="text-gray-500 text-sm mb-4">${item.description}</p>
          <a href="service.html?id=${item.id}" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
            Lihat Detail
          </a>
        </div>
      `).join("");
      emptyState.classList.toggle("hidden", list.length !== 0);
    }

    // Render awal
    render(data);

    // ===== FILTER PENCARIAN =====
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");

    function filterServices() {
      const searchText = searchInput.value.toLowerCase();
      const selectedCategory = categorySelect.value;
      const filtered = data.filter(item => {
        const matchText = item.name.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText);
        const matchCategory = selectedCategory ? item.category === selectedCategory : true;
        return matchText && matchCategory;
      });
      render(filtered);
    }

    searchInput.addEventListener("input", filterServices);
    categorySelect.addEventListener("change", filterServices);

  } catch (err) {
    console.error("Gagal memuat data layanan:", err);
  }
}

// ===== MENU MOBILE =====
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("hidden");
});

// ===== PANGGIL FUNGSI SAAT HALAMAN DIMUAT =====
window.addEventListener("DOMContentLoaded", loadServices);