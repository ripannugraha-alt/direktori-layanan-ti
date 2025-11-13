document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("workshopDetail");
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  try {
    const res = await fetch("workshop.json");
    if (!res.ok) throw new Error("File workshop.json tidak ditemukan");
    const data = await res.json();
    const workshop = data.find(w => w.id === id);

    if (!workshop) {
      container.innerHTML = `
        <div class="text-center py-20 text-gray-500">
          <i class="fas fa-exclamation-triangle text-4xl mb-4 text-red-400"></i>
          <p>Workshop tidak ditemukan.</p>
        </div>`;
      return;
    }

    // ✅ render detail workshop
    container.innerHTML = `
      <div class="bg-white shadow-2xl rounded-3xl overflow-hidden fade-in">
        <img src="${workshop.image}" alt="${workshop.name}" class="w-full h-[450px] object-cover">
        <div class="p-10 md:p-12">
          <h2 class="text-4xl font-bold text-primary mb-5">${workshop.name}</h2>

          <div class="flex flex-wrap gap-4 text-gray-600 text-sm mb-8">
            <span><i class="fas fa-user text-accent"></i> ${workshop.mentor}</span>
            <span><i class="fas fa-calendar text-accent"></i> ${workshop.date}</span>
            <span><i class="fas fa-clock text-accent"></i> ${workshop.time}</span>
            <span><i class="fas fa-map-marker-alt text-accent"></i> ${workshop.location}</span>
          </div>

          <p class="text-gray-700 text-lg leading-relaxed mb-8">${workshop.description}</p>

          <div class="flex items-center gap-2 text-yellow-500 text-lg mb-10">
            <i class="fas fa-star"></i>
            <span class="text-gray-700 font-medium">${workshop.rating} / 5.0</span>
          </div>

          <div class="flex justify-center">
            <a href="mailto:pklripannugraha@gmail.com?subject=Pendaftaran%20Workshop%20${encodeURIComponent(workshop.name)}&body=Halo,%20saya%20ingin%20mendaftar%20untuk%20workshop%20${encodeURIComponent(workshop.name)}."
              class="bg-accent text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition duration-300 flex items-center gap-2">
              <i class="fas fa-user-plus"></i> Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="text-center py-20 text-red-500">
        <i class="fas fa-times-circle text-4xl mb-4"></i>
        <p>Gagal memuat data workshop.</p>
      </div>`;
  }
});