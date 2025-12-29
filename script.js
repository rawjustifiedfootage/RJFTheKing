const seasons = [
  { name: "Spring", emoji: "🌸", startMonth: 2, class: "spring" },
  { name: "Summer", emoji: "☀️", startMonth: 5, class: "summer" },
  { name: "Autumn", emoji: "🍁", startMonth: 8, class: "autumn" },
  { name: "Winter", emoji: "❄️", startMonth: 11, class: "winter" }
];

const now = new Date();
const month = now.getMonth();
const year = now.getFullYear();

/* cari musim sekarang */
let currentIndex = seasons.length - 1;
for (let i = seasons.length - 1; i >= 0; i--) {
  if (month >= seasons[i].startMonth) {
    currentIndex = i;
    break;
  }
}

const currentSeason = seasons[currentIndex];
const nextSeason = seasons[(currentIndex + 1) % seasons.length];

/* set background musim */
document.body.classList.add(currentSeason.class);

/* tanggal mulai musim selanjutnya */
const nextSeasonDate = new Date(
  year + (currentIndex === seasons.length - 1 ? 1 : 0),
  nextSeason.startMonth,
  1
);

const currentEl = document.getElementById("currentSeason");
const upcomingEl = document.getElementById("upcoming");

function updateCountdown() {
  const now = new Date();
  const diff = nextSeasonDate - now;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  currentEl.innerHTML = `
    <b>${currentSeason.emoji} ${currentSeason.name}</b><br>
    Ends in ${d}d ${h}h ${m}m ${s}s
  `;

  upcomingEl.innerHTML = `
    <div class="season next">
      <b>${nextSeason.emoji} ${nextSeason.name}</b><br>
      Starts in ${d}d ${h}h ${m}m ${s}s
    </div>
  `;
}

setInterval(updateCountdown, 1000);
updateCountdown();
