/* =====================================================
   INDEX SCRIPT
   Ambil data dari services.json dan aktifkan fitur
   pencarian serta filter kategori
   ===================================================== */
/* =====================================================
   🔧 BURGER MENU & SCROLL KE FOOTER
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  // Toggle tampil/sembunyi menu
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Tutup menu setelah klik navigasi
  const menuLinks = mobileMenu.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Scroll halus ke bagian footer (tentang & kontak)
  const tentangLinks = document.querySelectorAll('a[href="#tentang"], a[href="#kontak"]');
  const footer = document.querySelector("footer");

  tentangLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      footer.scrollIntoView({ behavior: "smooth" });
    });
  });
});


   document.addEventListener("DOMContentLoaded", async () => {
  const servicesGrid = document.getElementById("servicesGrid");
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");

  let servicesData = [];

  try {
    // Ambil data dari JSON
    const response = await fetch("./services.json");
    servicesData = await response.json();

    renderServices(servicesData); // tampilkan awal
  } catch (error) {
    console.error("Gagal memuat data layanan:", error);
    servicesGrid.innerHTML = `
      <div class="col-span-full text-center text-gray-500 py-10">
        <i class="fas fa-exclamation-circle text-red-400 text-2xl mb-3"></i>
        <p>Gagal memuat data layanan. Pastikan file <b>services.json</b> tersedia.</p>
      </div>
    `;
  }

  // ==========================
  // 🔍 Fungsi Pencarian & Filter
  // ==========================
  function filterServices() {
    const keyword = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const filtered = servicesData.filter(service => {
      const matchKeyword =
        service.name.toLowerCase().includes(keyword) ||
        service.address.toLowerCase().includes(keyword) ||
        service.category.toLowerCase().includes(keyword);

      const matchCategory =
        service.category.toLowerCase().includes(selectedCategory.toLowerCase())

      return matchKeyword && matchCategory;
    });

    renderServices(filtered);
  }

  // Event Listener: real-time pencarian
  searchInput.addEventListener("input", filterServices);
  categorySelect.addEventListener("change", filterServices);

  // ==========================
  // 🎨 Fungsi Render Layanan
  // ==========================
  function renderServices(data) {
    servicesGrid.innerHTML = "";

    if (data.length === 0) {
      servicesGrid.innerHTML = `
        <div class="col-span-full text-center text-gray-500 py-10">
          <i class="fas fa-search text-gray-400 text-3xl mb-3"></i>
          <p>Tidak ada hasil ditemukan.</p>
        </div>
      `;
      return;
    }

    data.forEach(service => {
      const card = document.createElement("div");
      card.className =
        "card-hover bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition";

      card.innerHTML = `
        <img src="${service.image}" alt="${service.name}" class="w-full h-48 object-cover">
        <div class="p-5">
          <h3 class="text-lg font-semibold text-primary mb-1">${service.name}</h3>
          <p class="text-sm text-gray-500 mb-3">${service.short}</p>
          <div class="flex items-center justify-between">
            <span class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">${service.category}</span>
            <a href="service.html?id=${service.id}" class="text-accent font-semibold text-sm hover:underline">
              Lihat Detail →
            </a>
          </div>
        </div>
      `;

      servicesGrid.appendChild(card);
    });
  }
});