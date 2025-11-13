/* =====================================================
   SERVICE DETAIL SCRIPT
   Menampilkan data detail layanan berdasarkan parameter ID di URL
   ===================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("id");

  const serviceName = document.getElementById("serviceName");
  const serviceCategory = document.getElementById("serviceCategory");
  const serviceDescription = document.getElementById("serviceDescription");
  const serviceAddress = document.getElementById("serviceAddress");
  const serviceHours = document.getElementById("serviceHours");
  const serviceContact = document.getElementById("serviceContact");
  const serviceImage = document.getElementById("serviceImage");
  const ratingValue = document.getElementById("ratingValue");

  try {
    // Ambil data JSON
    const res = await fetch("services.json");
    const data = await res.json();

    // Temukan data sesuai ID
    const service = data.find(item => item.id == serviceId);

    if (!service) {
      document.getElementById("serviceDetail").innerHTML = `
        <div class="text-center py-32">
          <i class="fas fa-exclamation-circle text-red-500 text-4xl mb-3"></i>
          <h2 class="text-2xl font-semibold text-gray-700 mb-2">Layanan Tidak Ditemukan</h2>
          <p class="text-gray-500 mb-6">Data layanan yang Anda cari tidak tersedia atau telah dihapus.</p>
          <a href="index.html" class="bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
            <i class="fas fa-arrow-left"></i> Kembali ke Beranda
          </a>
        </div>`;
      return;
    }

    // Render data detail ke elemen HTML
    serviceName.textContent = service.name;
    serviceCategory.textContent = service.category;
    serviceDescription.textContent = service.description;
    serviceAddress.textContent = service.address;
    serviceHours.textContent = service.hours;
    serviceContact.textContent = service.contact;
    serviceImage.src = service.image || "images/default.jpg";
    serviceImage.alt = service.name;

    // ====== Tambahkan Rating Dinamis ======
    const randomRating = (Math.random() * (5 - 4) + 4).toFixed(1); // rating acak 4.0–5.0
    ratingValue.textContent = `${randomRating} / 5`;

    // Update jumlah bintang (dinamis sesuai rating)
    const ratingStars = document.querySelector(".rating");
    if (ratingStars) {
      ratingStars.innerHTML = "";
      const fullStars = Math.floor(randomRating);
      const halfStar = randomRating % 1 >= 0.5;

      for (let i = 0; i < fullStars; i++) {
        ratingStars.innerHTML += `<i class="fas fa-star"></i>`;
      }
      if (halfStar) ratingStars.innerHTML += `<i class="fas fa-star-half-alt"></i>`;
      for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
        ratingStars.innerHTML += `<i class="far fa-star"></i>`;
      }
      ratingStars.innerHTML += `<span id="ratingValue" class="ml-2 text-gray-600 text-sm font-medium">${randomRating} / 5</span>`;
    }

    // ====== Tombol Lihat di Peta ======
    const mapButton = document.querySelector(".fa-location-dot").parentElement;
    if (mapButton) {
      mapButton.addEventListener("click", () => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`;
        window.open(mapUrl, "_blank");
      });
    }

    // ====== Tombol Hubungi ======
    const contactButton = document.querySelector(".fa-phone-alt").parentElement;
    if (contactButton) {
      contactButton.addEventListener("click", () => {
        const whatsappUrl = `https://wa.me/${service.contact.replace(/\D/g, "")}?text=Halo, saya ingin menanyakan layanan ${encodeURIComponent(service.name)}`;
        window.open(whatsappUrl, "_blank");
      });
    }

  } catch (error) {
    console.error("Gagal memuat data layanan:", error);
    document.getElementById("serviceDetail").innerHTML = `
      <div class="text-center py-32">
        <i class="fas fa-wifi text-yellow-500 text-4xl mb-3"></i>
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">Koneksi Terputus</h2>
        <p class="text-gray-500 mb-6">Tidak dapat memuat data layanan. Periksa koneksi internet Anda.</p>
        <button onclick="location.reload()" class="bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
          <i class="fas fa-redo"></i> Coba Lagi
        </button>
      </div>`;
  }
});